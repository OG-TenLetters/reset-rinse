<script setup lang="ts">
import type { LegalDocumentData } from '~/data/legal'

const props = defineProps<{ policy: LegalDocumentData }>()

// Distinct fragment IDs allow direct links to specific sections.
const sectionId = (index: number) => `${props.policy.slug}-section-${index + 1}`
</script>

<template>
    <main class="min-w-0 bg-slate-50 text-gray-900">
        <!-- Uses the same violet/amber hierarchy as the existing service banners. -->
        <header
            class="relative isolate overflow-hidden bg-violet-950 text-white"
        >
            <div
                class="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-gray-950 via-violet-950 to-violet-900"
                aria-hidden="true"
            />
            <div
                class="pointer-events-none absolute -right-24 -bottom-40 -z-10 h-90 w-90 rounded-full bg-amber-500/10 blur-3xl"
                aria-hidden="true"
            />
            <div
                class="mx-auto w-full max-w-260 px-6 pt-40 pb-14 sm:px-10 sm:pt-44 sm:pb-18"
            >
                <p
                    class="mb-3 text-xs font-semibold tracking-[0.18em] text-amber-300 uppercase sm:text-sm"
                >
                    Reset Rinse · Property Care
                </p>
                <h1
                    class="max-w-180 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl"
                >
                    {{ policy.title }}
                </h1>
                <p
                    class="mt-5 max-w-165 text-base leading-relaxed text-gray-100 sm:text-lg"
                >
                    {{ policy.summary }}
                </p>
                <div
                    class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-violet-100"
                >
                    <p>
                        <span class="font-semibold text-amber-300"
                            >Effective:</span
                        >
                        {{ policy.effectiveDate }}
                    </p>
                    <p v-if="policy.serviceArea">
                        <span class="font-semibold text-amber-300"
                            >Service area:</span
                        >
                        {{ policy.serviceArea }}
                    </p>
                </div>
            </div>
        </header>

        <div
            class="mx-auto grid w-full max-w-260 min-w-0 gap-7 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:items-start lg:gap-10"
        >
            <aside
                class="min-w-0 pt-8 lg:sticky lg:top-36 lg:flex lg:h-[calc(100dvh-10rem)] lg:flex-col"
            >
                <nav
                    aria-label="Sections in this document"
                    class="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm lg:max-h-full lg:overflow-y-auto"
                >
                    <h2
                        class="text-sm font-bold tracking-wide text-violet-900 uppercase"
                    >
                        On this page
                    </h2>
                    <ol class="mt-4 space-y-3 text-sm leading-snug">
                        <li
                            v-for="(section, index) in policy.sections"
                            :key="sectionId(index)"
                        >
                            <a
                                :href="`#${sectionId(index)}`"
                                class="group flex gap-2 rounded-md text-gray-700 hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                            >
                                <span
                                    class="shrink-0 font-semibold text-amber-600"
                                    >{{ index + 1 }}.</span
                                >
                                <span class="group-hover:underline">{{
                                    section.heading
                                }}</span>
                            </a>
                        </li>
                    </ol>
                </nav>
            </aside>

            <article
                class="min-w-0 rounded-2xl border border-violet-100 bg-white px-5 py-2 shadow-sm sm:px-9 sm:py-4"
            >
                <section
                    v-for="(section, index) in policy.sections"
                    :id="sectionId(index)"
                    :key="sectionId(index)"
                    class="scroll-mt-38 border-b border-violet-100 py-8 last:border-0 sm:py-10"
                    :aria-labelledby="`${sectionId(index)}-title`"
                >
                    <div class="flex items-start gap-3">
                        <span
                            aria-hidden="true"
                            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-900"
                        >
                            {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        <h2
                            :id="`${sectionId(index)}-title`"
                            class="min-w-0 pt-0.5 text-xl leading-snug font-bold text-violet-950 sm:text-2xl"
                        >
                            {{ section.heading }}
                        </h2>
                    </div>

                    <div
                        class="mt-5 space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8"
                    >
                        <template
                            v-for="(block, blockIndex) in section.blocks"
                            :key="blockIndex"
                        >
                            <p v-if="block.type === 'paragraph'">
                                {{ block.text }}
                            </p>
                            <ul v-else class="ml-1 space-y-2 pl-0" role="list">
                                <li
                                    v-for="item in block.items"
                                    :key="item"
                                    class="flex items-start gap-3"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                                    />
                                    <span>{{ item }}</span>
                                </li>
                            </ul>
                        </template>
                    </div>
                </section>
            </article>
        </div>
    </main>
</template>
