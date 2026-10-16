<script setup lang="ts">
import ServiceCard from './ServiceCard.vue'
import { ServicesData } from '~/data/services'

const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)
</script>

<template>
    <div class="flex flex-col items-center px-5 py-10 sm:px-10">
        <!-- Title Box -->
        <div class="flex flex-col items-center gap-y-1 text-center">
            <h4
                class="text-xs font-semibold text-violet-800 uppercase sm:text-sm"
            >
                time for a reset
            </h4>
            <h1
                class="text-2xl font-bold tracking-wide sm:text-3xl lg:text-4xl"
            >
                My Services
            </h1>
            <p class="text-lg font-semibold sm:text-base md:text-xl">
                Give every side of your home the reset it deserves.
            </p>
        </div>
        <!-- Service Cards -->
        <div
            class="md:-y-15 grid w-full grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-3 lg:py-20"
        >
            <ServiceCard
                :key="service.to"
                :service="service"
                v-for="service in activeServices"
            />
        </div>
    </div>
</template>
