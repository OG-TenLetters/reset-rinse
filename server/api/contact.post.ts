import { Resend } from 'resend'

interface ContactRequest {
    name?: unknown
    phone?: unknown
    email?: unknown
    address?: unknown
    propertyType?: unknown
    services?: unknown
    details?: unknown
    website?: unknown
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    // Read submitted form data
    const body = await readBody<ContactRequest>(event)

    // Basic spam honeypot
    if (body?.website) {
        return { success: true }
    }

    // Normalize and limit user-provided data
    const clean = (value: unknown, maxLength: number) =>
        typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

    const singleLine = (value: unknown, maxLength: number) =>
        clean(value, maxLength).replace(/[\r\n]+/g, ' ')

    const name = singleLine(body?.name, 100)
    const phone = singleLine(body?.phone, 40)
    const email = singleLine(body?.email, 254)
    const address = singleLine(body?.address, 200)
    const details = clean(body?.details, 3000)

    const propertyType =
        body?.propertyType === 'Residential' ||
        body?.propertyType === 'Commercial'
            ? body.propertyType
            : 'Not specified'

    const services = Array.isArray(body?.services)
        ? body.services
              .filter(
                  (service): service is string => typeof service === 'string'
              )
              .slice(0, 25)
              .map((service) => singleLine(service, 100))
              .filter(Boolean)
        : []

    // Server-side validation
    if (
        name.length < 2 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        services.length === 0
    ) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid contact form information.',
        })
    }

    // Verify email service configuration
    if (!config.resendApiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Email service is not configured.',
        })
    }

    // Format the quote request
    const message = [
        'NEW RESET RINSE QUOTE REQUEST',
        '-----------------------------',
        '',
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
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

    // Initialize Resend
    const resend = new Resend(config.resendApiKey)

    // Send email
    const { data, error } = await resend.emails.send({
        from: 'Reset Rinse Website <hello@resetrinse.com>',

        to: ['quote@resetrinse.com'],

        replyTo: email,

        subject: `New Quote Request - ${name}`,

        text: message,
    })

    // Handle provider errors
    if (error) {
        console.error('Resend delivery error:', error)

        throw createError({
            statusCode: 502,
            statusMessage: 'Unable to send quote request.',
        })
    }

    return {
        success: true,
        messageId: data?.id,
    }
})
