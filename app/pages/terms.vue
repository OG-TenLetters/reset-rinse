<script setup lang="ts">
import LegalDocument from '~/components/legal/LegalDocument.vue'
import { legalDocuments } from '~/data/legal'

const policy = legalDocuments.terms
const url = 'https://resetrinse.com/terms'

useSeoMeta({
    title: 'Service Terms & Conditions | Reset Rinse',
    description:
        'Read the Reset Rinse service terms covering estimates, scheduling, payments, responsibilities, and service expectations in Clark County, WA.',
    ogTitle: 'Service Terms & Conditions | Reset Rinse',
    ogDescription: policy.summary,
    ogUrl: url,
    ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: url }] })
</script>

<template>
    <LegalDocument :policy="policy" />
</template>
