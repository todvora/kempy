<?php
$url = "http://maps.googleapis.com/maps/api/geocode/json?address=".urlencode($_GET['address'])."&sensor=true&region=cz";
$crl = curl_init();
$timeout = 10;
curl_setopt ($crl, CURLOPT_URL,$url);
curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
$ret = curl_exec($crl);
curl_close($crl);
echo($ret);
?>
