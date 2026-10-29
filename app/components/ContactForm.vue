<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { ServicesData } from '~/data/services'

// Temporary switch. Enable again after restoring server-side verification.
const turnstileEnabled = false
const turnstileContainer = ref<HTMLElement | null>(null)
const isTurnstileVisible = ref(false)
const mobileTurnstile = ref(false)
const turnstileReady = ref(false)
let turnstileObserver: ResizeObserver | undefined
let mobileBreakpoint: MediaQueryList | undefined
function onBreakpointChange(event: MediaQueryListEvent) {
    mobileTurnstile.value = event.matches
    // If the viewport crosses 420px, the iframe changes its container.
    // Clear its token and reset so the user re-verifies as needed.
    turnstileToken.value = ''
    nextTick(() => turnstile.value?.reset())
}
onMounted(() => {
    if (!turnstileEnabled) return
    mobileBreakpoint = window.matchMedia('(max-width: 420px)')
    mobileTurnstile.value = mobileBreakpoint.matches
    mobileBreakpoint.addEventListener('change', onBreakpointChange)
    // Mount only after choosing the initial location, so the iframe is not
    // moved immediately after its first render on phones.
    turnstileReady.value = true
    const container = turnstileContainer.value
    if (!container) return
    const updateVisibility = () => {
        isTurnstileVisible.value =
            (container.firstElementChild?.getBoundingClientRect().height ?? 0) >
            0
    }
    turnstileObserver = new ResizeObserver(updateVisibility)
    turnstileObserver.observe(container)
    updateVisibility()
})
const activeServices = computed(() =>
    Object.values(ServicesData).filter((service) => service.active)
)
onBeforeUnmount(() => {
    turnstileObserver?.disconnect()
    mobileBreakpoint?.removeEventListener('change', onBreakpointChange)
})
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
// Each form instance gets its own IDs and radio group name.
const formId = useId()
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
const turnstileToken = ref('')
const turnstile = ref<{ reset: () => void } | null>(null)
const isSubmitting = ref(false)
const feedback = ref('')
const submissionSuccess = ref(false)
// Resend idempotency: retrying unchanged information uses the same key.
let pendingSubmissionId: string | null = null
let pendingPayloadSignature = ''
async function submitForm() {
    if (isSubmitting.value) return
    feedback.value = ''
    submissionSuccess.value = false
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (form.name.trim().length < 2) {
        feedback.value = 'Please enter your name (at least 2 characters).'
        return
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        feedback.value = 'Please enter a valid phone number.'
        return
    }
    if (!['Residential', 'Commercial'].includes(form.propertyType)) {
        feedback.value = 'Please select Residential or Commercial.'
        return
    }
    if (form.services.length === 0) {
        feedback.value = 'Please select at least one service.'
        return
    }
    if (turnstileEnabled && !turnstileToken.value) {
        feedback.value = 'Please complete the security check before submitting.'
        return
    }
    const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        propertyType: form.propertyType,
        services: [...form.services],
        details: form.details.trim(),
        website: form.website,
    }
    const signature = JSON.stringify(payload)
    if (signature !== pendingPayloadSignature || !pendingSubmissionId) {
        pendingPayloadSignature = signature
        pendingSubmissionId = crypto.randomUUID()
    }
    isSubmitting.value = true
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                ...payload,
                submissionId: pendingSubmissionId,
                ...(turnstileEnabled ? { turnstileToken: turnstileToken.value } : {}),
            },
        })
        submissionSuccess.value = true
        feedback.value = 'Your quote request has been submitted successfully!'
        Object.assign(form, {
            name: '',
            phone: '',
            email: '',
            address: '',
            propertyType: '',
            services: [],
            details: '',
            website: '',
        })
        pendingSubmissionId = null
        pendingPayloadSignature = ''
    } catch (error) {
        console.error('Contact form submission failed:', error)
        const status = (error as { response?: { status?: number } })?.response
            ?.status
        feedback.value =
            status === 429
                ? 'Too many requests. Please try again in a few minutes.'
                : status === 400 || status === 422
                  ? 'Please review your information and try again.'
                  : 'Your request could not be sent. Please try again or contact us directly.'
    } finally {
        isSubmitting.value = false
        if (turnstileEnabled) {
            // Turnstile tokens are single-use, even if sending fails after validation.
            turnstileToken.value = ''
            turnstile.value?.reset()
        }
    }
}
</script>
<template>
    <!-- Both the card and its mobile verification tray stay in this component's layout. -->
    <div class="w-full max-w-132 min-w-0">
        <div
            v-bind="$attrs"
            data-contact-section
            class="h-fit w-full max-w-132 overflow-hidden rounded-2xl border-y-3 border-t-gray-900/50 border-b-amber-700/50 bg-slate-100 pt-9 pb-7 text-center text-gray-900 shadow-lg shadow-black/40 sm:pt-16 sm:pb-8"
        >
            <!-- Title -->
            <form
                class="contact-font flex flex-col gap-y-4 px-7"
                @submit.prevent="submitForm"
            >
                <!-- Spam protection: hidden honeypot -->
                <div class="absolute left-[-9999px]" aria-hidden="true">
                    <label :for="`${formId}-contact-website`">Website</label>
                    <input
                        :id="`${formId}-contact-website`"
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
                                :for="`${formId}-contact-name`"
                                class="text-left font-semibold"
                            >
                                Name:
                            </label>
                            <input
                                :id="`${formId}-contact-name`"
                                v-model.trim="form.name"
                                class="w-full rounded-sm border-none bg-slate-100/50 px-2 py-1 ring-2 ring-zinc-900 outline-none placeholder:opacity-90 focus:ring-3 focus:ring-green-500"
                                placeholder="Name"
                                type="text"
                                name="name"
                                autocomplete="name"
                                maxlength="100"
                                minlength="2"
                                required
                            />
                        </div>
                        <div class="flex w-full flex-col">
                            <label
                                :for="`${formId}-contact-phone`"
                                class="text-left font-semibold"
                            >
                                Phone:
                            </label>
                            <input
                                :id="`${formId}-contact-phone`"
                                v-model.trim="form.phone"
                                class="w-full rounded-sm border-none bg-slate-100/50 px-2 py-1 ring-2 ring-zinc-900 outline-none placeholder:opacity-90 focus:ring-3 focus:ring-green-500"
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
                        <label
                            :for="`${formId}-contact-email`"
                            class="text-left font-semibold"
                        >
                            Email:
                        </label>
                        <input
                            :id="`${formId}-contact-email`"
                            v-model.trim="form.email"
                            class="w-full rounded-sm border-none bg-slate-100/50 px-2 py-1 ring-2 ring-zinc-900 outline-none placeholder:opacity-90 focus:ring-3 focus:ring-green-500"
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
                        :for="`${formId}-contact-address`"
                        class="block text-left font-semibold"
                    >
                        Property Address (Optional)
                    </label>
                    <input
                        :id="`${formId}-contact-address`"
                        v-model.trim="form.address"
                        class="w-full rounded-sm border-none bg-slate-100/50 px-2 py-1 ring-2 ring-zinc-900 outline-none placeholder:opacity-90 focus:ring-3 focus:ring-green-500"
                        placeholder="Type Address Here"
                        type="text"
                        name="address"
                        autocomplete="street-address"
                        maxlength="200"
                    />
                    <!-- Radio Options -->
                    <div
                        class="mt-1 flex gap-x-6 text-lg"
                        role="radiogroup"
                        aria-label="Property type"
                        aria-required="true"
                    >
                        <div class="flex items-center gap-x-2">
                            <input
                                :id="`${formId}-property-residential`"
                                v-model="form.propertyType"
                                class="appearance-none rounded-2xl border bg-violet-100 p-1.5 outline-1 outline-violet-700 placeholder:opacity-90 checked:bg-green-400 checked:outline-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                type="radio"
                                :name="`${formId}-propertyType`"
                                value="Residential"
                                required
                            />
                            <label
                                class="text-base"
                                :for="`${formId}-property-residential`"
                            >
                                Residential
                            </label>
                        </div>
                        <div class="flex items-center gap-x-2">
                            <input
                                :id="`${formId}-property-commercial`"
                                v-model="form.propertyType"
                                class="appearance-none rounded-2xl border bg-violet-100 p-1.5 outline-1 outline-violet-700 placeholder:opacity-90 checked:bg-green-400 checked:outline-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                type="radio"
                                :name="`${formId}-propertyType`"
                                value="Commercial"
                                required
                            />
                            <label
                                class="text-base"
                                :for="`${formId}-property-commercial`"
                            >
                                Commercial
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Services -->
                <div>
                    <div class="text-left font-semibold">
                        Select Your Services
                    </div>
                    <div class="w-full border-t-2 border-violet-400 pb-1"></div>
                    <div
                        class="xs:grid-cols-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
                        role="group"
                        aria-label="Select your services"
                        aria-required="true"
                    >
                        <div
                            v-for="(service, index) in activeServices"
                            :key="service.name"
                            class="mt-2 flex items-center gap-x-2 text-left"
                        >
                            <input
                                :id="`${formId}-service-${index}`"
                                v-model="form.services"
                                :value="service.name"
                                class="appearance-none border bg-violet-100 p-1.5 outline-1 outline-violet-700 placeholder:opacity-90 checked:bg-green-400 checked:outline-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                type="checkbox"
                            />
                            <label
                                :for="`${formId}-service-${index}`"
                                class="leading-4"
                            >
                                {{ service.name }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="w-full border-t-2 border-violet-400 pb-3"></div>
                <!-- Additional Details -->
                <div>
                    <label
                        :for="`${formId}-contact-details`"
                        class="block text-left font-semibold"
                    >
                        Additional Details (Optional)
                    </label>
                    <textarea
                        :id="`${formId}-contact-details`"
                        v-model.trim="form.details"
                        class="w-full rounded-sm border-none bg-slate-100/50 px-2 py-1 ring-2 ring-zinc-900 outline-none placeholder:opacity-90 focus:ring-3 focus:ring-green-500"
                        placeholder="Please provide anything you believe is important for me to know"
                        maxlength="3000"
                    />
                </div>
                <!-- A single widget stays inside the form on desktop, or moves
                     directly below this card on mobile (never to document.body). -->
                <Teleport
                    v-if="turnstileEnabled"
                    defer
                    :to="`#${formId}-turnstile-drawer`"
                    :disabled="!mobileTurnstile"
                >
                    <div
                        class="flex w-full justify-center max-[420px]:relative max-[420px]:left-1/2 max-[420px]:w-[max(100%,304px)] max-[420px]:max-w-[calc(100vw-16px)] max-[420px]:-translate-x-1/2"
                        :class="
                            mobileTurnstile && isTurnstileVisible
                                ? 'overflow-hidden rounded-xl border-0 max-[420px]:bg-slate-100 max-[420px]:shadow-lg'
                                : ''
                        "
                    >
                        <div
                            class="w-full max-w-100 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
                            :class="
                                isTurnstileVisible
                                    ? 'max-h-18.25 opacity-100'
                                    : 'max-h-0 opacity-0'
                            "
                        >
                            <div
                                class="rounded-xl bg-linear-to-r from-violet-700 via-violet-400 to-amber-500 p-1 shadow-md shadow-violet-950/20 max-[420px]:p-0.5"
                            >
                                <div
                                    class="h-16.25 overflow-hidden rounded-lg [clip-path:inset(0_round_8px)]"
                                >
                                    <div ref="turnstileContainer">
                                        <NuxtTurnstile
                                            v-if="turnstileReady"
                                            ref="turnstile"
                                            v-model="turnstileToken"
                                            :options="{
                                                theme: 'light',
                                                size: 'flexible',
                                                appearance: 'interaction-only',
                                            }"
                                            class="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Teleport>
                <!-- Submission Feedback -->
                <p
                    v-if="feedback"
                    role="status"
                    aria-live="polite"
                    class="text-sm font-semibold"
                    :class="
                        submissionSuccess ? 'text-green-700' : 'text-red-600'
                    "
                >
                    {{ feedback }}
                </p>
                <!-- Submit -->
                <button
                    class="main-font rounded-xl bg-violet-900 p-4 text-lg font-semibold text-white shadow-lg ring-3 shadow-violet-950/80 ring-violet-900 transition-all duration-300 hover:bg-transparent hover:text-green-700 hover:shadow-green-950/80 hover:ring-green-600 active:translate-y-1 active:bg-green-600 active:text-white active:shadow-none disabled:pointer-events-none disabled:cursor-wait disabled:opacity-70 md:text-xl"
                    type="submit"
                    :disabled="isSubmitting"
                    :aria-busy="isSubmitting"
                    :class="
                        isSubmitting
                            ? 'bg-green-600 text-white ring-0 hover:bg-green-600 hover:text-white'
                            : ''
                    "
                >
                    {{
                        isSubmitting ? 'Sending Request...' : 'Request a Quote'
                    }}
                </button>
                <p class="text-center text-xs text-slate-600">
                    I use your information to respond to your quote request.
                </p>
            </form>
        </div>
        <!-- An in-flow sibling of the styled card. Never fixed to the viewport or body. -->
        <div
            :id="`${formId}-turnstile-drawer`"
            class="hidden max-[420px]:block"
        ></div>
    </div>
</template>
<style scoped>
.turnstile-wrapper :deep(iframe) {
    border-radius: 20px;
    display: block;
    overflow: hidden;
}
</style>
