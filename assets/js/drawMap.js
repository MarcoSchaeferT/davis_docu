function drawMap(mapSettings) {


  // create map
  let map = L.map('map').setView(mapSettings.center, mapSettings.zoom);


  // disable map zooming and scrolling
  if (!mapSettings.isZooming)
    map.scrollWheelZoom.disable();
  if (!mapSettings.isDraging)
    map.dragging.disable();


  // initialize tile based openStreetmap 
  if (mapSettings.isOpenStreetMap) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  }


  return map
}