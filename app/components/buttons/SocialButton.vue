"
<script setup lang="ts">
import YelpIcon from '../icons/Yelp.vue'
import FacebookIcon from '@iconify-vue/tabler/brand-facebook-filled'
import GoogleIcon from '@iconify-vue/tabler/brand-google-filled'
import InstagramIcon from '@iconify-vue/tabler/brand-instagram-filled'
import AppleIcon from '@iconify-vue/tabler/apple-filled'
import LinkedInIcon from '@iconify-vue/tabler/brand-linkedin-filled'

const socialLibary = {
    yelp: {
        link: 'https://www.yelp.com/',
        icon: YelpIcon,
    },
    facebook: {
        link: 'https://www.facebook.com/profile.php?id=61595179863028',
        icon: FacebookIcon,
    },
    google: {
        link: 'https://share.google/lGP0JerVgcsdMfxXZ',
        icon: GoogleIcon,
    },
    instagram: {
        link: 'https://www.instagram.com/resetrinse/',
        icon: InstagramIcon,
    },
    apple: {
        link: 'Pending',
        icon: AppleIcon,
    },
    linkedIn: {
        link: 'https://www.linkedin.com/in/jadon-smith-6143b9334',
        icon: LinkedInIcon,
    },
}

const props = defineProps<{
    social: keyof typeof socialLibary
}>()

const selectdSocial = socialLibary[props.social]
</script>

<template>
    <a :href="selectdSocial.link" target="_blank"
        ><component
            :is="selectdSocial.icon"
            class="size-6 rounded-full border-2 border-white bg-amber-600 p-1 text-amber-200 transition-colors duration-150 hover:border-green-400 hover:text-green-200 sm:size-7 sm:p-1.5 md:size-9 md:p-2"
    /></a>
</template>
