<script setup lang="ts">
import SocialButton from '~/components/buttons/SocialButton.vue'
import PhoneIcon from '@iconify-vue/tabler/phone'
</script>

<template>
    <div
        class="flex w-full items-center justify-between rounded-b-lg bg-violet-900 px-4 py-2 text-xs font-semibold text-white inset-shadow-2xs inset-shadow-indigo-900"
    >
        <div class="flex items-center justify-between gap-x-2 sm:gap-x-6">
            <a
                href="tel: +13605531160"
                class="hidden text-amber-400 transition-colors duration-300 hover:text-green-400 md:block"
            >
                360.553.1160
            </a>
            <a href="tel: +13605531160">
                <PhoneIcon
                    class="hover:animate-wiggle block size-6 rounded-full text-amber-500 transition-all duration-300 hover:text-green-400 md:hidden"
                />
            </a>
            <h3 class="hidden sm:block">Monday - Saturday | 7:00am - 5:00pm</h3>
            <h3 class="block uppercase sm:hidden">Mon-Sat | 7am-5pm</h3>
        </div>
        <div class="flex gap-x-1.5 md:gap-x-2">
            <SocialButton social="yelp" />
            <SocialButton social="facebook" />
            <SocialButton social="instagram" />
            <SocialButton social="google" />
        </div>
    </div>
</template>
