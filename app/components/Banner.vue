<script setup lang="ts">
import { ServicesData } from '~/data/services'
import ContactForm from './ContactForm.vue'

const items = Object.values(ServicesData).filter((service) => service.active)
const activeIndex = ref(0)

const activeItem = computed(() => {
    return items[activeIndex.value] ?? items[0]!
})

function onSelect(index: number) {
    activeIndex.value = index
}

const isAnimating = ref(false)

function handleQuoteClick() {
    scrollToNearestContact()

    isAnimating.value = true

    setTimeout(() => {
        isAnimating.value = false
    }, 1000)
}

const scrollToNearestContact = () => {
    const sections = document.querySelectorAll<HTMLElement>(
        '[data-contact-section]'
    )

    const viewportCenter = window.innerHeight / 2

    const nearest = [...sections].sort((a, b) => {
        const distanceA = Math.abs(
            a.getBoundingClientRect().top - viewportCenter
        )
        const distanceB = Math.abs(
            b.getBoundingClientRect().top - viewportCenter
        )

        return distanceA - distanceB
    })[0]

    if (nearest) {
        const navbarHeight =
            document.querySelector<HTMLElement>('[data-navbar]')
                ?.offsetHeight ?? 0

        window.scrollTo({
            top:
                nearest.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                100,
            behavior: 'smooth',
        })
    }
}
</script>

<template>
    <div class="relative -mb-4 grid overflow-hidden bg-black">
        <!-- CAROUSEL / IMAGES -->
        <UCarousel
            v-slot="{ item, index }"
            :duration="300"
            fade
            loop
            :autoplay="{ delay: 6000 }"
            class="absolute inset-0 h-full w-full"
            :items="items"
            @select="onSelect"
        >
            <div class="relative w-full">
                <NuxtImg
                    :src="item.images.hero"
                    width="1920"
                    height="1080"
                    format="webp"
                    quality="85"
                    :loading="index === 0 ? 'eager' : 'auto'"
                    :fetchpriority="index === 0 ? 'high' : 'auto'"
                    :preload="index === 0 ? { fetchPriority: 'high' } : false"
                    class="aspect-video w-full mask-[linear-gradient(to_bottom,black_0%,black_calc(100%-120px),transparent_100%)] object-cover"
                    :alt="`${item.name} service example`"
                />

                <NuxtImg
                    :src="item.images.gallery[0]"
                    width="1200"
                    height="675"
                    format="webp"
                    quality="75"
                    loading="lazy"
                    class="-mt-8 aspect-video w-full mask-[linear-gradient(to_bottom,transparent_0%,black_96px,black_calc(100%-160px),transparent_100%)] object-cover"
                    :alt="`${item.name} service example`"
                />
                <NuxtImg
                    :src="item.images.gallery[1]"
                    width="1200"
                    height="675"
                    format="webp"
                    quality="75"
                    loading="lazy"
                    class="-mt-14 aspect-video w-full mask-[linear-gradient(to_bottom,transparent_0%,black_96px,black_calc(100%-160px),transparent_100%)] object-cover"
                    :alt="`${item.name} service example`"
                />
                <NuxtImg
                    :src="item.images.gallery[2]"
                    width="1200"
                    height="675"
                    format="webp"
                    quality="75"
                    loading="lazy"
                    class="-mt-12 aspect-video w-full mask-[linear-gradient(to_bottom,transparent_0%,black_96px,black_calc(100%-160px),transparent_100%)] object-cover sm:hidden"
                    :alt="`${item.name} service example`"
                />
            </div>
            <div
                class="absolute inset-0 bg-linear-to-b from-gray-900/40 to-black/80"
            />
        </UCarousel>

        <!-- Site Data Container -->
        <div
            class="relative z-10 col-start-1 row-start-1 flex flex-col items-center justify-between gap-y-6 pt-40 pb-10 md:items-center lg:flex-row"
        >
            <!-- Left Data -->
            <div
                class="flex w-full flex-col items-center gap-y-2 bg-linear-to-t from-transparent via-gray-950/80 via-95% to-transparent py-0 text-white sm:gap-y-3 sm:px-10 sm:py-10 lg:mt-0 lg:w-4/9 lg:items-baseline lg:rounded-r-2xl lg:bg-linear-to-l lg:via-80% lg:to-gray-950/93 lg:pr-5"
            >
                <!-- Title / Description -->
                <div class="flex flex-col items-center lg:block">
                    <div class="flex items-center gap-x-3">
                        <h2
                            class="xs:text-3xl text-xl font-bold md:text-3xl lg:text-4xl"
                        >
                            {{ activeItem.name }}
                        </h2>

                        <!-- Info Link -->
                        <a
                            :href="activeItem.to"
                            :aria-label="`Learn more about ${activeItem.name}.`"
                            class="group flex h-5 w-5 rotate-45 items-center justify-center overflow-hidden rounded-sm border border-white/40 bg-violet-900/20 transition-colors duration-150 hover:border-green-500 hover:bg-violet-900"
                        >
                            <UIcon
                                class="scale-170 -rotate-45 group-hover:text-amber-100"
                                name="tabler:info-small"
                            />
                        </a>
                    </div>

                    <p
                        class="mt-2 max-w-90 text-center text-xs sm:text-left lg:text-base"
                    >
                        {{ activeItem.description.shorthand }}
                    </p>
                </div>

                <!-- Buttons -->
                <div
                    class="md:text-md flex gap-x-4 text-xs font-semibold tracking-wide sm:text-sm lg:text-lg"
                >
                    <button
                        @click="handleQuoteClick"
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
                    class="mt-1 flex max-w-90 flex-row flex-wrap justify-center gap-x-2 gap-y-2 sm:mt-3 lg:flex-col lg:flex-nowrap"
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
            <div class="z-1 flex w-full max-w-120 flex-1 rounded-2xl md:mr-10">
                <ContactForm
                    :class="{ 'contact-highlight': isAnimating }"
                    class="opacity-85"
                />
            </div>
        </div>
    </div>
</template>
