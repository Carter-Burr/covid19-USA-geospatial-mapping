mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FydGIyMCIsImEiOiJjbG9vdTlka2gwMXZlMnJwdHhkZGJ5ZHZsIn0.pe21frQ6A_Q5QZjbW9JfbA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    zoom: 3.65, // starting zoom,
    center: [-98, 39],
    projection: 'albers' // starting center
});


map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function
    // when loading a geojson, there are two steps
    // add a source of the data and then add the layer out of the source
    map.addSource('rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json'
    });

    map.addLayer({
        'id': 'county-rates',
        'type': 'fill',
        'source': 'rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0',   // stop_output_0
                20,          // stop_input_0
                '#FEB24C',   // stop_output_1
                40,          // stop_input_1
                '#FD8D3C',   // stop_output_2
                60,          // stop_input_2
                '#FC4E2A',   // stop_output_3
                80,         // stop_input_3
                '#E31A1C',   // stop_output_4
                100,         // stop_input_4
                '#800026'   // stop_output_5   
            ],
            'fill-outline-color': '#8c8b8b',
            'fill-opacity': 0.7,
        }
    });

    map.on('mousemove', ({point}) => {
        const count = map.queryRenderedFeatures(point, {
            layers: ['county-rates']
        });
        document.getElementById('text-description').innerHTML = count.length ?
            `<h3>${count[0].properties.county} County</h3><p><strong><em>${count[0].properties.rates}</strong> Covid Cases per 1000</em></p>` :
            `<p>Hover over a state!</p>`;
    });

});

const layers = [
    '0-19',
    '20-39',
    '40-59',
    '60-79',
    '80-99',
    '100 or more'
];
const colors = [
    '#FFEDA070',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
    '#80002670'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Covid cases per 1000 residents <br></b>(2020?)<br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});
