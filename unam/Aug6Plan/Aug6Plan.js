
window.onload = function() { // splits the map
  cropSlider.oninput = function() {
      var leftMap = document.getElementById("lMap");
      leftMap.style.clipPath = `polygon(0% 0%, ${(this.value) + "%"} 0%, ${(this.value) + "%"} 100%, 0% 100%)`

      var text = document.getElementById("cropText");
      text.innerHTML = `${(this.value) + "%"}`;
  }
}

d3.json("../assets/NewUnamBuildings.geojson").then(function (data) {
  const buildings = data;

  // const TILE_BASE = "https://scholarship.rrchnm.org/unam-tiles";
  const TILE_BASE = "../assets/tiles";

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
      center: [19.335, -99.172],
      zoom: 15,
      zoomControl: false,
      minZoom: 13,
      maxZoom: 16,
      layers: [osm2, lbuildingLayer, Lunam1953],
  });

  const rightMap = L.map("rMap", {
      center: [19.3305, -99.185],
      zoom: 15,
      zoomControl: false,
      // moveControl: false,
      dragging: false,
      minZoom: 15,
      maxZoom: 15,
      layers: [osm, rbuildingLayer, Runam1953],
  });

  // leftMap.dragging.disable();
  // rightMap.dragging.disable();

  // leftMap.addEventListener("click", function (event) {
  //     rightMap.setCenter(leftMap.getCenter());
  // })

  // "mousemove touchmove".split(" ").forEach(function(e) {
  //     window.addEventListener(e, mouseMoveHandler, false)
  // })

  // leftMap.addEventListener("mousemove", function(event) {
  //     var text = document.getElementById("text");
  //     // var leftMap = document.getElementById("lMap")
  //     text.innerHTML = leftMap.getCenter();
  //     // rightMap.panTo(leftMap.getCenter()); // too smooth
  //     rightMap.setView(leftMap.getCenter(), leftMap.getZoom(), {animation: true});
  // });

  // rightMap.addEventListener("mousemove", function(event) {
  //     // var bounds = L.latLng(leftMap.getCenter).toBounds();
  //     // rightMap.fitBounds(bounds, {animation: false})
  //     leftMap.setView(rightMap.getCenter(), rightMap.getZoom(), {animation: false});
  //     // leftMap.removeLayer(unam)
  // });



  // leftMap.on('zoom drag', function() {
  //   rightMap.setView(leftMap.getCenter(), leftMap.getZoom(), {animation: true});
  // })

  // rightMap.on('zoom drag', function() {
  //   leftMap.setView(rightMap.getCenter(), rightMap.getZoom(), {animation: true});
  // })
  // leftMap.sync(rightMap);

  

  addEventListener("mousemove", function() {
    // rightMap.setView()
    // var text = document.getElementById("text");
      // var leftMap = document.getElementById("lMap")
      text.innerHTML = rightMap.getCenter();
  })



  // let Position = L.Control.extend({ 
  //   _container: null,
  //   options: {
  //     position: 'bottomleft'
  //   },

  //   onAdd: function (map) {
  //     var latlng = L.DomUtil.create('div', 'mouseposition');
  //     this._latlng = latlng;
  //     return latlng;
  //   },

  //   updateHTML: function(lat, lng) {
  //     var latlng = lat + " " + lng;
  //     //this._latlng.innerHTML = "Latitude: " + lat + "   Longitiude: " + lng;
  //     this._latlng.innerHTML = "LatLng: " + latlng;
  //   }
  // });
  // this.position = new Position();
  // this.leafletMap.addControl(this.position);



  // this.leafletMap.addEventListener('mousemove', (event) => {
  //   let lat = event.latlng.lat; // Math.round(event.latlng.lat * 100000) / 100000;
  //   let lng = event.latlng.lng; // Math.round(event.latlng.lng * 100000) / 100000;
  //   this.position.updateHTML(lat, lng);
  // });
  // leftMap.on('dragstart')

  var Llayers = [
      Lunam1946,
      Lunam1951a,
      Lunam1951b,
      Lunam1953,
      Lunam1965,
      Lciudad_Universitaria_1982,
      Linegi_2007
  ]

  var Rlayers = [
      Runam1946,
      Runam1951a,
      Runam1951b,
      Runam1953,
      Runam1965,
      Rciudad_Universitaria_1982,
      Rinegi_2007
  ]

  year1.oninput = function() {
      var index = year1.selectedIndex;
      
      // var text = document.getElementById("text2");
      // text.innerHTML = year1.value;

      var length = 0;
      leftMap.eachLayer(function() {
          length ++;
      })
      var newLength = 0;
      leftMap.eachLayer(function(layer) {
          if (newLength == length - 1) {
              // text.innerHTML = text.innerHTML + " " +  index;
              leftMap.removeLayer(layer);
              leftMap.addLayer(Llayers[index]);
          }
          newLength++;
      })
  }

  year2.oninput = function() {
      var index = year2.selectedIndex;
      
      // var text = document.getElementById("text2");
      // text.innerHTML = year2.value;

      var length = 0;
      rightMap.eachLayer(function() {
          length ++;
      })
      var newLength = 0;
      rightMap.eachLayer(function(layer) {
          if (newLength == length - 1) {
              text.innerHTML = text.innerHTML + " " +  index;
              rightMap.removeLayer(layer);
              rightMap.addLayer(Rlayers[index]);
          }
          newLength++;
      })
  }

  magnification.oninput = function() {
      var val = this.value;
      leftMap.setZoom(val);
      rightMap.setZoom(val);
  }

  currentLocation.oninput = function() {
      if (currentLocation.selectedIndex == 0) {
        leftMap.setView([19.3313, -99.1758], 16);
        rightMap.setView([19.3313, -99.1758], 16);
      } else if (currentLocation.selectedIndex == 1) {
        leftMap.setView([19.3334, -99.1797], 16);
        rightMap.setView([19.3334, -99.1797], 16);
      } else if (currentLocation.selectedIndex == 2) {
        leftMap.setView([19.3283, -99.1863], 16);
        rightMap.setView([19.3283, -99.1863], 16);
      } else if (currentLocation.selectedIndex == 3) {
        leftMap.setView([19.3318, -99.1918], 16);
        rightMap.setView([19.3318, -99.1918], 16);
      }
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

