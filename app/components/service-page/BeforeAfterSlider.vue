<script setup lang="ts">
import type { ServiceImage } from '~/data/services'

withDefaults(
    defineProps<{
        before: ServiceImage
        after: ServiceImage
        label?: string
        placeholder?: boolean
    }>(),
    {
        label: 'Before and after image comparison',
        placeholder: false,
    }
)

const frame = ref<HTMLElement | null>(null)
const position = ref(50)
const activePointerId = ref<number | null>(null)
const instructionsId = `${useId()}-comparison-instructions`

function updateFromPointer(event: PointerEvent) {
    const bounds = frame.value?.getBoundingClientRect()
    if (!bounds || bounds.width === 0) return

    const next = ((event.clientX - bounds.left) / bounds.width) * 100
    position.value = Math.max(0, Math.min(100, next))
}

function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    if (activePointerId.value !== null) return

    activePointerId.value = event.pointerId
    frame.value?.setPointerCapture(event.pointerId)
    updateFromPointer(event)
}

function onPointerMove(event: PointerEvent) {
    if (activePointerId.value === event.pointerId) updateFromPointer(event)
}

function onPointerUp(event: PointerEvent) {
    if (activePointerId.value !== event.pointerId) return
    activePointerId.value = null

    if (frame.value?.hasPointerCapture(event.pointerId)) {
        frame.value.releasePointerCapture(event.pointerId)
    }
}

function onKeydown(event: KeyboardEvent) {
    const step = event.shiftKey ? 10 : 5
    let next = position.value

    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
            next -= step
            break
        case 'ArrowRight':
        case 'ArrowUp':
            next += step
            break
        case 'PageDown':
            next -= 10
            break
        case 'PageUp':
            next += 10
            break
        case 'Home':
            next = 0
            break
        case 'End':
            next = 100
            break
        default:
            return
    }

    event.preventDefault()
    position.value = Math.max(0, Math.min(100, next))
}
</script>

<template>
    <figure>
        <div
            ref="frame"
            class="relative aspect-4/3 w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl bg-gray-800 shadow-xl shadow-gray-950/25 select-none"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @lostpointercapture="activePointerId = null"
        >
            <!-- Full image: "After". The "Before" image above it is clipped. -->
            <NuxtImg
                :src="after.src"
                :alt="after.alt"
                width="1000"
                height="750"
                format="webp"
                quality="85"
                loading="lazy"
                draggable="false"
                class="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <NuxtImg
                :src="before.src"
                :alt="before.alt"
                width="1000"
                height="750"
                format="webp"
                quality="85"
                loading="lazy"
                draggable="false"
                class="pointer-events-none absolute inset-0 h-full w-full object-cover"
                :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
            />

            <div class="pointer-events-none absolute inset-x-0 top-4 flex justify-between px-4 text-xs font-bold tracking-wide text-white uppercase sm:text-sm">
                <span class="rounded-lg bg-gray-950/80 px-3 py-1.5">Before</span>
                <span class="rounded-lg bg-gray-950/80 px-3 py-1.5">After</span>
            </div>

            <!-- Focusable ARIA slider: pointer drag, arrows, PageUp/Down, Home/End. -->
            <div
                role="slider"
                tabindex="0"
                aria-orientation="horizontal"
                :aria-label="label"
                :aria-describedby="instructionsId"
                :aria-valuemin="0"
                :aria-valuemax="100"
                :aria-valuenow="Math.round(position)"
                :aria-valuetext="`${Math.round(position)} percent before image visible`"
                class="absolute inset-y-0 z-10 flex w-12 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-amber-400"
                :style="{ left: `${position}%` }"
                @keydown="onKeydown"
            >
                <div class="pointer-events-none absolute inset-y-0 w-0.75 bg-white shadow-md shadow-black/60" />
                <div class="pointer-events-none relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-violet-900 text-white shadow-lg shadow-black/50">
                    <UIcon name="tabler:arrows-horizontal" class="size-5" aria-hidden="true" />
                </div>
            </div>
        </div>

        <figcaption class="mt-3 text-center text-xs leading-relaxed text-gray-600 sm:text-sm">
            <span v-if="placeholder">
                Sample images for testing the comparison slider. These are not actual before-and-after results.
            </span>
            <span v-else>Drag the divider to compare the before and after photos.</span>
            <span :id="instructionsId" class="sr-only">
                Drag horizontally with a mouse or touch. Focus the slider and use the arrow keys to adjust it;
                hold Shift for larger steps, or press Home and End to move to either edge.
            </span>
        </figcaption>
    </figure>
</template>
