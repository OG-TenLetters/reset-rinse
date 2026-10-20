<script setup lang="ts">
const props = defineProps<{
    tag: string
    title: string
    details: string
}>()
</script>

<template>
    <div class="flex flex-col items-center gap-y-1 text-center">
        <h4
            class="xs:tracking-normal xs:font-semibold text-xs font-bold tracking-wide text-violet-800 uppercase sm:text-sm"
        >
            {{ tag }}
        </h4>
        <h1
            class="xs:max-w-full w-full max-w-60 text-2xl font-bold tracking-wide capitalize sm:text-3xl lg:text-4xl"
        >
            {{ title }}
        </h1>
        <p class="text-base font-semibold sm:text-lg md:text-xl">
            {{ details }}
        </p>
    </div>
</template>
