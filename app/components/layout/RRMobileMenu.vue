<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ServicesData } from '~/data/services'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{
    'update:open': [open: boolean]
    contact: []
}>()

const route = useRoute()
const menuRoot = ref<HTMLElement | null>(null)
const servicesOpen = ref(false)
const menuId = `${useId()}-mobile-menu`
const servicesId = `${menuId}-services`

const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)

// The drawer is absolutely positioned inside NavBar, so the transformed,
// centered fixed header in default.vue does not affect its alignment.
// Measure only the two dimensions we actually need for the drawer's height
// and to start the links beneath the existing navbar row.
const navTop = ref(0)
const navHeight = ref(80)
const drawerStyle = computed(() => ({
    height: `calc(100dvh - ${navTop.value}px)`,
    paddingTop: `${navHeight.value}px`,
}))

function closeMenu() {
    emit('update:open', false)
    servicesOpen.value = false
}

function toggleMenu() {
    if (props.open) closeMenu()
    else emit('update:open', true)
}

function goToContact() {
    closeMenu()
    nextTick(() => emit('contact'))
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && props.open) closeMenu()
}

function onDesktopChange(event: MediaQueryListEvent) {
    if (event.matches) closeMenu()
}

let resizeObserver: ResizeObserver | undefined
let desktopBreakpoint: MediaQueryList | undefined
let syncLayout: (() => void) | undefined

onMounted(() => {
    const nav = menuRoot.value?.closest<HTMLElement>('[data-navbar]')
    if (nav) {
        syncLayout = () => {
            navTop.value = nav.getBoundingClientRect().top
            navHeight.value = nav.getBoundingClientRect().height
        }
        syncLayout()
        resizeObserver = new ResizeObserver(syncLayout)
        resizeObserver.observe(nav)
        if (nav.previousElementSibling instanceof HTMLElement) {
            resizeObserver.observe(nav.previousElementSibling)
        }
        window.addEventListener('resize', syncLayout)
    }

    window.addEventListener('keydown', onKeydown)
    desktopBreakpoint = window.matchMedia('(min-width: 640px)')
    desktopBreakpoint.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    if (syncLayout) window.removeEventListener('resize', syncLayout)
    window.removeEventListener('keydown', onKeydown)
    desktopBreakpoint?.removeEventListener('change', onDesktopChange)
})

watch(() => route.fullPath, closeMenu)
watch(
    () => props.open,
    (open) => {
        if (!open) servicesOpen.value = false
    }
)
onClickOutside(menuRoot, () => {
    if (props.open) closeMenu()
})
</script>

<template>
    <!-- Kept as a direct child of NavBar, where the old hamburger lived. -->
    <div ref="menuRoot" class="sm:hidden">
        <button
            type="button"
            class="relative z-50 flex items-center justify-center rounded-lg border-2 border-violet-900 bg-violet-400 p-2 text-violet-950 shadow-xs shadow-violet-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            :aria-label="
                open ? 'Close navigation menu' : 'Open navigation menu'
            "
            :aria-expanded="open"
            :aria-controls="menuId"
            @click="toggleMenu"
        >
            <UIcon
                name="tabler:menu-3"
                aria-hidden="true"
                class="size-6 transition-transform duration-300"
                :class="open ? 'rotate-90' : 'rotate-0'"
            />
        </button>

        <!-- Original sliding drawer: width + horizontal movement + opacity. -->
        <div
            :id="menuId"
            role="group"
            aria-label="Mobile navigation"
            :aria-hidden="!open"
            :inert="!open"
            :style="drawerStyle"
            class="absolute top-0 left-0 z-20 w-full overflow-hidden bg-gray-800 px-3 pb-10 text-white shadow-[inset_-2px_0px_4px_2px_rgba(167,139,250,0.4)] transition-all duration-300 ease-out"
            :class="
                open
                    ? 'translate-x-0 opacity-100'
                    : 'pointer-events-none -translate-x-full opacity-0'
            "
        >
            <div
                class="h-full overflow-y-auto overscroll-contain rounded-2xl border-2 border-l-0 border-violet-400/40 p-4"
            >
                <ul class="w-full text-base font-semibold">
                    <li class="border-b border-white/60">
                        <NuxtLink
                            to="/"
                            class="block py-2 pr-4 pl-5 transition-colors duration-150 hover:bg-violet-700/30 hover:text-amber-300 focus-visible:bg-violet-700/30 focus-visible:text-amber-300"
                            @click="closeMenu"
                            >Home</NuxtLink
                        >
                    </li>

                    <!-- Preserves the original expanding nested-dropdown feel. -->
                    <li
                        class="transition-colors duration-150"
                        :class="
                            servicesOpen
                                ? 'bg-violet-700/30 text-amber-300'
                                : 'hover:bg-violet-700/30 hover:text-amber-300'
                        "
                    >
                        <button
                            type="button"
                            :aria-expanded="servicesOpen"
                            :aria-controls="servicesId"
                            class="flex w-full items-center justify-between border-b border-white/20 py-2 pr-3 pl-5 text-left transition-colors duration-150"
                            @click="servicesOpen = !servicesOpen"
                        >
                            Services
                            <UIcon
                                name="tabler:chevron-down"
                                aria-hidden="true"
                                class="size-6 transition-transform duration-150"
                                :class="servicesOpen ? '' : 'rotate-180'"
                            />
                        </button>
                        <ul
                            :id="servicesId"
                            :inert="!servicesOpen"
                            class="overflow-hidden bg-[#121a24]/80 text-gray-200 transition-[max-height] duration-300"
                            :class="servicesOpen ? 'max-h-96' : 'max-h-0'"
                        >
                            <li
                                v-for="service in activeServices"
                                :key="service.to"
                                class="border-b border-gray-500/50 last:border-b-0"
                            >
                                <NuxtLink
                                    :to="service.to"
                                    class="block px-6 py-2 text-sm font-light transition-colors duration-150 hover:bg-violet-700/20 hover:text-amber-300 focus-visible:bg-violet-700/20 focus-visible:text-amber-300"
                                    @click="closeMenu"
                                    >{{ service.name }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </li>

                    <li class="border-b border-white/20">
                        <NuxtLink
                            to="/#about-me"
                            class="block py-2 pr-4 pl-5 transition-colors duration-150 hover:bg-violet-700/30 hover:text-amber-300 focus-visible:bg-violet-700/30 focus-visible:text-amber-300"
                            @click="closeMenu"
                            >About Me</NuxtLink
                        >
                    </li>
                    <li class="border-b border-white/20">
                        <button
                            type="button"
                            class="block w-full py-2 pr-4 pl-5 text-left transition-colors duration-150 hover:bg-violet-700/30 hover:text-amber-300 focus-visible:bg-violet-700/30 focus-visible:text-amber-300"
                            @click="goToContact"
                        >
                            Contact Me
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
