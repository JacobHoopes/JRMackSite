d3.json("assets/unam-buildings.geojson").then(function (data) {
  const buildings = data;

  const TILE_BASE = "https://scholarship.rrchnm.org/unam-tiles";

  const buildingStyles = {
    color: "green",
    weight: 5,
    opacity: 0.65,
  };

  function onFeatureClick(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties["Building N"]) {
      layer.bindPopup(feature.properties["Building N"]);
    }
  }

  //OSM
  const osm = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  const unam1951a = new L.tileLayer(`${TILE_BASE}/UNAM_14Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const unam1951b = new L.tileLayer(`${TILE_BASE}/UNAM_19Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const unam1946 = new L.tileLayer(`${TILE_BASE}/UNAM_1946_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const unam1953 = new L.tileLayer(`${TILE_BASE}/UNAM_Feb1953_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const unam1965 = new L.tileLayer(`${TILE_BASE}/UNAM1965_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const buildingLayer = new L.geoJSON(buildings, {
    style: buildingStyles,
    onEachFeature: onFeatureClick,
  });

  //MAP
  const map = L.map("map", {
    center: [19.326, -99.187],
    zoom: 13,
    zoomControl: true,
    minZoom: 10,
    maxZoom: 16,
    layers: [osm, unam1953, buildingLayer],
  });

  //Base layer
  const Map_BaseLayer = {
    "Open Street Maps": osm,
  };

  //Additional layers
  const Map_AddLayer = {
    "UNAM 1946": unam1946,
    "UNAM 1951 (Sept. 14)": unam1951a,
    "UNAM 1951 (Sept. 19)": unam1951b,
    "UNAM 1953": unam1953,
    "UNAM 1965": unam1965,
    Buildings: buildingLayer,
  };

  //LayerControl
  // Replace `Map_BaseLayer` in the call below with `null` to remove the
  // radio switch for the base layer if desired.
  L.control
    .layers(Map_BaseLayer, Map_AddLayer, {
      collapsed: false,
    })
    .addTo(map);

  //OpacityControl
  L.control
    .opacity(Map_AddLayer, {
      label: "Aerial photos opacity",
    })
    .addTo(map);
});
