import data from "./places.json" assert { type: "JSON" };

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 21.449759, lng: 76.108221 },
  });
  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = createCenterControl(map);

  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  const legend = document.getElementById("legend");

  const icons = {
    food_processing: {
      name: "Food Processing",
      icon: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
    },
    Brewery: {
      name: "Brewery",
      icon: `http://maps.google.com/mapfiles/ms/icons/orange-dot.png`,
    },
    Beverages: {
      name: "Beverages",
      icon: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
    },
    Dairy: {
      name: "Dairy",
      icon: `http://maps.google.com/mapfiles/ms/icons/purple-dot.png`,
    }
  };

  for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");

    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

  

  setMarkers(map);
}

function createCenterControl(map) {
  const controlButton = document.createElement("button");
  controlButton.id = "controlbtn";

  controlButton.textContent = "Center Map";
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";
  controlButton.addEventListener("click", () => {
    map.setCenter({ lat: 19.449759, lng: 76.108221 });
    map.setZoom(5);
  });
  return controlButton;
}

console.log(data.places);

function card(place) {
  const content = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = place.name;

  const address = document.createElement("p");
  address.textContent = place.city;

  content.appendChild(h2);
  content.appendChild(address);

  return content;
}

function setMarkers(map) {
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };
  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  

  for (let i = 0; i < data.places.length; i++) {
    const place = data.places[i];

    const marker = new google.maps.Marker({
      position: { lat: place.coordinates[0], lng: place.coordinates[1] },
      map,
      shape: shape,
      title: place.name,
      label: { text: i + 1, color: "black" },
      // content: pinViewBackground.element,
      icon: {
        url: `http://maps.google.com/mapfiles/ms/icons/${place.color}-dot.png`
      }
      
    });
    // Change the background color.


    
    marker.addListener("mouseover", () => {
      const info = card(place);
      infowindow.setContent(info);
      infowindow.open(map, marker);
      
    });
    marker.addListener("mouseout", () => {
      // infowindow.setContent(marker.getTitle());
      infowindow.close(map, marker);
      
    });

    marker.addListener("click", () => {
      map.setZoom(15);
      map.setCenter(marker.getPosition());
      const info = card(place);
      infowindow.setContent(info);
      infowindow.open(map, marker);
    });
  }
}

window.initMap = initMap;