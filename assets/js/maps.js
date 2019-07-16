  var map;
  var mapPlaces;
  var service;
  var infowindow;

   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 49.9317211, lng: -6.3187838 },
      zoom: 11
    });
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
      { lat: 49.914134, lng: -6.314372 },
      { lat: 49.952683, lng: -6.330406 },
      { lat: 49.962188, lng: -6.285320 },
      { lat: 49.892567, lng: -6.345399 },
      { lat: 49.953009, lng: -6.353147 }
    ];


    var markers = locations.map(function(location, i) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        label: labels[i % labels.length]
      });

      marker.addListener('click', function() {
        manageStyles(i);
      });
      return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');
  
    var location = new google.maps.LatLng(49.914134, -6.314372);

    infowindow = new google.maps.InfoWindow();

    mapPlaces = new google.maps.Map(document.getElementById('mapPlaces'), { center: location, zoom: 15 });

    var request = {
      location: location,
      radius: '500',
      type: ['hotel']
    };

    service = new google.maps.places.PlacesService(mapPlaces);

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          if(i<10)
            createItemInList(results[i],bounds,placesList,service)
      }
        mapPlaces.setCenter(results[0].geometry.location);
      }
    });
    
  map.fitBounds(bounds);
}

function createMarker(place) {
  var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    
  var marker = new google.maps.Marker({
    map: mapPlaces,
    icon: image,
    title: place.name,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name,place.rating);
    infowindow.open(mapPlaces, this);
  });
}

function createItemInList(place,bounds,placesList,service) {
  
  var a = document.createElement('a');
  a.target="_blank";
  a.textContent = place.name;
  
  var request = {
    placeId: place.place_id,
    fields: ['website']
  };
  
  service.getDetails(request, function(placeDetail, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      a.href= placeDetail.website;
    }
  });

  placesList.appendChild(a);
  
  var br = document.createElement("br");
  placesList.appendChild(br);

  bounds.extend(place.geometry.location);
}

function manageStyles(i) {
  $('#myModal').modal('show');
}
