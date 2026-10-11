# GA4 Insights – mérési és marketing audit

Böngészőben futó, egyfájlos eszköz: egy weboldal címéből megnézi a GA4, a Google Tag Manager, a Google Ads, a Meta Pixel és a Consent Mode beállításait, alap SEO- és technikai auditot készít, saját AI-kulccsal pedig részletes auditot, eseményszintű mérési tervet, ütemtervet és online marketing javaslatokat is ad. Szerver és regisztráció nincs: az elemzések, a beállítások és az AI-kulcs a látogató saját böngészőjében maradnak.

- **Élő demó:** https://olivermol.github.io/ga4-insights-app/
- **Kezelési útmutató:** https://olivermol.github.io/ga4-insights-app/kezelesi-utmutato-ghp.html

> **DEMÓ:** megnyitáskor egy **kitalált adatokon** alapuló mintaelemzés töltődik be (`pelda-webshop.hu`); az abban látható AI-részek előre elkészített minták, nem valódi AI-futás eredményei. Élő AI-elemzéshez saját API-kulcs kell (akár ingyenes Gemini-kulcs: https://aistudio.google.com/apikey) – **a kulcs csak a böngészőben tárolódik.**

## Kinek szól?

Azoknak, akik egy webshop vagy weboldal mérését szeretnék átlátni, mielőtt a kampányokat erre építenék: tulajdonosoknak, marketingeseknek és ügynökségeknek.

## Mit vizsgál?

**Kulcs nélkül is működik:**

- **Alap audit URL-ből** – a forráskódból felismert mérési elemek: Google Analytics 4, Google Tag Manager (és ha beolvasható, a konténer tartalma), Google Ads, Universal Analytics, Meta Pixel és események, Consent Mode, cookie consent (CMP), szerveroldali GTM, dataLayer, GA4 e-kereskedelmi és konverziós események, egyéb eszközök.
- **Pontszámok** 0–100 között: összesített (osztályzattal), Mérés & hirdetés, SEO & technikai, Konverzió, valamint a megállapítások száma súlyosság szerint (kritikus, figyelmeztetés, lehetőség, rendben).
- **Platform-korlátok** – ha az oldal olyan rendszeren fut, amely bizonyos beállításokat nem enged, ezt külön jelzi, és nem számítja a pontszámba.
- **Mély SEO-vizsgálat** – a sitemapből mintát vesz, és több oldalt bejárva keres olyan hibákat, amelyek egy oldalból nem látszanak: duplikált címek és leírások, hiányzó H1, vékony tartalom, canonical-eltérés, törött belső linkek, www/nem-www duplikáció, soft-404.
- **GTM konténer-elemzés** – a GTM-ből exportált konténer (.json) tartalmát elemzi; a fájl nem töltődik fel sehova.
- **Mérési specifikáció** – fejlesztőnek átadható dokumentum arról, milyen dataLayer-eseményeket kell küldeni, milyen paraméterekkel és mikor, az oldal típusához igazítva.
- **UTM-építő és -ellenőrző** – kampány-URL összerakása, meglévő URL-ek ellenőrzése (kis- és nagybetű, szóköz, ékezet, hiányzó mező, self-referral), javasolt elnevezési konvenció.

**AI-kulccsal:**

- **Részletes audit** – vezetői összefoglaló, mérési érettség, javasolt mérési terv eseményszinten, fázisokra bontott ütemterv és további megállapítások.
- **Online marketing elemzés** – optimalizációs lehetőségek (csatornák, tartalmak, tartalomtípusok), a TOP 5 konkurens és összehasonlításuk; a javasolt teendők a feladatlistára kerülnek.
- Választható szolgáltatók: Google Gemini, Claude (Anthropic), OpenAI, OpenRouter, illetve egyéb OpenAI-kompatibilis végpont.

A teendőket úgy rakja sorba, hogy ami előrébb áll, az a későbbiek nélkül is elvégezhető legyen. Hogy mit ellenőriz, és milyen elvek szerint áll össze az audit, azt a szerző határozta meg; az AI ezen a kereten belül írja meg az adott oldalra szabott részleteket.

## Feladatok, előzmények, exportok

- **Feladatok** – a teendők egy listában, P1–P3 prioritás szerint; kijelölve vagy egyenként átküldhetők a Things 3-ba.
- **Előzmények és ügyfelek** – minden elemzés automatikusan mentődik (darabszám-korlát nélkül), ügyfélhez rendelhető, és bármikor újra megnyitható.
- **Exportok** – PDF (nyomtatási nézet), Markdown, feladatok és megállapítások CSV-ben, Things JSON, teljes JSON; az összes elemzés egyszerre is exportálható.
- **Saját arculat** – a riport fejlécébe készítőnév és logó tehető.
- Világos és sötét téma.

## Letöltés gomb

A DEMÓ sáv „Letöltés” gombja a látogató böngészőjében állít elő egy `ga4-insights-app.zip` csomagot: benne az alkalmazás a demó réteg nélkül, üresen, használatra készen, valamint a kezelési útmutató letöltött változata. Ha a látogatónak az online változatban már vannak saját elemzései és beállításai, azok is bekerülnek, és a letöltött példány első megnyitásakor betöltődnek; az AI-kulcs és a mintaelemzés nem kerül bele. Kicsomagolás után az `index.html` megnyitásával indul, telepíteni nem kell.

## Adatkezelés

| Adat | Hol van / hová megy |
| --- | --- |
| Beállítások, AI-kulcs, ügyfelek, logó | A böngésző helyi tárolójában (localStorage), ezen az eszközön. |
| Elemzések (Előzmények) | A böngésző helyi adatbázisában (IndexedDB), ezen az eszközön. |
| A vizsgált oldal letöltése | Először közvetlenül; ha a vizsgált oldal nem engedi, a beépített proxyn, végül nyilvános CORS-proxykon keresztül. Ilyenkor a vizsgált cím és az oldal tartalma áthalad az adott proxyn. Saját proxy is megadható. |
| AI-elemzés | Közvetlenül a választott szolgáltatóhoz megy, a felhasználó saját kulcsával, köztes szerver nélkül. |
| GTM-export, beillesztett forráskód | A böngésző dolgozza fel, nem töltődik fel. |

Érzékeny vagy nem nyilvános oldalt érdemes kézi módban (a forráskód beillesztésével) elemezni, így az oldal tartalma nem halad át proxyn.

## A mappa felépítése

| Fájl | Mi ez |
| --- | --- |
| `index.html` | Maga az alkalmazás, a végén egyetlen sorral, amely a demó réteget betölti. |
| `demo-ghp.js` | A demó réteg: a DEMÓ sáv, a mintaelemzés, az Útmutató nézet, a „Kulcs megadása” és a „Letöltés” gomb. |
| `kezelesi-utmutato-ghp.html` | A kezelési útmutató; az Útmutató gomb ezt nyitja meg az alkalmazáson belül. |
| `.nojekyll` | A GitHub Pages ettől adja ki a fájlokat feldolgozás nélkül. |
| `LICENSE` | Licencfeltételek. |

Nincs build-lépés és nincs keretrendszer; az alkalmazás egyetlen HTML-fájlként fut.

## Gyors kezdés

1. Nyisd meg az élő demót – a mintaelemzésből látszik, mit kapsz.
2. Írj be egy saját címet, és indítsd el az elemzést (ehhez nem kell kulcs).
3. Ha AI-elemzést is szeretnél: Beállítások → AI szolgáltató → saját kulcs → Kapcsolat teszt → Mentés.

Részletes leírás minden funkcióról: [kezelési útmutató](https://olivermol.github.io/ga4-insights-app/kezelesi-utmutato-ghp.html).

## Licenc

Copyright © 2026 Molnár Olivér. **Minden jog fenntartva.**

Az online demó és a letöltött példány saját célra szabadon használható. Az alkalmazás kódját, szövegeit és megjelenését azonban a szerző előzetes írásos engedélye nélkül tilos másolni, terjeszteni, átdolgozni vagy továbbértékesíteni. A pontos feltételek: [LICENSE](LICENSE).
