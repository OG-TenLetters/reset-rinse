<script setup lang="ts">
withDefaults(
    defineProps<{
        delay?: number
    }>(),
    {
        delay: 0,
    }
)

const id = useId()
</script>

<template>
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
            <!-- Star shape -->
            <path
                :id="`${id}-shape`"
                d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"
            />

            <!-- Your original gradient -->
            <linearGradient
                :id="`${id}-base`"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop offset="0%" stop-color="var(--color-violet-800)" />
                <stop offset="17%" stop-color="var(--color-violet-400)" />
                <stop offset="55%" stop-color="var(--color-yellow-200)" />
                <stop offset="100%" stop-color="var(--color-amber-400)" />
            </linearGradient>

            <!-- Moving reflection -->
            <linearGradient
                :id="`${id}-shine`"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-24 -24)"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
            >
                <stop offset="0%" stop-color="white" stop-opacity="0" />
                <stop offset="33%" stop-color="white" stop-opacity="0" />
                <stop offset="40%" stop-color="white" stop-opacity="0.2" />
                <stop offset="47%" stop-color="white" stop-opacity="0.65" />
                <stop offset="53%" stop-color="white" stop-opacity="0.65" />
                <stop offset="60%" stop-color="white" stop-opacity="0.2" />
                <stop offset="67%" stop-color="white" stop-opacity="0" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
                <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-24 -24;24 24;24 24"
                    keyTimes="0;0.22;1"
                    :begin="`${delay}s`"
                    dur="5s"
                    repeatCount="indefinite"
                />
            </linearGradient>
        </defs>

        <!-- Original colors -->
        <use :href="`#${id}-shape`" :fill="`url(#${id}-base)`" />

        <!-- Animated reflection -->
        <use
            class="star-shine"
            :href="`#${id}-shape`"
            :fill="`url(#${id}-shine)`"
        />

        <!-- Brown outline -->
        <use
            :href="`#${id}-shape`"
            fill="none"
            stroke="var(--color-amber-950)"
            stroke-opacity="0.5"
            stroke-width="0.8"
            stroke-linejoin="round"
        />
    </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
    .star-shine {
        opacity: 0;
    }
}
</style>
