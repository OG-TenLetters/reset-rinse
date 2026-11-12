<script setup lang="ts">
import LegalDocument from '~/components/legal/LegalDocument.vue'
import { legalDocuments } from '~/data/legal'

const policy = legalDocuments.privacy
const url = 'https://resetrinse.com/privacy'

useSeoMeta({
    title: 'Privacy Policy | Reset Rinse',
    description:
        'Learn how Reset Rinse collects, uses, and protects customer information, website submissions, and service records.',
    ogTitle: 'Privacy Policy | Reset Rinse',
    ogDescription: policy.summary,
    ogUrl: url,
    ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: url }] })
</script>

<template>
    <LegalDocument :policy="policy" />
</template>
