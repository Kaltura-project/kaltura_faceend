var map;
var geocoder;
var markerarray = [];
var markermapper = {};

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

function adjustViewport() {
    if (markerarray.length == 0) {
        map.setCenter(new google.maps.LatLng(39.8282, -98.5795));
        map.setZoom(4);
    } else if (markerarray.length == 1) {
        map.setCenter(markerarray[0].position);
        map.setZoom(14);
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
function addMarker(addr, lat, lon, loctitle, rowId) {
  console.log('rowId is '+ rowId);
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
                return placeMarker(location, loctitle, rowId);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else {
        location = new google.maps.LatLng(lat, lon);
        return placeMarker(location, loctitle, rowId);
    }
}

// Helper function for addMarker.
function placeMarker(location, loctitle, rowId) {
   // TODO: make take an argument of type and switch to the right url

    var icon_url = 'img/stop_icon.png';
    var icon_url = 'img/yield_icon.png';
    var icon_url = 'img/signal_icon.png';
    // icon_url = 'https://image.flaticon.com/icons/png/128/567/567385.png';
    var marker = new google.maps.Marker({
        map: map,
        icon: icon_url,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location,
        title: loctitle
    });

    // marker.addListener('click', function() {
    //   var coordId = marker.position.lat() + "-" + marker.position.lng();
    //   coordId = coordId;
    //   // // coordId = coordId.hashCode();
    //   // console.log('coordId in addListener '+ coordId);
    //   //   // console.log(marker.position.lat(), marker.position.lng());
    //   //   console.log(coordId);
    //   //   console.log($("#"+coordId));
    //   //   console.log($("#"+coordId).html());
    //     console.log('rowId ' + rowId);
    //     console.log($('#'+rowId));
    //
    //
    //     if ($('#'+rowId).hasClass('selected')) {
    //         $('#'+rowId).removeClass('selected');
    //     } else {
    //         $('#'+rowId).parent().parent().find('tr.selected').removeClass('selected');
    //         $('#'+rowId).addClass('selected');
    //     }
    //     // $('#'+rowId).hasClass('selected');
    //     console.log('#'+rowId + ' added with class selected ');
    //     // $('#'+rowId).removeClass('selected');
    //     console.log($('#'+rowId).parent().parent());
    //     $('#'+rowId).parent().parent().find('tr.selected').removeClass('selected');
    //
    //     //TODO: HAN
    //     // console.log($(coordId).html());
    //     // $()
    // });

    if (loctitle != null) {
        var infowindow = new google.maps.InfoWindow({
            content: loctitle
        });
        infowindow.open(map, marker);
    }
    markerarray.push(marker);
    adjustViewport();

    return marker;
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
