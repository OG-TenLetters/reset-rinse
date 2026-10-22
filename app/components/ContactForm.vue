<script setup lang="ts">
import { ServicesData } from '~/data/services'

const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)

// Form data
interface ContactFormData {
    name: string
    phone: string
    email: string
    address: string
    propertyType: string
    services: string[]
    details: string
    website: string
}

const form = reactive<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    propertyType: '',
    services: [],
    details: '',
    website: '',
})

// Submission state
const isSubmitting = ref(false)
const feedback = ref('')
const submissionSuccess = ref(false)

// Submit form
async function submitForm() {
    if (isSubmitting.value) return

    feedback.value = ''
    submissionSuccess.value = false

    // Require at least one service
    if (form.services.length === 0) {
        feedback.value = 'Please select at least one service.'
        return
    }

    isSubmitting.value = true

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                name: form.name,
                phone: form.phone,
                email: form.email,
                address: form.address,
                propertyType: form.propertyType,
                services: [...form.services],
                details: form.details,
                website: form.website,
            },
        })

        submissionSuccess.value = true
        feedback.value = 'Your quote request has been submitted successfully!'

        // Clear form after successful submission
        form.name = ''
        form.phone = ''
        form.email = ''
        form.address = ''
        form.propertyType = ''
        form.services = []
        form.details = ''
        form.website = ''
    } catch (error) {
        console.error('Contact form submission failed:', error)

        feedback.value = 'Unable to submit your request. Please try again.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div
        data-contact-section
        class="h-fit w-full rounded-2xl border border-black/10 bg-slate-50 p-4 text-center text-violet-900 shadow-lg shadow-black/40 sm:p-8"
    >
        <!-- Title -->
        <h2 class="mb-7 text-2xl font-bold tracking-wide md:text-3xl">
            Request a Quote
        </h2>

        <form class="flex flex-col gap-y-4" @submit.prevent="submitForm">
            <!-- Spam protection: hidden honeypot -->
            <div class="absolute left-[-9999px]" aria-hidden="true">
                <label for="contact-website">Website</label>

                <input
                    id="contact-website"
                    v-model="form.website"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                />
            </div>

            <!-- Contact Information -->
            <div class="flex flex-wrap gap-x-4 gap-y-4">
                <div class="xs:grid-cols-2 grid w-full grid-cols-1 gap-x-5">
                    <div class="flex w-full flex-col">
                        <label
                            for="contact-name"
                            class="text-left font-semibold"
                        >
                            Name:
                        </label>

                        <input
                            id="contact-name"
                            v-model.trim="form.name"
                            class="w-full rounded-sm bg-slate-100/50 px-2 py-1 ring-2 ring-violet-800 placeholder:opacity-90"
                            placeholder="Name"
                            type="text"
                            name="name"
                            autocomplete="name"
                            maxlength="100"
                            required
                        />
                    </div>

                    <div class="flex w-full flex-col">
                        <label
                            for="contact-phone"
                            class="text-left font-semibold"
                        >
                            Phone:
                        </label>

                        <input
                            id="contact-phone"
                            v-model.trim="form.phone"
                            class="w-full rounded-sm bg-slate-100/50 px-2 py-1 ring-2 ring-violet-800 placeholder:opacity-90"
                            placeholder="Phone"
                            type="tel"
                            name="phone"
                            autocomplete="tel"
                            maxlength="40"
                            required
                        />
                    </div>
                </div>

                <div class="flex w-full flex-col">
                    <label for="contact-email" class="text-left font-semibold">
                        Email:
                    </label>

                    <input
                        id="contact-email"
                        v-model.trim="form.email"
                        class="w-full rounded-sm bg-slate-100/50 px-2 py-1 ring-2 ring-violet-800 placeholder:opacity-90"
                        placeholder="Email"
                        type="email"
                        name="email"
                        autocomplete="email"
                        maxlength="254"
                        required
                    />
                </div>
            </div>

            <!-- Property Information -->
            <div>
                <label
                    for="contact-address"
                    class="block text-left font-semibold"
                >
                    Property Address (Optional)
                </label>

                <input
                    id="contact-address"
                    v-model.trim="form.address"
                    class="w-full rounded-sm bg-slate-100/50 px-2 py-1 ring-2 ring-violet-800 placeholder:opacity-90"
                    placeholder="Type Address Here"
                    type="text"
                    name="address"
                    autocomplete="street-address"
                    maxlength="200"
                />

                <!-- Radio Options -->
                <div class="mt-1 flex gap-x-6 text-lg">
                    <div class="flex items-center gap-x-2">
                        <input
                            id="property-residential"
                            v-model="form.propertyType"
                            class="bg-slate-100/50 px-2 py-1 placeholder:opacity-90"
                            type="radio"
                            name="propertyType"
                            value="Residential"
                        />

                        <label class="text-base" for="property-residential">
                            Residential
                        </label>
                    </div>

                    <div class="flex items-center gap-x-2">
                        <input
                            id="property-commercial"
                            v-model="form.propertyType"
                            class="bg-slate-100/50 px-2 py-1 placeholder:opacity-90"
                            type="radio"
                            name="propertyType"
                            value="Commercial"
                        />

                        <label class="text-base" for="property-commercial">
                            Commercial
                        </label>
                    </div>
                </div>
            </div>

            <!-- Services -->
            <div>
                <div class="text-left font-semibold">Select Your Services</div>

                <div
                    class="xs:grid-cols-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
                >
                    <div
                        v-for="(service, index) in activeServices"
                        :key="service.name"
                        class="mt-2 flex items-center gap-x-2 text-left"
                    >
                        <input
                            :id="`service-${index}`"
                            v-model="form.services"
                            :value="service.name"
                            class="bg-slate-100/50 px-2 py-1 placeholder:opacity-90"
                            type="checkbox"
                        />

                        <label :for="`service-${index}`" class="leading-4">
                            {{ service.name }}
                        </label>
                    </div>
                </div>
            </div>

            <!-- Additional Details -->
            <div>
                <label
                    for="contact-details"
                    class="block text-left font-semibold"
                >
                    Additional Details (Optional)
                </label>

                <textarea
                    id="contact-details"
                    v-model.trim="form.details"
                    class="w-full rounded-sm bg-slate-100/50 px-2 py-1 ring-2 ring-violet-800 placeholder:opacity-90"
                    placeholder="Please provide anything you believe is important for me to know"
                    maxlength="3000"
                />
            </div>

            <!-- Submission Feedback -->
            <p
                v-if="feedback"
                role="status"
                aria-live="polite"
                class="text-sm font-semibold"
                :class="submissionSuccess ? 'text-green-700' : 'text-red-600'"
            >
                {{ feedback }}
            </p>

            <!-- Submit -->
            <button
                class="rounded-xl bg-violet-900 p-4 text-lg font-semibold text-white ring-2 ring-violet-900 transition-colors duration-300 hover:bg-transparent hover:text-violet-900 md:text-xl"
                type="submit"
                :disabled="isSubmitting"
                :aria-busy="isSubmitting"
            >
                {{ isSubmitting ? 'Sending Request...' : 'Request a Quote' }}
            </button>
        </form>
    </div>
</template>
