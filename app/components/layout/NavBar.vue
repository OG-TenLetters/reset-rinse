<script setup lang="ts">
import RRMobileMenu from '~/components/layout/RRMobileMenu.vue'
import { onClickOutside } from '@vueuse/core'
import { ServicesData } from '~/data/services'

const servicesOpen = ref(false)
const mobileMenuOpen = ref(false)
const servicesMenu = useTemplateRef('servicesMenu')
const servicesTrigger = useTemplateRef<HTMLButtonElement>('servicesTrigger')
const servicesList = useTemplateRef<HTMLUListElement>('servicesList')

const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)

function hideServices() {
    if (servicesList.value?.contains(document.activeElement)) {
        servicesTrigger.value?.focus()
    }

    servicesOpen.value = false
}

let closeTimer: ReturnType<typeof setTimeout>

function openServices() {
    clearTimeout(closeTimer)
    servicesOpen.value = true
}

function closeServices() {
    clearTimeout(closeTimer)

    closeTimer = setTimeout(() => {
        hideServices()
    }, 600)
}

function instantCloseServices() {
    clearTimeout(closeTimer)
    hideServices()
}

onClickOutside(servicesMenu, () => {
    instantCloseServices()
})

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
        // ContactBar + NavBar are siblings in the same fixed header.
        const navbar = document.querySelector<HTMLElement>('[data-navbar]')
        const navbarHeight =
            navbar?.parentElement?.offsetHeight ?? navbar?.offsetHeight ?? 0

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
    <nav
        data-navbar
        aria-label="Primary"
        class="relative isolate flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2 shadow-md shadow-black/50 sm:py-4 md:px-10 md:py-6"
    >
        <div class="flex items-center gap-x-4">
            <!-- Original Anithon-inspired expanding mobile menu. -->
            <RRMobileMenu
                v-model:open="mobileMenuOpen"
                @contact="scrollToNearestContact"
            />

            <!-- Both logos use the same exact box; the mobile variant crossfades over it. -->
            <NuxtLink
                to="/"
                aria-label="Reset Rinse home"
                class="relative z-50 block w-full max-w-35 lg:max-w-40"
                @click="mobileMenuOpen = false"
            >
                <!-- Original light-navbar logo. -->
                <NuxtImg
                    src="/logo/ResetRinseWebsiteProto.png"
                    alt="Reset Rinse Property Care"
                    class="block h-auto w-full transition-opacity duration-600 ease-in-out"
                    :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"
                />

                <!-- The overlaid logo has NO offsets or independent width to drift. -->
                <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-450 ease-in-out sm:hidden"
                    :class="
                        mobileMenuOpen ? 'opacity-100 delay-150' : 'opacity-0'
                    "
                >
                    <NuxtImg
                        src="/logo/ResetRinseWebsiteProto.png"
                        alt=""
                        class="absolute inset-0 h-full w-full object-contain"
                    />
                </span>
            </NuxtLink>
        </div>

        <!-- NavLinks -->
        <div
            class="xs:text-sm xs:gap-x-2 xs:px-4 hidden w-full justify-evenly gap-x-0.5 pr-1 pl-0 text-xs font-semibold sm:flex sm:w-fit sm:gap-x-5 sm:text-lg md:text-2xl"
        >
            <div
                ref="servicesMenu"
                class="relative"
                @mouseenter="openServices"
                @mouseleave="closeServices"
                @keydown.esc="instantCloseServices"
            >
                <button
                    ref="servicesTrigger"
                    type="button"
                    :aria-expanded="servicesOpen"
                    aria-haspopup="true"
                    @click="openServices"
                    class="transition-colors duration-150"
                    :class="servicesOpen ? 'text-amber-800' : ''"
                >
                    Services
                </button>

                <!-- Services Dropdown -->
                <ul
                    ref="servicesList"
                    :inert="!servicesOpen"
                    :class="
                        servicesOpen
                            ? 'pointer-events-auto scale-y-100'
                            : 'pointer-events-none scale-y-0'
                    "
                    class="absolute z-30 flex origin-top flex-col text-xs font-semibold whitespace-nowrap transition-transform duration-300 sm:text-sm"
                >
                    <li
                        v-for="serviceLink in activeServices"
                        :key="serviceLink.to"
                        class="xs:text-base bg-slate-950/70 text-sm tracking-wide text-slate-100 backdrop-blur-sm transition-colors duration-150 first:rounded-tr-lg first:pt-1 last:rounded-b-lg last:pb-4 hover:bg-violet-500/60 hover:text-white sm:text-lg sm:first:rounded-tr-xl sm:first:pt-2 sm:last:rounded-b-xl sm:last:pb-6"
                    >
                        <NuxtLink
                            :to="serviceLink.to"
                            class="block py-1 pr-7 pl-3 sm:pr-11"
                            @click="instantCloseServices"
                        >
                            {{ serviceLink.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div aria-hidden="true">|</div>

            <NuxtLink
                class="transition-colors duration-150 hover:text-amber-800"
                to="/#about-me"
                >About Me</NuxtLink
            >

            <div aria-hidden="true">|</div>

            <button
                @click="scrollToNearestContact"
                class="cursor-pointer transition-colors duration-150 hover:text-amber-800"
            >
                Contact Me
            </button>
        </div>

        <!-- Regular Quote Button -->
        <div
            class="hidden flex-col gap-y-1 text-xs font-bold sm:flex md:text-sm"
        >
            <h3>Call For a Quote!</h3>

            <a
                href="tel:+13605531160"
                class="rounded-lg border-2 border-violet-900 bg-violet-400 px-1 py-0.5 text-violet-950 shadow-xs shadow-violet-900 transition-colors duration-300 hover:bg-transparent md:px-2 md:py-1"
            >
                360.553.1160
            </a>
        </div>

        <!-- Small Quote Button -->
        <div
            class="block transition-opacity duration-200 sm:hidden"
            :class="
                mobileMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
            "
        >
            <a
                href="tel:+13605531160"
                aria-label="Call Reset Rinse"
                class="xs:rounded-xl inline-flex gap-x-0.5 rounded-lg border-2 border-violet-900 bg-violet-400 px-1 py-3 text-violet-950 shadow-xs shadow-violet-900 transition-colors duration-300 hover:bg-transparent"
            >
                <UIcon class="size-4" name="tabler:phone-filled" />
                <UIcon class="size-4" name="tabler:arrow-bar-to-right" />
                <UIcon class="size-4" name="tabler:quote-filled" />
            </a>
        </div>
    </nav>
</template>
