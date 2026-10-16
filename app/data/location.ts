export interface ServiceLocation {
    name: string
    slug: string
    active: boolean

    seo?: {
        title: string
        description: string
    }

    content?: {
        heading: string
        introduction: string
    }
}

export interface ServiceCounty {
    name: string
    active: boolean
    locations: ServiceLocation[]
}

export interface ServiceState {
    name: string
    abbreviation: string
    active: boolean
    counties: Record<string, ServiceCounty>
}

export const ServiceLocations = {
    washington: {
        name: 'Washington',
        abbreviation: 'WA',
        active: true,

        counties: {
            clark: {
                name: 'Clark County',
                active: true,

                locations: [
                    {
                        name: 'Vancouver',
                        slug: 'vancouver',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Vancouver, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Vancouver, Washington.',
                        },

                        content: {
                            heading: 'Property Care Services in Vancouver, WA',
                            introduction:
                                'Reset Rinse provides professional exterior property care in Vancouver, with services designed to keep windows, gutters, siding, concrete, and other exterior surfaces looking well maintained.',
                        },
                    },

                    {
                        name: 'Hazel Dell',
                        slug: 'hazel-dell',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Hazel Dell, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Hazel Dell, Washington.',
                        },

                        content: {
                            heading: 'Property Care Services in Hazel Dell, WA',
                            introduction:
                                'Reset Rinse provides exterior property care throughout Hazel Dell, helping homeowners maintain cleaner windows, gutters, siding, concrete, and other outdoor surfaces.',
                        },
                    },

                    {
                        name: 'Salmon Creek',
                        slug: 'salmon-creek',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Salmon Creek, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Salmon Creek, Washington.',
                        },

                        content: {
                            heading:
                                'Property Care Services in Salmon Creek, WA',
                            introduction:
                                'Reset Rinse serves properties throughout Salmon Creek with detailed exterior cleaning and maintenance services for windows, gutters, siding, concrete, and roof moss.',
                        },
                    },

                    {
                        name: 'Battle Ground',
                        slug: 'battle-ground',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Battle Ground, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Battle Ground, Washington.',
                        },

                        content: {
                            heading:
                                'Property Care Services in Battle Ground, WA',
                            introduction:
                                'Reset Rinse provides professional property care in Battle Ground, helping maintain residential exteriors through detailed cleaning and surface-appropriate treatment methods.',
                        },
                    },

                    {
                        name: 'Ridgefield',
                        slug: 'ridgefield',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Ridgefield, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Ridgefield, Washington.',
                        },

                        content: {
                            heading: 'Property Care Services in Ridgefield, WA',
                            introduction:
                                'Reset Rinse provides exterior property care in Ridgefield, with services focused on maintaining clean windows, clear gutters, washed surfaces, and well-kept outdoor areas.',
                        },
                    },

                    {
                        name: 'Camas',
                        slug: 'camas',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Camas, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Camas, Washington.',
                        },

                        content: {
                            heading: 'Property Care Services in Camas, WA',
                            introduction:
                                'Reset Rinse provides professional exterior cleaning services in Camas, helping homeowners care for windows, gutters, siding, concrete, roofs, and other exterior surfaces.',
                        },
                    },

                    {
                        name: 'Brush Prairie',
                        slug: 'brush-prairie',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Brush Prairie, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Brush Prairie, Washington.',
                        },

                        content: {
                            heading:
                                'Property Care Services in Brush Prairie, WA',
                            introduction:
                                'Reset Rinse provides professional exterior property care in Brush Prairie, offering detailed cleaning and maintenance for the surfaces that protect and shape your property.',
                        },
                    },

                    {
                        name: 'Five Corners',
                        slug: 'five-corners',
                        active: true,

                        seo: {
                            title: 'Property Care Services in Five Corners, WA | Reset Rinse',
                            description:
                                'Professional window cleaning, gutter cleaning, exterior washing, concrete cleaning, and moss treatment in Five Corners, Washington.',
                        },

                        content: {
                            heading:
                                'Property Care Services in Five Corners, WA',
                            introduction:
                                'Reset Rinse provides exterior property care in Five Corners, helping homeowners maintain cleaner windows, gutters, siding, concrete, and roof surfaces.',
                        },
                    },
                ],
            },
        },
    },

    oregon: {
        name: 'Oregon',
        abbreviation: 'OR',
        active: false,

        counties: {
            multnomah: {
                name: 'Multnomah County',
                active: false,
                locations: [],
            },
        },
    },
} satisfies Record<string, ServiceState>
