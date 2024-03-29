mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FydGIyMCIsImEiOiJjbG9vdTlka2gwMXZlMnJwdHhkZGJ5ZHZsIn0.pe21frQ6A_Q5QZjbW9JfbA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11',
    zoom: 3.65, // starting zoom,
    center: [-98, 39],
    projection: 'albers' // starting center
});

const grades = [0, 4000, 8000, 12000, 18000],
    colors = ['rgb(255,240,240)', 'rgb(255,186,186)', 'rgb(247,148,148)', 'rgb(255,89,89)', 'rgb(252,30,30)'],
    radii = [3, 6, 9, 12, 15];

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
        'source': 'counts',
        'paint': {
            // increase the radii of the circle as the zoom level and dbh value increases
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [grades[0], radii[0]],
                    [grades[1], radii[1]],
                    [grades[2], radii[2]],
                    [grades[3], radii[3]],
                    [grades[4], radii[4]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]],
                    [grades[3], colors[3]],
                    [grades[4], colors[4]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });



    map.on('click', 'covid-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>County :</strong> ${event.features[0].properties.county}` + `<strong> Cases:</strong> ${event.features[0].properties.cases}`)
            .addTo(map);
    });

    
    const legend = document.getElementById('legend');
    //set up legend grades and labels
    var labels = ['<strong>Number of Cases per county 2020</strong>'],
        vbreak;
    //iterate through grades and create a scaled circle and label for each
    for (var i = 0; i < grades.length; i++) {
        vbreak = ">" + grades[i];
        // you need to manually adjust the radius of each dot on the legend 
        // in order to make sure the legend can be properly referred to the dot on the map.
        dot_radii = 2 * radii[i];
        labels.push(
            '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
            'px; height: ' +
            dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
            '</span></p>');
    }

    const source =
            '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a></p>';
        // combine all the html codes.
        legend.innerHTML = labels.join('') + source;

});