var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var union_price = 2.5;
var saudi_union_price = 1.5;
var border_price = 200;
var trailer_price = 2.5;
var reefer_price = 2.5;
var seasonal_extra = 0;
var seasonal_discount = 0;
var vehicle_type = 0;
var ppk_price = 2.5;
var zoom_level = 3;
var open_flag = 0;
var initial_width = -1;
$(document).ready(function () {
    $('#timepicker1').timepicker();
    $('[data-toggle="tooltip"]').tooltip();
    var height = $(window).height() - 60;
    $('#map').css("height", height);
    initMap();
    $('#mySidenav').css("left", $(window).width());
    $('#mySidenav').removeClass('d-none');
    open_flag = 0;
});

$(window).resize(function() {
  // var current_width = $(window).width();
  // console.log($("#logo").width() + $("#more-option").width() + 60);
  // console.log(current_width);
  // if(($("#logo").width() + $("#more-option").width() + 60) >= current_width) {
  //   if(initial_width == -1) {
  //     console.log('initial');
  //     initial_width = current_width;
  //   }
  // }
  // else
  //   initial_width = -1;
  // if(initial_width != -1) {
  //   $('#logo-image').css("transform", "scale(" + current_width / initial_width + ")");
  //   $('#logo-title').css("transform", "scale(" + current_width / initial_width + ")");
  // }
});

function initMap() {
    var ibOptions = {
      disableAutoPan: false
      ,maxWidth: 0
      ,pixelOffset: new google.maps.Size(-140, 0)
      ,zIndex: null
      ,boxStyle: {
        padding: "0px 0px 0px 0px",
        width: "252px",
        height: "200px"
      },
      closeBoxURL : "",
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false
    };
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: -20 },
      zoom: zoom_level,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#114a43"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#262626"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#707070"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ],
    });
    var latlng = new google.maps.LatLng(-23.5344015, -46.7500668);
    var marker_pickup = new google.maps.Marker({
        map: map,
        position: latlng,
        // draggable: true,
        anchorPoint: new google.maps.Point(0, -29),
        icon: {
            url: "assets/images/fav.png", // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
        },
    });
    marker_pickup.addListener("click", () => {
        infowindow_pickup.close();
        infowindow_delivery.close();
        map.setCenter(marker_pickup.getPosition());
        if(zoom_level == 3) {
            zoom_level = 18;
            smoothZoom(map, zoom_level, map.getZoom());
            $('.gm-style-mtc').eq(1).children().eq(0).click();  var contents = `
            <div class='map_info_wrapper'>
              <div class='property_content_wrap'>
                <div class='property_title'>
                  <span>Lorem Ipsum</span>
                </div>
        
                <div class='property_content'>
                  <span>Lorem ipsum is a dummy text of the printing and typesetting industry</span>
                </div>

                <div class='property_activity'>
                  <span>Activities</span>
                </div>
        
                <div class='property_detail'>
                  <span><b>Sales:</b> T&W</span>
                  <span><b>Creation and application:</b> T&W</span>
                  <span><b>Production:</b> T&W, F&B</span>
                </div>
              </div>
            </div>`;

            infowindow_pickup = new google.maps.InfoWindow({
                content: contents,
            });
            setTimeout(function(){infowindow_pickup.open(map, marker_pickup);}, 3000);
        }
        // else if(zoom_level == 18) {
        //     zoom_level = 22;
        //     smoothZoom(map, zoom_level, map.getZoom());
            
        // }
        else if(zoom_level == 18) {
            zoom_level = 3;
            smoothZoomout(map, zoom_level, map.getZoom());     
            $('.gm-style-mtc').eq(0).children().eq(0).click();  
        }
    });
    var place_pickup = document.getElementById('searchInput_pickup');
    latlng = new google.maps.LatLng(46.20656289999999, 6.0785769);
    var marker_delivery = new google.maps.Marker({
        map: map,
        position: latlng,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29),
        icon: {
          url: "assets/images/fav.png", // url
          scaledSize: new google.maps.Size(20, 20), // scaled size
        },
    });
    marker_delivery.addListener("click", () => {
        infowindow_pickup.close();
        infowindow_delivery.close();
        map.setCenter(marker_delivery.getPosition());
        if(zoom_level == 3) {
            zoom_level = 18;
            smoothZoom(map, zoom_level, map.getZoom());
            $('.gm-style-mtc').eq(1).children().eq(0).click();  
            var contents = `
            <div class='map_info_wrapper'>
              <div class='property_content_wrap'>
                <div class='property_title'>
                  <span>Lorem Ipsum</span>
                </div>
        
                <div class='property_content'>
                  <span>Lorem ipsum is a dummy text of the printing and typesetting industry</span>
                </div>

                <div class='property_activity'>
                  <span>Activities</span>
                </div>
        
                <div class='property_detail'>
                  <span><b>Sales:</b> T&W</span>
                  <span><b>Creation and application:</b> T&W</span>
                  <span><b>Production:</b> T&W, F&B</span>
                </div>
              </div>
            </div>`;

            infowindow_delivery = new google.maps.InfoWindow({
                content: contents,
            });
            setTimeout(function(){infowindow_delivery.open(map, marker_delivery);}, 3000);
        }
        // else if(zoom_level == 18) {
        //     zoom_level = 22;
        //     smoothZoom(map, zoom_level, map.getZoom());    
        // }
        else if(zoom_level == 18) {
            zoom_level = 3;
            smoothZoomout(map, zoom_level, map.getZoom());
            $('.gm-style-mtc').eq(0).children().eq(0).click();  
        }
    });
    var place_delivery = document.getElementById('searchInput_delivery');
    var geocoder = new google.maps.Geocoder();
    var autocomplete_pickup = new google.maps.places.Autocomplete(place_pickup);
    var autocomplete_delivery = new google.maps.places.Autocomplete(place_delivery);
    autocomplete_pickup.bindTo('bounds', map);
    var infowindow_pickup = new google.maps.InfoWindow({
      content: document.getElementById("infobox"),
      disableAutoPan: false,
      maxWidth: 150,
      pixelOffset: new google.maps.Size(-140, 0),
      zIndex: null,
      boxStyle: {
         background: "url('https://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
         opacity: 0.90,
         width: "300px"
     },
     closeBoxMargin: "12px 4px 2px 2px",
     closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif",
     infoBoxClearance: new google.maps.Size(1, 1)
    });
    autocomplete_pickup.addListener('place_changed', function() {
        infowindow_pickup.close();
        marker_pickup.setVisible(false);
        var place = autocomplete_pickup.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        // if (place.geometry.viewport) {
        //     map.fitBounds(place.geometry.viewport);
        // } else {
        //     map.setCenter(place.geometry.location);
        //     map.setZoom(10);
        // }
        
        marker_pickup.setPosition(place.geometry.location);
        marker_pickup.setVisible(true);          
    
        bindDataToForm_pickup(place.formatted_address,place.geometry.location.lat(),place.geometry.location.lng());
        infowindow_pickup.setContent(place.formatted_address);
        infowindow_pickup.open(map, marker_pickup);
    });
    autocomplete_delivery.bindTo('bounds', map);
    var infowindow_delivery = new google.maps.InfoWindow();
    autocomplete_delivery.addListener('place_changed', function() {
        infowindow_delivery.close();
        marker_delivery.setVisible(false);
        var place = autocomplete_delivery.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        // if (place.geometry.viewport) {
        //     map.fitBounds(place.geometry.viewport);
        // } else {
        //     map.setCenter(place.geometry.location);
        //     map.setZoom(10);
        // }
        
        marker_delivery.setPosition(place.geometry.location);
        marker_delivery.setVisible(true);          
    
        bindDataToForm_delivery(place.formatted_address,place.geometry.location.lat(),place.geometry.location.lng());
        infowindow_delivery.setContent(place.formatted_address);
        infowindow_delivery.open(map, marker_delivery);
    });
    // this function will work on marker move event into map 
    google.maps.event.addListener(marker_pickup, 'dragend', function() {
        geocoder.geocode({'latLng': marker_pickup.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {        
                bindDataToForm_pickup(results[0].formatted_address,marker_pickup.getPosition().lat(),marker_pickup.getPosition().lng());
                infowindow_pickup.setContent(results[0].formatted_address);
                infowindow_pickup.open(map, marker_pickup);
            }
        }
        });
    });
    google.maps.event.addListener(marker_delivery, 'dragend', function() {
        geocoder.geocode({'latLng': marker_delivery.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {        
                bindDataToForm_delivery(results[0].formatted_address,marker_delivery.getPosition().lat(),marker_delivery.getPosition().lng());
                infowindow_delivery.setContent(results[0].formatted_address);
                infowindow_delivery.open(map, marker_delivery);
            }
        }
        });
    });
}

var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function smoothZoomout(map, min, cnt) {
    if (cnt < min) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoomout(map, min, cnt - 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function bindDataToForm_pickup(address,lat,lng){
    document.getElementById('searchInput_pickup').value = address;
}

function bindDataToForm_delivery(address,lat,lng){
    document.getElementById('searchInput_delivery').value = address;
}

 function onSettings() {
     $('#admin-settings-modal').modal('show');
 }

 function CalculatedRecommededDistance() {
    CalculateDistanceforAllAlternativeRoutes();
}
  
function CalculateDistanceforAllAlternativeRoutes() {
    var directionsService = new google.maps.DirectionsService();
    var start = $('#searchInput_pickup').val();
    var end = $('#searchInput_delivery').val();
    var method = 'DRIVING';
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode[method],
      provideRouteAlternatives: true,
      unitSystem: google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true
    };
    var routes;
    directionsService.route(request, function(response, status) {
        var routes = response.routes;
        var numberOfCountries = 0;
        var distances = [];
        for (var i = 0; i < routes.length; i++) {
            var distance = 0;
            for (var j = 0; j < routes[i].legs.length; j++) {
                distance = parseInt(routes[i].legs[j].distance.value) + parseInt(distance);
                //for each 'leg'(route between two waypoints) we get the distance and add it to
                for(k = 0; k < routes[i].legs[j].steps.length; k ++) {
                    if(routes[i].legs[j].steps[k].instructions.indexOf("Entering") >=0) {
                        numberOfCountries ++;
                    }
                }
            }
            //Convert into kilometer
            distances.push(distance / 1000);
        }
        //Get all the alternative distances
        var maxDistance = distances.sort(function(a, b) {
            return a - b;
        });
        //Display distance having highest value.
        var resultDistance = Math.round(maxDistance[routes.length - 1]);
        $('#max-distance').text(resultDistance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "km");
        if(numberOfCountries > 0) {
            $('#Cross-border').show();
        } else {
            $('#Cross-border').hide();
        }
        calculatePrice(resultDistance, numberOfCountries);
    });
}

function drawPath(directionsService, directionsDisplay,start,end) {
    var waypoints;
    directionsService.route({
        origin: start,
        destination: end,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Problem in showing direction due to ' + status);
        }
    });
}

function calculatePrice(resultDistance, numberOfCountries) {
    var total_price = 0;
    if($('#searchInput_pickup').val().indexOf("Saudi") >= 0) {ppk_price = saudi_union_price;}
    else {ppk_price = union_price};
    total_price += resultDistance * ppk_price;
    console.log(total_price);
    // total_price += numberOfCountries * border_price;
    if(numberOfCountries > 1) {total_price += parseInt(border_price);}
    console.log(total_price);
    // if(vehicle_type == 0) {total_price += resultDistance * trailer_price;}
    // else if(vehicle_type == 1) {total_price += resultDistance * reefer_price;}
    if(vehicle_type == 0) {total_price += parseInt(trailer_price);}
    else if(vehicle_type == 1) {total_price += parseInt(reefer_price);}
    console.log(total_price);
    var bonus_price = total_price / 100 * (seasonal_extra - seasonal_discount);
    total_price += parseInt(bonus_price);
    console.log(total_price);
    $('.total-price').text(total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "AED");
}

function openNav() {
    if(open_flag == 0) {
        $('#mySidenav').css("left", $(window).width() - $('#mySidenav').width());
        open_flag = 1;
    } else {
        $('#mySidenav').css("left", $(window).width());
        open_flag = 0;
    }
}