
d3.json("../../assets/NewUnamBuildings.geojson").then(function (data) {
  const buildings = data;

  // const TILE_BASE = "https://scholarship.rrchnm.org/unam-tiles";
  const TILE_BASE = "../../assets/tiles";

  const buildingStyles = {
    color: "blue",
    weight: 2,
    opacity: 0.65,
  };

  function onFeatureClick(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties["Building N"]) {
      // layer.bindPopup(feature.properties["Building N"]);

    }
    var text2 = document.getElementById("text2");
    layer.on('mouseover', function (e) {

      text2.innerHTML = feature.properties["Building N"] + " (" + feature.properties["English Na"] + ")";
    })
    layer.on('mouseout', function (e) {
      text2.innerHTML = "";
    })  

    layer.on('click',function (e) {
      window.location.href = feature.properties["link"]
    })
  }

  //OSM
  const osm = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  const osm2 = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  const Lunam1951a = new L.tileLayer(`${TILE_BASE}/UNAM_14Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const Runam1951a = new L.tileLayer(`${TILE_BASE}/UNAM_14Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const Lunam1951b = new L.tileLayer(`${TILE_BASE}/UNAM_19Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const Runam1951b = new L.tileLayer(`${TILE_BASE}/UNAM_19Sept1951_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const Lunam1946 = new L.tileLayer(`${TILE_BASE}/UNAM_1946_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photo taken in 1946 by ___",
  });

  const Runam1946 = new L.tileLayer(`${TILE_BASE}/UNAM_1946_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photo taken in 1946 by ___",
  });

  const Lunam1953 = new L.tileLayer(`${TILE_BASE}/UNAM_Feb1953_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photo taken in 1953 by ___",
  });

  const Runam1953 = new L.tileLayer(`${TILE_BASE}/UNAM_Feb1953_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photo taken in 1953 by ___",
  });

  const Lunam1965 = new L.tileLayer(`${TILE_BASE}/UNAM1965_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  const Runam1965 = new L.tileLayer(`${TILE_BASE}/UNAM1965_tiles/{z}/{x}/{-y}.png`, {
    attribution: "Photograph attribution goes here",
  });

  /*
  New tiles below
  */

  const Lciudad_Universitaria_1982 = new L.tileLayer(`./assets/tiles/CIUDAD_UNIVERSITARIA_1982.jpg`, {
    attribution: "Photograph attribution goes here",
  });

  const Rciudad_Universitaria_1982 = new L.tileLayer(`./assets/tiles/CIUDAD_UNIVERSITARIA_1982.jpg`, {
    attribution: "Photograph attribution goes here",
  });

  const Linegi_2007 = new L.tileLayer(`./assets/tiles/INEGI_2007.jpg`, {
    attribution: "Photograph attribution goes here",
  });

  const Rinegi_2007 = new L.tileLayer(`./assets/tiles/INEGI_2007.jpg`, {
    attribution: "Photograph attribution goes here",
  });

  const lbuildingLayer = new L.geoJSON(buildings, {
    style: buildingStyles,
    onEachFeature: onFeatureClick,
  });

  const rbuildingLayer = new L.geoJSON(buildings, {
    style: buildingStyles,
    onEachFeature: onFeatureClick,
  });

  // MAPS

  const leftMap = L.map("lMap", {
      center: [19.3327, -99.183],
      zoom: 16,
      zoomControl: false,
      dragging: false,
      minZoom: 16,
      maxZoom: 16,
      layers: [osm2, Lunam1951b],
  });

  const rightMap = L.map("rMap", {
      center: [19.3327, -99.183],
      zoom: 16,
      zoomControl: false,
      // moveControl: false,
      dragging: false,
      minZoom: 16,
      maxZoom: 16,
      layers: [osm, Runam1965],
  });

  cropSlider.oninput = function() {
    var leftMap = document.getElementById("lMap");
    leftMap.style.clipPath = `polygon(0% 0%, ${(this.value) + "%"} 0%, ${(this.value) + "%"} 100%, 0% 100%)`

    var text = document.getElementById("cropText");
    text.innerHTML = `${(this.value) + "%"}`;
}

  //Base layer
  const Map_BaseLayer = {
    "Open Street Maps": osm,
    "Open Street Maps": osm2,
  };

  //Additional layers
  const Map_AddLayer = {
    "UNAM 1946": unam1946,
    "UNAM 1951 (Sept. 14)": unam1951a,
    "UNAM 1951 (Sept. 19)": unam1951b,
    "UNAM 1953": unam1953,
    "UNAM 1965": unam1965,
    "Ciudad Universitaria": ciudad_Universitaria_1982,
    "Inegi 2007": inegi_2007,
    Buildings: buildingLayer,
  };

  // LayerControl
  // Replace `Map_BaseLayer` in the call below with `null` to remove the
  // radio switch for the base layer if desired.

  L.control
    .layers(Map_BaseLayer, Map_AddLayer, {
      collapsed: false,
    })
    .addTo(leftMap);

  //OpacityControl
  L.control
    .opacity(Map_AddLayer, {
      label: "Aerial photos opacity",
    })
    .addTo(leftMap);

  L.control
  .layers(Map_BaseLayer, Map_AddLayer, {
  collapsed: false,
  })
  .addTo(rightMap);

  //OpacityControl
  L.control
    .opacity(Map_AddLayer, {
      label: "Aerial photos opacity",
    })
    .addTo(rightMap);
});

