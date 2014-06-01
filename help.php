<html>
    <head>
        <link href="style.css" rel="stylesheet" type="text/css" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    </head>
    <body>
        <div id="help">
            <h1>Vyhledávací mapa dokempu.cz</h1>
            Přejít na: <a href="/index.php">Vyhledávací mapa</a> |
            <a href="http://www.dokempu.cz">Dokempu.cz</a> |
            <a href="http://www.tomas-dvorak.cz">Tomáš Dvořák - blog</a>
            <h2>Co a proč?</h2>
            <p>Stránky, na které jste se dostali, fungují jako leightweight rozcestník pro web
                <a href="http://www.dokempu.cz">dokempu.cz</a>. Bohužel stránky dokempu jsou moc
                těžké, velké, grafické a pohyblivé na to, abych je snadno načítal v mobilním telefonu
                a procházel. Vytvořil jsem tedy co nejlehčí mapu se snadnou možností navigace i na starých
                dotykových telefonech a PDA. Šetří nízkým přenosem dat a minimálními nároky na
                cílové zařízení, popere se i se staršími verzemi prohlížečů, kde není možné
                mapu posunout tažením.
            </p>
            <h2>Kde se berou data</h2>
            <p>Data umí velmi pěkně poskytovat sám web <a href="http://www.dokempu.cz">dokempu.cz</a>.
                Poskytuje <a href="http://www.dokempu.cz/export/">export do XML</a>, kterého využívam
                pro získání základního popisu a polohy kempu. Na jeden dotaz exportu je možné načíst 100 kempů.
                To je většinou naprosto dostatečné při rozumném zoomu mapy. Pokud chcete načíst všechny
                kempy v celé republice, budete to muset řešit jinde a jinak, protože to není záměrem tohoto
                webu. Pro snadné nalezení kempu v mém okolí by 100 kempů mělo být dostatečné.
            </p>
            <h2>Ovládání</h2>
            <p>Ovládání je maximálně uzpůsobeno pro displaye PDA a tabletů, kde ovládací prvky
                zabírají minimum plochy mapy. Kempy se nenačítají samy, dají Vám nejprve možnost
                specifikovat svou polohu na mapě a až poté je načíst. Tím se minimalizuje objem datových
                přenosů. Kempy lze po nastavení správné polohy a zoomu načíst kliknutím na políčko "Kempy",
                kdy se na mapě zobrazí typické červené značky. Na každou z nich lze kliknout pro základní
                informace o kempu a odkaz na kartu kempu na webu dokempu.cz. Pokud Vás kemp
                zaujme a rozkliknete si jeho detail, mapa nezapomene, kde jste naposledy hledali
                a po stisku tlačítka "zpět" v prohlížeči vás pošle na správné místo, kde jste ji
                opustili. Kempy ale automaticky nenačítá, to kdybyste chtěli hledat jinde. Navíc je
                aplikace doplněna funcí "Najdi mě", která využívá několik metod, jak umístit střed mapy
                do místa, kde právě sedíte. Na chytrých telefonech se pokouší zeptat GPS na polohu, zorientovat
                se podle okolních <a href="http://cs.wikipedia.org/wiki/Syst%C3%A9m_z%C3%A1kladnov%C3%BDch_stanic">BTSek</a>.
                Když nezabere to, zkusí se chytit podle toho, k jaké počítačové síti jste připojeni.
            </p>
            <h2>Legenda</h2>
            <table>
                <tr><td><img src="blue-marker.png"/></td><td>Kemp s chatkami</td></tr>
                <tr><td><img src="red-marker.png"/></td><td>Kemp bez chatek</td></tr>
            </table>
            <h2>Autor</h2>
            <p>Jmenuju se Tomáš Dvořák, živím se jako programátor. Moje koníčky jsou cestování,
                auta, motorky a počítače. Proto vznikl i tento rozcestník k portálu
                <a href="http://www.dokempu.cz">dokempu.cz</a>, který na cestách používám.
                více se o mě dočtete na mém <a href="http://www.tomas-dvorak.cz">blogu</a>.</p>
        </div>
    </body>

</html>