<script setup lang="ts">
import SectionTitle from '../SectionTitle.vue'
import ShimmerImage from '../ui/ShimmerImage.vue'
</script>

<template>
    <section id="about-me">
        <div class="px-5 py-10 sm:px-10 md:py-20">
            <SectionTitle
                tag="Who I am"
                title="about me and my mission"
                details=""
            />
            <div
                class="mt-10 flex flex-col items-center gap-x-5 md:mt-20 md:flex-row md:gap-x-10"
            >
                <!-- About Me Image -->
                <div
                    class="xs:float-left relative block w-3/5 overflow-hidden rounded-xl shadow-lg shadow-black/50 md:flex md:w-4/5 md:rounded-3xl"
                >
                    <ShimmerImage
                        src="/Jadon.jpg"
                        alt="Picture of the Business Owner"
                        width="480"
                        height="680"
                        wrapper-class="w-full"
                        image-class="w-full"
                        loading="lazy"
                    />

                    <!-- Image Title -->
                    <div
                        class="absolute bottom-0 w-full rounded-t-xl bg-slate-100 p-2 text-center md:rounded-t-2xl md:p-6"
                    >
                        <h4
                            class="xs:tracking-normal xs:font-semibold text-xs font-bold tracking-wide text-violet-800 capitalize sm:text-sm md:text-base"
                        >
                            Owner
                        </h4>

                        <h1
                            class="xs:max-w-full xs:text-xl w-full max-w-60 text-base font-semibold tracking-wide capitalize sm:text-2xl lg:text-3xl"
                        >
                            Jadon Smith
                        </h1>
                    </div>
                </div>

                <!-- About Me Description -->
                <div
                    class="flex w-full flex-col items-center gap-y-8 text-center md:items-start md:text-left"
                >
                    <h2
                        class="hidden text-4xl font-semibold text-violet-950 md:block"
                    >
                        Hi! I'm Jadon.
                    </h2>
                    <p
                        class="mt-5 w-full text-lg sm:text-xl md:mt-0 md:text-2xl"
                    >
                        <span
                            class="font-semibold whitespace-nowrap text-violet-950 md:hidden"
                            >Hi! I'm Jadon.</span
                        >I'm the owner of Reset Rinse - Property Care, a locally
                        owned business serving Clark County, Washington. I am a
                        self-directed individual that, despite life's hardships,
                        have found a way to combine my skills of programming,
                        communication, hands-on attention to detail, and
                        continous improvement. I started Reset Rinse with a
                        simple goal: to provide homeowners with reliable,
                        quality property care without the hassle. I believe
                        maintaining your home shouldn't be stressful, and
                        finding someone you can trust to take care of it
                        shouldn't be either. My approach is straightforward:
                        communicate clearly, provide the correct information,
                        treat every property with respect, and put genuine
                        effort into every job. Whether you're looking for
                        routine maintenance or a much-needed refresh, I'm here
                        to help give your property the reset it deserves!
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
