d3.json("assets/unam-buildings.geojson").then(function (data) {
  const buildings = data;

  // const TILE_BASE = "https://scholarship.rrchnm.org/unam-tiles";
  const TILE_BASE = "./assets/tiles";
  // if local, the following works: "./assets/tiles/"

  const buildingStyles = {
    color: "green",
    weight: 2,
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

  /*
  New tiles below
  */

  // const ciudad_Universitaria_1982 = new L.tileLayer(`./assets/tiles/CIUDAD_UNIVERSITARIA_1982.jpg`, {
  //   attribution: "Photograph attribution goes here",
  // });

  // const inegi_2007 = new L.tileLayer(`${TILE_BASE}/Inegi_2007_tiles2/{z}/{x}/{-y}.png`, {
  //   attribution: "Photograph attribution goes here",
  // });
  const inegi_2007 = new L.tileLayer("https://api.maptiler.com/tiles/48b9774c-0c00-4203-9413-25f48163dace/{z}/{x}/{y}.png?key=5tBcXr4oTWJylHPgmnTH", {
    attribution: "Photograph attribution goes here",
  });


  const buildingLayer = new L.geoJSON(buildings, {
    style: buildingStyles,
    onEachFeature: onFeatureClick,
  });

  //MAP
  const map = L.map("map", {
    center: [19.326, -99.187],
    zoom: 14,
    zoomControl: true,
    minZoom: 13,
    maxZoom: 16,
    layers: [osm, inegi_2007, buildingLayer],
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
    // "Ciudad Universitaria": ciudad_Universitaria_1982,
    "Inegi 2007": inegi_2007,
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
