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
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const locations = [];
var infowindow;
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1RE7iiyntY6O5ZVHlecHa__LDpFigr-wiIC_X2SUvMpk/edit#gid=0';
$(document).ready(function () {
    var height = $(window).height() - 60;
    $('#map').css("height", height);
    $('#statistics').sheetrock({
      url: mySpreadsheet
    });
    setTimeout(() => {
      initLocations();
      initMap();
      $('#mySidenav').css("left", $(window).width());
      $('#mySidenav').removeClass('d-none');
      open_flag = 0;
    }, 2000);
});

function initLocations() {
  for (let i = 0; i < $('tbody tr').length; i ++)
  {
    locations.push({ lat: parseFloat($('tbody tr').eq(i).children().eq(0).text()), lng: parseFloat($('tbody tr').eq(i).children().eq(1).text()) });
  }
}

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
      center: { lat: 20, lng: 25 },
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
    const markers = locations.map((location, i) => {
      var marker = new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
        icon: {
          url: "assets/images/fav.png", // url
          scaledSize: new google.maps.Size(20, 20), // scaled size
        },
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        map.setCenter(this.getPosition());
        if(zoom_level != 18) {
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
            infowindow = new google.maps.InfoWindow({
                content: contents,
            });
            infowindow.open(map, this);
            // setTimeout(function(){infowindow.open(map, this);}, 2000);
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
      return marker;
    });
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    var latlng = new google.maps.LatLng(-23.5344015, -46.7500668);
    latlng = new google.maps.LatLng(46.20656289999999, 6.0785769);
    var geocoder = new google.maps.Geocoder();
    // var autocomplete_pickup = new google.maps.places.Autocomplete(place_pickup);
    // var autocomplete_delivery = new google.maps.places.Autocomplete(place_delivery);
    // autocomplete_pickup.bindTo('bounds', map);
    infowindow = new google.maps.InfoWindow({
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
    // total_price += numberOfCountries * border_price;
    if(numberOfCountries > 1) {total_price += parseInt(border_price);}
    // if(vehicle_type == 0) {total_price += resultDistance * trailer_price;}
    // else if(vehicle_type == 1) {total_price += resultDistance * reefer_price;}
    if(vehicle_type == 0) {total_price += parseInt(trailer_price);}
    else if(vehicle_type == 1) {total_price += parseInt(reefer_price);}
    var bonus_price = total_price / 100 * (seasonal_extra - seasonal_discount);
    total_price += parseInt(bonus_price);
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