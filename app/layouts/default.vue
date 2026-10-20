<script setup lang="ts">
import ContactBar from '~/components/layout/ContactBar.vue'
import Footer from '~/components/layout/Footer.vue'
import NavBar from '~/components/layout/NavBar.vue'
</script>

<template>
    <div
        class="fixed left-1/2 z-100 w-full max-w-300 -translate-x-1/2 rounded-b-2xl"
    >
        <ContactBar />
        <NavBar />
    </div>
    <slot />
    <Footer />
</template>
