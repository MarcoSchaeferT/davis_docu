
function drawLayer(countryContoursData, countryVisData, mapObj) {
  let map = mapObj;

  // wait for geojson data (country polygons)
  countryContoursData.then((contoursData) => {
    const catCnt = 5; // number of categories
    const opacity = 0.9;

    // color scale function
    let colorScale = d3.scaleOrdinal()
      .domain(d3.range(0, catCnt))
      .range(['#d2d1d1ff', '#a5d5d8', '#73a2c6', '#4771b2', '#00429d']);
    //['#FFFFFF', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C']


    function getColor(count) {
      /*
      if (count <= 0) return colorScale(0);
      if (count <= 3) return colorScale(1);
      if (count <= 6) return colorScale(2);
      if (count <= 9) return colorScale(3);
      */
      if (count >= catCnt) return colorScale(catCnt - 1);
      return colorScale(count);

    }

    // Convert countryData into a lookup dictionary
    let countryLookup = {};
    countryVisData.forEach(d => {
      countryLookup[d.country] = d.count;
    });

    // add GeoJSON layer
    L.geoJson(contoursData, {
      style: function (feature) {
        const countryName = feature.properties.name; // Get country name from GeoJSON
        const count = countryLookup[countryName] || 0; // Lookup count
        return {
          fillColor: getColor(count),
          weight: 1.8,
          opacity: opacity,
          color: '#ffffffff',
          lineJoin: 'round',
          lineCap: 'round',
          fillOpacity: opacity
        };
      },


      onEachFeature: function (feature, layer) {
        const countryName = feature.properties.name;
        var count = countryLookup[countryName] || 0;

        // add tooltip

        layer.bindTooltip(
          `<div style="
          min-width:110px;
          padding:4px 8px;
          border-radius:6px;
          font-size:12px;
          background-color:rgba(33,33,33,0.85);
          color:#fff;
          text-align:center;">
             <div style="font-weight:600;">${countryName}</div>
             <div>${count} collaborator${count <= 1 ? '' : 's'}</div>
           </div>`,
          { direction: 'top', sticky: true, offset: [0, -8], opacity: 1 }
        );
        layer.on('mouseover', () => layer.setStyle({ weight: 2, fillOpacity: 1 }));
        layer.on('mouseout', () => layer.setStyle({ weight: 0.8, fillOpacity: opacity }));


        // add text lable to map
        if (count > 0) {
          layer.on('add', function () {
            const countryName = feature.properties.name;
            const count = countryLookup[countryName] || 0;
            const center = layer.getBounds().getCenter();
            // Adjust center for some countries (e.g., Russia)
            if (countryName == "Russia") {
              center.lng = 105.3188;
              center.lat = 61.5240;
            }

            // add marker with divIcon 
            /*
            L.marker(center, {
              icon: L.divIcon({
                className: '',
                html: `<div style="font-size: ${fontSize}px; background-color: white; text-align: center; border-radius: 5px;">
                  <b>${count}</b>
                  </div>`,
                iconSize: [15, 20] // size of the icon
              })
            }).addTo(map);
            */

          });
        }
      }
    }).addTo(map);



    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const legendData = [{ label: (catCnt - 1) + '+', color: colorScale(catCnt - 1) }].concat(
        d3.range(catCnt - 2, -1, -1).map(value => ({
          label: `${value}`,
          color: colorScale(value)
        }))
      );

      const items = d3.select(div)
        .selectAll('div.legend-item')
        .data(legendData)
        .enter()
        .append('div')
        .attr('class', 'legend-item')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-bottom', '4px');

      items.append('span')
        .style('display', 'inline-block')
        .style('width', '14px')
        .style('height', '14px')
        .style('background', d => d.color)
        .style('opacity', opacity)
        .style('border', '1px solid #ccc')
        .style('margin-right', '6px');

      items.append('span')
        .text(d => d.label);

      return div;
    };

    // add legend to map
    legend.addTo(map);

    // add scale to map
    //L.control.scale().addTo(map);

    // add border to map container
    const mapContainer = map.getContainer();
    if (mapContainer) {
      // mapContainer.style.border = '0.5px solid #000000';
    }
  });
}
