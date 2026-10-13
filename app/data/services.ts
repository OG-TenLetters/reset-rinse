export interface ServiceLink {
    name: string
    to: string
    active: boolean
}

export const serviceLinks: Record<string, ServiceLink> = {
    windows: {
        name: 'Window Cleaning',
        to: '/window-cleaning',
        active: true,
    },

    gutters: {
        name: 'Gutter Cleaning',
        to: '/gutter-cleaning',
        active: true,
    },

    washing: {
        name: 'Power/Soft Washing',
        to: '/pressure-washing',
        active: true,
    },

    concrete: {
        name: 'Concrete Cleaning',
        to: '/concrete-cleaning',
        active: true,
    },

    moss: {
        name: 'Moss Treatment',
        to: '/moss-treatment',
        active: true,
    },
}
