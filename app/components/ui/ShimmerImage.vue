<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
    defineProps<{
        src: string
        alt: string
        wrapperClass?: string
        imageClass?: string
    }>(),
    {
        wrapperClass: '',
        imageClass: '',
    }
)

const container = ref<HTMLElement | null>(null)

const loaded = ref(false)
const failed = ref(false)

function checkImage() {
    const img = container.value?.querySelector('img')

    if (!img?.complete) return

    loaded.value = img.naturalWidth > 0
    failed.value = img.naturalWidth === 0
}

onMounted(checkImage)

watch(
    () => props.src,
    async () => {
        loaded.value = false
        failed.value = false

        await nextTick()
        checkImage()
    }
)
</script>

<template>
    <div
        class="overflow-hidden"
        ref="container"
        :class="['relative', wrapperClass]"
    >
        <!-- Animated Skeleton -->
        <div
            v-if="!loaded && !failed"
            class="skeleton-image pointer-events-none absolute inset-0"
            aria-hidden="true"
        />

        <!-- Actual Image -->
        <NuxtImg
            v-bind="$attrs"
            :src="src"
            :alt="alt"
            :class="imageClass"
            @load="loaded = true"
            @error="failed = true"
        />
    </div>
</template>
