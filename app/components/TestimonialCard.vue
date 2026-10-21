<script setup lang="ts">
import { mockGoogleReviews } from '~/data/mockGoogleReviews'

type GoogleReview = (typeof mockGoogleReviews.reviews)[number]

const props = defineProps<{
    reviews: GoogleReview
}>()

const expanded = ref(false)

const cardRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | undefined

onMounted(() => {
    if (!cardRef.value) return

    const viewport = cardRef.value.closest('[data-slot="viewport"]')

    if (!viewport) return

    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.intersectionRatio < 0.5) {
                expanded.value = false
            }
        },
        {
            root: viewport,
            threshold: 0.5,
        }
    )

    observer.observe(cardRef.value)
})

onBeforeUnmount(() => {
    observer?.disconnect()
})

const clamped = ref(true)

const toggleReview = async () => {
    if (expanded.value) {
        expanded.value = false
    } else {
        clamped.value = false
        await nextTick()
        expanded.value = true
    }
}

const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== event.currentTarget) return

    if (event.propertyName === 'height' && !expanded.value) {
        clamped.value = true
    }
}

const starRatings: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
} as const
</script>

<template>
    <!-- Border styling -->
    <div
        ref="cardRef"
        class="h-full w-full rounded-2xl bg-linear-to-br from-violet-800 to-amber-500/65 p-0.5 shadow-lg shadow-violet-950 transition-transform duration-450 hover:-translate-y-2"
    >
        <div class="flex h-full flex-col justify-start">
            <div class="xs:p-7 flex flex-1 flex-col rounded-xl bg-slate-50 p-4">
                <!-- Top Box -->
                <div class="mb-2 flex items-start justify-between">
                    <div class="flex items-center gap-x-4">
                        <!-- Reviewer Image -->
                        <NuxtImg
                            src="/ReviewerImageMock.png"
                            class="flex w-full max-w-10 rounded-full lg:max-w-14"
                        />
                        <div
                            class="flex w-fit flex-col items-start justify-center"
                        >
                            <!-- Reviewer Username -->
                            <div
                                class="xs:text-base text-sm font-semibold lg:text-lg"
                            >
                                {{ reviews.reviewer?.displayName }}
                            </div>
                            <!-- Timeframe -->
                            <div class="text-xs text-slate-600/80 lg:text-sm">
                                3 months ago
                            </div>
                        </div>
                    </div>
                    <!-- Google Icon -->
                    <UIcon
                        class="text-xl md:text-2xl lg:text-3xl"
                        name="logos:google-icon"
                    />
                </div>
                <!-- Rating -->
                <div class="flex gap-x-0.5 p-2">
                    <div v-for="value in 5" :key="value">
                        <ShimmerStar
                            class="xs:size-7 size-5"
                            v-if="
                                value <= (starRatings[reviews.starRating] ?? 0)
                            "
                        />

                        <UIcon
                            v-else
                            name="tabler:star"
                            mode="svg"
                            class="xs:size-7 size-5 text-amber-950/20"
                        />
                    </div>
                </div>

                <!-- Message -->
                <div
                    v-if="reviews.comment"
                    class="xs:text-base mt-4 flex flex-1 flex-col text-sm"
                >
                    <div
                        class="review-text"
                        :class="{
                            'review-collapsed':
                                !expanded && reviews.comment.length > 150,
                        }"
                        @transitionend="onTransitionEnd"
                    >
                        <p
                            class="leading-6 font-semibold text-slate-800"
                            :class="{
                                'line-clamp-3 sm:line-clamp-4':
                                    clamped && reviews.comment.length > 150,
                            }"
                        >
                            {{ reviews.comment }}
                        </p>
                    </div>

                    <button
                        v-if="reviews.comment.length > 150"
                        type="button"
                        :aria-expanded="expanded"
                        class="cursor-pointer self-start font-semibold text-slate-500/70 sm:mt-auto"
                        :class="expanded ? 'mt-0' : '-mt-3'"
                        @click="toggleReview"
                    >
                        {{ expanded ? 'Hide' : 'Read More' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.review-text {
    interpolate-size: allow-keywords;
    height: auto;
    overflow: hidden;
    transition: height 450ms ease-in-out;
}

.review-collapsed {
    height: 6em;
}

@media (prefers-reduced-motion: reduce) {
    .review-text {
        transition: none;
    }
}
</style>
