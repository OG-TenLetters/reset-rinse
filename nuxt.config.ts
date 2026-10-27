import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        compressPublicAssets: true,
    },
    modules: [
        'gooey-toast-vue/nuxt',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/turnstile',
        '@vercel/analytics',
    ],
    turnstile: {
        siteKey: '',
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
    },
    runtimeConfig: {
        resendApiKey: '',
        turnstile: { secretKey: '' },
        upstashRedisRestUrl: '',
        upstashRedisRestToken: '',
    },
})
