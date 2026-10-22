<script setup lang="ts">
import {
    Map,
    LngLatBounds,
    setWorkerUrl,
    type Map as MapLibreMap,
} from 'maplibre-gl'

import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'

import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl(workerUrl)

const props = defineProps<{
    hoveredLocation: string | null
    selectedLocation: string | null
}>()

const mapContainer = ref<HTMLElement | null>(null)

let map: MapLibreMap | null = null

type GeoFeature = {
    type: 'Feature'
    properties: {
        name: string
        slug: string
        kind: string
    }
    geometry: {
        type: string
        coordinates: unknown
    }
}

type GeoCollection = {
    type: 'FeatureCollection'
    features: GeoFeature[]
}

let geographicData: GeoCollection | null = null

function getBounds(feature: GeoFeature): LngLatBounds {
    const bounds = new LngLatBounds()

    function processCoordinates(coordinates: unknown) {
        if (!Array.isArray(coordinates)) return

        if (
            typeof coordinates[0] === 'number' &&
            typeof coordinates[1] === 'number'
        ) {
            bounds.extend([coordinates[0] as number, coordinates[1] as number])
            return
        }

        coordinates.forEach(processCoordinates)
    }

    processCoordinates(feature.geometry.coordinates)

    return bounds
}

function findLocation(slug: string) {
    return geographicData?.features.find(
        (feature) => feature.properties.slug === slug
    )
}

function updateHighlight() {
    if (!map || !map.getLayer('hovered-location')) return

    map.setFilter('hovered-location', [
        '==',
        ['get', 'slug'],
        props.hoveredLocation ?? '',
    ])

    map.setFilter('selected-location', [
        '==',
        ['get', 'slug'],
        props.selectedLocation ?? '',
    ])
}

function updateZoom() {
    if (!map || !geographicData) return

    const feature = props.selectedLocation
        ? findLocation(props.selectedLocation)
        : findLocation('clark')

    if (!feature) return

    map.fitBounds(getBounds(feature), {
        padding: 35,
        duration: 800,
        maxZoom: props.selectedLocation ? 12 : 10,
    })
}

watch(() => props.hoveredLocation, updateHighlight)

watch(
    () => props.selectedLocation,
    () => {
        updateHighlight()
        updateZoom()
    }
)

onMounted(async () => {
    if (!mapContainer.value) return

    const response = await fetch('/maps/service-areas.geojson')

    if (!response.ok) {
        console.error('Unable to load service-area boundaries')
        return
    }

    geographicData = (await response.json()) as GeoCollection

    map = new Map({
        container: mapContainer.value,

        style: 'https://api.maptiler.com/maps/hybrid-v4/style.json?key=I6Ll040Ey7wKxIgSpTSv',

        center: [-122.5, 45.75],
        zoom: 8,
        // Restrict the visible geographic area
        maxBounds: [
            [-123.05, 45.35], // Southwest
            [-122.2, 46.05], // Northeast
        ],

        // Restrict zoom levels
        minZoom: 8,
        maxZoom: 16,

        interactive: true,
        attributionControl: {
            compact: true,
        },
    })

    map.on('load', () => {
        if (!map || !geographicData) return

        map.addSource('service-areas', {
            type: 'geojson',
            data: geographicData as any,
        })

        // County background
        map.addLayer({
            id: 'county-fill',
            type: 'fill',
            source: 'service-areas',
            filter: ['==', ['get', 'kind'], 'county'],
            paint: {
                'fill-color': '#ede9fe',
                'fill-opacity': 0.2,
            },
        })

        // County outline
        map.addLayer({
            id: 'county-outline',
            type: 'line',
            source: 'service-areas',
            filter: ['==', ['get', 'kind'], 'county'],
            paint: {
                'line-color': '#7c3aed',
                'line-width': 3,
            },
        })

        // Default location outlines
        map.addLayer({
            id: 'location-outlines',
            type: 'line',
            source: 'service-areas',
            filter: ['==', ['get', 'kind'], 'place'],
            paint: {
                'line-color': '#a78bfa',
                'line-width': 1.5,
            },
        })

        // Selected location
        map.addLayer({
            id: 'selected-location',
            type: 'fill',
            source: 'service-areas',
            filter: ['==', ['get', 'slug'], ''],
            paint: {
                'fill-color': '#6d28d9',
                'fill-opacity': 0.2,
            },
        })

        // Hovered location
        map.addLayer({
            id: 'hovered-location',
            type: 'line',
            source: 'service-areas',
            filter: ['==', ['get', 'slug'], ''],
            paint: {
                'line-color': '#f59e0b',
                'line-width': 2,
            },
        })

        updateHighlight()
        updateZoom()
    })
})

onBeforeUnmount(() => {
    map?.remove()
    map = null
})
</script>

<template>
    <div ref="mapContainer" class="h-full w-full" />
</template>
