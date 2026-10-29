<script setup lang="ts">
import type { ServiceData } from '~/data/services'
import ShimmerImage from '../ui/ShimmerImage.vue'

defineProps<{
    service: ServiceData
}>()
</script>

<template>
    <!-- Service Card -->
    <div
        class="group relative z-40 w-full overflow-hidden rounded-2xl border-0 border-amber-500 bg-black shadow-lg shadow-gray-800/50 md:max-w-100"
    >
        <!-- Service Picture Box -->
        <div class="relative">
            <!-- Service Image -->
            <ShimmerImage
                :src="service.images.card"
                :alt="`${service.name} Example`"
                width="1920"
                height="1080"
                wrapper-class="aspect-video w-full scale-105 mask-[linear-gradient(to_bottom,black_0%,black_calc(100%-120px),transparent_100%)] transition-transform duration-300 group-hover:scale-100"
                image-class="absolute inset-0 h-full w-full object-cover"
            />
        </div>
        <!-- Service Picture Box - Inset Shadow -->
        <div
            class="pointer-events-none absolute inset-0 z-10 inset-shadow-sm inset-shadow-black/50"
        ></div>

        <!--Serive Picture Box - Tint Overlay -->
        <div
            class="pointer-events-none absolute inset-0 z-10 bg-gray-950/50 md:bg-gray-950/30"
        ></div>

        <!-- Service Title Box - Transparent Border Wrapper -->
        <div
            class="xs:-mt-40 relative z-20 -mt-25 rounded-t-full px-0.5 md:-mt-20 md:px-0"
        >
            <!-- Service Title Box -->
            <div
                class="flex flex-col items-center justify-center gap-y-2 rounded-t-full rounded-b-2xl border-t-4 border-violet-700/60 bg-linear-to-t from-amber-100/90 to-violet-200/90 px-3 pt-13 pb-3 text-center sm:gap-y-3 md:border-t-8"
            >
                <h2
                    class="xs:text-2xl text-xl font-bold text-zinc-950 sm:text-3xl md:text-xl lg:text-2xl"
                >
                    {{ service.name }}
                </h2>

                <p
                    class="mb-1 w-36/40 text-sm font-semibold text-zinc-800 sm:text-base md:mb-2 lg:mb-4"
                >
                    {{ service.description.shorthand }}
                </p>

                <NuxtLink
                    class="xs:text-base w-full rounded-t-3xl border-3 border-violet-900 bg-violet-400 px-4 py-1 text-sm font-bold tracking-wide text-violet-950 shadow-2xs shadow-violet-950/50 transition-colors duration-150 hover:border-amber-700/50 hover:bg-amber-300/50 hover:text-amber-800/50"
                    :to="service.to"
                    :aria-label="`Learn more about my ${service.name} services`"
                >
                    Learn More
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
