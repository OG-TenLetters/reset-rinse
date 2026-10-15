<script setup lang="ts">
const items = [
    {
        images: [
            '/test-images/test-1.jpg',
            '/test-images/test-2.jpg',
            '/test-images/test-3.jpg',
            '/test-images/test-4.jpg',
        ],
        title: 'Window Cleaning',
        description: 'Exterior window cleaning in Vancouver, Washington.',
        location: 'Vancouver, WA',
        service: '/window-cleaning',
    },
    {
        images: [
            '/test-images/test-2.jpg',
            '/test-images/test-3.jpg',
            '/test-images/test-4.jpg',
            '/test-images/test-5.jpg',
        ],
        title: 'Gutter Cleaning',
        description: 'Full gutter clearing and downspout flushing.',
        location: 'Battle Ground, WA',
        service: '/gutter-cleaning',
    },
    {
        images: [
            '/test-images/test-3.jpg',
            '/test-images/test-4.jpg',
            '/test-images/test-5.jpg',
            '/test-images/test-6.jpg',
        ],
        title: 'Power/Soft Wash',
        description: 'Concrete and exterior surface cleaning.',
        location: 'Vancouver, WA',
        service: '/pressure-washing',
    },
    {
        images: [
            '/test-images/test-4.jpg',
            '/test-images/test-5.jpg',
            '/test-images/test-6.jpg',
            '/test-images/test-1.jpg',
        ],
        title: 'Moss Treatment',
        description:
            'Safe treatment and removal of moss for the integrity of your roof',
        location: 'Vancouver, WA',
        service: '/moss-treatment',
    },
]

const activeIndex = ref(0)

const activeItem = computed(() => {
    return items[activeIndex.value] ?? items[0]!
})

function onSelect(index: number) {
    activeIndex.value = index
}
</script>

<template>
    <div class="relative -mb-4 flex overflow-hidden bg-black md:max-h-160">
        <!-- CAROUSEL / IMAGES -->
        <UCarousel
            v-slot="{ item }"
            fade
            :autoplay="{ delay: 12000 }"
            :duration="300"
            loop
            class="w-full"
            :items="items"
            @select="onSelect"
        >
            <div class="relative w-full">
                <NuxtImg
                    :src="item.images[0]"
                    class="w-full mask-[linear-gradient(to_bottom,black_0%,black_calc(100%-120px),transparent_100%)] object-cover"
                />

                <NuxtImg
                    :src="item.images[1]"
                    class="-mt-8 w-full mask-[linear-gradient(to_bottom,transparent_0%,black_120px,black_100%)] object-cover"
                />
                <!-- <NuxtImg
                    :src="item.images[2]"
                    class="-mt-8 w-full mask-[linear-gradient(to_bottom,transparent_0%,black_120px,black_100%)] object-cover sm:hidden"
                /> -->
                <NuxtImg
                    :src="item.images[2]"
                    class="-mt-12 w-full mask-[linear-gradient(to_bottom,transparent_0%,black_96px,black_calc(100%-160px),transparent_100%)] object-cover sm:hidden"
                />
            </div>
            <div
                class="absolute inset-0 bg-linear-to-b from-gray-900/40 to-black/80"
            />
        </UCarousel>

        <!-- Site Data Container -->
        <div
            class="absolute inset-x-0 inset-y-10 z-10 flex flex-col items-center gap-6 pt-30 md:block"
        >
            <!-- Left Data -->
            <div
                class="flex w-9/10 flex-col items-center gap-y-2 bg-linear-to-t from-transparent via-gray-950/80 to-transparent py-0 text-white sm:top-1/2 sm:mt-[20%] sm:gap-y-3 sm:px-10 sm:py-10 md:absolute md:left-0 md:mt-0 md:w-fit md:translate-x-0 md:-translate-y-1/3 md:items-baseline md:rounded-r-2xl md:bg-linear-to-l md:to-gray-950/93 md:pr-70"
            >
                <!-- Title / Description -->
                <div class="flex flex-col items-center md:block">
                    <div class="flex items-center gap-x-3">
                        <h2
                            class="xs:text-3xl text-xl font-bold md:text-3xl lg:text-4xl"
                        >
                            {{ activeItem.title }}
                        </h2>

                        <!-- Info Link -->
                        <a
                            :href="activeItem.service"
                            class="group flex h-5 w-5 rotate-45 items-center justify-center overflow-hidden rounded-sm border border-white/40 bg-violet-900/20 transition-colors duration-150 hover:border-green-500 hover:bg-violet-900"
                        >
                            <UIcon
                                class="scale-170 -rotate-45 group-hover:text-amber-100"
                                name="tabler:info-small"
                            />
                        </a>
                    </div>

                    <p
                        class="mt-2 max-w-90 text-center text-xs sm:text-left md:text-[16px]"
                    >
                        {{ activeItem.description }}
                    </p>
                </div>

                <!-- Buttons -->
                <div
                    class="md:text-md flex gap-x-4 text-xs font-semibold tracking-wide sm:text-sm lg:text-lg"
                >
                    <button
                        class="rounded-lg border-3 border-white/80 bg-black/50 px-3 py-1.5 md:rounded-xl md:px-5 md:py-3 lg:px-6 lg:py-3"
                    >
                        Request a Quote
                    </button>

                    <button
                        class="rounded-lg border-3 border-white/80 bg-black/50 px-3 py-1.5 md:rounded-xl md:px-5 md:py-3 lg:px-6 lg:py-3"
                    >
                        Call Me
                    </button>
                </div>

                <!-- Tags -->
                <div
                    class="mt-1 flex max-w-90 flex-row flex-wrap justify-center gap-x-2 gap-y-2 sm:mt-3 md:flex-col md:flex-nowrap"
                >
                    <div
                        class="flex w-fit items-center gap-x-2 rounded-xl border border-white/20 bg-linear-to-bl from-green-600/35 to-violet-950/75 px-4 py-1 text-xs"
                    >
                        <UIcon class="text-green-400" name="tabler:check" />
                        <h3>Review Thing</h3>
                    </div>

                    <div
                        class="flex w-fit items-center gap-x-2 rounded-xl border border-white/20 bg-linear-to-bl from-green-600/35 to-violet-950/75 px-4 py-1 text-xs"
                    >
                        <UIcon class="text-green-400" name="tabler:check" />
                        <h3>Locally Owned - 2026</h3>
                    </div>

                    <div
                        class="flex w-fit items-center gap-x-2 rounded-xl border border-white/20 bg-linear-to-bl from-green-600/35 to-violet-950/75 px-4 py-1 text-xs"
                    >
                        <UIcon class="text-green-400" name="tabler:check" />
                        <h3>1 year roof cleaning guarantee</h3>
                    </div>
                </div>
            </div>
            <!-- Right Data -->
            <div
                class="z-1 flex max-h-100 w-9/10 flex-1 rounded-2xl md:absolute md:top-1/2 md:right-1/25 md:h-7/10 md:w-4/9 md:translate-x-0 md:-translate-y-1/3"
            >
                <div class="h-full w-full rounded-2xl bg-gray-200 p-4">
                    <div
                        class="flex h-full items-center justify-center text-2xl font-semibold tracking-wide"
                    >
                        Contact Placeholder
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
