<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'en',
    },
    title: 'Reset Rinse | Property Care in Vancouver, WA',
    meta: [
        {
            name: 'description',
            content:
                'Window cleaning, gutter cleaning, pressure washing, and moss treatment in Vancouver, Washington and surrounding areas.',
        },
    ],
})
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <div class="absolute min-h-full w-full bg-gray-900 text-black">
            <div class="m-auto h-full w-full max-w-300 rounded-md bg-gray-100">
                <UApp>
                    <NuxtLayout>
                        <NuxtPage />
                    </NuxtLayout>
                </UApp>
            </div>
        </div>
    </div>
</template>
