/* ==================================================================
   GA4 Insights – DEMÓ réteg (GitHub Pages)

   Ezt a fájlt az index.html utolsó sora tölti be (script src="demo-ghp.js").

   Az index.html maga az app változatlan másolata – a demóhoz tartozó
   minden kiegészítés itt van: a DEMÓ sáv, a bemutató elemzés, az
   Útmutató nézet, a „Kulcs megadása” és a Letöltés gomb.
   ================================================================== */
(function () {
  "use strict";
  var DEMO_ID = 'demo-pelda-webshop';
  var RUNS_KEY = 'ga4insights.runs';
  var DEMO_FILE = 'demo-ghp.js';

  function safe(fn) { try { return fn(); } catch (e) { return undefined; } }

  /* 0) A demó réteg stílusa – a szkript szúrja be, hogy a lap egyetlen sorral betölthető legyen */
  var DEMO_CSS = `
#ga4demo-banner {
  position: sticky; top: 0; z-index: 100;
  background: var(--warning-bg, #fdf4e3); color: var(--text, #1a1a18);
  border-bottom: 2px solid var(--warning, #b8730a);
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  font-size: 14px; line-height: 1.45;
}
#ga4demo-banner .ga4demo-inner {
  max-width: 1120px; margin: 0 auto; padding: 10px 24px;
  display: flex; align-items: center; gap: 10px 16px; flex-wrap: wrap;
}
#ga4demo-banner .ga4demo-text { flex: 1 1 420px; min-width: 0; }
#ga4demo-banner .ga4demo-text b { font-weight: 650; }
#ga4demo-banner .ga4demo-sub { color: var(--text-dim, #6b6b64); font-size: 13.2px; }
.ga4demo-pill {
  display: inline-block; padding: 1px 8px; margin-right: 6px; border-radius: 999px;
  background: var(--warning, #b8730a); color: var(--surface, #fff); font-weight: 700; font-size: 12px;
  letter-spacing: .06em; vertical-align: 1px;
}
#ga4demo-banner .ga4demo-actions { display: flex; gap: 8px; flex-wrap: wrap; }
#ga4demo-banner .ga4demo-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
  border-radius: var(--radius-sm, 6px); border: 1px solid var(--warning, #b8730a);
  background: var(--surface, #fff); color: var(--text, #1a1a18);
  font: inherit; font-size: 13.5px; font-weight: 560; text-decoration: none; cursor: pointer; white-space: nowrap;
}
#ga4demo-banner .ga4demo-btn.primary { background: var(--warning, #b8730a); color: var(--surface, #fff); }
#ga4demo-banner .ga4demo-btn:hover { filter: brightness(1.05); }
/* A riport ragadós tartalomjegyzéke ne csússzon a sáv alá */
.toc { top: var(--ga4demo-h, 0px) !important; }
.chip.ga4demo-chip { background: var(--warning-bg, #fdf4e3); color: var(--warning, #b8730a); border-color: var(--warning, #b8730a); font-weight: 650; }
html { scroll-padding-top: var(--ga4demo-h, 0px); }
#ga4demo-banner .ga4demo-sub-short { display: none; }
#ga4demo-banner .ga4demo-msg {
  flex-basis: 100%; margin: 0; padding: 6px 10px; border-radius: var(--radius-sm, 6px);
  background: var(--surface, #fff); border: 1px solid var(--warning, #b8730a);
  color: var(--text, #1a1a18); font-size: 13.5px;
}
#ga4demo-banner .ga4demo-msg a { color: var(--accent, #b4551f); font-weight: 600; }
@media (max-width: 640px) {
  /* Mobilon a sáv nem ragadós, hogy ne foglalja a képernyőt görgetés közben */
  #ga4demo-banner { font-size: 13px; position: relative; }
  .toc { top: 0 !important; }
  html { scroll-padding-top: 0; }
  #ga4demo-banner .ga4demo-inner { padding: 8px 16px; gap: 6px; }
  #ga4demo-banner .ga4demo-text { flex-basis: 100%; }
  #ga4demo-banner .ga4demo-sub { display: none; }
  #ga4demo-banner .ga4demo-sub-short { display: block; color: var(--text-dim, #6b6b64); font-size: 12.5px; }
  #ga4demo-banner .ga4demo-actions { gap: 6px; flex-wrap: wrap; }
  #ga4demo-banner .ga4demo-msg { font-size: 12.5px; padding: 5px 8px; }
  #ga4demo-banner .ga4demo-btn { padding: 4px 9px; font-size: 12.5px; }
  #ga4demo-banner .ga4demo-long { display: none; }
}
/* Beágyazott útmutató: teljes képernyős nézet a lapon belül (hálózat nélkül) */
#ga4demo-guide {
  position: fixed; inset: 0; z-index: 2147483000;
  display: flex; flex-direction: column;
  background: var(--bg, #f7f7f5); color: var(--text, #1a1a18);
}
#ga4demo-guide .ga4demo-guide-bar {
  flex: none; display: flex; align-items: center; gap: 10px;
  padding: 8px 16px; padding-top: calc(8px + env(safe-area-inset-top, 0px));
  background: var(--warning-bg, #fdf4e3); border-bottom: 2px solid var(--warning, #b8730a);
  font-size: 14px; line-height: 1.4;
}
#ga4demo-guide .ga4demo-guide-title { flex: 1; min-width: 0; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ga4demo-guide .ga4demo-guide-close {
  flex: none; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 6px 14px;
  border-radius: var(--radius-sm, 6px); border: 1px solid var(--warning, #b8730a);
  background: var(--warning, #b8730a); color: var(--surface, #fff);
  font: inherit; font-size: 14px; font-weight: 650; cursor: pointer; white-space: nowrap;
}
#ga4demo-guide .ga4demo-guide-close:focus-visible { outline: 3px solid var(--accent, #b4551f); outline-offset: 2px; }
#ga4demo-guide iframe { flex: 1; width: 100%; min-height: 0; border: 0; background: #fff; display: block; }
@media print { #ga4demo-banner, #ga4demo-guide { display: none !important; } }
`;

  safe(function () {
    var st = document.createElement('style');
    st.id = 'ga4demo-style';
    st.textContent = DEMO_CSS;
    (document.head || document.documentElement).appendChild(st);
  });

  /* A bemutató elemzés (kitalált adatok, pelda-webshop.hu) – a fájlba ágyazva,
     hogy már a lap betöltése előtt a tárolóba kerülhessen. */
  var DEMO_RUN = {
  "id": "demo-pelda-webshop",
  "createdAt": "2026-09-15T08:00:00.000Z",
  "durationMs": 1840,
  "status": "ok",
  "mode": "manual",
  "client": {
    "id": null,
    "name": "DEMÓ – Példa Webshop (kitalált)",
    "thingsArea": "",
    "agencyName": "",
    "logoDataUrl": "",
    "at": "2026-09-15T08:00:00.000Z"
  },
  "site": {
    "requestedUrl": "https://pelda-webshop.hu/",
    "finalUrl": "https://pelda-webshop.hu/",
    "origin": "https://pelda-webshop.hu",
    "status": null,
    "ok": true,
    "responseTimeMs": 0,
    "manual": true,
    "networkAvailable": false,
    "headersAvailable": false,
    "timingReliable": false,
    "proxyUsed": "kézi (beillesztett forrás)",
    "htmlBytes": 3876,
    "headers": {},
    "scriptSrcs": [
      "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    ],
    "robots": {
      "found": false,
      "checked": false,
      "status": null,
      "sitemaps": [],
      "body": null
    },
    "sitemap": {
      "found": false,
      "checked": false,
      "url": null,
      "urlCount": 0,
      "isIndex": false
    },
    "httpRedirect": {
      "status": null,
      "redirectsToHttps": null,
      "location": null
    },
    "fetchedAt": "2026-09-15T10:02:55.366Z"
  },
  "detection": {
    "vendors": [
      {
        "key": "gtm",
        "name": "Google Tag Manager",
        "category": "tagmanager",
        "ids": [
          "GTM-XXXXXXX"
        ],
        "sources": [
          "html"
        ]
      },
      {
        "key": "ga4",
        "name": "Google Analytics 4",
        "category": "analytics",
        "ids": [
          "G-XXXXXXXXXX"
        ],
        "sources": [
          "html"
        ]
      },
      {
        "key": "gtagjs",
        "name": "gtag.js könyvtár",
        "category": "library",
        "ids": [],
        "sources": [
          "html"
        ]
      },
      {
        "key": "gtmjs",
        "name": "gtm.js konténer betöltés",
        "category": "library",
        "ids": [],
        "sources": [
          "html"
        ]
      },
      {
        "key": "metapixel",
        "name": "Meta (Facebook) Pixel",
        "category": "ads",
        "ids": [],
        "sources": [
          "html"
        ]
      },
      {
        "key": "metapixel_id",
        "name": "Meta Pixel ID",
        "category": "ads",
        "ids": [
          "000000000000000"
        ],
        "sources": [
          "html"
        ]
      }
    ],
    "cmps": [],
    "cookieBannerHint": null,
    "consentMode": {
      "present": true,
      "defaultCallCount": 1,
      "updateCallCount": 0,
      "v2Complete": true,
      "signals": {
        "adUserData": true,
        "adPersonalization": true,
        "analyticsStorage": true,
        "adStorage": true,
        "urlPassthrough": false,
        "adsDataRedaction": false,
        "waitForUpdate": false,
        "gtmConsentInit": true
      },
      "defaultSnippets": [
        "{ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'}"
      ],
      "defaultAfterTags": false
    },
    "dataLayer": {
      "present": true,
      "pushCount": 0,
      "customName": null,
      "initializedBeforeGtm": true
    },
    "google": {
      "ga4Ids": [],
      "gtmIds": [
        "GTM-XXXXXXX"
      ],
      "uaIds": [],
      "adsIds": [],
      "floodlightIds": [],
      "loadedViaGtag": true,
      "loadedViaGtm": false,
      "serverSideGtm": {
        "detected": false,
        "hosts": [],
        "raw": [
          "www.googletagmanager.com",
          "www.googletagmanager.com"
        ]
      },
      "gtagEvents": [],
      "gtmContainer": {
        "checked": [],
        "failed": [],
        "ga4Ids": [],
        "adsIds": [],
        "events": [],
        "conversionLinker": false,
        "enhancedConversions": false,
        "consentTemplate": false
      }
    },
    "meta": {
      "present": true,
      "pixelIds": [
        "000000000000000"
      ],
      "events": [
        "PageView"
      ],
      "advancedMatching": false,
      "noscriptFallback": false,
      "domainVerification": false
    },
    "events": {
      "ecommerce": [],
      "leadgen": [],
      "conversion": []
    },
    "page": {
      "title": "Példa Webshop – Kerti bútorok és lakásdekor online",
      "titleLength": 50,
      "metaDescription": "Kerti bútorok, párnák, lámpák és lakásdekor gyors szállítással. Ingyenes szállítás 30 000 Ft felett.",
      "metaDescriptionLength": 100,
      "h1s": [
        "Kerti bútorok és lakásdekor – szállítás 2–3 munkanap alatt"
      ],
      "h2s": [
        "Népszerű termékek",
        "Miért minket?"
      ],
      "canonical": "https://pelda-webshop.hu/",
      "robotsMeta": null,
      "lang": "hu",
      "viewport": "width=device-width, initial-scale=1",
      "ogTags": {
        "og:title": "Példa Webshop",
        "og:type": "website"
      },
      "twitterCard": false,
      "hreflang": [],
      "jsonLdTypes": [
        "Organization"
      ],
      "imageCount": 3,
      "imagesMissingAlt": 2,
      "wordCount": 76,
      "internalLinkCount": 15,
      "externalDomains": [],
      "scriptCount": 1
    },
    "local": {
      "schema": null,
      "telLinks": [
        "+3610000000"
      ],
      "mapsLinks": [],
      "mapsEmbed": false,
      "addressInText": null
    },
    "security": {
      "hsts": false,
      "csp": false,
      "xContentTypeOptions": null,
      "referrerPolicy": null,
      "server": null,
      "contentEncoding": null,
      "cacheControl": null,
      "poweredBy": null
    },
    "platform": [],
    "platformProfile": null,
    "isEcommerce": true,
    "ecommerceSignals": [
      "kosár / bolt link: /kosar",
      "kosárba gomb"
    ],
    "conversion": {
      "pageType": "home",
      "forms": [
        {
          "action": "/hirlevel",
          "method": "post",
          "fieldCount": 1,
          "requiredCount": 0,
          "fieldsWithoutLabel": 1,
          "fieldsWithoutAutocomplete": 1,
          "suspiciousTypeCount": 0,
          "suspiciousTypeNames": [],
          "submitText": "Feliratkozom",
          "isSearch": false,
          "isNewsletter": true,
          "isConsent": false,
          "hasFileUpload": false
        }
      ],
      "leadForms": [],
      "cta": {
        "total": 4,
        "texts": [
          "Kosárba",
          "Feliratkozom"
        ],
        "actionableCount": 4,
        "genericTexts": []
      },
      "trust": {
        "policies": {
          "privacy": {
            "label": "Adatvédelmi tájékoztató",
            "href": "/adatvedelem",
            "text": "Adatvédelmi tájékoztató"
          },
          "terms": {
            "label": "ÁSZF / Felhasználási feltételek",
            "href": "/aszf",
            "text": "ÁSZF"
          },
          "cookie": null,
          "impressum": null,
          "contact": {
            "label": "Kapcsolat",
            "href": "/kapcsolat",
            "text": "Kapcsolat"
          },
          "shipping": {
            "label": "Szállítási információ",
            "href": "/szallitas",
            "text": "Szállítási információ"
          },
          "returns": {
            "label": "Elállás / Visszaküldés",
            "href": "/elallas",
            "text": "Elállás és visszaküldés"
          }
        },
        "telLinks": [
          "+3610000000"
        ],
        "mailLinks": [
          "info@pelda-webshop.hu"
        ],
        "hasVatNumber": false,
        "hasCompanyReg": false,
        "hasRatingSchema": false,
        "hasTestimonialWords": false,
        "chatWidgets": []
      },
      "ppc": {
        "canonicalHasQuery": false,
        "canonicalIsRelative": false,
        "conversionLinker": false,
        "enhancedConversions": false,
        "crossDomainLinker": null,
        "isSpa": false,
        "productSchema": {
          "present": false,
          "fields": [],
          "missing": []
        }
      },
      "bookingSystem": null
    },
    "a11y": {
      "headings": {
        "total": 6,
        "skips": []
      },
      "links": {
        "total": 17,
        "genericCount": 0,
        "genericTexts": [],
        "emptyCount": 2,
        "newTabWithoutWarning": 0
      },
      "images": {
        "total": 3,
        "missingAlt": 2,
        "suspiciousEmptyAlt": 0,
        "missingDimensions": 3
      },
      "buttons": {
        "total": 4,
        "withoutAccessibleName": 0
      },
      "document": {
        "lang": "hu",
        "hasSkipLink": false,
        "hasMainLandmark": true,
        "hasNavLandmark": true,
        "tinyFont": false
      },
      "tables": {
        "total": 0,
        "withHeaders": 0
      },
      "media": {
        "videos": 0,
        "captionTracks": 0
      }
    }
  },
  "rules": {
    "findings": [
      {
        "area": "measurement",
        "severity": "critical",
        "title": "Hiányzó GA4 e-commerce események: view_item, add_to_cart, begin_checkout, purchase",
        "detail": "Az oldal webshopnak tűnik, de a kötelező GA4 enhanced e-commerce események közül több nem található. Nélkülük nincs funnel-elemzés, nincs termékszintű teljesítmény, és a Google Ads sem tud értékalapon optimalizálni.\n\nMegtalált események: —",
        "evidence": "Hiányzik: view_item, add_to_cart, begin_checkout, purchase · webshop-jelek: kosár / bolt link: /kosar; kosárba gomb",
        "impact": "Teljes vásárlási funnel láthatóvá válik; value-based bidding indítható.",
        "effort": "L",
        "docs": [
          "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce"
        ],
        "task": {
          "title": "GA4 enhanced e-commerce mérés kiegészítése",
          "notes": "## Hiányzó események\n- [ ] `view_item`\n- [ ] `add_to_cart`\n- [ ] `begin_checkout`\n- [ ] `purchase`\n\n## Már megvan\n- (egy sem)\n\n## Fontos\nMinden eseményhez menjen az `items` tömb (item_id, item_name, price, quantity) és a `value` + `currency`.\n\n[GA4 e-commerce referencia](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)",
          "tags": [
            "GA4",
            "E-commerce",
            "Mérés"
          ],
          "when": "today",
          "checklist": [
            "view_item",
            "add_to_cart",
            "begin_checkout",
            "purchase"
          ]
        },
        "id": "measurement-002"
      },
      {
        "area": "consent",
        "severity": "critical",
        "title": "Nincs cookie consent kezelő (CMP), miközben tracking fut",
        "detail": "Az oldalon mérési és/vagy hirdetési tagek futnak, de nem találtam Consent Management Platformot. Az EU-ban ez GDPR/ePrivacy jogsértés, és a Google 2024 márciusa óta a Consent Mode v2 hiányában korlátozza az EGT-s adatokat a hirdetési közönségekben és a modellezett konverziókban.",
        "evidence": "Nem található ismert CMP script.",
        "impact": "Jogi kockázat megszűnik + a Google Ads remarketing közönségek újra épülnek.",
        "effort": "M",
        "docs": [
          "https://support.google.com/analytics/answer/9976101"
        ],
        "task": {
          "title": "CMP bevezetése Google-tanúsított partnerrel + Consent Mode v2",
          "notes": "## Miért sürgős\n- GDPR/ePrivacy megfelelés\n- Consent Mode v2 nélkül a Google korlátozza az EGT-s hirdetési adatot\n\n## Lépések\n1. Google-tanúsított CMP választása (Cookiebot, Usercentrics, CookieYes, OneTrust…)\n2. Cookie audit: mi fut ténylegesen az oldalon\n3. Consent Mode v2 `default` beállítás a CMP és minden tag **előtt**\n4. GTM-ben minden tag consent-hez kötése (Additional Consent Checks)\n5. Tesztelés: elutasított consent mellett nem mehet ki azonosító",
          "tags": [
            "Consent",
            "GDPR",
            "Mérés"
          ],
          "when": "today",
          "checklist": []
        },
        "id": "consent-009"
      },
      {
        "area": "measurement",
        "severity": "warning",
        "title": "A GA4 mérés nem ellenőrizhető – a GTM konténert nem sikerült beolvasni",
        "detail": "Az oldalon Google Tag Manager fut. A GA4 ilyenkor általában a konténeren belül van beállítva, ezért a forráskódban nem látszik `G-` azonosító. **Ez nem jelenti azt, hogy nincs GA4 mérés** – csak azt, hogy ebből az elemzésből nem dönthető el.\n\nKézi (beillesztett forrás) módban a konténert nem töltöm le. Töltsd fel a GTM konténer exportját a „GTM konténer\" részben, vagy ellenőrizd Tag Assistanttal.",
        "evidence": "GTM: GTM-XXXXXXX · a konténer tartalma nem volt elérhető",
        "impact": "Biztos kép a mérés állapotáról, mielőtt bármit javasolnánk.",
        "effort": "S",
        "task": {
          "title": "GA4 mérés ellenőrzése a GTM konténerben",
          "notes": "1. [Tag Assistant](https://tagassistant.google.com/) → az oldal megnyitása → látszik-e GA4 (`G-…`) tag\n2. Vagy: GTM → Admin → Konténer exportálása → a JSON feltöltése az app „GTM konténer\" részében\n3. GA4 Realtime: érkezik-e adat az oldalról",
          "tags": [
            "GA4",
            "GTM",
            "Ellenőrzés"
          ],
          "when": null,
          "checklist": []
        },
        "id": "measurement-001",
        "docs": []
      },
      {
        "area": "ads",
        "severity": "warning",
        "title": "Hiányzó Meta standard események: ViewContent, AddToCart, InitiateCheckout, Purchase",
        "detail": "A Meta Pixel megvan, de a konverziós standard események hiányoznak vagy csak PageView fut. Konverziós esemény nélkül a Meta algoritmusa nem tud kampányt optimalizálni.\n\nMegtalált események: PageView",
        "evidence": "Hiányzik: ViewContent, AddToCart, InitiateCheckout, Purchase",
        "impact": "Meta kampányok konverzióra optimalizálhatóvá válnak.",
        "effort": "M",
        "task": {
          "title": "Meta standard események kiegészítése",
          "notes": "## Hiányzó események\n- [ ] `ViewContent`\n- [ ] `AddToCart`\n- [ ] `InitiateCheckout`\n- [ ] `Purchase`\n\n## Paraméterek\nMinden konverziós eseményhez küldd a `value` + `currency` paramétert, e-commerce-nél `content_ids` + `content_type` is.\n\n[Meta standard események](https://developers.facebook.com/docs/meta-pixel/reference)",
          "tags": [
            "Meta",
            "Mérés"
          ],
          "when": null,
          "checklist": [
            "ViewContent",
            "AddToCart",
            "InitiateCheckout",
            "Purchase"
          ]
        },
        "id": "ads-004",
        "docs": []
      },
      {
        "area": "consent",
        "severity": "warning",
        "title": "`wait_for_update` nincs beállítva a consent default-ban",
        "detail": "Ha a CMP aszinkron tölt be, a tagek elsülhetnek, mielőtt a felhasználó döntése megérkezne. A `wait_for_update: 500` (ms) megvárja a CMP válaszát – enélkül a hozzájáruló felhasználók egy része is \"denied\" állapotban kerül mérésre.",
        "impact": "Kevesebb hibásan denied-nek mért látogatás.",
        "effort": "S",
        "task": {
          "title": "`wait_for_update` beállítása a Consent Mode default hívásban",
          "notes": "Add hozzá a `wait_for_update: 500` paramétert a `gtag(\"consent\",\"default\",{...})` hívásához, hogy a tagek megvárják a CMP válaszát.",
          "tags": [
            "Consent"
          ],
          "when": null,
          "checklist": []
        },
        "id": "consent-011",
        "evidence": null,
        "docs": []
      },
      {
        "area": "content",
        "severity": "warning",
        "title": "Nagyon kevés szöveges tartalom a nyitóoldalon (~76 szó)",
        "detail": "A kevés szöveg részben lehet azért, mert az oldal JS-ből rendereli a tartalmat (ilyenkor a Google is nehezebben látja), részben mert tényleg kevés. Mindkettő rangsorolási hátrány.",
        "effort": "M",
        "task": {
          "title": "Nyitóoldal szöveges tartalmának bővítése",
          "notes": "Cél: 500+ szó értékes, kulcsszóra optimalizált szöveg. Ellenőrizd azt is, hogy a tartalom szerveroldalon renderelődik-e (nézd meg a forráskódot, ne a DevTools DOM-ot).",
          "tags": [
            "SEO",
            "Tartalom"
          ],
          "when": null,
          "checklist": []
        },
        "id": "content-016",
        "evidence": null,
        "impact": null,
        "docs": []
      },
      {
        "area": "a11y",
        "severity": "warning",
        "title": "2 link/gomb, aminek nincs felolvasható neve",
        "detail": "Ezek jellemzően ikonos gombok (kosár, menü, bezárás), amikben csak egy SVG vagy egy ikonfont van, szöveg nélkül. A képernyőolvasó ilyenkor csak annyit mond: „link\" vagy „gomb\" – a felhasználó nem tudja, mit csinálna.\n\nHa ezek között van a kosár vagy a beküldés gomb, az konkrét elveszett vásárlás.",
        "evidence": "2 link, 0 gomb",
        "effort": "S",
        "task": {
          "title": "Ikonos gombok elnevezése (aria-label)",
          "notes": "Minden szöveg nélküli linkre és gombra kerüljön `aria-label`:\n\n```html\n<button aria-label=\"Kosár megnyitása\">…<\/button>\n```\n\nPrioritás: kosár, menü, keresés, űrlap beküldés – ezek a konverziós útvonalon vannak.",
          "tags": [
            "Akadálymentesség",
            "CRO"
          ],
          "when": null,
          "checklist": []
        },
        "id": "a11y-021",
        "impact": null,
        "docs": []
      },
      {
        "area": "ads",
        "severity": "opportunity",
        "title": "Nem látok Google Ads konverziós tag-et (AW-)",
        "detail": "Nincs `AW-` azonosító az oldalon. Ha futnak Google Ads kampányok, a konverziók valószínűleg csak GA4-import útján érkeznek (lassabb, kevésbé pontos), vagy sehogy. Az Enhanced Conversions is `AW-` taghez kell.\n\nA GTM konténer tartalmát nem láttam – ha a Google Ads tag ott van, ez a pont tárgytalan.",
        "impact": "Pontosabb konverziókövetés és jobb Smart Bidding teljesítmény.",
        "effort": "M",
        "task": {
          "title": "Google Ads konverziókövetés + Enhanced Conversions beállítása",
          "notes": "1. Google Ads konverziós művelet létrehozása\n2. Google Ads Conversion Tracking tag a GTM-ben (`AW-`)\n3. Enhanced Conversions bekapcsolása (hashelt e-mail/telefon a dataLayerből)\n4. Google Ads ↔ GA4 összekötés ellenőrzése",
          "tags": [
            "Google Ads",
            "Mérés"
          ],
          "when": null,
          "checklist": []
        },
        "id": "ads-003",
        "evidence": null,
        "docs": []
      },
      {
        "area": "ads",
        "severity": "opportunity",
        "title": "Meta Advanced Matching nincs bekapcsolva a pixelben",
        "detail": "Az `fbq(\"init\", ...)` hívásban nincs user adat objektum. Az Advanced Matching (hashelt e-mail, telefon, név) jellemzően 10–20%-kal növeli a párosított konverziók számát, és javítja az Event Match Quality pontszámot.",
        "impact": "Több mért konverzió, pontosabb közönségek.",
        "effort": "S",
        "task": {
          "title": "Meta Advanced Matching bekapcsolása",
          "notes": "Automatikus AM bekapcsolása az Events Managerben, plusz manuális AM: `fbq(\"init\", \"PIXEL_ID\", {em: \"...\", ph: \"...\"})` a bejelentkezett/vásárló felhasználóknál (hashelve vagy plain – a pixel maga hashel).",
          "tags": [
            "Meta",
            "Mérés"
          ],
          "when": null,
          "checklist": []
        },
        "id": "ads-005",
        "evidence": null,
        "docs": []
      },
      {
        "area": "ads",
        "severity": "opportunity",
        "title": "Meta Pixel noscript (img) fallback hiányzik",
        "detail": "Nincs `<noscript>` képpixel fallback. Kis hatás, de JS nélküli/blokkolt környezetben elveszik a PageView.",
        "impact": "Néhány százalék plusz mért látogatás.",
        "effort": "S",
        "id": "ads-006",
        "evidence": null,
        "docs": [],
        "task": null
      },
      {
        "area": "ads",
        "severity": "opportunity",
        "title": "Meta Conversions API (CAPI) – szerveroldali párhuzamos küldés",
        "detail": "Kliensoldalról a Meta események jelentős része elveszik (iOS ATT, tartalomblokkolók, cookie-lejárat). A CAPI szerveroldalról küldi ugyanazt az eseményt `event_id`-vel deduplikálva. Ez a tapasztalat szerint a mért Meta konverziók 15–40%-át hozza vissza.",
        "impact": "Jelentősen több attribuált konverzió, jobb kampányoptimalizáció.",
        "effort": "L",
        "docs": [
          "https://developers.facebook.com/docs/marketing-api/conversions-api"
        ],
        "task": {
          "title": "Meta Conversions API bevezetése deduplikációval",
          "notes": "## Lépések\n1. CAPI forrás: server-side GTM, natív integráció (Shopify/WooCommerce plugin) vagy saját backend\n2. Minden eseményhez egyedi `event_id`, ami a böngésző oldali `fbq` hívásban is szerepel → dedup\n3. `user_data`: hashelt e-mail, telefon, `fbp`, `fbc`, IP, user agent\n4. Events Managerben ellenőrizni: \"Deduplikált események\" és Event Match Quality\n\n[CAPI dokumentáció](https://developers.facebook.com/docs/marketing-api/conversions-api)",
          "tags": [
            "Meta",
            "Mérés",
            "Stratégia"
          ],
          "when": null,
          "checklist": []
        },
        "id": "ads-007",
        "evidence": null
      },
      {
        "area": "ads",
        "severity": "opportunity",
        "title": "Meta domain verifikáció nincs a HTML-ben",
        "detail": "Nem találtam `facebook-domain-verification` meta taget. Domain verifikáció nélkül nem tudod beállítani az Aggregated Event Measurement (AEM) prioritásokat, ami iOS-en a konverziómérés alapja.",
        "impact": "iOS-es konverziómérés kontrollálhatóvá válik.",
        "effort": "S",
        "task": {
          "title": "Meta domain verifikáció elvégzése",
          "notes": "Business Manager → Brand Safety → Domains → domain hozzáadása → meta tag / DNS TXT / fájl feltöltés. Utána AEM: 8 esemény prioritás beállítása.",
          "tags": [
            "Meta"
          ],
          "when": null,
          "checklist": []
        },
        "id": "ads-008",
        "evidence": null,
        "docs": []
      },
      {
        "area": "consent",
        "severity": "opportunity",
        "title": "`url_passthrough` nincs bekapcsolva",
        "detail": "Enélkül consent elutasítás esetén elveszik a `gclid`/`wbraid` az oldalak közti navigáció során, így a Google Ads kattintás nem párosítható a konverzióhoz.",
        "impact": "Jobb Google Ads konverzió-párosítás consent nélküli felhasználóknál.",
        "effort": "S",
        "task": {
          "title": "`url_passthrough` és `ads_data_redaction` bekapcsolása",
          "notes": "`gtag(\"set\",\"url_passthrough\", true)` és `gtag(\"set\",\"ads_data_redaction\", true)` a consent default után.",
          "tags": [
            "Consent",
            "Google Ads"
          ],
          "when": null,
          "checklist": []
        },
        "id": "consent-012",
        "evidence": null,
        "docs": []
      },
      {
        "area": "seo",
        "severity": "opportunity",
        "title": "Hiányos Open Graph megosztási adatok (og:description, og:image)",
        "detail": "Enélkül a közösségi megosztás és a hirdetési előnézet csúnya, ami mérhetően rontja a CTR-t.",
        "effort": "S",
        "task": {
          "title": "Open Graph tagek kiegészítése",
          "notes": "Hiányzik: `og:description`, `og:image`\n\nAz `og:image` legyen 1200×630 px. Teszt: [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)",
          "tags": [
            "SEO",
            "Tartalom"
          ],
          "when": null,
          "checklist": [
            "og:description",
            "og:image"
          ]
        },
        "id": "seo-013",
        "evidence": null,
        "impact": null,
        "docs": []
      },
      {
        "area": "cro",
        "severity": "opportunity",
        "title": "Nem látok cégadatokat (adószám, cégjegyzékszám) az oldalon",
        "detail": "Magyar webshopnál a cégadatok feltüntetése kötelező, és a vásárlói bizalom egyik legolcsóbb eszköze. A lábléc a szokásos helye.",
        "effort": "S",
        "task": {
          "title": "Cégadatok kiírása a láblécbe",
          "notes": "Cégnév, székhely, adószám, cégjegyzékszám, ügyfélszolgálati elérhetőség. Kötelező is, és a bizalmat is növeli.",
          "tags": [
            "CRO",
            "Jogi"
          ],
          "when": null,
          "checklist": []
        },
        "id": "cro-018",
        "evidence": null,
        "impact": null,
        "docs": []
      },
      {
        "area": "cro",
        "severity": "opportunity",
        "title": "Nincs látható társadalmi bizonyíték (vélemény, értékelés, referencia)",
        "detail": "Se vásárlói vélemény, se értékelés, se referencia nem található az oldalon. Ez az egyik legerősebb konverziónövelő elem, különösen új látogatóknál, akik még nem ismernek téged.",
        "impact": "Vélemények kitétele tipikusan a legjobb megtérülésű CRO beavatkozás.",
        "effort": "M",
        "task": {
          "title": "Vásárlói vélemények / referenciák kitétele",
          "notes": "## Teendő\n1. Gyűjts 3-5 konkrét, névvel és lehetőleg fényképpel ellátott véleményt\n2. Tedd ki a CTA közelébe, ne az oldal aljára\n3. A konkrét, számokat tartalmazó vélemény sokkal erősebb, mint az „Nagyon elégedett vagyok\"\n4. Ha van Google értékelésed, `AggregateRating` strukturált adattal a találati listában is megjelenhet a csillag",
          "tags": [
            "CRO",
            "Tartalom"
          ],
          "when": null,
          "checklist": []
        },
        "id": "cro-019",
        "evidence": null,
        "docs": []
      },
      {
        "area": "ppc",
        "severity": "opportunity",
        "title": "Nincs Product strukturált adat – a Shopping hirdetéshez hasznos lenne",
        "detail": "Webshopnak tűnik, de nincs `Product` schema. A Merchant Center ebből tudja automatikusan kiegészíteni és ellenőrizni a termékfeedet (ár, készlet), és a szerves találatban is megjelenhet ár és értékelés.",
        "effort": "M",
        "task": {
          "title": "Product strukturált adat a termékoldalakra",
          "notes": "`Product` + `Offer` séma: `name`, `image`, `sku`, `gtin`, `brand`, `offers.price`, `offers.priceCurrency`, `offers.availability`, és ha van, `aggregateRating`.\n\nValidálás: [Rich Results Test](https://search.google.com/test/rich-results)",
          "tags": [
            "PPC",
            "SEO",
            "E-commerce"
          ],
          "when": null,
          "checklist": []
        },
        "id": "ppc-020",
        "evidence": null,
        "impact": null,
        "docs": []
      },
      {
        "area": "consent",
        "severity": "ok",
        "title": "Consent Mode v2 paraméterek megvannak",
        "detail": "Az `ad_user_data` és `ad_personalization` is szerepel a kódban.",
        "id": "consent-010",
        "evidence": null,
        "impact": null,
        "effort": null,
        "docs": [],
        "task": null
      },
      {
        "area": "seo",
        "severity": "ok",
        "title": "Van strukturált adat",
        "detail": "Talált típusok: Organization",
        "id": "seo-014",
        "evidence": null,
        "impact": null,
        "effort": null,
        "docs": [],
        "task": null
      },
      {
        "area": "seo",
        "severity": "ok",
        "title": "robots.txt és sitemap nem ellenőrizve (kézi mód)",
        "detail": "A beillesztett forrásból dolgoztunk, hálózati lekérés nélkül, ezért a `robots.txt`-t, a sitemapet és a külső scripteket nem tudtuk megnézni. Ezeket a [Search Console](https://search.google.com/search-console)-ban vagy a böngészőben közvetlenül tudod ellenőrizni.",
        "id": "seo-015",
        "evidence": null,
        "impact": null,
        "effort": null,
        "docs": [],
        "task": null
      },
      {
        "area": "tech",
        "severity": "ok",
        "title": "Szerver fejlécek nem vizsgálhatók ebben a módban",
        "detail": "A beillesztett forrásból dolgoztunk, így a szerver HTTP fejléceit (tömörítés, HSTS, cache) és a valós válaszidőt nem láttuk. Ezeket a [PageSpeed Insights](https://pagespeed.web.dev/) megmutatja.",
        "id": "tech-017",
        "evidence": null,
        "impact": null,
        "effort": null,
        "docs": [],
        "task": null
      }
    ],
    "score": {
      "overall": 19,
      "measurement": 28,
      "seo": 75,
      "conversion": 92,
      "grade": "F",
      "byArea": {
        "measurement": {
          "critical": 1,
          "warning": 1,
          "opportunity": 0,
          "ok": 0
        },
        "consent": {
          "critical": 1,
          "warning": 1,
          "opportunity": 1,
          "ok": 1
        },
        "ads": {
          "critical": 0,
          "warning": 1,
          "opportunity": 5,
          "ok": 0
        },
        "content": {
          "critical": 0,
          "warning": 1,
          "opportunity": 0,
          "ok": 0
        },
        "a11y": {
          "critical": 0,
          "warning": 1,
          "opportunity": 0,
          "ok": 0
        },
        "seo": {
          "critical": 0,
          "warning": 0,
          "opportunity": 1,
          "ok": 2
        },
        "cro": {
          "critical": 0,
          "warning": 0,
          "opportunity": 2,
          "ok": 0
        },
        "ppc": {
          "critical": 0,
          "warning": 0,
          "opportunity": 1,
          "ok": 0
        },
        "tech": {
          "critical": 0,
          "warning": 0,
          "opportunity": 0,
          "ok": 1
        }
      },
      "counts": {
        "critical": 2,
        "warning": 5,
        "opportunity": 10,
        "ok": 4,
        "blocked": 0
      }
    },
    "areaLabels": {
      "measurement": "Mérés",
      "consent": "Consent / adatvédelem",
      "ads": "Hirdetés",
      "seo": "SEO / technikai",
      "tech": "Technikai",
      "content": "Tartalom",
      "cro": "Konverzió (CRO)",
      "ppc": "Hirdetés (PPC)",
      "a11y": "Akadálymentesség"
    }
  },
  "deepAudit": {
    "demo": true,
    "executive_summary": "**Mintaelemzés (előre generált)** – kitalált adatokon alapuló bemutató, nem valódi AI-futás eredménye.\n\nA **pelda-webshop.hu** alapmérése el van indítva (GTM és GA4 is fut), de a webshop szempontjából legfontosabb adatok hiányoznak: a forrásban nem látszanak e-kereskedelmi események, így nem tudni, melyik kampány hoz vásárlást.\n\n**A 3 legfontosabb lépés:**\n\n1. Hozzájáruláskezelő (CMP) bevezetése és a Consent Mode v2 frissítése (`wait_for_update`), hogy a mérés jogszerű legyen.\n2. A GA4 e-commerce események (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`) bekötése a GTM-en keresztül.\n3. A GA4 kétszeres betöltésének megszüntetése (GTM és közvetlen gtag is fut), mert torzíthatja az adatokat.\n\n**A tét:** amíg nincs vásárlási adat, a hirdetési keret elosztása találgatás. Egy kitalált 1 M Ft/hó keretnél már 10–15% jobb elosztás is havi 100–150 ezer Ft hatékonyságot jelenthet.",
    "maturity": {
      "level": "alapszintu",
      "rationale": "Van címkekezelő, mérési azonosító és Consent Mode alapbeállítás, de nincs konverzió- és bevételmérés, és hiányzik a hozzájáruláskezelő.",
      "benchmark": "Egy hasonló méretű (kitalált) hazai webshopnál az e-commerce mérés és a CMP ma alapelvárás; ebben az állapotban a mintaoldal a mezőny alsó felében lenne."
    },
    "findings": [
      {
        "area": "measurement",
        "severity": "critical",
        "title": "Dupla GA4 betöltés: GTM és közvetlen gtag is fut",
        "detail": "A forrásban a `GTM-XXXXXXX` konténer mellett közvetlen `gtag('config', 'G-XXXXXXXXXX')` hívás is van. Ha a konténerben is van GA4 címke, minden oldalmegtekintés kétszer számolódhat.",
        "recommendation": "1. Nézd meg a GTM-ben, van-e GA4 Google címke.\n2. Ha van, a közvetlen gtag kódot töröld a sablonból.\n3. GA4 DebugView-ban ellenőrizd, hogy oldalanként egy `page_view` érkezik.",
        "business_impact": "Megbízható munkamenet- és konverziós arányok; a torzított adat miatti rossz döntések elkerülése.",
        "effort": "S"
      },
      {
        "area": "consent",
        "severity": "critical",
        "title": "Meta Pixel hozzájárulás nélkül indul",
        "detail": "A `fbq('init')` és a `PageView` az oldal betöltésekor fut, CMP nélkül. Ez az EU-ban adatvédelmi kockázat.",
        "recommendation": "A Meta Pixelt a GTM-be kell költöztetni, és csak `ad_storage = granted` állapotban szabad elsütni.",
        "business_impact": "Jogi kockázat csökkentése; a hirdetésoptimalizálás hozzájárulással tovább működik.",
        "effort": "M"
      },
      {
        "area": "strategy",
        "severity": "opportunity",
        "title": "A hírlevél-feliratkozás nincs konverzióként mérve",
        "detail": "Van hírlevélűrlap (`/hirlevel`), de nem látszik hozzá esemény.",
        "recommendation": "`generate_lead` esemény küldése sikeres feliratkozáskor, GA4-ben kulcseseményként megjelölve.",
        "business_impact": "Az e-mail lista növekedése kampányokhoz rendelhető.",
        "effort": "S"
      }
    ],
    "measurement_plan": [
      {
        "event_name": "page_view",
        "trigger": "Minden oldalbetöltés (egyszer)",
        "parameters": [
          "page_location",
          "page_title"
        ],
        "platforms": [
          "GA4"
        ],
        "status": "javitando",
        "priority": "P1"
      },
      {
        "event_name": "view_item",
        "trigger": "Termékoldal megnyitása (pl. /termek/tolgy-kerti-asztal-160)",
        "parameters": [
          "currency",
          "value",
          "items"
        ],
        "platforms": [
          "GA4",
          "Meta"
        ],
        "status": "hianyzik",
        "priority": "P1"
      },
      {
        "event_name": "add_to_cart",
        "trigger": "„Kosárba” gomb kattintás",
        "parameters": [
          "currency",
          "value",
          "items"
        ],
        "platforms": [
          "GA4",
          "Meta",
          "Google Ads"
        ],
        "status": "hianyzik",
        "priority": "P1"
      },
      {
        "event_name": "begin_checkout",
        "trigger": "A /kosar oldalon a „Tovább a pénztárhoz” gomb",
        "parameters": [
          "currency",
          "value",
          "items",
          "coupon"
        ],
        "platforms": [
          "GA4",
          "Meta"
        ],
        "status": "hianyzik",
        "priority": "P1"
      },
      {
        "event_name": "purchase",
        "trigger": "Sikeres rendelés köszönőoldala",
        "parameters": [
          "transaction_id",
          "currency",
          "value",
          "tax",
          "shipping",
          "items"
        ],
        "platforms": [
          "GA4",
          "Meta",
          "Google Ads"
        ],
        "status": "hianyzik",
        "priority": "P1"
      },
      {
        "event_name": "generate_lead",
        "trigger": "Sikeres hírlevél-feliratkozás",
        "parameters": [
          "form_id"
        ],
        "platforms": [
          "GA4"
        ],
        "status": "hianyzik",
        "priority": "P2"
      }
    ],
    "roadmap": [
      {
        "phase": "1. Jogszerű alapok",
        "timeframe": "1. hét",
        "goal": "Minden mérőkód csak hozzájárulás után, egyszer fut.",
        "success_metric": "DebugView-ban oldalanként 1 page_view, elutasításnál nincs hirdetési süti.",
        "tasks": [
          {
            "title": "Hozzájáruláskezelő (CMP) kiválasztása és bevezetése",
            "notes": "### Miért\nCMP nélkül a mérés nem jogszerű.\n\n### Hogyan\n1. Válassz Consent Mode v2-kompatibilis CMP-t.\n2. Telepítsd GTM-ből.\n3. Teszteld elfogadás és elutasítás esetén is.",
            "priority": "P1",
            "effort": "M",
            "owner": "marketinges + fejlesztő",
            "checklist": [
              "CMP kiválasztva",
              "Banner szövege jóváhagyva",
              "Teszt: elutasítás"
            ]
          },
          {
            "title": "A közvetlen gtag kód eltávolítása a sablonból",
            "notes": "A GA4 csak a GTM-ből töltődjön be (`GTM-XXXXXXX`). Utána DebugView-ban ellenőrizd.",
            "priority": "P1",
            "effort": "S",
            "owner": "fejlesztő"
          }
        ]
      },
      {
        "phase": "2. Webshop mérés",
        "timeframe": "2–3. hét",
        "goal": "A teljes vásárlási folyamat mérhető GA4-ben.",
        "success_metric": "A GA4 „Vásárlási folyamat” jelentésében mind a 4 lépés adatot mutat.",
        "tasks": [
          {
            "title": "dataLayer e-commerce események a webshop sablonba",
            "notes": "A `view_item`, `add_to_cart`, `begin_checkout`, `purchase` események GA4 ajánlott szerkezetben (`items` tömb).",
            "priority": "P1",
            "effort": "L",
            "owner": "fejlesztő",
            "depends_on": "1. fázis"
          },
          {
            "title": "GA4 és Meta címkék beállítása a GTM-ben",
            "notes": "Egy GA4 eseménycímke dinamikus eseménynévvel; Meta standard események ugyanazokra a triggerekre.",
            "priority": "P1",
            "effort": "M",
            "owner": "marketinges"
          }
        ]
      },
      {
        "phase": "3. Hirdetési optimalizálás",
        "timeframe": "1–2 hónap",
        "goal": "A hirdetési rendszerek valós vásárlási adatokra optimalizálnak.",
        "success_metric": "Google Ads és Meta konverziók eltérése a GA4-től 15% alatt.",
        "tasks": [
          {
            "title": "Google Ads konverziókövetés és bővített konverziók",
            "notes": "Konverziós címke a `purchase` eseményre, Conversion Linker bekapcsolva.",
            "priority": "P2",
            "effort": "M",
            "owner": "marketinges"
          },
          {
            "title": "Meta Conversions API előkészítése",
            "notes": "Szerveroldali küldés deduplikációval (`event_id`).",
            "priority": "P3",
            "effort": "L",
            "owner": "fejlesztő"
          }
        ]
      }
    ],
    "citations": []
  },
  "marketing": {
    "demo": true,
    "business_profile": {
      "what_they_do": "Kitalált online áruház: kerti bútorokat, párnákat, kültéri lámpákat és lakásdekort árul.",
      "category": "Otthon és kert",
      "business_model": "B2C webshop",
      "target_audience": "30–55 éves, saját kerttel vagy erkéllyel rendelkező vásárlók, akik tavasszal és nyár elején rendeznek be.",
      "value_proposition": "Gyors szállítás, ingyenes szállítás 30 000 Ft felett, 30 napos visszaküldés.",
      "market": "Magyarország",
      "confidence": "kozepes"
    },
    "section1_opportunities": {
      "summary": "**Mintaelemzés (előre generált)** – kitalált adatokon alapuló bemutató, nem valódi AI-futás eredménye.\n\nA mintaoldal legnagyobb kiaknázatlan lehetősége a **szezonális keresési kereslet** (tavaszi kerti berendezés) és a **kosárelhagyók visszahozása**. A vásárlási adatok bekötése előfeltétele a fizetett csatornák skálázásának.",
      "channels": [
        {
          "channel": "Google Shopping / Performance Max",
          "priority": "P1",
          "rationale": "Vizuális, ár-összehasonlító termékkör: a vásárlók képpel és árral keresnek.",
          "current_state": "Nem látszik Google Ads konverziós címke.",
          "gaps": [
            {
              "issue": "Nincs Product strukturált adat a termékoldalakon",
              "fix": "Product JSON-LD (név, ár, készlet, kép) a termékoldal-sablonba.",
              "evidence": "megfigyelt"
            },
            {
              "issue": "Nincs vásárlási konverzió",
              "fix": "A 2. fázis purchase eseményét Google Ads konverzióként importálni.",
              "evidence": "megfigyelt"
            }
          ],
          "first_steps": [
            "Merchant Center fiók és termékfeed beállítása",
            "Konverzió importálása GA4-ből",
            "Szezon előtt 4 héttel kampányindítás"
          ],
          "kpis": [
            "ROAS",
            "Konverziós érték",
            "Kattintásonkénti költség"
          ],
          "budget_note": "Induláskor napi 10–20 ezer Ft (kitalált nagyságrend).",
          "expected_impact": "Szezonban a forgalom legnagyobb fizetett forrása lehet."
        },
        {
          "channel": "SEO – kategória- és tanácsadó tartalom",
          "priority": "P1",
          "rationale": "A nyitóoldalon nagyon kevés a szöveg; a kategóriaoldalak a fő keresési belépők.",
          "first_steps": [
            "Kategórialeírások (150–300 szó) írása",
            "Belső linkek a blogból a kategóriákra"
          ],
          "kpis": [
            "Organikus munkamenetek",
            "Rangsor a fő kategória-kulcsszavakra"
          ]
        },
        {
          "channel": "E-mail (hírlevél + kosárelhagyó)",
          "priority": "P2",
          "rationale": "Van feliratkozóűrlap, de nem látszik automatizmus.",
          "first_steps": [
            "Üdvözlő sorozat 3 levéllel",
            "Kosárelhagyó levél 1 órán belül"
          ],
          "kpis": [
            "Feliratkozási arány",
            "E-mailből származó bevétel"
          ]
        },
        {
          "channel": "Meta hirdetések (remarketing)",
          "priority": "P3",
          "rationale": "Termékképekre épülő remarketing jól működhet, de csak hozzájárulás és esemény-bekötés után.",
          "first_steps": [
            "Pixel áthelyezése GTM-be consenttel",
            "Dinamikus termékhirdetés katalógussal"
          ],
          "kpis": [
            "Remarketing ROAS",
            "Frekvencia"
          ]
        }
      ],
      "content_themes": [
        {
          "theme": "Kerti berendezés útmutatók",
          "funnel_stage": "awareness",
          "why": "Tavasszal sokan keresnek ötleteket, mielőtt termékre keresnének.",
          "keywords": [
            "kis kert berendezése",
            "erkély ötletek",
            "kerti bútor anyagok"
          ],
          "example_titles": [
            "Kis erkély, nagy kényelem: 7 berendezési ötlet",
            "Tölgy, rattan vagy fém? Kerti bútor anyagok összehasonlítása"
          ]
        },
        {
          "theme": "Ápolás és tárolás",
          "funnel_stage": "retention",
          "why": "Vásárlás után is visszahozza a vevőt, és csökkenti a visszaküldést.",
          "keywords": [
            "kerti bútor téli tárolás",
            "fa bútor olajozása"
          ],
          "example_titles": [
            "Így készítsd fel a kerti bútort a télre"
          ]
        }
      ],
      "content_formats": [
        {
          "format": "Összehasonlító blogcikk",
          "why": "Döntés előtti keresésekre válaszol.",
          "channels": [
            "SEO",
            "Hírlevél"
          ],
          "cadence": "havonta 2",
          "production_effort": "M",
          "repurposing": "Rövid változat közösségi posztként."
        },
        {
          "format": "Rövid termékvideó (15–30 mp)",
          "why": "Méret és anyag jobban átjön, mint fotón.",
          "channels": [
            "Meta",
            "YouTube Shorts",
            "Termékoldal"
          ],
          "cadence": "hetente 1",
          "production_effort": "S"
        }
      ]
    },
    "section2_competitors": {
      "method_note": "DEMÓ: a versenytársak kitaláltak, a nevek és címek csak illusztrációk (nem létező oldalak). Valódi futtatásnál ez webes kereséssel készül.",
      "competitors": [
        {
          "rank": 1,
          "name": "Kitalált Versenytárs A",
          "url": "https://versenytars-a.example",
          "why_competitor": "Ugyanazokra a kategória-kulcsszavakra jelenik meg (kitalált).",
          "positioning": "Széles választék, alacsony árak.",
          "strengths": [
            "Nagy kínálat",
            "Sok vásárlói értékelés"
          ],
          "weaknesses": [
            "Lassú szállítás",
            "Kevés tanácsadó tartalom"
          ],
          "channels": [
            "Google Shopping",
            "Meta"
          ],
          "what_to_steal": "Értékelések megjelenítése a terméklistában."
        },
        {
          "rank": 2,
          "name": "Kitalált Versenytárs B",
          "url": "https://versenytars-b.example",
          "why_competitor": "Hasonló árkategória és célközönség (kitalált).",
          "positioning": "Prémium, designközpontú.",
          "strengths": [
            "Erős vizuális tartalom",
            "Hírlevél-sorozatok"
          ],
          "weaknesses": [
            "Magas szállítási díj"
          ],
          "channels": [
            "Instagram",
            "E-mail",
            "SEO"
          ],
          "what_to_steal": "Szezonális „inspiráció” oldalak termékcsomagokkal."
        }
      ],
      "comparison_table": [
        {
          "dimension": "Szállítási ígéret",
          "you": "2–3 munkanap, ingyenes 30 000 Ft felett",
          "competitors": "3–7 munkanap",
          "verdict": "elony",
          "action": "Emeld ki a fejlécben és a hirdetésekben."
        },
        {
          "dimension": "Tartalommennyiség",
          "you": "~76 szó a nyitóoldalon, blog kevés",
          "competitors": "Kategórialeírások és útmutatók",
          "verdict": "hatrany",
          "action": "Kategórialeírások és havi 2 útmutató."
        },
        {
          "dimension": "Társadalmi bizonyíték",
          "you": "Nem látszik értékelés",
          "competitors": "Csillagos értékelések",
          "verdict": "hatrany",
          "action": "Vásárlás utáni értékelőlevél bevezetése."
        }
      ],
      "differentiation": "A **gyors szállítás** és a **30 napos visszaküldés** valódi előny lehet – jelenleg alig kommunikált. Erre építve: „Szezon előtt is időben megérkezik” üzenet a tavaszi kampányokban."
    },
    "section3_tasks": [
      {
        "title": "Kategórialeírások írása a 3 fő kategóriához",
        "notes": "Kerti bútor, Párnák és textilek, Lámpák: 150–300 szó, belső linkekkel.",
        "priority": "P1",
        "effort": "M",
        "tags": [
          "SEO"
        ]
      },
      {
        "title": "Vásárlás utáni értékelőlevél beállítása",
        "notes": "Kiszállítás után 7 nappal automatikus levél, az értékelések a termékoldalon jelenjenek meg.",
        "priority": "P2",
        "effort": "S",
        "tags": [
          "CRO",
          "E-mail"
        ]
      },
      {
        "title": "Szállítási előny kiemelése a fejlécben és hirdetésekben",
        "notes": "„2–3 munkanap • ingyenes 30 000 Ft felett” sáv a fejléc alatt.",
        "priority": "P2",
        "effort": "S",
        "tags": [
          "CRO"
        ]
      }
    ],
    "citations": []
  },
  "deepScan": null,
  "updatedAt": "2026-09-15T08:00:00.000Z",
  "demo": true
};

  /* 1) A sáv: a szkript hozza létre, és a lap tetejére teszi */
  var banner = document.createElement('div');
  banner.id = 'ga4demo-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Demó tájékoztató');
  banner.innerHTML =
    '<div class="ga4demo-inner">' +
      '<div class="ga4demo-text">' +
        '<span class="ga4demo-pill">DEMÓ</span> <b>A betöltött elemzés kitalált adatokon alapul (pelda-webshop.hu).</b> ' +
        '<span class="ga4demo-sub">Próbáld ki élőben itt, saját AI API kulccsal (pl. ingyenes Gemini kulcs – a kulcs csak a böngésződben marad).</span>' +
        '<span class="ga4demo-sub-short">Élőben saját AI kulccsal (csak a böngésződben marad).</span>' +
      '</div>' +
      '<div class="ga4demo-actions">' +
        '<button type="button" class="ga4demo-btn" id="ga4demoGuide" aria-haspopup="dialog">Útmutató</button>' +
        '<button type="button" class="ga4demo-btn" id="ga4demoDownload" title="Az app letöltése ZIP-ben: üres eszköz a saját adataiddal (AI kulcs nélkül) és az útmutató">Letöltés</button>' +
        '<a class="ga4demo-btn" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Ingyenes<span class="ga4demo-long"> Gemini</span> kulcs ↗</a>' +
        '<button type="button" class="ga4demo-btn" id="ga4demoSettings">Kulcs megadása</button>' +
      '</div>' +
      '<p class="ga4demo-msg" id="ga4demoMsg" role="status" aria-live="polite" hidden></p>' +
    '</div>';

  safe(function () {
    document.body.insertBefore(banner, document.body.firstChild);
    var setH = function () { document.documentElement.style.setProperty('--ga4demo-h', banner.offsetHeight + 'px'); };
    setH();
    if (window.ResizeObserver) new ResizeObserver(setH).observe(banner);
    else window.addEventListener('resize', setH);
  });

  var msgEl = document.getElementById('ga4demoMsg');
  function showMsg(text) {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.hidden = false;
  }

  /* „Útmutató”: a mellette lévő kezelesi-utmutato-ghp.html fájlt nyitja meg teljes képernyős nézetben, a lapon belül. */
  var guideEl = null, guideReturnFocus = null, guidePrevOverflow = '';
  function closeGuide() {
    if (!guideEl) return;
    guideEl.remove();
    guideEl = null;
    document.documentElement.style.overflow = guidePrevOverflow;
    safe(function () { if (guideReturnFocus) guideReturnFocus.focus(); });
  }
  function openGuide() {
    if (guideEl) return;
    guideReturnFocus = document.activeElement;
    guideEl = document.createElement('div');
    guideEl.id = 'ga4demo-guide';
    guideEl.setAttribute('role', 'dialog');
    guideEl.setAttribute('aria-modal', 'true');
    guideEl.setAttribute('aria-label', 'Kezelési útmutató');
    var bar = document.createElement('div');
    bar.className = 'ga4demo-guide-bar';
    var title = document.createElement('span');
    title.className = 'ga4demo-guide-title';
    title.textContent = 'GA4 Insights – Kezelési útmutató';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'ga4demo-guide-close';
    close.id = 'ga4demoGuideClose';
    close.textContent = '✕ Bezárás';
    close.addEventListener('click', closeGuide);
    bar.appendChild(title);
    bar.appendChild(close);
    var frame = document.createElement('iframe');
    frame.title = 'Kezelési útmutató';
    frame.src = 'kezelesi-utmutato-ghp.html';
    guideEl.appendChild(bar);
    guideEl.appendChild(frame);
    guidePrevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(guideEl);
    close.focus();
  }
  safe(function () {
    var g = document.getElementById('ga4demoGuide');
    if (!g) return;
    g.addEventListener('click', function () {
      try { openGuide(); }
      catch (e) { closeGuide(); showMsg('Az útmutató nem nyitható meg ebben a böngészőben.'); }
    });
    document.addEventListener('keydown', function (e) {
      if (guideEl && (e.key === 'Escape' || e.key === 'Esc')) { e.preventDefault(); e.stopPropagation(); closeGuide(); }
    }, true);
    window.addEventListener('message', function (e) {
      var f = guideEl && guideEl.querySelector('iframe');
      if (f && e.source === f.contentWindow && e.data && (e.data.type === 'ga4-close-guide' || e.data.type === 'ga4demo-close-guide')) closeGuide();
    });
  });

  /* „Letöltés”: az app ZIP-ben – a demó réteg nélkül, a látogató saját adataival (AI kulcs nélkül) és a letölthető útmutatóval */

  /* A letöltött index.html-be kerülő, demótól független kód. Szövegként (Function.prototype.toString) kerül át. */
  function ga4SavedImport() {
    /* Az app mentett adatainak betöltése az első megnyitáskor (egyszer) */
    var el = document.getElementById('ga4-import-data');
    var data = null;
    try { data = JSON.parse(el.textContent); } catch (e) { return; }
    if (!data || !data.exportId) return;
    var flag = 'ga4insights.import.' + data.exportId;
    function merge(get, set) {
      if (get(flag)) return;
      if (Array.isArray(data.runs) && data.runs.length) {
        var cur = [];
        try { cur = JSON.parse(get('ga4insights.runs') || '[]'); } catch (e) { cur = []; }
        if (!Array.isArray(cur)) cur = [];
        var seen = {};
        cur.forEach(function (r) { if (r && r.id) seen[r.id] = true; });
        var add = data.runs.filter(function (r) { return r && r.id && !seen[r.id]; });
        if (add.length) set('ga4insights.runs', JSON.stringify(cur.concat(add).slice(0, 25)));
      }
      if (data.settings && typeof data.settings === 'object') {
        var s = null;
        try { s = JSON.parse(get('ga4insights.settings') || 'null'); } catch (e) { s = null; }
        if (!s || typeof s !== 'object' || Array.isArray(s)) s = {};
        Object.keys(data.settings).forEach(function (k) {
          if (k === 'apiKey') return;
          var v = data.settings[k];
          if (k === 'clients' && Array.isArray(v)) {
            var list = Array.isArray(s.clients) ? s.clients : [];
            var have = {};
            list.forEach(function (c) { if (c && c.id) have[c.id] = true; });
            s.clients = list.concat(v.filter(function (c) { return c && c.id && !have[c.id]; }));
          } else if (s[k] === undefined || s[k] === null || s[k] === '') {
            s[k] = v;
          }
        });
        set('ga4insights.settings', JSON.stringify(s));
      }
      if (data.theme && !get('theme')) set('theme', data.theme);
      set(flag, new Date().toISOString());
    }
    try {
      merge(function (k) { return localStorage.getItem(k); }, function (k, v) { localStorage.setItem(k, v); });
    } catch (e) {
      /* Ha a böngésző nem enged tartós mentést, az app betöltése után a memóriába kerülnek */
      window.ga4SavedImportMerge = merge;
    }
  }

  function ga4SavedImportFallback() {
    var merge = window.ga4SavedImportMerge;
    if (typeof merge !== 'function') return;
    try {
      merge(function (k) { return storage.get(k); }, function (k, v) { storage.set(k, v); });
      settings = loadSettings();
      if (typeof Fetcher === 'object' && Fetcher && typeof Fetcher.setCustomProxy === 'function') Fetcher.setCustomProxy(settings.customProxy);
      var refresh = function () {
        if (typeof renderClientBar === 'function') renderClientBar();
        if (typeof renderApiKeyWarning === 'function') renderApiKeyWarning();
      };
      if (typeof api === 'function' && typeof state === 'object' && state) {
        Promise.resolve(api('/api/config')).then(function (c) { state.config = c; refresh(); }, refresh);
      } else {
        refresh();
      }
    } catch (e) { /* az app nem érhető el */ }
  }

  function ga4GuideSetup() {
    /* „Útmutató” gomb a felső menüben: a kezelési útmutatót a lapon belül nyitja meg */
    var css = [
      '#ga4guide { position: fixed; inset: 0; z-index: 2147483000; display: flex; flex-direction: column; background: var(--bg, #f7f7f5); color: var(--text, #1a1a18); }',
      '#ga4guide .ga4guide-bar { flex: none; display: flex; align-items: center; gap: 10px; padding: 8px 16px; padding-top: calc(8px + env(safe-area-inset-top, 0px)); background: var(--warning-bg, #fdf4e3); border-bottom: 2px solid var(--warning, #b8730a); font-size: 14px; line-height: 1.4; }',
      '#ga4guide .ga4guide-title { flex: 1; min-width: 0; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '#ga4guide .ga4guide-close { flex: none; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 6px 14px; border-radius: var(--radius-sm, 6px); border: 1px solid var(--warning, #b8730a); background: var(--warning, #b8730a); color: var(--surface, #fff); font: inherit; font-size: 14px; font-weight: 650; cursor: pointer; white-space: nowrap; }',
      '#ga4guide .ga4guide-close:focus-visible { outline: 3px solid var(--accent, #b4551f); outline-offset: 2px; }',
      '#ga4guide iframe { flex: 1; width: 100%; min-height: 0; border: 0; background: #fff; display: block; }',
      '@media (max-width: 480px) { .masthead nav { flex-wrap: wrap; row-gap: 4px; } .masthead nav .ghost-btn { padding: 6px 8px; } }',
      '@media print { #ga4guide { display: none !important; } }'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'ga4guide-style';
    style.textContent = css;
    document.head.appendChild(style);

    var settingsBtn = document.getElementById('btnSettings');
    if (!settingsBtn || !settingsBtn.parentNode) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'btnGuide';
    btn.className = settingsBtn.className.replace(/\bactive\b/g, '').trim() || 'ghost-btn';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.textContent = 'Útmutató';
    settingsBtn.parentNode.insertBefore(btn, settingsBtn.nextSibling);

    var guideEl = null, returnFocus = null, prevOverflow = '';
    function closeGuide() {
      if (!guideEl) return;
      guideEl.remove();
      guideEl = null;
      document.documentElement.style.overflow = prevOverflow;
      try { if (returnFocus) returnFocus.focus(); } catch (e) { /* nincs fókuszálható elem */ }
    }
    function openGuide() {
      if (guideEl) return;
      returnFocus = document.activeElement;
      guideEl = document.createElement('div');
      guideEl.id = 'ga4guide';
      guideEl.setAttribute('role', 'dialog');
      guideEl.setAttribute('aria-modal', 'true');
      guideEl.setAttribute('aria-label', 'Kezelési útmutató');
      var bar = document.createElement('div');
      bar.className = 'ga4guide-bar';
      var title = document.createElement('span');
      title.className = 'ga4guide-title';
      title.textContent = 'GA4 Insights – Kezelési útmutató';
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'ga4guide-close';
      close.id = 'ga4guideClose';
      close.textContent = '✕ Bezárás';
      close.addEventListener('click', closeGuide);
      bar.appendChild(title);
      bar.appendChild(close);
      var frame = document.createElement('iframe');
      frame.title = 'Kezelési útmutató';
      frame.src = 'kezelesi-utmutato-ghp.html';
      guideEl.appendChild(bar);
      guideEl.appendChild(frame);
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.appendChild(guideEl);
      close.focus();
    }
    btn.addEventListener('click', function () {
      try { openGuide(); } catch (e) { closeGuide(); }
    });
    document.addEventListener('keydown', function (e) {
      if (guideEl && (e.key === 'Escape' || e.key === 'Esc')) { e.preventDefault(); e.stopPropagation(); closeGuide(); }
    }, true);
    window.addEventListener('message', function (e) {
      var f = guideEl && guideEl.querySelector('iframe');
      if (f && e.source === f.contentWindow && e.data && e.data.type === 'ga4-close-guide') closeGuide();
    });
  }

  /* Byte-szintű segédek */
  var enc = new TextEncoder();
  function findBytes(hay, needle, from) {
    var n = needle.length, last = hay.length - n, first = needle[0];
    for (var i = from || 0; i <= last; i++) {
      if (hay[i] !== first) continue;
      var j = 1;
      while (j < n && hay[i + j] === needle[j]) j++;
      if (j === n) return i;
    }
    return -1;
  }
  function countBytes(hay, needle) {
    var c = 0, i = findBytes(hay, needle, 0);
    while (i !== -1) { c++; i = findBytes(hay, needle, i + needle.length); }
    return c;
  }
  function concatBytes(parts) {
    var len = 0;
    parts.forEach(function (p) { len += p.length; });
    var out = new Uint8Array(len), off = 0;
    parts.forEach(function (p) { out.set(p, off); off += p.length; });
    return out;
  }

  /* Tárolt adatok – a demó elemzés és az AI kulcs nélkül */
  function collectUserData() {
    function get(k) {
      var v = safe(function () { return (typeof storage === 'object' && storage && typeof storage.get === 'function') ? storage.get(k) : localStorage.getItem(k); });
      return v == null ? null : v;
    }
    var runs = safe(function () { return JSON.parse(get(RUNS_KEY) || '[]'); });
    runs = Array.isArray(runs) ? runs.filter(function (r) { return r && r.id && r.id !== DEMO_ID && r.demo !== true; }) : [];
    var settings = safe(function () { return JSON.parse(get('ga4insights.settings') || 'null'); });
    var apiKey = '';
    if (settings && typeof settings === 'object' && !Array.isArray(settings)) {
      apiKey = typeof settings.apiKey === 'string' ? settings.apiKey.trim() : '';
      delete settings.apiKey;
    } else {
      settings = null;
    }
    var theme = get('theme');
    if (theme !== 'light' && theme !== 'dark') theme = null;
    if (!runs.length && !settings && !theme) return null;
    var data = { exportId: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), exportedAt: new Date().toISOString() };
    if (runs.length) data.runs = runs;
    if (settings) data.settings = settings;
    if (theme) data.theme = theme;
    var json = JSON.stringify(data);
    if (apiKey.length >= 6) json = json.split(apiKey).join('');
    return json.replace(/</g, '\\u003c');
  }

  function buildIndex(buf, userJson) {
    var bytes = new Uint8Array(buf);
    var S = '<' + 'script', E = '<' + '/script>';
    /* A letöltött appból a demó réteg betöltő sora marad ki – más nem. */
    var loader = enc.encode(S + ' src="' + DEMO_FILE + '">' + E + '\n');
    var headClose = enc.encode('<' + '/head>');
    if (countBytes(bytes, loader) !== 1) throw new Error('marker');
    var start = findBytes(bytes, loader, 0);
    var end = start + loader.length;
    var head = findBytes(bytes, headClose, 0);
    if (start < 0 || head < 0 || head >= start) throw new Error('marker');
    var headInject = '', tailInject = S + '>\n(' + ga4GuideSetup.toString() + ')();\n' + E;
    if (userJson) {
      headInject = S + ' type="application/json" id="ga4-import-data">' + userJson + E + '\n' +
        S + '>\n(' + ga4SavedImport.toString() + ')();\n' + E + '\n';
      tailInject = S + '>\n(' + ga4SavedImportFallback.toString() + ')();\n' + E + '\n' + tailInject;
    }
    var out = concatBytes([
      bytes.subarray(0, head), enc.encode(headInject),
      bytes.subarray(head, start), enc.encode(tailInject),
      bytes.subarray(end)
    ]);
    /* Biztonsági ellenőrzés: a letöltött appban nem maradhat demó nyom.
       A látogató saját adatait nem nézzük: ha épp ezt az oldalt elemezte,
       azokban jogosan szerepelhet a demó réteg neve. */
    var appText = new TextDecoder('utf-8').decode(concatBytes([bytes.subarray(0, start), bytes.subarray(end)])) +
      tailInject + (userJson ? ga4SavedImport.toString() : '');
    if (appText.indexOf('ga4demo') !== -1 || appText.indexOf(DEMO_FILE) !== -1) throw new Error('demo');
    return out;
  }

  function buildGuide(text) {
    var doc = new DOMParser().parseFromString(text, 'text/html');
    doc.querySelectorAll('[data-csak-online]').forEach(function (el) {
      var prev = el.previousSibling;
      if (prev && prev.nodeType === 3 && !/\S/.test(prev.nodeValue)) prev.remove();
      el.remove();
    });
    doc.querySelectorAll('[data-csak-letoltott]').forEach(function (el) {
      el.removeAttribute('data-csak-letoltott');
      el.removeAttribute('hidden');
    });
    doc.querySelectorAll('[data-letoltott-content]').forEach(function (el) {
      el.setAttribute('content', el.getAttribute('data-letoltott-content'));
      el.removeAttribute('data-letoltott-content');
    });
    /* Folyamatos számozás: szekciók, tartalomjegyzék, „N. pont” hivatkozások */
    var num = {}, i = 0;
    doc.querySelectorAll('section[id]').forEach(function (sec) {
      var n = sec.querySelector('h2 .num');
      if (!n) return;
      i++;
      n.textContent = String(i);
      num[sec.id] = i;
    });
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (!num[id]) return;
      var t = a.textContent;
      if (/^\d+\.\s/.test(t)) a.textContent = t.replace(/^\d+\./, num[id] + '.');
    });
    var html = '<!doctype html>\n' + doc.documentElement.outerHTML + '\n';
    if (/dem[oóÓ]/i.test(html)) throw new Error('guide');
    return enc.encode(html);
  }

  /* Tömörítés nélküli ZIP (store) */
  var CRC_TABLE = null;
  function crc32(data) {
    if (!CRC_TABLE) {
      CRC_TABLE = new Uint32Array(256);
      for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        CRC_TABLE[n] = c >>> 0;
      }
    }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < data.length; i++) crc = CRC_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function makeZip(files) {
    var d = new Date();
    var dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (Math.floor(d.getSeconds() / 2));
    var dosDate = ((Math.max(d.getFullYear(), 1980) - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    var locals = [], centrals = [], offset = 0;
    files.forEach(function (f) {
      var name = enc.encode(f.name), crc = crc32(f.data), size = f.data.length;
      var lh = new Uint8Array(30 + name.length), lv = new DataView(lh.buffer);
      lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 10, true); lv.setUint16(6, 0x0800, true);
      lv.setUint16(8, 0, true); lv.setUint16(10, dosTime, true); lv.setUint16(12, dosDate, true);
      lv.setUint32(14, crc, true); lv.setUint32(18, size, true); lv.setUint32(22, size, true);
      lv.setUint16(26, name.length, true); lv.setUint16(28, 0, true);
      lh.set(name, 30);
      var ch = new Uint8Array(46 + name.length), cv = new DataView(ch.buffer);
      cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 10, true);
      cv.setUint16(8, 0x0800, true); cv.setUint16(10, 0, true); cv.setUint16(12, dosTime, true);
      cv.setUint16(14, dosDate, true); cv.setUint32(16, crc, true); cv.setUint32(20, size, true);
      cv.setUint32(24, size, true); cv.setUint16(28, name.length, true); cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true); cv.setUint16(34, 0, true); cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true); cv.setUint32(42, offset, true);
      ch.set(name, 46);
      locals.push(lh, f.data);
      centrals.push(ch);
      offset += lh.length + size;
    });
    var cdSize = 0;
    centrals.forEach(function (c) { cdSize += c.length; });
    var eocd = new Uint8Array(22), ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true); ev.setUint16(4, 0, true); ev.setUint16(6, 0, true);
    ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true);
    ev.setUint32(12, cdSize, true); ev.setUint32(16, offset, true); ev.setUint16(20, 0, true);
    return concatBytes(locals.concat(centrals, [eocd]));
  }

  safe(function () {
    var btn = document.getElementById('ga4demoDownload');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (btn.disabled) return;
      if (msgEl) msgEl.hidden = true;
      if (typeof fetch !== 'function' || typeof TextEncoder !== 'function' || typeof DOMParser !== 'function') {
        showMsg('A letöltés ebben a böngészőben nem érhető el.');
        return;
      }
      if (location.protocol === 'file:') {
        showMsg('A letöltés nem sikerült: fájlból megnyitva az oldal nem tudja beolvasni a saját fájljait. Nyisd meg az online változatot, és ott próbáld újra.');
        return;
      }
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      var pageUrl = location.href.split('#')[0];
      Promise.all([
        fetch(pageUrl, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('fetch'); return r.arrayBuffer(); }),
        fetch(new URL('kezelesi-utmutato-ghp.html', pageUrl).href, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('fetch'); return r.text(); })
      ]).then(function (res) {
        var zip;
        try {
          zip = makeZip([
            { name: 'ga4-insights-app/index.html', data: buildIndex(res[0], collectUserData()) },
            { name: 'ga4-insights-app/kezelesi-utmutato-ghp.html', data: buildGuide(res[1]) }
          ]);
        } catch (e) {
          showMsg('A letöltés nem sikerült: az oldal fájljai nem a várt formátumúak. Töltsd újra az oldalt, és próbáld újra.');
          return;
        }
        if (typeof downloadFile === 'function') {
          downloadFile('ga4-insights-app.zip', zip, 'application/zip');
        } else {
          var url = URL.createObjectURL(new Blob([zip], { type: 'application/zip' }));
          var a = document.createElement('a');
          a.href = url;
          a.download = 'ga4-insights-app.zip';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        }
      }).catch(function () {
        showMsg('A letöltés nem sikerült: az oldal fájljai nem olvashatók be innen. Nyisd meg az online változatot, és ott próbáld újra.');
      }).then(function () {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
      });
    });
  });

  /* „Kulcs megadása”: a meglévő Beállítások gombot nyomja meg */
  safe(function () {
    document.getElementById('ga4demoSettings').addEventListener('click', function () {
      var b = document.getElementById('btnSettings');
      if (b) b.click();
    });
  });

  /* 2) Demó elemzés hozzáadása – csak ha még nincs; más elemzéshez és beállításhoz nem nyúlunk */

  function readRaw() {
    if (typeof storage === 'object' && storage && typeof storage.get === 'function') return storage.get(RUNS_KEY);
    return localStorage.getItem(RUNS_KEY);
  }
  function writeRaw(v) {
    if (typeof storage === 'object' && storage && typeof storage.set === 'function') return storage.set(RUNS_KEY, v);
    localStorage.setItem(RUNS_KEY, v);
    return true;
  }

  var hasOtherRuns = false;
  safe(function () {
    var raw = readRaw();
    var runs = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(runs)) return; // ismeretlen formátum: nem írjuk felül
    hasOtherRuns = runs.some(function (r) { return r && r.id !== DEMO_ID; });
    var hasDemo = runs.some(function (r) { return r && r.id === DEMO_ID; });
    if (!hasDemo && DEMO_RUN && DEMO_RUN.id === DEMO_ID) {
      runs.unshift(DEMO_RUN);
      writeRaw(JSON.stringify(runs));
    }
  });

  /* 3) Megnyitás – ugyanúgy, mint az Előzmények listában egy sorra kattintás */
  function openDemo() {
    safe(function () {
      if (typeof api !== 'function' || typeof renderRun !== 'function' || typeof state !== 'object') return;
      if (state.run || state.busy) return;          // már nyitva van valami (pl. #/run/... link)
      if (/^#\/run\//.test(location.hash)) return;  // az app maga nyitja meg
      api('/api/run/' + DEMO_ID).then(function (run) {
        if (state.run || state.busy) return;
        state.run = run;
        state.selected = new Set();
        location.hash = '#/run/' + run.id;
        renderRun();
      }).catch(function () { /* nincs demó – nem baj */ });
    });
  }
  if (!hasOtherRuns) {
    if (document.readyState === 'complete') setTimeout(openDemo, 0);
    else window.addEventListener('load', function () { setTimeout(openDemo, 0); });
  }

  /* 4) Címkék: a demó elemzés és az előre generált AI rész jól láthatóan jelölve */
  function chip(text, title) {
    var s = document.createElement('span');
    s.className = 'chip ga4demo-chip';
    s.textContent = text;
    if (title) s.title = title;
    return s;
  }
  function decorate() {
    safe(function () {
      var isDemo = typeof state === 'object' && state.run && state.run.id === DEMO_ID;
      var result = document.getElementById('result');
      if (isDemo && result) {
        var h2 = result.querySelector('.card > header > h2');
        if (h2 && !h2.parentNode.querySelector('.ga4demo-chip')) {
          h2.parentNode.insertBefore(chip('DEMÓ', 'Kitalált adatokon alapuló bemutató elemzés'), h2.nextSibling);
        }
        ['sec-deepaudit', 'sec-marketing'].forEach(function (id) {
          var head = result.querySelector('#' + id + ' .card > header');
          var title = head && head.querySelector('h2');
          if (head && title && !head.querySelector('.ga4demo-chip') && state.run[id === 'sec-deepaudit' ? 'deepAudit' : 'marketing']) {
            head.insertBefore(chip('Mintaelemzés (előre generált)', 'Nem valódi AI-futás: kitalált, előre elkészített minta'), title.nextSibling);
          }
        });
      }
      var row = document.querySelector('#historyList .history-item[data-id="' + DEMO_ID + '"]');
      if (row && !row.querySelector('.ga4demo-chip')) {
        var url = row.querySelector('.h-url');
        row.insertBefore(chip('DEMÓ'), url || row.firstChild);
      }
    });
  }
  safe(function () {
    var mo = new MutationObserver(decorate);
    ['result', 'historyList'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) mo.observe(el, { childList: true, subtree: true });
    });
    decorate();
  });
})();
