<script setup lang="ts"></script>

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
