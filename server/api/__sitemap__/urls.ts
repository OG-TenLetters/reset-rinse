import { defineSitemapEventHandler } from '#sitemap/server'
import { ServicesData } from '~/data/services'

export default defineSitemapEventHandler(() => {
    return Object.values(ServicesData)
        .filter((service) => service.active)
        .map((service) => ({
            loc: service.to,
        }))
})
