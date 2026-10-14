<script setup lang="ts">
const items = [
    '/test-images/test-1.jpg',
    '/test-images/test-2.jpg',
    '/test-images/test-3.jpg',
    '/test-images/test-4.jpg',
    '/test-images/test-5.jpg',
    '/test-images/test-6.jpg',
]
</script>

<template>
    <!-- <div class="relative w-full overflow-hidden px-20 py-70">
        <div
            class="absolute top-1/2 left-1/2 z-1 h-full w-full -translate-1/2 bg-linear-to-b from-gray-900/90 to-black/80"
        ></div> -->
    <!-- <figure class="absolute top-1/2 left-1/2 w-300 -translate-1/2">
            <NuxtImg
                :src="images[4]"
                class="h-full w-full"
                alt="Window Cleaning result"
                width="1920"
                height="1080"
                sizes="100vw sm:100vw md:50vw lg:600px"
            />
        </figure> -->

    <UCarousel
        v-slot="{ item }"
        fade
        arrows
        dots
        :items="items"
        class="pointer-events-none mx-auto w-full"
    >
        <img :src="item" width="320" height="320" class="" loading="lazy" />
    </UCarousel>
    <!-- </div> -->
</template>
