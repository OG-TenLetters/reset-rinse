<script setup lang="ts">
import ContactBar from '~/components/layout/ContactBar.vue'
import Footer from '~/components/layout/Footer.vue'
import NavBar from '~/components/layout/NavBar.vue'
</script>

<template>
    <div>
        <ContactBar />
        <NavBar />
        <slot />
        <Footer />
    </div>
</template>
