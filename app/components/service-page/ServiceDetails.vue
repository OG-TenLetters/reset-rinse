<script setup lang="ts">
import type { ServiceData } from '~/data/services'
import BeforeAfterSlider from './BeforeAfterSlider.vue'

defineProps<{ service: ServiceData }>()
</script>

<template>
    <section
        class="mx-auto grid max-w-260 items-start gap-10 px-6 py-16 text-gray-900 sm:px-10 sm:py-20 lg:grid-cols-2 lg:gap-14"
        :aria-labelledby="`details-${service.to.slice(1)}`"
    >
        <div>
            <p
                class="mb-2 text-sm font-semibold tracking-wide text-violet-700 uppercase"
            >
                About the Service
            </p>
            <h2
                :id="`details-${service.to.slice(1)}`"
                class="text-2xl leading-tight font-bold sm:text-3xl"
            >
                {{ service.detailsHeading }}
            </h2>
            <p class="mt-5 text-base leading-relaxed sm:text-lg">
                {{ service.description.full.general }}
            </p>

            <div class="mt-8">
                <h3 class="text-lg font-bold text-violet-900 sm:text-xl">
                    {{ service.description.full.included.heading }}
                </h3>
                <p class="mt-2 leading-relaxed">
                    {{ service.description.full.included.paragraph }}
                </p>
            </div>

            <div v-if="service.guarantees?.length" class="mt-8">
                <div
                    v-for="guarantee in service.guarantees"
                    :key="guarantee.title"
                    class="mb-4 rounded-xl border-l-4 border-amber-500 bg-white/75 px-5 py-4 shadow-sm last:mb-0"
                >
                    <h3 class="font-bold text-violet-900">
                        {{ guarantee.title }}
                    </h3>
                    <p class="mt-2 text-sm leading-relaxed sm:text-base">
                        {{ guarantee.description }}
                    </p>
                </div>
            </div>
        </div>

        <div class="w-full min-w-0 lg:pt-8">
            <BeforeAfterSlider
                v-if="service.images.beforeAfter"
                :before="service.images.beforeAfter.before"
                :after="service.images.beforeAfter.after"
                :placeholder="service.images.beforeAfter.placeholder"
                :label="`${service.name} before and after image comparison`"
            />

            <!-- Fallback Image -->
            <NuxtImg
                v-else
                :src="service.images.gallery[1] ?? service.images.hero"
                :alt="`${service.name} service photo`"
                width="1000"
                height="750"
                format="webp"
                quality="85"
                loading="lazy"
                class="aspect-4/3 w-full rounded-2xl object-cover shadow-xl shadow-gray-950/25"
            />
        </div>
    </section>
</template>
