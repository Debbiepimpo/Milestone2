  var map;
  var mapPlaces;
  var service;
  var infowindow;
  
/*----Initialize the googleMap API map, setting the markers and functionality----*/
   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 49.9317211, lng: -6.3187838 },
      zoom: 11
    });
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    var ST_MARYS = { lat: 49.914134, lng: -6.314372 };
    var TRESCO = { lat: 49.952683, lng: -6.330406 };
    var ST_MARTINS = { lat: 49.962188, lng: -6.285320 };
    var ST_AGNES = { lat: 49.892567, lng: -6.345399 };
    var BRYHER = { lat: 49.953009, lng: -6.353147 };

    var locations = [ST_MARYS, TRESCO, ST_MARTINS, ST_AGNES, BRYHER];

    var markers = locations.map(function(location, i) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        label: labels[i % labels.length]
      });

      marker.addListener('click', function() {
        showModal(i);
        clearItemInList();
        initPlacesMap(location);
      });
      return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    
    initPlacesMap(locations[0]);

}

/*----Initialize the googlePlaces API map, setting the markers and functionality----*/
function initPlacesMap(location) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');
  
    var location = new google.maps.LatLng(location);

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
            createItemInList(results[i],bounds,placesList,service);
      }
        mapPlaces.setCenter(results[0].geometry.location);
      }
    });
    
  map.fitBounds(bounds);
}

/*----Used to create a marker inside the map----*/
function createMarker(place) {
  map.setCenter( {lat: 49.9317211, lng: -6.3187838} );
  map.setZoom(11);
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

/*----Create an HTML element and introduced inside the website page----*/
function createItemInList(place,bounds,placesList,service) {
  
  var a = document.createElement('a');
  a.target="_blank";
  a.textContent = place.name;
  
  var request = {
    placeId: place.place_id,
    fields: ['website']
  };
  
  service.getDetails(request, function(placeDetail, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK && placeDetail.website != undefined) {
      a.href= placeDetail.website;
      $(this).toggleClass("with-link");
    }
    else{
      $(this).toggleClass("no-link");
    }
  });
  

  placesList.appendChild(a);
  
  var br = document.createElement("br");
  placesList.appendChild(br);

  bounds.extend(place.geometry.location);
}

/*----Showing the modal with a variable content depending the marker selected----*/
function showModal(i) {
  
  var name = "";
  var image = "";
  switch (i) {
    case 0:
      name = "St. Mary's";
      image = "assets/images/island-st-marys.jpg";
      break;
    case 1:
      name = "Tresco";
      image = "assets/images/tresco.jpg";
      break;
    case 2:
      name = "St. Martin's";
      image = "assets/images/st-martins.jpg";
      break;
    case 3:
      name = "St. Agnes's";
      image = "assets/images/st-agnes.jpg";
      break;
    case 4:
      name = "Bryher";
      image = "assets/images/bryher.jpg";
      break;
    default:
      name = "The island";
      image = "assets/images/unhabitated-isle.jpg";
  }
  $('#myModal').on($.modal.BEFORE_OPEN, function(event, modal) {
    $('#modalTitle').html("Welcome to " + name);
    $('#modalImage').attr("src",image);
  });
  $('#myModal').on($.modal.CLOSE, function(event, modal) {
    var top = $('#Accomodations').position().top;
    $(window).scrollTop( top );
  });
  $("#myModal").modal({
    fadeDuration: 2000,
    fadeDelay: 0.50,
    showClose: false
  });
}

/*----To empty the HTML element which contains the list of places----*/

function clearItemInList() {
  document.getElementById('places').innerHTML = "";
}
