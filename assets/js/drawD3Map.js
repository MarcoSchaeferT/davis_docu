
function drawLayer(countryContoursData, countryVisData, mapObj) {

  const container = mapObj instanceof HTMLElement ? mapObj : document.querySelector('#mapD3');
  if (!container) return;
  if (window.getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }
  const bounds = container.getBoundingClientRect();
  const height = bounds.height;


  const root = d3.select(container);
  root.select('svg.d3-choropleth').remove();


  const width = bounds.width;
  const svg = root.append('svg')
    .attr('class', 'd3-choropleth')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#ffffff00')
    .attr('viewBox', `0 0 ${width} ${height}`);

  const catCnt = 5; // number of categories
  const opacity = 0.99;
  const outlineColor = '#d2d1d1ff';

  // color scale function
  let colorScale = d3.scaleOrdinal()
    .domain(d3.range(0, catCnt))
    .range(['#FFFFFF', '#a5d5d8', '#73a2c6', '#4771b2', '#00429d']);
  //['#FFFFFF', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C']


  function getColor(count) {
    if (count >= catCnt) return colorScale(catCnt - 1);
    return colorScale(count);
  }

  // create tooltip
  const tooltip = root.select('.map-tooltip').empty()
    ? root.append('div')
      .attr('class', 'map-tooltip')
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('padding', '4px 8px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('background', 'rgba(33,33,33,0.85)')
      .style('color', '#fff')
      .style('display', 'none')
    : root.select('.map-tooltip');

  countryContoursData.then(geojson => {

    // Convert countryData into a lookup dictionary
    let countryLookup = {};
    if (countryVisData && typeof countryVisData === 'object' && !Array.isArray(countryVisData)) {
      countryVisData = Object.entries(countryVisData).map(([country, count]) => {
        const value = Number(count) || 0;
        countryLookup[country] = value;
        return { country, count: value };
      });
    } else {
      countryVisData.forEach(d => {
        countryLookup[d.country] = d.count;
      });
    }

    // create projection and path
    const projection = d3.geoInterruptedSinusoidal()
      .translate([width / 2 + -30, height / 2]) //
      .scale(120) //
      .precision(0.1);
    const path = d3.geoPath(projection);

    // clipping outline
    // defines a "Sphere" --- outline of the lobes
    const outline = { type: "Sphere" };
    const defs = svg.append("defs");

    /*****************************************
     * Clip Path for Interrupted Projections *
     *****************************************/

    // path definition (the clipping mask)
    defs.append("clipPath")
      .attr("id", "lobe-clipper")
      .append("path")
      .attr("d", path(outline));
    /***************************************** */


    // draw world gridlines
    const grid = d3.geoGraticule().step([10, 10]);
    svg.append('g')
      .attr('clip-path', 'url(#lobe-clipper)')
      .append('path')
      .datum(grid())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', outlineColor)
      .attr('stroke-width', 0.3)
      .attr('stroke-opacity', 0.99)
      .attr('pointer-events', 'none');


    // add GeoJSON layer (country contours)
    const features = (geojson && geojson.features) ? geojson.features : [];

    const g = svg.append('g')
      .attr("clip-path", "url(#lobe-clipper)"); // cuts off the streaks

    g.selectAll('path')
      .data(features)
      .join('path')
      .attr('d', path)
      .attr('fill', d => {
        const name = d.properties?.name || 'Unknown';
        const value = countryLookup[name] || 0;
        // if (value > 0) console.log(name, value, getColor(value));
        return getColor(Number(value));
      })
      .attr('stroke', outlineColor)
      .attr('stroke-width', 1.0)
      .attr('stroke-linejoin', 'round')
      .attr('fill-opacity', opacity)
      // interactivity -- tooltip
      .on('mouseenter', function (event, feature) {
        const name = feature.properties && feature.properties.name ? feature.properties.name : 'Unknown';
        const value = Number(countryLookup[name]) || 0;
        console.log(name, value);
        d3.select(this).attr('stroke-width', 1.6).attr('fill-opacity', 1);
        const colabs = `collaborator${value === 1 ? '' : 's'}`;
        tooltip
          .style('display', 'block')
          .html(`<div style="text-align:center;"><div style="font-weight:600;">${name}</div><div>${value == 0 ? ' ' : (value + ' ' + colabs)}</div></div>`);
      })
      .on('mousemove', event => {
        const { left, top } = container.getBoundingClientRect();
        tooltip
          .style('left', `${event.clientX - left + 10}px`)
          .style('top', `${event.clientY - top - 20}px`);
      })
      .on('mouseleave', function (d) {
        d3.select(this).attr('stroke-width', 0.8).attr('fill-opacity', opacity);
        tooltip.style('display', 'none');
      });


    // draw the outline for the orange peels
    svg.append("path")
      .datum(outline)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", outlineColor)  // Light outline "#b9c6cfff"
      .attr("stroke-width", 3.0);

    // create the legend
    const legendData = (
      d3.range(0, catCnt - 1, 1).map(value => ({
        label: `${value}`,
        color: colorScale(value)
      }))
    ).concat([{ label: (catCnt - 1) + '+', color: colorScale(catCnt - 1) }]);


    d3.select(container).selectAll('.info.legend').remove();
    const legend = d3.select(container)
      .append('div')
      .attr('class', 'info legend')
      .style('position', 'absolute')
      .style('bottom', '20px')
      .style('left', '46%')
      .style('transform', 'translateX(-50%)');

    legend
      .style('display', 'flex')
      .style('gap', '10px')
      .style('align-items', 'center');

    const items = legend
      .selectAll('div.legend-item')
      .data(legendData)
      .join('div')
      .attr('class', 'legend-item')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '6px');

    items.append('span')
      .style('display', 'inline-block')
      .style('width', '12px')
      .style('height', '12px')
      .style('border-radius', '50%')
      .style('background', d => d.color)
      .style('opacity', opacity);

    items.append('span')
      .text(d => (d.label === "0" ? '' : d.label))
      .style('font-size', '13px');

    return legend;
  });
}

