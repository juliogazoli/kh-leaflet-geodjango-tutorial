window.onload = init;

function init() {

    // HTML element
    const mapElement = document.getElementById('mapid')

    // Basemaps
    const openStreetMapStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        noWrap: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    const stadiaMaps = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    })

    // Leaflet map object
    const mymap = L.map(mapElement, {
        center: [48, 14],
        zoom: 2,
        minZoom: 1,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        easeLinearity: 0.2,
        worldCopyJump: true,
        layers: [openStreetMapStandard]
    })

    // Basemap Object
    const baseLayers = {
        '<b>openStreetMapStandard</b>': openStreetMapStandard,
        'stadiaMaps': stadiaMaps
    }

    // Overlays
    const perthBaseMapImage = './Data/Perth_Image.png'
    const perthBaseMapBounds = [[-41.30724736172, 112.5164607767221], [-22.42303778128779, 135.0225544458992]]
    const imagePerthOverlay = L.imageOverlay(perthBaseMapImage, perthBaseMapBounds)

    // Overlay object
    const overlayerLayers = {
        'Perth image': imagePerthOverlay
    }

    // Layer control
    const layerControl = L.control.layers(baseLayers, overlayerLayers, {
        collapsed: false,
        position: 'topright'
    }).addTo(mymap)

    // Perth marker
    const perthMarker = L.marker([-32.01791974628008, 115.89434607367286], {
        title: 'Perth city',
        opacity: 0.5,
    }).addTo(mymap)

    const perthMarkerPopup = perthMarker.bindPopup('Perth city from the popup')
    const perthMarkerTooltip = perthMarker.bindTooltip('Perth city from the tooltip').openTooltip()

    // Geolocation API
    mymap.locate({ setView: true, maxZoom: 18 })

    function onLocationFound(e) {
        var radius = e.accuracy.toFixed(2)

        var locationMarker = L.marker(e.latlng).addTo(mymap)
            .bindPopup('You are within ' + radius + ' metres from this point').openPopup()

        var locationCircle = L.circle(e.latlng, radius).addTo(mymap)
    }

    mymap.on('locationfound', onLocationFound)

    function onLocationError(e) {
        window.alert(e.message)
    }

    mymap.on('locationerror', onLocationError)

    // Distance calculation demo
    var counter = 0
    var coordinates = []

    mymap.on('click', function (e) {
        counter += 1
        let latlng = e.latlng
        coordinates.push(latlng)

        let popup = L.popup({
            autoClose: false,
            closeOnClick: false
        }).setContent(String(counter))

        L.marker(latlng)
            .addTo(mymap)
            .bindPopup(popup)
            .openPopup()

        if (counter >= 2) {
            let distance = mymap.distance(coordinates[0], coordinates[1])
            console.log(distance)
            coordinates.shift()
        }
    })
}