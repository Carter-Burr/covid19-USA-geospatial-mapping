mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FydGIyMCIsImEiOiJjbG9vdTlka2gwMXZlMnJwdHhkZGJ5ZHZsIn0.pe21frQ6A_Q5QZjbW9JfbA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 3.7, // starting zoom,
    center: [-98, 39],
    projection: 'albers' // starting center
});

map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function
    // when loading a geojson, there are two steps
    // add a source of the data and then add the layer out of the source
    map.addSource('counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });

    map.addLayer({
        'id': 'covid-point',
        'type': 'circle',
        'source': 'counts'
    });
    // click on tree to view magnitude in a popup
    
});