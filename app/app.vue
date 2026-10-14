<script setup lang="ts"></script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <div class="absolute h-full w-full bg-gray-900">
            <div class="m-auto h-full w-full max-w-300 rounded-md bg-gray-100">
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </div>
        </div>
    </div>
</template>
