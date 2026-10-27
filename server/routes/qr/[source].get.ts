import { track } from '@vercel/analytics/server'

const validSources = ['car', 'business-card', 'door-hanger', 'fridge']

export default defineEventHandler(async (event) => {
    const source = getRouterParam(event, 'source')

    // Validate QR source
    if (!source || !validSources.includes(source)) {
        throw createError({
            statusCode: 404,
            statusMessage: 'QR source not found',
        })
    }

    // Inside your event handler:
    if (getRequestURL(event).hostname === 'resetrinse.com') {
        try {
            await track('QR Scan', {
                source,
            })
        } catch (error) {
            console.error('QR analytics failed:', error)
        }
    }
    // Prevent caching
    setResponseHeader(event, 'Cache-Control', 'no-store')

    // Redirect with tracking parameters
    return sendRedirect(
        event,
        `/?utm_source=${source}&utm_medium=qr&utm_campaign=offline`,
        302
    )
})
