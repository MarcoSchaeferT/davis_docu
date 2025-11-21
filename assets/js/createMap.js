function createMap(mapSettings) {


  // create map
  let map = L.map('map');
  map.fitBounds([[-60, -180], [90, 180]]);


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