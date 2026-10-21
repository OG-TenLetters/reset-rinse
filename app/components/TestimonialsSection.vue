<script setup lang="ts">
import { mockGoogleReviews } from '~/data/mockGoogleReviews'
import SectionTitle from './SectionTitle.vue'

const reviewsData = computed(() => mockGoogleReviews.reviews.slice(0, 6))
</script>

<template>
    <section id="testimonials">
        <!-- Testimonial - Title Box -->
        <SectionTitle
            tag="testimonials"
            title="what my customers say"
            details=""
        />
        <div class="xs:px-8 px-2 py-2 sm:py-6 md:py-10">
            <UCarousel
                v-slot="{ item }"
                :items="reviewsData"
                arrows
                prev-icon="tabler:caret-left-filled"
                next-icon="tabler:caret-right-filled"
                loop
                :autoplay="{
                    delay: 6000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                    stopOnFocusIn: true,
                }"
                :prev="{
                    ui: { leadingIcon: 'size-7' },
                }"
                :next="{
                    ui: { leadingIcon: 'size-7' },
                }"
                :ui="{
                    viewport: 'carousel-fade',
                    container: '-ms-4',
                    item: 'ps-4 py-8 basis-full min-[680px]:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]',
                    prev: 'inset-s-4 hidden sm:inline-flex sm:inset-s-4 bg-slate-50 active:bg-violet-400 active:ring-violet-950 active:text-violet-950 text-slate-600 ring-slate-600 opacity-90 hover:bg-violet-100 hover:text-violet-900 hover:ring-violet-900',
                    next: 'inset-e-4 hidden sm:inline-flex sm:inset-e-4 bg-slate-50 active:bg-violet-400 active:ring-violet-950 active:text-violet-950 text-slate-600 ring-slate-600 opacity-90 hover:bg-violet-100 hover:text-violet-900 hover:ring-violet-900',
                }"
            >
                <TestimonialCard :reviews="item" />
            </UCarousel>
        </div>
    </section>
</template>

<style scoped>
@media (min-width: 680px) {
    :deep(.carousel-fade) {
        mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 4%,
            black 96%,
            transparent 100%
        );
    }
}
</style>
