
function drawLayer(geoJSON_URL, countryData, mapObj) {
  let map = mapObj;
  // load geojson data (country polygons)
  d3.json(geoJSON_URL).then(function (geojsonData) {

    // color scale function
    let colorScale = d3.scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5])
      .range(['#FFFFFF', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C']);

    function getColor(count) {
      return colorScale(count);
    }

    // Convert countryData into a lookup dictionary
    let countryLookup = {};
    countryData.forEach(d => {
      countryLookup[d.country] = d.count;
    });

    // add GeoJSON layer
    L.geoJson(geojsonData, {
      style: function (feature) {
        const countryName = feature.properties.name; // Get country name from GeoJSON
        const count = countryLookup[countryName] || 0; // Lookup count
        return {
          fillColor: count <= 5 ? getColor(count) : '#BD0026',
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        };
      },


      onEachFeature: function (feature, layer) {
        const countryName = feature.properties.name;
        var count = countryLookup[countryName] || 0;

        // add tooltip
        layer.bindPopup(`<strong>${countryName}</strong>: ${count}`);

        // add text lable to map
        if (count > 0) {
          layer.on('add', function () {
            const countryName = feature.properties.name;
            const count = countryLookup[countryName] || 0;
            const center = layer.getBounds().getCenter();
            const fontSize = 12; // Adjust font size based on zoom level

            L.marker(center, {
              icon: L.divIcon({
                className: '',
                html: `<div style="font-size: ${fontSize}px; background-color: white; text-align: center; border-radius: 5px;">
                  <b>${count}</b>
                  </div>`,
                iconSize: [15, 20] // size of the icon
              })
            }).addTo(map);

          });
        }
      }
    }).addTo(map);

    // add scale
    L.control.scale().addTo(map);
  });
}
