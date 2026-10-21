<script setup lang="ts">
import SectionTitle from '../SectionTitle.vue'
</script>

<template>
    <div class="py-10 md:py-20">
        <SectionTitle
            tag="Who I am"
            title="about me any my mission"
            details=""
        />
        <div
            class="xs:flow-root flex flex-col items-center px-5 py-10 sm:px-10 md:py-20"
        >
            <!-- About Me Image -->
            <div
                class="xs:float-left relative mr-5 mb-4 block w-3/5 overflow-hidden rounded-xl shadow-lg shadow-black/50 md:flex md:w-2/5 md:rounded-3xl"
            >
                <NuxtImg
                    width="480"
                    height="680"
                    class="w-full"
                    src="/Jadon.jpg"
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
            <p class="mt-0 w-full text-lg sm:text-xl md:mt-10 md:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus ipsum tempore velit hic doloremque, possimus
                minus recusandae fuga praesentium ratione assumenda vero tenetur
                provident est obcaecati Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Harum veniam doloribus deleniti similique at
                rem corporis sunt ut temporibus culpa. Voluptatem recusandae
                sint eveniet unde hic eos voluptas. Libero, sit.
            </p>
        </div>
    </div>
</template>
