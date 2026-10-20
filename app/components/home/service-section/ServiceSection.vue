<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue'
import ServiceCard from './ServiceCard.vue'
import { ServicesData } from '~/data/services'

const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)
</script>

<template>
    <section id="services">
        <div class="flex flex-col items-center px-5 py-10 sm:px-10">
            <!-- Title Box -->
            <SectionTitle
                tag="time for a reset"
                title="my services"
                details="Give every side of you home the reset it deserves"
            />
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
    </section>
</template>
