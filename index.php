<?php

include("GeoIP.php");
$gi = new Net_GeoIP(dirname(__FILE__) . '/GeoLiteCity.dat');
$ip = $_SERVER['REMOTE_ADDR'];
$data = $gi->lookupLocation($ip)->getData();
$lat = $data['latitude'];
$long = $data['longitude'];

?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <script src="http://code.jquery.com/jquery-1.6.min.js"></script>
        <script src="jquery.cookie.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=3.3&sensor=true&language=cs">
        </script>
        <script type="text/javascript">
            var defLat = 50.08975;
            var defLng = 14.429169;
            var ipLat = <?php echo $lat;?>;
            var ipLng = <?php echo $long;?>;
        </script>
        
        <script type="text/javascript" src="main.js"></script>
        <link type="text/css" rel="stylesheet" href="style.css"/>
        <!--
        <script type="text/javascript" src="main.compressed.js"></script>
        <link type="text/css" rel="stylesheet" href="style.compressed.css"/>
        -->
    </head>
    <body>
        <div id="map_canvas" style="width:100%; height:100%"></div>

        <div id="window" style="display: none;">
            <div id="popup_content"><div class="close_button"><a href="#" onclick="Close_Popup();">X</a></div>
                <div id="window-text"></div>
                <div id="window-text-desc"></div>
            </div>
        </div>
        <div id="search-window" style="display: none;">
            <div id="popup_content"><div class="close_button"><a href="#" onclick="Close_Popup();">X</a></div>
                <div style="text-align: center;">
                Hledat: <input type="text" id="search-text" value=""/><br><input type="submit" id="search-location" value="najít" />
                <input type="submit" value="Lokalizuj mě" id="locate-me" />
                </div>
            </div>
        </div>
    </body>

</html>

