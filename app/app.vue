
<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="bg-gray-900 w-full h-full absolute">
      <div class="bg-gray-100 rounded-md m-auto w-full h-full max-w-400">
        <h1 class="text-blue-500">Hello</h1>
        <button @click="gooeyToast.success('Changes saved')">Show Toast</button>
        <GooeyToaster position="bottom-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GooeyToaster, gooeyToast } from "gooey-toast-vue";
import "gooey-toast-vue/style.css";
</script>
