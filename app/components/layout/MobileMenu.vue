<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    console.log('Well?', isMobileMenuOpen.value)
}
const toggleDropdown = (key: string) => {
    activeDropdown.value = activeDropdown.value === key ? null : key
}
</script>

<template>
    <div
        class="absolute top-1/2 left-5 z-60 hidden -translate-y-1/2 items-center justify-center max-xl:flex"
    >
        <Icon
            @click="toggleMobileMenu"
            :class="isMobileMenuOpen ? 'rotate-90' : 'rotate-0'"
            class="z-50 text-3xl text-black transition-all duration-300 max-md:text-2xl"
            name="mingcute:hamburger-fill"
        />
        <div
            :class="isMobileMenuOpen ? 'opacity-100' : 'opacity-0'"
            class="absolute left-15 transition-all duration-900 max-md:left-11"
        ></div>
    </div>
    <div
        :class="
            isMobileMenuOpen
                ? 'max-w-90 opacity-100'
                : 'pointer-events-none max-w-0 -translate-x-6 text-transparent opacity-0'
        "
        class="fixed top-0 left-0 z-20 h-screen w-full rounded-r-3xl bg-gray-800/98 pt-16 pr-6 pb-10 text-white inset-shadow-[-2px_0px_4px_2px] inset-shadow-sky-500/40 transition-all duration-300 max-md:w-54"
    >
        <div class="h-full rounded-r-2xl border-2 border-l-0 border-sky-500/40">
            <ul class="w-full text-xl font-semibold max-md:text-sm">
                <!-- GENRES__Dropdown -->
                <li
                    class="rounded-tr-xl transition-colors duration-150"
                    :class="
                        activeDropdown === 'genres'
                            ? 'bg-sky-700/30 text-sky-300'
                            : 'hover:bg-sky-700/30 hover:text-sky-300'
                    "
                >
                    <div
                        @click="toggleDropdown('genres')"
                        :class="
                            isMobileMenuOpen
                                ? 'max-w-90'
                                : 'max-w-0 border-none text-transparent'
                        "
                        class="relative z-5 flex items-center justify-between border-b border-white/20 py-1 pl-10 transition-all duration-150"
                    >
                        Genres
                        <Icon
                            class="text-3xl transition-all duration-150"
                            :class="
                                activeDropdown === 'genres' ? '' : 'rotate-180'
                            "
                            name="mingcute:down-small-fill"
                        />
                    </div>
                    <ul
                        :class="
                            activeDropdown === 'genres' ? 'max-h-96' : 'max-h-0'
                        "
                        class="overflow-hidden transition-all duration-300"
                    >
                        <div class="bg-[#121a24]/80 text-gray-200">
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Action
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Adventure
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Avanta Garde
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Comedy
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Demons
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Drama
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Fantasy
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Gourmet
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Horror
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Isekai
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Iyashikei
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Josei
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Kids
                            </li>
                        </div>
                    </ul>
                </li>
                <!-- TYPES__Dropdown -->
                <li
                    class="transition-colors duration-150"
                    :class="
                        activeDropdown === 'type'
                            ? 'bg-sky-700/30 text-sky-300'
                            : 'hover:bg-sky-700/30 hover:text-sky-300'
                    "
                >
                    <div
                        @click="toggleDropdown('type')"
                        :class="
                            isMobileMenuOpen
                                ? 'max-w-90'
                                : 'max-w-0 border-none text-transparent'
                        "
                        class="relative z-5 flex items-center justify-between border-b border-white/20 py-1 pl-10"
                    >
                        Types
                        <Icon
                            class="text-3xl"
                            :class="
                                activeDropdown === 'type' ? '' : 'rotate-180'
                            "
                            name="mingcute:down-small-fill"
                        />
                    </div>
                    <div class="bg-[#121a24]/80 text-gray-200">
                        <ul
                            :class="
                                activeDropdown === 'type'
                                    ? 'max-h-96'
                                    : 'max-h-0'
                            "
                            class="overflow-hidden transition-all duration-300"
                        >
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Movies
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                TV Series
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                OVAs
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                ONAs
                            </li>
                            <li
                                class="border-b border-gray-500/50 px-10 font-light hover:bg-sky-700/10 hover:text-sky-300"
                            >
                                Specials
                            </li>
                        </ul>
                    </div>
                </li>
                <li
                    :class="
                        isMobileMenuOpen
                            ? 'max-w-90'
                            : 'max-w-0 border-none text-transparent'
                    "
                    class="border-b border-white/20 px-10 py-2 hover:bg-sky-700/10 hover:text-sky-300"
                >
                    New Releases
                </li>
                <li
                    :class="
                        isMobileMenuOpen
                            ? 'max-w-90'
                            : 'max-w-0 border-none text-transparent'
                    "
                    class="border-b border-white/20 px-10 py-2 hover:bg-sky-700/10 hover:text-sky-300"
                >
                    Updates
                </li>
                <li
                    :class="
                        isMobileMenuOpen
                            ? 'max-w-90'
                            : 'max-w-0 border-none text-transparent'
                    "
                    class="border-b border-white/20 px-10 py-2 hover:bg-sky-700/10 hover:text-sky-300"
                >
                    Ongoing
                </li>
                <li
                    :class="
                        isMobileMenuOpen
                            ? 'max-w-90'
                            : 'max-w-0 border-none text-transparent'
                    "
                    class="border-b border-white/20 px-10 py-2 hover:bg-sky-700/10 hover:text-sky-300"
                >
                    Recent
                </li>
            </ul>
        </div>
    </div>
</template>
