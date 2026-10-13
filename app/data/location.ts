export interface ServiceCity {
    name: string
    slug: string
    active: boolean
}

export interface ServiceCounty {
    name: string
    state: string
    cities: ServiceCity[]
}

export const serviceLocations = {
    states: {
        washington: {
            name: 'Washington',
            abbreviation: 'WA',

            counties: {
                clark: {
                    name: 'Clark County',
                    state: 'WA',

                    cities: [
                        {
                            name: 'Vancouver',
                            slug: 'vancouver',
                            active: true,
                        },
                        {
                            name: 'Hazel Dell',
                            slug: 'hazel-dell',
                            active: true,
                        },
                        {
                            name: 'Salmon Creek',
                            slug: 'salmon-creek',
                            active: true,
                        },
                        {
                            name: 'Battle Ground',
                            slug: 'battle-ground',
                            active: true,
                        },
                        {
                            name: 'Ridgefield',
                            slug: 'ridgefield',
                            active: true,
                        },
                        {
                            name: 'Camas',
                            slug: 'camas',
                            active: true,
                        },
                        {
                            name: 'Brush Prairie',
                            slug: 'brush-prairie',
                            active: true,
                        },
                        {
                            name: 'Five Corners',
                            slug: 'five-corners',
                            active: true,
                        },
                    ],
                },
            },
        },

        oregon: {
            name: 'Oregon',
            abbreviation: 'OR',

            counties: {
                multnomah: {
                    name: 'Multnomah County',
                    state: 'OR',
                    cities: [],
                },
            },
        },
    },
}
