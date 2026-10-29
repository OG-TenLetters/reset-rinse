import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { ServicesData } from '~/data/services'

const MAX_BODY_BYTES = 10_240
const RATE_WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const TURNSTILE_ENABLED = false

// Local-development fallback only. Production uses shared Upstash Redis.
const devRequests = new Map<string, number[]>()
let distributedLimiter: Ratelimit | null = null

function allowLocalRequest(identifier: string) {
    const now = Date.now()
    const recent = (devRequests.get(identifier) ?? []).filter(
        (time) => now - time < RATE_WINDOW_MS
    )
    if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false
    recent.push(now)
    devRequests.set(identifier, recent)
    return true
}

function invalidForm(): never {
    throw createError({
        statusCode: 400,
        statusMessage: 'Invalid quote request information.',
    })
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    // Only accept JSON; cross-site HTML form posts don't need access here.
    const contentType = getRequestHeader(event, 'content-type') ?? ''
    if (!contentType.toLowerCase().startsWith('application/json')) {
        throw createError({ statusCode: 415, statusMessage: 'JSON required.' })
    }

    // Early length check, then verify the actual body size as well.
    const announcedSize = Number(getRequestHeader(event, 'content-length') ?? 0)
    if (announcedSize > MAX_BODY_BYTES) {
        throw createError({
            statusCode: 413,
            statusMessage: 'Request too large.',
        })
    }

    const ip = getRequestIP(event) ?? 'unknown'

    // Upstash enforces the rate limit across server processes/instances.
    if (config.upstashRedisRestUrl && config.upstashRedisRestToken) {
        distributedLimiter ??= new Ratelimit({
            redis: new Redis({
                url: config.upstashRedisRestUrl,
                token: config.upstashRedisRestToken,
            }),
            limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, '15 m'),
            prefix: 'reset-rinse/quote',
        })

        const { success } = await distributedLimiter.limit(ip)
        if (!success) {
            throw createError({
                statusCode: 429,
                statusMessage: 'Too many requests. Try again later.',
            })
        }
    } else if (import.meta.dev) {
        if (!allowLocalRequest(ip)) {
            throw createError({
                statusCode: 429,
                statusMessage: 'Too many requests. Try again later.',
            })
        }
    } else {
        // Do not expose the email endpoint without production rate limiting.
        console.error('Missing Upstash rate limit credentials')
        throw createError({
            statusCode: 503,
            statusMessage: 'Contact service is not configured.',
        })
    }

    const raw = await readRawBody(event)
    if (!raw || new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
        throw createError({
            statusCode: 413,
            statusMessage: 'Request too large.',
        })
    }

    let parsed: unknown
    try {
        parsed = JSON.parse(raw)
    } catch {
        invalidForm()
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        invalidForm()
    }

    const body = parsed as Record<string, unknown>

    // Hidden honeypot: acknowledge automated submissions without sending mail.
    if (typeof body.website === 'string' && body.website.trim()) {
        return { success: true }
    }

    function field(key: string, maxLength: number): string {
        const value = body[key]
        if (typeof value !== 'string' || value.length > maxLength) invalidForm()
        return value.trim()
    }

    const name = field('name', 100)
    const phone = field('phone', 40)
    const email = field('email', 254)
    const address = field('address', 200)
    const details = field('details', 3000)
    const propertyType = body.propertyType
    const submissionId = field('submissionId', 36)
    const token = TURNSTILE_ENABLED ? field('turnstileToken', 2048) : ''

    const phoneDigits = phone.replace(/\D/g, '')
    const allowedServices = new Set(
        Object.values(ServicesData)
            .filter((service) => service.active)
            .map((service) => service.name)
    )

    if (
        name.length < 2 ||
        /[\r\n]/.test(name) ||
        !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
        phoneDigits.length < 10 ||
        phoneDigits.length > 15 ||
        (propertyType !== 'Residential' && propertyType !== 'Commercial') ||
        !Array.isArray(body.services) ||
        body.services.length === 0 ||
        body.services.length > allowedServices.size ||
        !body.services.every(
            (service: unknown) =>
                typeof service === 'string' && allowedServices.has(service)
        ) ||
        new Set(body.services).size !== body.services.length ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            submissionId
        ) ||
        (TURNSTILE_ENABLED && token.length === 0)
    ) {
        invalidForm()
    }

    if (
        !config.resendApiKey ||
        (TURNSTILE_ENABLED && !config.turnstile?.secretKey)
    ) {
        console.error('Missing required contact service credentials')

        throw createError({
            statusCode: 503,
            statusMessage: 'Contact service unavailable.',
        })
    }
    // Turnstile tokens must be verified server-side and are single-use.
    if (TURNSTILE_ENABLED) {
        const verification = await verifyTurnstileToken(token)

        if (!verification.success) {
            throw createError({
                statusCode: 422,
                statusMessage:
                    'Security check expired or failed. Please retry.',
            })
        }
    }
    const services = body.services as string[]
    const message = [
        'NEW RESET RINSE QUOTE REQUEST',
        '-----------------------------',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Property Address: ${address || 'Not provided'}`,
        `Property Type: ${propertyType}`,
        '',
        'Requested Services:',
        ...services.map((service) => `- ${service}`),
        '',
        'Additional Details:',
        details || 'None provided',
    ].join('\n')

    const resend = new Resend(config.resendApiKey)
    const { error } = await resend.emails.send(
        {
            from: 'Reset Rinse Website <hello@resetrinse.com>',
            to: ['quote@resetrinse.com'],
            replyTo: email,
            subject: `New Quote Request - ${name}`,
            text: message,
        },
        {
            // A retried request with the same submission ID won't send twice.
            idempotencyKey: `quote/${submissionId}`,
        }
    )

    if (error) {
        console.error('Resend error:', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Could not send email.',
        })
    }

    return { success: true }
})
