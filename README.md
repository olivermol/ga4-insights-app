# GA4 Insights – mérési és marketing audit

Böngészőben futó, egyfájlos eszköz: egy weboldal címéből megnézi a GA4, Google Tag Manager, Google Ads, Meta Pixel és Consent Mode beállításokat, alap SEO és technikai auditot készít, saját AI API kulccsal pedig részletes auditot és online marketing javaslatokat is ad. Szerver nincs – az elemzések és a beállítások a böngésződben maradnak.

> **DEMÓ:** megnyitáskor egy **kitalált adatokon** alapuló mintaelemzés töltődik be (`pelda-webshop.hu`), az AI részek előre generált minták. Élő AI-elemzéshez saját API kulcs kell (pl. ingyenes Gemini kulcs: https://aistudio.google.com/apikey) – **a kulcs csak a böngésződben tárolódik.**

- **Élő változat:** https://olivermol.github.io/ga4-insights-app/
- **Kezelési útmutató:** [kezelesi-utmutato-ghp.html](https://olivermol.github.io/ga4-insights-app/kezelesi-utmutato-ghp.html)

## A mappa felépítése

| Fájl | Mi ez |
| --- | --- |
| `index.html` | Maga az app: az eszköz változtatás nélküli másolata, a végén egyetlen sorral, ami a demó réteget betölti. |
| `demo-ghp.js` | A demó réteg: a DEMÓ sáv, a bemutató elemzés, az Útmutató nézet, a „Kulcs megadása” és a „Letöltés” gomb. |
| `kezelesi-utmutato-ghp.html` | A kezelési útmutató. Az Útmutató gomb ezt nyitja meg a lapon belül. |
| `.nojekyll` | A GitHub Pages ettől adja ki a fájlokat feldolgozás nélkül. |

## Letöltés gomb

A DEMÓ sáv „Letöltés” gombja a látogató böngészőjében állít elő egy ZIP-et: benne az app a demó réteg nélkül (a fenti betöltő sor kimarad belőle), a látogató saját elemzéseivel és beállításaival – az AI kulcs és a bemutató elemzés nélkül –, valamint a kezelési útmutató letöltött változata.
