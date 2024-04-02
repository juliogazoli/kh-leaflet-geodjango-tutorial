window.onload = init;

function init() {

    const mapElement = document.getElementById('mapid')

    const mymap = L.map(mapElement, {
        center: [48, 14],
        zoom: 5,
        minZoom: 4,
        layers: [
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })
        ]
    })

    mymap.on('resize', function (e) {
        console.log('The map has been resized')
    })

    mymap.on('resize', function (e) {
        mymap.flyTo([0, 0])
    })

    console.log(mymap.getPanes().tilePane)
}