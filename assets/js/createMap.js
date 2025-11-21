function createMap(mapSettings) {


  // create map





  let crs = "";
  if (L && L.Proj && typeof L.Proj.CRS === 'function') {
    if (mapSettings?.projection === 'mollweide') {
      crs = new L.Proj.CRS('EPSG:54009', '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs', {
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128]
      });
    } else if (mapSettings?.projection === 'autograph') {
      crs = new L.Proj.CRS('EPSG:3410',
        '+proj=cea +lat_ts=30 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
        {
          resolutions: [65536, 32768, 16384, 8192, 4096, 2048, 1024]
        }
      );
    }
  } else {
    console.warn('Leaflet.Proj plugin is missing; falling back to default CRS.');
    //crs = L.CRS.EPSG3857;
  }

  let map = L.map('map');
  const zoomStep = 0.1;
  map.options.zoomDelta = zoomStep;
  map.options.zoomSnap = zoomStep * 0.01;

  if (crs != "") {
    map.options.crs = crs;
    map.setView(mapSettings.coords, mapSettings.zoomLevel);
  } else {

    map.setView([20, 0], 1.5);
  }


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