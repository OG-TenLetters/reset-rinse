const validSources = ['car', 'business-card', 'door-hanger', 'fridge']

export default defineEventHandler((event) => {
    const source = getRouterParam(event, 'source')

    // Validate the QR source
    if (!source || !validSources.includes(source)) {
        throw createError({
            statusCode: 404,
            statusMessage: 'QR source not found',
        })
    }

    // Access Cloudflare Analytics Engine
    const analytics = event.context.cloudflare?.env?.QR_ANALYTICS

    // Record the QR request
    if (analytics) {
        analytics.writeDataPoint({
            blobs: [source],
            doubles: [1],
        })
    }

    // Prevent caching the redirect
    setResponseHeader(event, 'Cache-Control', 'no-store')

    // Redirect to homepage with tracking parameters
    return sendRedirect(
        event,
        `/?utm_source=${source}&utm_medium=qr&utm_campaign=offline`,
        302
    )
})
