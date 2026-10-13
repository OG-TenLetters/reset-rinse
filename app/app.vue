<script setup lang="ts">
import ContactBar from './components/layout/ContactBar.vue'
import Footer from './components/layout/Footer.vue'
import NavBar from './components/layout/NavBar.vue'
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <div class="absolute h-full w-full bg-gray-900">
            <div class="m-auto h-full w-full max-w-300 rounded-md bg-gray-100">
                <!-- Start Building Under Here -->
                <ContactBar />
                <NavBar />
                <Footer />
            </div>
        </div>
    </div>
</template>
