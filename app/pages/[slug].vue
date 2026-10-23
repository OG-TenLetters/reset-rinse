<script setup lang="ts">
import ContactSection from '~/components/ContactSection.vue'
import ServiceBanner from '~/components/service-page/ServiceBanner.vue'
import ServiceDetails from '~/components/service-page/ServiceDetails.vue'
import { ServicesData } from '~/data/services'

// Ensure visiting a second /[slug] route recreates the page and its metadata.
definePageMeta({ key: (route) => route.path })

const route = useRoute()
const path = typeof route.params.slug === 'string' ? `/${route.params.slug}` : ''
const service = Object.values(ServicesData).find((item) => item.to === path)

if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

useSeoMeta({
    title: service.seo.title,
    description: service.seo.description,
    ogTitle: service.seo.title,
    ogDescription: service.seo.description,
    ogType: 'website',
})

// Use the production domain, not the current Vercel preview deployment URL.
useHead({
    link: [
        {
            rel: 'canonical',
            href: `https://resetrinse.com${service.to}`,
        },
    ],
})
</script>

<template>
    <main>
        <ServiceBanner :service="service" />
        <ServiceDetails :service="service" />
        <!-- Reuse the original contact form without selecting any services. -->
        <section id="contact" aria-label="Contact Reset Rinse">
            <ContactSection />
        </section>
    </main>
</template>
