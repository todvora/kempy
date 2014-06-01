## Kempy v ČR
Jezdíte do kempů po České republice a hodilo by se mít v mobilu rychlou a praktickou mapu kempů ve vašem okolí?
Takovou, co se hezky vejde na display, nesežere FUP a funguje i na bídné wifi v místní putice?

### → [Zobrazit mapu kempů](http://kempy.tomas-dvorak.cz/)

## Co a proč?

Mapa funguje jako leightweight rozcestník pro web [www.dokempu.cz](http://www.dokempu.cz/).
Bohužel stránky dokempu jsou moc těžké, velké, grafické a pohyblivé na to, abych je snadno načítal v mobilním telefonu a procházel.
Vytvořil jsem tedy co nejlehčí mapu se snadnou možností navigace i na starých dotykových telefonech a PDA.
Šetří nízkým přenosem dat a minimálními nároky na cílové zařízení, popere se i se staršími verzemi prohlížečů, kde není možné mapu posunout tažením.

## Kde se berou data

Data umí velmi pěkně poskytovat sám web [dokempu.cz](http://www.dokempu.cz/).
Poskytuje [export do XML](http://www.dokempu.cz/export/), kterého využívam pro získání základního popisu a polohy kempu.
Na jeden dotaz exportu je možné načíst 100 kempů. To je většinou naprosto dostatečné při rozumném zoomu mapy.
Pokud chcete načíst všechny kempy v celé republice, budete to muset řešit jinde a jinak, protože to není záměrem tohoto webu.
Pro snadné nalezení kempu v mém okolí by 100 kempů mělo být dostatečné.

## Ovládání

Ovládání je maximálně uzpůsobeno pro displaye PDA a tabletů, kde ovládací prvky zabírají minimum plochy mapy.
Kempy se nenačítají samy, dají Vám nejprve možnost specifikovat svou polohu na mapě a až poté je načíst.
Tím se minimalizuje objem datových přenosů. Kempy lze po nastavení správné polohy a zoomu načíst kliknutím
na políčko "Kempy", kdy se na mapě zobrazí typické červené značky. Na každou z nich lze kliknout pro základní
informace o kempu a odkaz na kartu kempu na webu dokempu.cz. Pokud Vás kemp zaujme a rozkliknete si jeho detail,
mapa nezapomene, kde jste naposledy hledali a po stisku tlačítka "zpět" v prohlížeči vás pošle na správné místo, kde jste ji opustili.
Kempy ale automaticky nenačítá, to kdybyste chtěli hledat jinde.
Navíc je aplikace doplněna funcí "Najdi mě", která využívá několik metod, jak umístit střed mapy do místa, kde právě sedíte.
Na chytrých telefonech se pokouší zeptat GPS na polohu, zorientovat se podle okolních BTSek.
Když nezabere to, zkusí se chytit podle toho, k jaké počítačové síti jste připojeni.

 Mapa obsahuje geolokační funce založené na databázi <a href="http://www.maxmind.com">http://www.maxmind.com</a>.