<script setup lang="ts">
import { ServiceLocations } from '~/data/location'
import SectionTitle from '../SectionTitle.vue'
import ServiceAreaMapClient from './ServiceAreaMap.client.vue'

const activeLocations = computed(() =>
    Object.values(ServiceLocations)
        .filter((state) => state.active)
        .flatMap((state) =>
            Object.values(state.counties)
                .filter((county) => county.active)
                .flatMap((county) =>
                    county.locations.filter((location) => location.active)
                )
        )
)

const hoveredLocation = ref<string | null>(null)
const selectedLocation = ref<string | null>(null)

function selectLocation(slug: string) {
    selectedLocation.value = selectedLocation.value === slug ? null : slug
}
</script>

<template>
    <div class="px-5 py-10 sm:px-10 sm:py-20">
        <SectionTitle
            tag="Service area"
            title="All of Clark county"
            details=""
        />
        <div
            class="mt-10 flex w-full flex-col items-center gap-5 md:mt-20 md:flex-row md:gap-10"
        >
            <!-- Map Content -->

            <!-- Cities -->
            <div
                class="grid h-fit w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6 md:w-1/2 md:grid-cols-2 lg:gap-x-8 lg:gap-y-9"
            >
                <button
                    v-for="city in activeLocations"
                    :key="city.slug"
                    type="button"
                    class="xs:text-lg rounded-lg p-1 text-center text-base font-semibold ring-2 transition-colors duration-300 sm:rounded-xl sm:p-2 md:rounded-2xl md:p-3 md:text-xl md:ring-3 lg:p-4 lg:text-2xl lg:ring-4"
                    :class="
                        selectedLocation === city.slug
                            ? 'bg-violet-900 text-white ring-violet-400'
                            : 'bg-slate-400/20 text-slate-950 ring-violet-400 hover:bg-amber-400/20 hover:text-amber-900 hover:ring-amber-500'
                    "
                    :aria-pressed="selectedLocation === city.slug"
                    @mouseenter="hoveredLocation = city.slug"
                    @mouseleave="hoveredLocation = null"
                    @focus="hoveredLocation = city.slug"
                    @blur="hoveredLocation = null"
                    @click="selectLocation(city.slug)"
                >
                    {{ city.name }}
                </button>
            </div>

            <!-- Map -->
            <div
                class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-white shadow-lg shadow-black/60 sm:rounded-2xl md:w-1/2 md:rounded-3xl"
            >
                <ClientOnly>
                    <ServiceAreaMapClient
                        :hovered-location="hoveredLocation"
                        :selected-location="selectedLocation"
                    />
                </ClientOnly>
                <div
                    class="absolute top-0 w-full rounded-b-lg bg-black/60 p-2 text-center text-base font-semibold tracking-wider sm:p-4 sm:text-lg"
                >
                    {{
                        activeLocations.find(
                            (city) => city.slug === selectedLocation
                        )?.name ?? 'Clark County'
                    }}
                </div>
            </div>
        </div>
        <p
            class="xs:text-lg mt-10 text-center text-base font-bold text-violet-800 sm:text-xl md:text-2xl"
        >
            *Only select communities are shown. I proudly serve all of Clark
            County!*
        </p>
    </div>
</template>
