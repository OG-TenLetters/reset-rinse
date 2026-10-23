<script setup lang="ts">
import ContactForm from './ContactForm.vue'
</script>

<template>
    <div
        class="flex flex-col-reverse items-center justify-center gap-x-5 px-5 py-20 md:flex-row md:gap-x-10 md:px-10"
    >
        <div class="">
            <ContactForm />
        </div>
        <div class="mb-10 text-center font-semibold md:text-left">
            <!-- Tag -->
            <h4
                class="text-sm tracking-wide text-violet-700 uppercase md:text-base"
            >
                Contact Me
            </h4>
            <!-- header -->
            <h2 class="text-2xl font-bold md:text-3xl">
                Let me know how I can help you
            </h2>
            <!-- subheader -->
            <h3 class="text-base md:text-lg">
                I respond within an hour during normal business hours
            </h3>
        </div>
    </div>
</template>
