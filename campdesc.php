<?php

function endsWith( $str, $sub ) {
    return (substr($str, strlen($str) - strlen($sub)) === $sub);
}

function download($filename, $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
    $thefile = curl_exec($ch);
    curl_close($ch);

    $fp;
    if(!$fp = fopen($filename, "w")) {
        exit;
    }
    if(fwrite($fp, $thefile) === FALSE) {
        exit;
    }
    fclose($fp);
}

$url = "http://www.dokempu.cz/kempy.xml";

$filename = dirname(__FILE__) . "/kempy.xml";
$time = FALSE;
if(file_exists($filename)) {
    $time = filemtime($filename);
}
 
if($time === FALSE || ((time() - $time) > (3600 * 12))) {
    download($filename, $url);
}

$ret = file_get_contents($filename);

$ret = str_replace("</kemp>", "", $ret);
$ret = str_replace("<kemp>", "</kemp><kemp>", $ret);
$ret = preg_replace("/<\/kemp\>/", '', $ret, 1);
$ret = str_replace("</kempy>", "</kemp></kempy>", $ret);


$dom = new DomDocument();
$dom->loadXML($ret);
$xpath = new DomXPath($dom);

$items = $dom->getElementsByTagName("kemp");
foreach ($items as $item) {
    $url = trim($item->getElementsByTagName("odkaz")->item(0)->nodeValue);
    if(endsWith($url, "-". $_GET['id'] . "/")) {
        $desc = $item->getElementsByTagName("popis")->item(0);
        if($desc !== NULL) {
            echo(trim($desc->nodeValue));
        }
    }
}
?>
