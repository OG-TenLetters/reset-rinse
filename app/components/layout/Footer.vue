<script setup lang="ts">
import { serviceLocations } from '~/data/location.ts'
import { serviceLinks } from '~/data/services.ts'
import BrandStamp from '../BrandStamp.vue'
import SocialButton from '../buttons/SocialButton.vue'
</script>

<template>
    <div
        class="relative z-100 rounded-t-2xl border-t-2 border-t-amber-400 bg-amber-200 p-6 sm:rounded-t-3xl md:rounded-t-4xl md:p-10"
    >
        <div
            class="xs:text-[16px] -mt-4 mb-9 flex w-full flex-col items-center text-xs lg:hidden"
        >
            <div
                class="xs:scale-100 xs:py-4 scale-85 py-3 pr-1 sm:scale-125 sm:py-8"
            >
                <BrandStamp />
            </div>
            <p class="w-9/10 text-center font-semibold">
                Based in Vancouver, Washington. Window cleaning, gutter
                cleaning, power/soft washing, concrete, and more.
            </p>
            <div
                class="flex scale-110 gap-x-0.5 py-2 sm:scale-120 sm:py-2 md:scale-140 md:gap-x-1 md:py-4"
            >
                <SocialButton social="yelp" />
                <SocialButton social="facebook" />
                <SocialButton social="instagram" />
                <SocialButton social="google" />
                <SocialButton social="apple" />
                <SocialButton social="linkedIn" />
            </div>
            <h3 class="text-xs whitespace-nowrap sm:text-sm">
                Copyright &copy; 2026 Reset Rinse, All rights reserved.
            </h3>
            <div class="flex gap-x-1 text-xs sm:text-sm">
                <h4>Terms of Service</h4>
                |
                <h4>Privacy Policy</h4>
                |
                <h4>SMS Terms</h4>
            </div>
        </div>

        <div
            class="xs:w-9/10 mx-auto grid w-19/20 grid-cols-[max-content_max-content] justify-between text-sm sm:grid-cols-[repeat(3,max-content)] sm:text-[16px] lg:w-full lg:grid-cols-[repeat(4,max-content)]"
        >
            <div class="flex flex-col gap-y-6 sm:contents">
                <!-- Get In Touch -->
                <div
                    class="xs:text-[16px] flex flex-col justify-self-start text-sm"
                >
                    <h3
                        class="xs:font-bold xs:tracking-normal mb-2 font-extrabold tracking-wide sm:mb-4 md:mb-6"
                    >
                        Get In Touch
                    </h3>
                    <div class="flex flex-col gap-y-2">
                        <a
                            href="tel:13605531160"
                            aria-label="Call Reset Rinse"
                            class="group flex items-center gap-x-1 font-semibold hover:text-amber-900 sm:gap-x-2"
                        >
                            <UIcon
                                name="tabler:phone-filled"
                                class="size-4 text-amber-600 group-hover:text-amber-500 sm:size-6"
                            />
                            (360) 553-1160
                        </a>

                        <a
                            aria-label="Email Reset Rinse"
                            href="mailto:hello@resetrinse.com"
                            class="group flex items-center gap-x-1 font-semibold hover:text-amber-900 sm:gap-x-2"
                        >
                            <UIcon
                                name="tabler:mail-filled"
                                class="size-4 text-amber-600 group-hover:text-amber-500 sm:size-6"
                            />
                            hello@resetrinse.com
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div class="xs:text-[16px] text-sm">
                    <h3
                        class="xs:font-bold xs:tracking-normal mb-2 font-extrabold tracking-wide sm:mb-4 md:mb-6"
                    >
                        Services
                    </h3>

                    <ul class="flex flex-col gap-y-2">
                        <li
                            v-for="serviceLink in serviceLinks"
                            :key="serviceLink.to"
                            class="font-semibold transition-colors duration-150 hover:text-amber-900"
                        >
                            <NuxtLink :to="serviceLink.to">
                                {{ serviceLink.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Service Area -->
            <div class="xs:text-[16px] text-sm">
                <h3
                    class="xs:font-bold xs:tracking-normal mb-2 font-extrabold tracking-wide sm:mb-4 md:mb-6"
                >
                    Service Area
                </h3>

                <ul class="flex flex-col gap-y-2">
                    <li
                        v-for="city in serviceLocations.states.washington
                            .counties.clark.cities"
                        :key="city.slug"
                        class="font-semibold"
                    >
                        {{ city.name }},
                        {{
                            serviceLocations.states.washington.counties.clark
                                .state
                        }}
                    </li>
                </ul>
            </div>
            <!-- Brand Info -->
            <div
                class="-mt-4 hidden max-w-80 flex-col items-end text-sm lg:flex"
            >
                <div class="py-4 pr-1"><BrandStamp /></div>
                <p class="text-right font-semibold">
                    Based in Vancouver, Washington. <br />
                    Window cleaning, gutter cleaning, power/soft washing,
                    concrete, and more.
                </p>
                <div class="flex scale-120 gap-x-0.5 py-2 pr-3">
                    <SocialButton social="yelp" />
                    <SocialButton social="facebook" />
                    <SocialButton social="instagram" />
                    <SocialButton social="google" />
                    <SocialButton social="apple" />
                    <SocialButton social="linkedIn" />
                </div>
                <h3 class="whitespace-nowrap">
                    Copyright &copy; 2026 Reset Rinse, All rights reserved.
                </h3>
                <div class="flex gap-x-1">
                    <h4>Terms of Service</h4>
                    |
                    <h4>Privacy Policy</h4>
                    |
                    <h4>SMS Terms</h4>
                </div>
            </div>
        </div>
    </div>
</template>
