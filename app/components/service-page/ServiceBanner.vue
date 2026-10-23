<script setup lang="ts">
import type { ServiceData } from '~/data/services'

defineProps<{ service: ServiceData }>()

function scrollToContact() {
    const section = document.getElementById('contact')
    if (!section) return

    // The existing layout's fixed header includes both ContactBar and Navbar.
    const headerHeight =
        document.querySelector<HTMLElement>('[data-site-header]')
            ?.offsetHeight ?? 0

    const top =
        section.getBoundingClientRect().top + window.scrollY - headerHeight - 20

    window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
    })
}
</script>

<template>
    <section
        class="relative isolate flex min-h-125 flex-col justify-end overflow-hidden bg-gray-950 text-white"
        :aria-label="`${service.name} introduction`"
    >
        <NuxtImg
            :src="service.images.hero"
            :alt="`Sample background image for ${service.name}`"
            width="1920"
            height="1080"
            format="webp"
            quality="85"
            preload
            fetchpriority="high"
            class="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
            class="absolute inset-0 -z-10 bg-linear-to-r from-gray-950/95 via-gray-950/75 to-violet-950/45"
            aria-hidden="true"
        />
        <div
            class="relative mx-auto flex w-full max-w-260 flex-col gap-8 px-6 pt-42 pb-16 sm:px-10 sm:pb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
            <div class="max-w-150">
                <p
                    class="mb-3 text-xs font-semibold tracking-[0.18em] text-amber-300 uppercase sm:text-sm"
                >
                    Reset Rinse · Property Care
                </p>
                <h1
                    class="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl"
                >
                    {{ service.name }}
                </h1>
                <p
                    class="mt-4 max-w-135 text-base leading-relaxed text-gray-100 sm:text-lg"
                >
                    {{ service.description.shorthand }}
                </p>
                <div class="mt-7 flex flex-wrap gap-3 font-semibold">
                    <a
                        href="#contact"
                        class="rounded-xl border-2 border-amber-300 bg-violet-900 px-5 py-3 text-sm text-white shadow-lg shadow-black/30 transition-colors hover:bg-violet-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber-300 sm:text-base"
                        @click.prevent="scrollToContact"
                    >
                        Request a Quote
                    </a>
                    <a
                        href="tel:+13605531160"
                        class="rounded-xl border-2 border-white/80 bg-black/50 px-5 py-3 text-sm text-white transition-colors hover:bg-black/75 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber-300 sm:text-base"
                    >
                        Give Me a Call
                    </a>
                </div>
            </div>

            <ul
                class="flex max-w-90 flex-wrap gap-2 lg:max-w-74 lg:flex-col"
                :aria-label="`${service.name} highlights`"
            >
                <li
                    v-for="highlight in service.highlights"
                    :key="highlight"
                    class="flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-linear-to-br from-green-700/55 to-violet-950/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm sm:text-sm"
                >
                    <UIcon
                        name="tabler:check"
                        class="shrink-0 text-green-300"
                        aria-hidden="true"
                    />
                    <span>{{ highlight }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>
