<script setup lang="ts"></script>

<template>
    <NuxtLink to="/" class="relative w-fit pb-2 sm:pb-4">
        <figure
            class="mx-2 flex size-15 items-center justify-center overflow-hidden rounded-full border-3 border-violet-900 md:mx-4"
        >
            <NuxtImg
                src="/logo/reset-rinse-proto-icon.png"
                width="60"
                height="60"
                densities="x1 x2"
                format="webp"
                quality="85"
                alt="Reset Rinse Home"
                class="size-full scale-105 object-cover"
            />
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
