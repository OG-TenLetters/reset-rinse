export interface ServiceData {
    name: string
    to: string
    active: boolean

    description: {
        shorthand: string

        full: {
            general: string

            included: {
                heading: string
                paragraph: string
            }
        }
    }

    guarantees?: {
        title: string
        description: string
    }[]

    images: {
        card: string
        hero: string
        gallery: string[]
    }
}

export const ServicesData = {
    windows: {
        name: 'Window Cleaning',
        to: '/window-cleaning',
        active: true,

        description: {
            shorthand: 'Detailed Cleaning of Windows, Frames, and Tracks',

            full: {
                general:
                    'Professional interior and exterior window cleaning focused on clear glass, clean frames, detailed tracks, and a polished finish throughout your property.',

                included: {
                    heading: 'What We Detail',
                    paragraph:
                        'Our window cleaning service can include interior and exterior glass, window frames, sills, and tracks, with attention given to the areas where dirt, dust, and buildup commonly collect.',
                },
            },
        },

        guarantees: [
            {
                title: 'Clear Finish Guarantee',
                description:
                    'If visible cleaning residue or an area within the agreed scope was missed, let us know within 48 hours and we’ll return to address it. Permanent staining, scratches, damaged glass, and failed window seals are excluded.',
            },
        ],

        images: {
            card: '/test-images/test-5.jpg',
            hero: '/test-images/test-1.jpg',
            gallery: [
                '/test-images/test-1.jpg',
                '/test-images/test-2.jpg',
                '/test-images/test-3.jpg',
            ],
        },
    },

    gutters: {
        name: 'Gutter Cleaning',
        to: '/gutter-cleaning',
        active: true,

        description: {
            shorthand: 'Clearing of Gutters, Downspouts, and Any Debris',

            full: {
                general:
                    'Thorough removal of leaves, buildup, and debris from gutters and downspouts to help restore proper drainage and keep water moving where it should.',

                included: {
                    heading: 'What We Clear',
                    paragraph:
                        'Service includes removing accumulated leaves, needles, moss, and other debris from gutter channels, along with checking and clearing accessible downspout openings so water has a clear path away from the roofline.',
                },
            },
        },

        guarantees: [
            {
                title: 'Clear Path Guarantee',
                description:
                    '14 Day Guarantee - If an accessible gutter or downspout opening included in the agreed scope remains blocked by debris we missed, we’ll return to address it. New debris, concealed drainage problems, and underground drain lines are excluded.',
            },
        ],

        images: {
            card: '/test-images/test-6.jpg',
            hero: '/test-images/test-2.jpg',
            gallery: [
                '/test-images/test-2.jpg',
                '/test-images/test-3.jpg',
                '/test-images/test-4.jpg',
            ],
        },
    },

    washing: {
        name: 'Pressure/Soft Washing',
        to: '/pressure-soft-washing',
        active: true,

        description: {
            shorthand: 'Exterior Washing for Siding, Surfaces, and Grime',

            full: {
                general:
                    'Exterior cleaning using pressure, soft-washing, and/or carefully selected cleaning solutions tailored to the surface being cleaned, which helps remove dirt, organic buildup, and grime without using unnecessary pressure.',

                included: {
                    heading: 'How We Clean Your Exterior',
                    paragraph:
                        'Each surface is evaluated before cleaning so the appropriate combination of water pressure, cleaning solution, dwell time, and rinsing method can be used for siding and other exterior surfaces around the property.',
                },
            },
        },

        guarantees: [
            {
                title: 'Careful Cleaning Guarantee',
                description:
                    'If an area within the agreed scope was missed or cleaning residue from our work remains, we’ll return to address it. Permanent staining, oxidation, fading, surface deterioration, and pre-existing damage are excluded.',
            },
        ],

        images: {
            card: '/test-images/test-3.jpg',
            hero: '/test-images/test-3.jpg',
            gallery: [
                '/test-images/test-3.jpg',
                '/test-images/test-4.jpg',
                '/test-images/test-5.jpg',
            ],
        },
    },

    concrete: {
        name: 'Concrete Cleaning',
        to: '/concrete-cleaning',
        active: true,

        description: {
            shorthand: 'Deep Cleaning of Driveways, Walkways, and Patios',

            full: {
                general:
                    'Deep cleaning for concrete surfaces such as driveways, sidewalks, walkways, and patios to remove accumulated dirt, organic buildup, and surface grime.',

                included: {
                    heading: 'What We Clean',
                    paragraph:
                        'Concrete cleaning can cover driveways, sidewalks, walkways, patios, steps, and similar hard surfaces, with cleaning focused on lifting accumulated dirt, grime, and organic buildup from the surface.',
                },
            },
        },

        guarantees: [
            {
                title: 'Consistent Clean Guarantee',
                description:
                    'If an obvious section within the agreed cleaning area was missed, we’ll return to address it. Deep oil stains, rust, paint, mineral deposits, discoloration, and permanent surface staining are not guaranteed to be fully removed.',
            },
        ],

        images: {
            card: '/test-images/test-4.jpg',
            hero: '/test-images/test-4.jpg',
            gallery: [
                '/test-images/test-4.jpg',
                '/test-images/test-5.jpg',
                '/test-images/test-6.jpg',
            ],
        },
    },

    moss: {
        name: 'Moss Treatment',
        to: '/moss-treatment',
        active: true,

        description: {
            shorthand: 'Treatment of Roof Moss and Organic Buildup',

            full: {
                general:
                    'Targeted moss treatment designed to address roof growth and organic buildup while allowing the treatment process to work gradually without unnecessary damage to your roof.',

                included: {
                    heading: 'What the Treatment Covers',
                    paragraph:
                        'Moss treatment targets affected areas of the roof with a carefully applied treatment intended to kill existing moss and allow it to release gradually rather than relying on aggressive removal methods that may damage roofing materials.',
                },
            },
        },

        guarantees: [
            {
                title: 'Treatment Coverage Guarantee',
                description:
                    'If an agreed treatment area was missed during application, we’ll return to treat it. Moss treatment works gradually, so immediate removal or a specific timeline for moss release cannot be guaranteed.',
            },
        ],

        images: {
            card: '/test-images/test-2.jpg',
            hero: '/test-images/test-5.jpg',
            gallery: [
                '/test-images/test-5.jpg',
                '/test-images/test-6.jpg',
                '/test-images/test-1.jpg',
            ],
        },
    },

    holidayLights: {
        name: 'Holiday Light Install',
        to: '/holiday-light-Install',
        active: true,

        description: {
            shorthand: 'Professional Installation of Exterior Holiday Lighting',

            full: {
                general:
                    'Professional holiday light installation designed to create a clean, festive exterior display without the hassle of ladders, tangled lights, or difficult roofline access.',

                included: {
                    heading: 'What We Illuminate',
                    paragraph:
                        'Holiday light installation can include rooflines, gutters, peaks, columns, railings, and other suitable exterior areas, with careful placement focused on creating a clean and consistent finished appearance.',
                },
            },
        },

        guarantees: [
            {
                title: 'Installation Guarantee',
                description:
                    'If lighting installed by Reset Rinse becomes loose or requires adjustment due to our installation during the agreed display period, we’ll return to address it. Bulb failures, electrical issues, severe weather damage, and problems with customer-provided equipment are excluded.',
            },
        ],

        images: {
            card: '/test-images/holiday-lights-card.jpg',
            hero: '/test-images/holiday-lights-hero.jpg',
            gallery: [
                '/test-images/holiday-lights-1.jpg',
                '/test-images/holiday-lights-2.jpg',
                '/test-images/holiday-lights-3.jpg',
            ],
        },
    },
} satisfies Record<string, ServiceData>
