  var map;
  var mapModal;
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

        var sydney = new google.maps.LatLng(-33.867, 151.195);

        infowindow = new google.maps.InfoWindow();

        mapModal = new google.maps.Map(
            document.getElementById('mapModal'), {center: sydney, zoom: 15});

        var request = {
          query: 'Museum of Contemporary Art Australia',
          fields: ['name', 'geometry'],
        };

        service = new google.maps.places.PlacesService(mapModal);

        service.findPlaceFromQuery(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            mapModal.setCenter(results[0].geometry.location);
          }
        });
  }
  
        function createMarker(place) {
        var marker = new google.maps.Marker({
          map: mapModal,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(mapModal, this);
        });
      }
      
  function manageStyles(i) {
    $('#exampleModal').modal('show');
  }
  