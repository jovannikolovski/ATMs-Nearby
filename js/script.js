var map;
		var infowindow;

		function initMap() {
		var myCurrentLoc = {lat: 44.015048, lng: 20.909591};

		map = new google.maps.Map(document.getElementById('map_atm_location'), {
		  center: myCurrentLoc,
		  zoom: 14
		});

		infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Current Location.');
            infoWindow.open(map);
            map.setCenter(pos);
            myCurrentLoc = pos;
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        // GOOGLE PLACES
		var service = new google.maps.places.PlacesService(map);

		document.getElementById("search_btn").onclick = function(){
			service.nearbySearch({
			  location: myCurrentLoc,
			  radius: 2000,
			  type: ['ATM']
			}, callback);
		}

		}

		function callback(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
			  for (var i = 0; i <= 10; i++) {
			    createMarker(results[i]);
			  }
			}
		}

		function createMarker(place) {
			var placeLoc = place.geometry.location;
			var marker = new google.maps.Marker({
			  map: map,
			  position: place.geometry.location
			});

			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.setContent(place.placeid);
			  infowindow.open(map, this);
			});
		}