<?php
// PROXY pro volani exportni service dokempu. Nemuzu ajaxove nacitat data z jine
// domeny, kvuli Access-Control-Allow-Origin, takze to obejdu tim, ze si data
// natahnu svym scriptem, ktery je jen preposle na vystup.

function repairXml($text) {
    return str_replace("&", "", $text);
}

$url = "http://www.dokempu.cz/export/?x=" . $_GET['x'] . "&y=" . $_GET['y'] . "&r=" . $_GET['r'] . "&format=xml&limit=" . $_GET['limit'];
$crl = curl_init();
$timeout = 10;
curl_setopt ($crl, CURLOPT_URL,$url);
curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
$ret = curl_exec($crl);
curl_close($crl);
echo(repairXml($ret));
?>