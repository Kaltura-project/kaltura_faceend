var map;
var geocoder;
var markerarray = [];

// Callback function for initializing the map.
function initMap() {
    var mapDiv = document.getElementById('map');
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(mapDiv, {
        center: {
            lat: 39.8282,
            lng: -98.5795
        },
        zoom: 4,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE
            ],
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    });
}

// function convertAddress(td) {
//     var loop = true;
//     var coordstring = $(td).text();
//     var coords = coordstring.substring(1, coordstring.length - 1).split(" ");
//     var loc = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
//     while (loop == true) {
//         setTimeout(function() {
//             geocoder.geocode({
//                 'location': loc
//             }, function(results, status) {
//                 if (status == google.maps.GeocoderStatus.OK) {
//                     var location = results[0].formatted_address;
//                     if (location == null) {
//                         alert("Must supply valid address or coordinates.");
//                     }
//                     console.log(loc.lat(), loc.lng(), location);
//                     $(td).text(location);
//                     loop = false;
//                 } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
//                     loop = true;
//                 } else {
//                     console.log(loc.lat(), loc.lng(), location);
//                     alert('Geocode was not successful for the following reason: ' + status);
//                     loop = false;
//                 }
//             });
//         }, 2000);
//     }
// }

function adjustViewport() {
    if (markerarray.length == 0) {
        map.setCenter(new google.maps.LatLng(39.8282, -98.5795));
        map.setZoom(4);
    } else if (markerarray.length == 1) {
        map.setCenter(markerarray[0].position);
        map.setZoom(10);
    } else {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markerarray.length; i++) {
            bounds.extend(markerarray[i].position);
        }
        map.fitBounds(bounds);
    }
}

// Add a Marker at a location on the map.
// Use addr string OR lat and lon coordinates.
// loctitle is the title of the marker.
function addMarker(addr, lat, lon, loctitle) {
    var location;
    if (lat == null || lon == null) {
        geocoder.geocode({
            'address': addr
        }, function(results, status) {
            if (status == 'OK') {
                location = results[0].geometry.location;
                if (location == null) {
                    alert("Must supply valid address or coordinates.");
                }
                placeMarker(location, loctitle);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else {
        location = new google.maps.LatLng(lat, lon);
        placeMarker(location, loctitle);
    }
}

// Helper function for addMarker.
function placeMarker(location, loctitle) {
    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location,
        title: loctitle
    });
    var infowindow = new google.maps.InfoWindow({
        content: loctitle
    });
    infowindow.open(map, marker);
    markerarray.push(marker);
    adjustViewport();
}

// Remove a particular Marker from the map.
// Use addr string OR lat and lon coordinates.
// loctitle is the title of the marker.
function removeMarker(addr, lat, lon, loctitle) {
    if (lat == null || lon == null) {
        geocoder.geocode({
            'address': addr
        }, function(results, status) {
            if (status == 'OK') {
                var location = results[0].geometry.location;
                if (location == null) {
                    alert("Must supply valid address or coordinates.");
                }
                liftMarker(location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else {
        var location = new google.maps.LatLng(lat, lon);
        liftMarker(location);
    }
}

// Helper function for removeMarker.
function liftMarker(location) {
    var rdx = markerarray.findIndex(i => (i.position.lat() == location.lat() && i.position.lng() == location.lng()));
    if (rdx > -1) {
        markerarray[rdx].setMap(null);
        markerarray.splice(rdx, 1);
    }
    adjustViewport();
}

// Remove all markers from the map.
function removeAllMarkers() {
    for (var i = 0; i < markerarray.length; i++) {
        markerarray[i].setMap(null);
    }
    markerarray = [];
    adjustViewport();
}
