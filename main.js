window.onload = init;

function init() {

    const mapElement = document.getElementById('mapid')

    const stadiaMaps = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    })

    const openStreetMapStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    const mymap = L.map(mapElement, {
        center: [48, 14],
        zoom: 5,
        minZoom: 4,
        layers: [openStreetMapStandard]
    })

    const baseLayers = {
        '<b>openStreetMapStandard</b>': openStreetMapStandard,
        'stadiaMaps': stadiaMaps
    }

    const layerControls = L.control.layers(baseLayers, {}, {
        collapsed: false,
        position: 'topright'
    }).addTo(mymap)
}