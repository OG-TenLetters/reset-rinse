<script setup lang="ts">
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

const hoverColors = {
    violet: 'hover:text-violet-200 hover:border-violet-400',
    blue: 'hover:text-blue-200 hover:border-blue-400',
    pink: 'hover:text-pink-200 hover:border-pink-400',
    green: 'hover:text-green-200 hover:border-green-400',
    amber: 'hover:text-amber-300 hover:border-amber-700',
}

const props = defineProps<{
    social: keyof typeof socialLibary
    hoverColor: keyof typeof hoverColors
}>()

const selectdSocial = socialLibary[props.social]
</script>

<template>
    <a
        class="inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-amber-600 text-amber-200 transition-colors duration-150"
        :class="hoverColors[hoverColor]"
        :href="selectdSocial.link"
        target="_blank"
        :aria-label="`Checkout our ${selectdSocial.name} page!`"
    >
        <UIcon :name="selectdSocial.icon" class=""
    /></a>
</template>
