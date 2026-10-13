<script setup lang="ts">
import BrandStamp from '~/components/BrandStamp.vue'
import rightArrowWallIcon from '@iconify-vue/tabler/arrow-bar-to-right'
import quoteIcon from '@iconify-vue/tabler/quote-filled'
import phoneIcon from '@iconify-vue/tabler/phone-call-filled'
import { onClickOutside } from '@vueuse/core'
import { serviceLinks } from '~/data/services'

const servicesOpen = ref(false)
const servicesMenu = useTemplateRef('servicesMenu')

let closeTimer: ReturnType<typeof setTimeout>

function openServices() {
    clearTimeout(closeTimer)
    servicesOpen.value = true
}

function closeServices() {
    clearTimeout(closeTimer)

    closeTimer = setTimeout(() => {
        servicesOpen.value = false
    }, 600)
}

function instantCloseServices() {
    clearTimeout(closeTimer)
    servicesOpen.value = false
}

function toggleServices() {
    clearTimeout(closeTimer)
    servicesOpen.value = !servicesOpen.value
}

onClickOutside(servicesMenu, () => {
    instantCloseServices()
})
</script>

<template>
    <div
        class="xs:px-4 flex items-center justify-between bg-gray-200 px-2 py-1 md:px-10 md:py-3"
    >
        <BrandStamp class="xs:scale-75 scale-60 md:scale-100" />

        <!-- NavLinks -->
        <div
            class="xs:text-sm xs:gap-x-2 xs:px-4 flex w-full justify-evenly gap-x-0.5 px-0 pr-1 text-xs font-semibold sm:w-fit sm:gap-x-5 sm:text-lg md:text-2xl md:font-normal"
        >
            <div
                ref="servicesMenu"
                class="relative"
                @mouseenter="openServices"
                @mouseleave="closeServices"
                @keydown.esc="instantCloseServices"
            >
                <button
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
                    :class="
                        servicesOpen
                            ? 'pointer-events-auto scale-y-100'
                            : 'pointer-events-none scale-y-0'
                    "
                    class="absolute flex origin-top flex-col text-xs font-semibold whitespace-nowrap transition-transform duration-300 sm:text-sm"
                >
                    <li
                        v-for="serviceLink in serviceLinks"
                        :key="serviceLink.to"
                        class="bg-violet-500/80 tracking-wide backdrop-blur-sm transition-colors duration-150 first:rounded-tr-lg first:pt-1 last:rounded-b-lg last:pb-4 hover:bg-violet-500/60 hover:text-white sm:first:rounded-tr-xl sm:first:pt-2 sm:last:rounded-b-xl sm:last:pb-6"
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

            <div>|</div>

            <a
                class="transition-colors duration-150 hover:text-amber-800"
                href="#about-me"
                >About Me</a
            >

            <div>|</div>

            <div class="transition-colors duration-150 hover:text-amber-800">
                Contact Me
            </div>
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
        <div class="block sm:hidden">
            <a
                href="tel:+13605531160"
                class="xs:py-3 xs:rounded-xl inline-flex gap-x-0.5 rounded-lg border-2 border-violet-900 bg-violet-400 px-1 py-2 text-violet-950 shadow-xs shadow-violet-900 transition-colors duration-300 hover:bg-transparent"
            >
                <phoneIcon class="size-4" />

                <rightArrowWallIcon class="xs:block hidden size-4" />

                <quoteIcon class="xs:block hidden size-4" />
            </a>
        </div>
    </div>
</template>
