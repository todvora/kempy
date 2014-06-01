$(document).ready(function() {
    initialize();
});

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

var initialLocation;
var markersArray = [];

function HomeControl(controlDiv, map) {
    var controlUI = document.createElement('DIV');
    $(controlUI).addClass("control-border");
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('DIV');
    $(controlText).addClass("control-text");
    controlText.innerHTML = 'Najít';
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        showSearch(map);
    });
}

function doSearch(map) {
    var searching = encodeURIComponent($('#search-text').val());
    $.getJSON("/geocode.php?address="+searching , function(json) {
        if(json.results[0] != null) {
            var lat = json.results[0].geometry.location.lat;
            var lng = json.results[0].geometry.location.lng;
            initialLocation = new google.maps.LatLng(lat,lng);
            map.setCenter(initialLocation);
            map.setZoom(11);
            $('#search-window').fadeOut('fast');
            doLoadCamps(map);
        } else {
            alert("Nenalezena žádná lokace!");
        }
    });
}

function HelpControl(controlDiv, map) {
    var controlUI = document.createElement('DIV');
    $(controlUI).addClass("control-border");
    controlDiv.appendChild(controlUI);
    

    var controlText = document.createElement('DIV');
    $(controlText).addClass("control-text");
    controlText.innerHTML = '?';
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        location.href="/help.php";
    });
}

function ZoomControl(controlDiv, map, difference) {
    var controlUI = document.createElement('DIV');
    $(controlUI).addClass("control-border");
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('DIV');
    $(controlText).addClass("control-text");
    if(difference > 0) {
        controlText.innerHTML = '+';
    } else {
        controlText.innerHTML = '-';
    }
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        map.setZoom(map.getZoom() + difference);
    });
}

function DoSearch(controlDiv, map) {
    var controlUI = document.createElement('DIV');
    $(controlUI).addClass("control-border");
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('DIV');
    $(controlText).addClass("control-text");
    controlText.innerHTML = 'Kempy';
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        doLoadCamps(map);
    });


}

function DoMoveMap(controlDiv, map, x, y, labelText) {
    var controlUI = document.createElement('DIV');
    $(controlUI).addClass("control-border");
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('DIV');
    $(controlText).addClass("control-text");
    controlText.innerHTML = labelText;
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', function() {
        var bounds = map.getBounds();

        if(x != 0) {
            if(x > 0) {
                map.panTo(new google.maps.LatLng(bounds.getCenter().lat(), bounds.getNorthEast().lng()));
            } else {
                map.panTo(new google.maps.LatLng(bounds.getCenter().lat(), bounds.getSouthWest().lng()));
            }
        } else {
            if(y > 0) {
                map.panTo(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getCenter().lng()));
            } else {
                map.panTo(new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getCenter().lng()));
            }
        }

    });
}

function initialize() {
    var myOptions = {
        zoom: 12,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    // Create the DIV to hold the control and call the HomeControl() constructor
    // passing in this DIV.
    var homeControlDiv = document.createElement('DIV');
    var homeControl = new HomeControl(homeControlDiv, map);
    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(homeControlDiv);

    var doMoveUpDiv = document.createElement('DIV');
    $(doMoveUpDiv).addClass("move-up");
    var doMoveUp = new DoMoveMap(doMoveUpDiv, map, 0, 1, "&#8679;");
    doMoveUpDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(doMoveUpDiv);

    // Create the DIV to hold the control and call the HomeControl() constructor
    // passing in this DIV.
    var doSearchDiv = document.createElement('DIV');
    var doSearch = new DoSearch(doSearchDiv, map);
    doSearchDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(doSearchDiv);

    var doMoveLeftDiv = document.createElement('DIV');
    var doMoveLeft = new DoMoveMap(doMoveLeftDiv, map, -1, 0, "&#8678;");
    doMoveLeftDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(doMoveLeftDiv);

    var doMoveRightDiv = document.createElement('DIV');
    var doMoveRight = new DoMoveMap(doMoveRightDiv, map, 1, 0, "&#8680;");
    doMoveRightDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(doMoveRightDiv);

    
    var doMoveDownDiv = document.createElement('DIV');
    var doMoveDown = new DoMoveMap(doMoveDownDiv, map, 0, -1, "&#8681;");
    doMoveDownDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(doMoveDownDiv);

    var doZoomUpDiv = document.createElement('DIV');
    var doZoomUp = new ZoomControl(doZoomUpDiv, map, 1);
    doZoomUpDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(doZoomUpDiv);

    var doZoomDownDiv = document.createElement('DIV');
    var doZoomDown = new ZoomControl(doZoomUpDiv, map, -1);
    doZoomDownDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(doZoomDownDiv);

    var doGetHelpDiv = document.createElement('DIV');
    var doGetHelp = new HelpControl(doGetHelpDiv, map);
    doGetHelpDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(doGetHelpDiv);

    setMyLocation(map, true);

    google.maps.event.addListener(map, 'bounds_changed', function() {
        $.cookie('search_position_lat', map.getCenter().lat(), {
            expires: 7,
            path: '/'
        });
        $.cookie('search_position_lng', map.getCenter().lng(), {
            expires: 7,
            path: '/'
        });
        $.cookie('search_position_zoom', map.getZoom(), {
            expires: 7,
            path: '/'
        });
    });

    $('#search-location').click(function(event){
        event.stopPropagation();
        event.preventDefault();
        window.doSearch(map);
    });

    $('#search-text').keypress(function(event){
        if(event.which == 13){
            event.stopPropagation();
            event.preventDefault();
            window.doSearch(map);
        }
    });

    $('#locate-me').click(function(event){
        $('#search-window').fadeOut('fast');
        setMyLocation(map, false, function() {
            doLoadCamps(map);
            });
    });
}

function setMyLocation(map, useCookies, myCallback) {
    var cookieLat = $.cookie('search_position_lat');
    var cookieLng = $.cookie('search_position_lng');
    var zoom = $.cookie('search_position_zoom');

    if(useCookies && cookieLat != null && cookieLng != null && zoom != null) {
        initialLocation = new google.maps.LatLng(cookieLat,cookieLng);
        map.setCenter(initialLocation);
        map.setZoom(parseInt(zoom));
        
        if(myCallback != null) {
          myCallback();
        }
    } else {
        
        map.setZoom(12);
        // Try W3C Geolocation (Preferred)
        if(navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation =  new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(initialLocation);
                 if(myCallback != null) {
                  myCallback();
                }
            }, function() {
                initialLocation = handleNoGeolocation();
                map.setCenter(initialLocation);
                if(myCallback != null) {
                  myCallback();
                }
            });
        // Try Google Gears Geolocation
        } else if (google.gears) {
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
                map.setCenter(initialLocation);
                if(myCallback != null) {
                  myCallback();
                }
            }, function() {
                initialLocation = handleNoGeoLocation();
                map.setCenter(initialLocation);
                if(myCallback != null) {
                  myCallback();
                }
            });
        // Browser doesn't support Geolocation
        } else {
            initialLocation = handleNoGeolocation();
            map.setCenter(initialLocation);
            if(myCallback != null) {
              myCallback();
            }
        }
    }

}

function handleNoGeolocation() {
    
    if(ipLat > 48.5 && ipLat < 51) {
        defLat = ipLat;
    }
    if(ipLng > 12 && ipLng < 19) {
        defLng = ipLng;
    }
    
    return new google.maps.LatLng(defLat, defLng);
}

function getInfoboxContent(node) { 
    var nazev = getText(node, 'nazev');
    var mesto = getText(node, 'mesto');
    var odkaz = getText(node, 'odkaz');
    var otevren = getText(node, 'otevren');
    var gps = getText(node, 'gps_lat') + " " + getText(node, 'gps_lng')
    var features = [getBoolean(node, 'stany'), getBoolean(node, 'chatky'), getBoolean(node, 'karavany'), getBoolean(node, 'budova')].join(' ');
    return '<div class="infowindow"><p><a href="'+odkaz+'">'+nazev+'</a></p><p>'+ mesto + ' ('+gps+')</p><p>'+features+'</p><p>Otevřen: '+otevren+'</p></div>'
}

function getText(node, name) {
    return node.find(name).text();
}
function getBoolean(node, name) {
    var value = node.find(name).text();
    
    if(value == '1') {
        return name;
    } else {
        return '';
    }
}

function showPopup(text,id) {
    $('#window-text').html(text);
    $('#window').fadeIn('fast');
    $('#window').css({
        top:'50%',
        left:'50%',
        margin:'-'+(($('#window').height() / 2)+10 )+'px 0 0 -'+(($('#window').width() / 2)+10)+'px'
    });
    $('#window-text-desc').text("Nahrávám bližší popis kempu...");
    $('#window-text-desc').load('campdesc.php?id=' + id, function() {
        var textDiv = $('#window-text-desc');
        if(textDiv.html().length < 1) {
            textDiv.text("Bližší popis není k dispozici.");
        } 
        $('#window').css({
            top:'50%',
            left:'50%',
            margin:'-'+(($('#window').height() / 2)+10 )+'px 0 0 -'+(($('#window').width() / 2)+10)+'px'
        });
    });

}

function Close_Popup() {
    $('#window').fadeOut('fast');
    $('#search-window').fadeOut('fast');
}

function showSearch(map) {
    $('#window').fadeOut('fast');
    $('#search-window').fadeIn('fast');
    $('#search-text').focus();
    $('#search-window').css({
        top:'50%',
        left:'50%',
        margin:'-'+(($('#search-window').height() / 2)+10 )+'px 0 0 -'+(($('#search-window').width() / 2)+10)+'px'
    });
}





function doLoadCamps(map) {
    var coords =  map.getCenter();
    var bounds = map.getBounds();
    var R = 6371; // km
    var dLat = (bounds.getNorthEast().lat()-bounds.getSouthWest().lat()).toRad();
    var dLon = (bounds.getNorthEast().lng()-bounds.getSouthWest().lng()).toRad();
    var lat1 = bounds.getNorthEast().lat().toRad();
    var lat2 = bounds.getSouthWest().lat().toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = (R * c) / 2;

    $.ajax({
        type: "GET",
        url: "proxy.php?x="+coords.lat()+"&y="+coords.lng()+"&r="+Math.round(d)+"&format=xml&limit=100",
        dataType: "xml",
        success: function(xml) {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setMap(null);
                }
                markersArray.length = 0;
            }
            var counter = 0
            $(xml).find('kemp').each(function(){

                var lat = $(this).find('gps_lat').text();
                var lng = $(this).find('gps_lng').text();



                var url = getText($(this), 'odkaz');
                var re = /.*-(\d+)\//;
                var id = url.match(re)[1];
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    flat: true,
                    map: map
                });
                if(getBoolean($(this), 'chatky') != '') {
                    marker.setIcon('blue-marker.png');
                }
                marker.setClickable(true);
                marker.setMap(map);


                markersArray.push(marker);
                var text = getInfoboxContent($(this));
                google.maps.event.addListener(marker, 'click', function() {
                    showPopup(text, id);
                });
            }); //close each(
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ": " + errorThrown);

        }

    }); //close $.ajax(
}

