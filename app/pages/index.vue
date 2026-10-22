<script setup lang="ts">
import Banner from '~/components/Banner.vue'
import AboutMeSection from '~/components/home-page/AboutMeSection.vue'
import ServiceAreaSection from '~/components/home-page/ServiceAreaSection.vue'
import ServiceSection from '~/components/home-page/ServiceSection.vue'
</script>

<template>
    <Banner />
    <div
        class="mx-auto max-w-260 px-6 py-10 text-center sm:px-10 sm:py-16 md:py-20"
    >
        <h2
            class="mb-4 text-lg font-bold tracking-wide sm:text-2xl lg:text-3xl"
        >
            Reflecting Your Expectations
        </h2>
        <p class="text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
            Your windows should do more than let light in-they should make your
            home look its best. I clean the glass, frames, and tracks so the
            view inside and out lives up to your expectations.
        </p>
    </div>
    <ServiceSection />
    <TestimonialsSection />
    <AboutMeSection />
    <ServiceAreaSection />
</template>
