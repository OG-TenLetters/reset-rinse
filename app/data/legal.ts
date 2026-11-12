// Source: Reset Rinse policies, effective November 1, 2026.
// Only substantive edit: removed the deposit sentence from Terms section 7.
// Keep these documents in sync with the policies customers actually receive.
export type LegalBlock =
    { type: 'paragraph'; text: string } | { type: 'list'; items: string[] }

export interface LegalDocumentData {
    slug: 'terms' | 'privacy'
    title: string
    summary: string
    effectiveDate: string
    serviceArea?: string
    sections: {
        heading: string
        blocks: LegalBlock[]
    }[]
}

export const legalDocuments = {
    terms: {
        slug: 'terms',
        title: 'Service Terms & Conditions',
        summary:
            'Information about estimates, scheduling, service expectations, payments, and customer responsibilities.',
        effectiveDate: 'November 1, 2026',
        serviceArea: 'Clark County, Washington',
        sections: [
            {
                heading: 'Agreement to Services',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'By approving a written estimate or quote, the customer agrees to the services, pricing, and applicable terms provided by Reset Rinse.',
                    },
                    {
                        type: 'paragraph',
                        text: 'All services are performed according to the scope of work described in the approved estimate.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Any additional services, materials, or charges outside the approved scope require customer authorization before proceeding.',
                    },
                ],
            },
            {
                heading: 'Estimates and Pricing',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Estimates are based on the information available at the time of assessment, including property size, accessibility, condition, and requested services.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Estimates remain valid for 30 days unless otherwise stated.',
                    },
                    {
                        type: 'paragraph',
                        text: 'If previously undisclosed conditions require additional labor, equipment, or materials, Reset Rinse will communicate the changes and obtain authorization before performing additional billable work.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Applicable sales taxes will be included where required by Washington law.',
                    },
                ],
            },
            {
                heading: 'Scheduling and Cancellations',
                blocks: [
                    {
                        type: 'paragraph',
                        text: "Customers are encouraged to provide at least 24 hours' notice when requesting cancellation or rescheduling.",
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse does not currently impose standard cancellation or rescheduling fees.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Appointments may be rescheduled due to unsafe weather, hazardous property conditions, equipment problems, or circumstances beyond reasonable control.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Customers will be notified as soon as reasonably possible when a schedule adjustment becomes necessary.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Any cancellation rights established by applicable law take precedence over this policy.',
                    },
                ],
            },
            {
                heading: 'Property Access and Customer Responsibilities',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Customers agree to provide reasonable access to the areas included in the approved scope of work.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Depending on the service, customers may be asked to:',
                    },
                    {
                        type: 'list',
                        items: [
                            'Provide access to gates, exterior areas, or interior spaces.',
                            'Secure pets and keep children away from active work areas.',
                            'Remove fragile or valuable objects from designated workspaces.',
                            'Provide access to water or electricity when previously agreed.',
                            'Identify known hazards, damaged surfaces, leaks, or other conditions that could affect the service.',
                        ],
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse may postpone or decline work when conditions present unreasonable safety risks.',
                    },
                ],
            },
            {
                heading: 'Service Quality and Limitations',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse will perform services using reasonable care and methods appropriate for the surfaces and conditions encountered.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Cleaning results may vary depending on material condition, age, weather exposure, previous maintenance, and the nature of existing stains or deterioration.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Some conditions, including permanent staining, oxidation, mineral deposits, corrosion, and surface deterioration, may not be completely removable through standard cleaning.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Roof moss treatments may require additional time before their full effects become visible.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Specialized treatments, protective coatings, screen conditioning, and other optional services are included only when specified in the approved estimate.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse does not guarantee permanent prevention of dirt accumulation, moss growth, algae, or other naturally recurring conditions.',
                    },
                ],
            },
            {
                heading: 'Property Damage and Liability',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse will take reasonable precautions to protect customer property while performing services.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Customers are encouraged to disclose known defects, fragile materials, pre-existing damage, and other relevant property conditions before work begins.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse is not responsible for pre-existing damage or deterioration unrelated to its work.',
                    },
                    {
                        type: 'paragraph',
                        text: 'If property damage is believed to have resulted from a service, the customer should notify Reset Rinse promptly so the circumstances can be reviewed.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse will investigate reported damage in good faith and address responsibility in accordance with applicable law.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Nothing in these terms excludes liability that cannot legally be excluded.',
                    },
                ],
            },
            {
                heading: 'Payments and Billing',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Unless otherwise specified in the approved estimate, payment is due upon completion of services.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Customers may pay using the payment methods made available through the invoice or otherwise agreed upon.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse does not currently impose automatic late-payment penalties.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Customers experiencing payment difficulties are encouraged to contact Reset Rinse promptly to discuss available arrangements.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Charges for additional services must be authorized before being added to the final invoice.',
                    },
                ],
            },
            {
                heading: 'Customer Satisfaction and Service Concerns',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse values customer satisfaction and encourages customers to report concerns as soon as reasonably possible after service completion.',
                    },
                    {
                        type: 'paragraph',
                        text: 'When a concern relates to the quality or completeness of the agreed work, Reset Rinse will review the situation and determine an appropriate resolution.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Depending on the circumstances, this may involve clarification, corrective service, a partial adjustment, or another mutually acceptable solution.',
                    },
                    {
                        type: 'paragraph',
                        text: 'This process does not limit any rights or remedies available under applicable law.',
                    },
                ],
            },
            {
                heading: 'Photographs and Documentation',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse may photograph service areas before, during, or after work to document property conditions, communicate service recommendations, or maintain accurate job records.',
                    },
                    {
                        type: 'paragraph',
                        text: "These photographs may be stored securely with the customer's service history.",
                    },
                    {
                        type: 'paragraph',
                        text: "Photographs identifying a customer's property will not be published for advertising or promotional purposes without appropriate permission.",
                    },
                ],
            },
            {
                heading: 'Privacy and Customer Information',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Customer information may include names, contact details, service addresses, estimates, invoices, service history, and job-related photographs.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse uses this information to communicate with customers, schedule and perform services, maintain business records, and process payments.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Information may be processed through authorized business software and service providers, including customer-management and payment-processing platforms.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Additional information regarding data handling is provided in the Reset Rinse Privacy Policy.',
                    },
                ],
            },
            {
                heading: 'Recurring Services and Agreements',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Recurring services, maintenance plans, subscriptions, or equipment leases are subject to their own agreed service schedules and billing terms.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Service frequency, pricing, payment authorization, and cancellation conditions will be disclosed before enrollment.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Recurring payment authorization is not assumed solely because a customer previously purchased a service.',
                    },
                ],
            },
            {
                heading: 'Disputes and Resolution',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Customers are encouraged to contact Reset Rinse directly regarding disagreements about services, invoices, or property conditions.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Both parties agree to make a good-faith effort to resolve concerns through reasonable communication.',
                    },
                    {
                        type: 'paragraph',
                        text: 'These terms are governed by applicable Washington law.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Nothing in this agreement limits nonwaivable consumer protections or prevents a customer from exercising rights available under applicable law.',
                    },
                ],
            },
            {
                heading: 'Contact Information',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Questions, service concerns, cancellation requests, and billing inquiries may be directed to:',
                    },
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse',
                    },
                    {
                        type: 'paragraph',
                        text: 'Email: hello@resetrinse.com',
                    },
                    {
                        type: 'paragraph',
                        text: 'Website: https://resetrinse.com',
                    },
                    {
                        type: 'paragraph',
                        text: 'These terms apply to services performed under an approved estimate unless different terms are expressly agreed upon in writing.',
                    },
                ],
            },
        ],
    },
    privacy: {
        slug: 'privacy',
        title: 'Privacy Policy',
        summary:
            'How Reset Rinse collects, uses, and protects information shared through our website and services.',
        effectiveDate: 'November 1, 2026',
        sections: [
            {
                heading: 'Information We Collect',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse collects information necessary to provide property-care services and respond to customer inquiries.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Depending on how customers interact with our business, this information may include:',
                    },
                    {
                        type: 'list',
                        items: [
                            'Name and contact information.',
                            'Property and service addresses.',
                            'Requested services and appointment details.',
                            'Estimates, invoices, and payment records.',
                            'Service history and property photographs.',
                            'Messages and other information voluntarily provided.',
                            'Technical information associated with website visits and form submissions.',
                        ],
                    },
                ],
            },
            {
                heading: 'How We Use Information',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'We use customer information to:',
                    },
                    {
                        type: 'list',
                        items: [
                            'Respond to inquiries and provide estimates.',
                            'Schedule and perform services.',
                            'Communicate about appointments and service updates.',
                            'Process payments and maintain transaction records.',
                            'Maintain customer and property service histories.',
                            'Improve our services and customer experience.',
                            'Meet applicable accounting, tax, and legal obligations.',
                        ],
                    },
                ],
            },
            {
                heading: 'Business Software and Service Providers',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse uses third-party business technology providers to support its operations.',
                    },
                    {
                        type: 'paragraph',
                        text: 'These may include website hosting services, email providers, customer-management software such as Jobber, payment processors, analytics services, and security tools.',
                    },
                    {
                        type: 'paragraph',
                        text: 'These providers may process customer information as necessary to deliver their services.',
                    },
                    {
                        type: 'paragraph',
                        text: 'We do not sell customer contact information to third-party advertisers.',
                    },
                ],
            },
            {
                heading: 'Payment Information',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Payments are processed using authorized third-party payment services.',
                    },
                    {
                        type: 'paragraph',
                        text: "Payment information is handled according to the applicable payment provider's security practices and privacy policies.",
                    },
                    {
                        type: 'paragraph',
                        text: 'Customers should not submit payment card information through ordinary website contact forms or email.',
                    },
                ],
            },
            {
                heading: 'Property Photographs',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Photographs may be taken for service documentation, quality assessment, and maintaining accurate customer records.',
                    },
                    {
                        type: 'paragraph',
                        text: 'We will seek appropriate permission before using identifiable customer property photographs for public marketing purposes.',
                    },
                ],
            },
            {
                heading: 'Data Protection and Retention',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'We take reasonable measures to protect customer information from unauthorized access, disclosure, or misuse.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Information is retained for as long as reasonably necessary to provide services, maintain legitimate business records, and fulfill applicable legal obligations.',
                    },
                ],
            },
            {
                heading: 'Customer Communications',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Customers may receive communications related to estimates, appointments, invoices, payments, and service updates.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Promotional communications will be sent only where permitted by applicable law. Customers may request to stop receiving optional marketing communications.',
                    },
                ],
            },
            {
                heading: 'Website Analytics and Security',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Our website may use technical tools to monitor performance, understand website traffic, prevent spam, and protect against misuse.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Depending on the tools enabled, these services may process technical information such as IP addresses, browser information, and interaction data.',
                    },
                ],
            },
            {
                heading: 'Customer Privacy Requests',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Customers may contact Reset Rinse to request information about their personal data or ask for corrections or deletion where applicable.',
                    },
                    {
                        type: 'paragraph',
                        text: 'Certain information may need to be retained for legal, accounting, or legitimate business purposes.',
                    },
                ],
            },
            {
                heading: 'Policy Updates',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'This Privacy Policy may be updated to reflect changes in our business practices, technology, or applicable legal requirements.',
                    },
                    {
                        type: 'paragraph',
                        text: 'The current version will be made available through our website.',
                    },
                ],
            },
            {
                heading: 'Contact',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Reset Rinse',
                    },
                    {
                        type: 'paragraph',
                        text: 'Email: hello@resetrinse.com',
                    },
                    {
                        type: 'paragraph',
                        text: 'Website: https://resetrinse.com',
                    },
                ],
            },
        ],
    },
} satisfies Record<'terms' | 'privacy', LegalDocumentData>
