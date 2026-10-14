"
<script setup lang="ts">
import YelpIcon from '../icons/Yelp.vue'

const socialLibary = {
    yelp: {
        link: 'https://www.yelp.com/',
        icon: YelpIcon,
    },
    facebook: {
        link: 'https://www.facebook.com/profile.php?id=61595179863028',
        icon: 'tabler:brand-facebook-filled',
    },
    google: {
        link: 'https://share.google/lGP0JerVgcsdMfxXZ',
        icon: 'tabler:brand-google-filled',
    },
    instagram: {
        link: 'https://www.instagram.com/resetrinse/',
        icon: 'tabler:brand-instagram-filled',
    },
    apple: {
        link: 'Pending',
        icon: 'tabler:brand-apple-filled',
    },
    linkedIn: {
        link: 'https://www.linkedin.com/in/jadon-smith-6143b9334',
        icon: 'tabler:brand-linkedin-filled',
    },
}

const props = defineProps<{
    social: keyof typeof socialLibary
}>()

const selectdSocial = socialLibary[props.social]
</script>

<template>
    <a :href="selectdSocial.link" target="_blank">
        <UIcon name="tabler:mai" />
        <component
            :is="selectdSocial.icon"
            class="size-6 rounded-full border-2 border-white bg-amber-600 p-1 text-amber-200 transition-colors duration-150 hover:border-green-400 hover:text-green-200"
    /></a>
</template>
