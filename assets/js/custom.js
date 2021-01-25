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
var zoom_level = 2;
$(document).ready(function () {
    $('#timepicker1').timepicker();
    $('[data-toggle="tooltip"]').tooltip();
    var height = $(window).height();
    var width = $(window).width() / 3 * 2;
    $('#map').css("width", width);
    $('#map').css("height", height);
    initMap();
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: -20 },
      zoom: zoom_level,
    });
    var latlng = new google.maps.LatLng(-23.5344015, -46.7500668);
    var marker_pickup = new google.maps.Marker({
        map: map,
        position: latlng,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29)
    });
    marker_pickup.addListener("click", () => {
        infowindow_delivery.close();
        var contents = '<div id="content">'+  
            '<div id="siteNotice">'+  
            '</div>'+  
            '<h1 id="firstHeading" class="firstHeading">Techstrikers</h1>'+  
            '<div id="bodyContent">'+  
            '<p>TechStrikers is developed to help you to begin HTML,CSS,XML,JavaScript,'+
            ' DOM,jQuery,ASP.NET,PHP,SQL Server, MySQL,colors,tutorial,programming,development,' +
            ' training,learning,reference,examples,source code,demos,tips,color table,' +
            ' cascading style sheets,asp.net, csharp, c#.net,ADO.NET, OOPS, Entity ' +
            ' Framework, KnockoutJS, MVC, LINQ, WEB API, Google Map API, Design Patterns etc.</p>'+  
            '<p><a href="https://www.techstrikers.com">'+  
            'https://www.techstrikers.com</a></p>'+  
            '</div>'+  
            '</div>';

        infowindow_pickup = new google.maps.InfoWindow({
            content: contents,
            maxWidth: 200
        });
        infowindow_pickup.open(map, marker_pickup);
    });
    marker_pickup.addListener("dblclick", () => {
        infowindow_pickup.close();
        infowindow_delivery.close();
        map.setCenter(marker_pickup.getPosition());
        if(zoom_level == 2) {
            zoom_level = 6;
            map.setZoom(zoom_level);
        }
        else if(zoom_level == 6) {
            zoom_level = 20;
            smoothZoom(map, zoom_level, map.getZoom());            
        }
        else if(zoom_level == 20) {
            zoom_level = 2;
            smoothZoomout(map, zoom_level, map.getZoom());     
        }
    });
    var place_pickup = document.getElementById('searchInput_pickup');
    latlng = new google.maps.LatLng(46.20656289999999, 6.0785769);
    var marker_delivery = new google.maps.Marker({
        map: map,
        position: latlng,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29)
    });
    marker_delivery.addListener("click", () => {
        infowindow_pickup.close();
        var contents = '<div id="content">'+  
            '<div id="siteNotice">'+  
            '</div>'+  
            '<h1 id="firstHeading" class="firstHeading">Techstrikers</h1>'+  
            '<div id="bodyContent">'+  
            '<p>TechStrikers is developed to help you to begin HTML,CSS,XML,JavaScript,'+
            ' DOM,jQuery,ASP.NET,PHP,SQL Server, MySQL,colors,tutorial,programming,development,' +
            ' training,learning,reference,examples,source code,demos,tips,color table,' +
            ' cascading style sheets,asp.net, csharp, c#.net,ADO.NET, OOPS, Entity ' +
            ' Framework, KnockoutJS, MVC, LINQ, WEB API, Google Map API, Design Patterns etc.</p>'+  
            '<p><a href="https://www.techstrikers.com">'+  
            'https://www.techstrikers.com</a></p>'+  
            '</div>'+  
            '</div>';

        infowindow_pickup = new google.maps.InfoWindow({
            content: contents,
            maxWidth: 200
        });
        infowindow_pickup.open(map, marker_delivery);
    });
    marker_delivery.addListener("dblclick", () => {
        infowindow_pickup.close();
        infowindow_delivery.close();
        map.setCenter(marker_delivery.getPosition());
        if(zoom_level == 2) {
            zoom_level = 6;
            map.setZoom(zoom_level);  
        }
        else if(zoom_level == 6) {
            zoom_level = 20;
            smoothZoom(map, zoom_level, map.getZoom());            
        }
        else if(zoom_level == 20) {
            zoom_level = 2;
            smoothZoomout(map, zoom_level, map.getZoom());     
        }
    });
    var place_delivery = document.getElementById('searchInput_delivery');
    var geocoder = new google.maps.Geocoder();
    var autocomplete_pickup = new google.maps.places.Autocomplete(place_pickup);
    var autocomplete_delivery = new google.maps.places.Autocomplete(place_delivery);
    autocomplete_pickup.bindTo('bounds', map);
    var infowindow_pickup = new google.maps.InfoWindow();
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