<script setup lang="ts">
import RrLogo from './assets/icons/reset-rinse-proto-icon.png'
</script>

<template>
    <NuxtLink to="/" class="relative w-fit pb-2 sm:pb-4">
        <figure
            class="mx-2 flex w-15 items-center justify-center overflow-hidden rounded-full border-3 border-violet-900 md:mx-4"
        >
            <img class="scale-105" :src="RrLogo" alt="Reset Rinse Logo" />
        </figure>
        <div
            class="absolute left-1/2 w-fit -translate-1/2 rounded-t-md rounded-b-xl bg-linear-to-b from-violet-800 to-amber-400 p-0.5"
        >
            <div
                class="rounded-[inherit] bg-zinc-800 px-3 py-1 text-center text-[9px] font-semibold tracking-widest whitespace-nowrap text-amber-300"
            >
                Property Care
            </div>
        </div>
    </NuxtLink>
</template>
