<script setup lang="ts">
import ContactBar from '~/components/layout/ContactBar.vue'
import Footer from '~/components/layout/Footer.vue'
import NavBar from '~/components/layout/NavBar.vue'
</script>

<template>
    <div
        class="fixed z-100 w-full max-w-300 rounded-b-2xl shadow-md shadow-black/50"
    >
        <ContactBar />
        <NavBar />
    </div>
    <slot />
    <Footer />
</template>
