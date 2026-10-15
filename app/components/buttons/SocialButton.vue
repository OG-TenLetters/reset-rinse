"
<script setup lang="ts">
import YelpIcon from '../icons/Yelp.vue'

const socialLibary = {
    yelp: {
        name: 'yelp',
        link: 'https://www.yelp.com/',
        icon: 'akar-icons:yelp-fill',
    },
    facebook: {
        name: 'facebook',
        link: 'https://www.facebook.com/profile.php?id=61595179863028',
        icon: 'tabler:brand-facebook-filled',
    },
    google: {
        name: 'google',
        link: 'https://share.google/lGP0JerVgcsdMfxXZ',
        icon: 'tabler:brand-google-filled',
    },
    instagram: {
        name: 'instagram',
        link: 'https://www.instagram.com/resetrinse/',
        icon: 'tabler:brand-instagram-filled',
    },
    apple: {
        name: 'apple',
        link: 'Pending',
        icon: 'tabler:brand-apple-filled',
    },
    linkedIn: {
        name: 'linkedin',
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
    <a
        class="inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-amber-600 text-amber-200 transition-colors duration-150 hover:border-green-400 hover:text-green-200"
        :href="selectdSocial.link"
        target="_blank"
        :aria-label="`Checkout our ${selectdSocial.name} page!`"
    >
        <UIcon :name="selectdSocial.icon" class=""
    /></a>
</template>
