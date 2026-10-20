export interface TestimonialData {
    id: string
    name: string
    rating: number
    review: string

    source: {
        name: 'google' | 'yelp' | 'direct'
        url?: string
    }

    service?: string
    location?: string
    date?: string

    featured: boolean
    active: boolean
}

export const TestimonialsData = [
    {
        id: 'review-001',

        name: 'John D.',
        rating: 5,

        review: 'Reset Rinse did a fantastic job on our windows. Everything looked clean and polished when they finished.',

        source: {
            name: 'google',
            url: 'https://...',
        },

        service: 'windows',
        location: 'vancouver',
        date: '2026-10-01',

        featured: true,
        active: true,
    },
] satisfies TestimonialData[]
