<script setup lang="ts">
import ContactBar from './components/layout/ContactBar.vue'
import RrLogo from './assets/icons/reset-rinse-proto-icon.png'
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <div class="absolute h-full w-full bg-gray-900">
            <div class="m-auto h-full w-full max-w-300 rounded-md bg-gray-100">
                <!-- Start Building Under Here -->
                <ContactBar />
                <div class="flex items-center bg-gray-100 p-10">
                    <div class="relative w-fit px-30 pb-4">
                        <figure
                            class="flex w-24 items-center justify-center overflow-hidden rounded-full border-3 border-violet-900"
                        >
                            <img
                                class="scale-105"
                                :src="RrLogo"
                                alt="Reset Rinse Logo"
                            />
                        </figure>
                        <div
                            class="absolute left-1/2 w-fit -translate-1/2 rounded-t-md rounded-b-xl bg-linear-to-b from-violet-800 to-amber-400 p-0.5"
                        >
                            <div
                                class="rounded-[inherit] bg-neutral-800 px-4 py-1 font-semibold tracking-wider text-amber-300"
                            >
                                Property Care
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
