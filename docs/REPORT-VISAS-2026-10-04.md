# visas.com.py — leveransrapport, 4 oktober 2026

En sammanhängande redesign av den befintliga informationssajten är genomförd. Publicerade adresser behålls. Leveransen omfattar en ny startsida, ett gemensamt visuellt system, tydligare destinationsnavigation, kontaktförberedelse på spanska och engelska, korrigerad integritetsinformation, bättre källhänvisningar och testade lagringsfel. Ingen sammanslagning eller Hostinger-publicering ingår.

## Rätt källa och nuläge

- Livegranskningen hämtade samtliga **37 sitemap-sidor**. Alla svarade 200, med rätt canonical och utan noindex i HTML. Ett saknat dokument gav 404. `/index.html` och `/visa-americana` ledde till rätt kanoniska adresser.
- Samtliga 37 HTML-sidor var **byte-identiska med `antonmarklundcom/visas.old` på `main`, commit `b74df20`**. Detta fastställer den matchande publika implementationen; webbhotellets privata serverfiler och driftkonfiguration har inte inspekterats.
- `antonmarklundcom/visas` har defaultgrenen `claude/inspiring-knuth-ql2jzu`, commit `6711b1b`, som innehåller en annan PHP-ombyggnad. Den används inte som grund.
- `visas/main`, commit `b451fc5`, innehåller den återställda livegrunden och senare tillägg. PR #1 var sammanslagen, #2 stängd utan sammanslagning och #3 sammanslagen. Grenarna kontrollerades före arbetet.
- Arbetsgrenen är **`codex/visas-clear-travel-guide`**, baserad på `visas/main`. `visas.old` används enbart som referens. Separata kataloger användes; andra lokala projekt lämnades orörda.
- `main` innehöll redan **27 ytterligare guider** som inte finns i livesajtens sitemap. De är inte nyskapade i denna PR. Leveransen bygger 68 publika/nyttosidor, varav 64 är indexerbara sitemap-sidor. Skillnaden mellan 37 live och 64 i koden är ett publiceringsberoende.

Inventeringen finns i [live-audit-2026-10-04.json](live-audit-2026-10-04.json). Källjämförelsen använder de faktiskt hämtade HTML-sidorna, inte repo-namn eller äldre README-texter.

## Viktigaste fynden

1. Sajten är **privat, oberoende information med en WhatsApp-kanal**. Godkända betalda tjänster, priser, juridisk operatör och ansvarig rådgivare kunde inte verifieras. BUSINESS.md är ett förslag, inte ett godkänt erbjudande.
2. Startsidan prioriterade tre amerikanska visumsituationer. Andra destinationer låg längre ner som textlänkar, och det var svårare att hitta rätt startpunkt.
3. Den oberoende rollen framgick tydligt i sidfoten men behövde bli synlig före den första kontakten.
4. Kontaktformuläret var avstängt i det publika bygget. Integritetssidan beskrev ändå formulär och CRM som sitt huvudsakliga flöde. Den testade PHP-funktionen fanns redan i koden; inget nytt CRM-system behövdes.
5. Ett första besök kunde visa webbhotellets webbläsarkontroll. Screenshots togs efter att riktiga sidinnehållet laddats. Detta är ett driftberoende som inte kan lösas med en CSS-ändring.
6. Källvalet för flera senare guider var felriktat: exempelvis brittiska och mexikanska resor samt paraguayanska pass länkade generiskt till amerikansk visuminformation.
7. Test av otillgänglig privat lagring avslöjade PHP-varningar som kunde förstöra JSON-svaret och visa interna sökvägar. Felet är rättat.

## Genomförda förbättringar

### Startsida och gemensam design

- Ny layout med ljus bakgrund, mörkgrön text, tydlig typografisk hierarki och separat destinationsbild. Den befintliga H1:an behålls.
- Två tydliga huvudval: göra en fråga eller utforska destinationer.
- Fyra destinationskort: USA, Kanada, Spanien och Paraguay; kompletterande länkar till Australien, Work and Travel och alla guider.
- Tre befintliga amerikanska startpunkter för första ansökan, förnyelse och tidigare avslag.
- Tre steg med länkar till krav, DS-160 och kostnadsguiden.
- Praktiska guidekort till DS-160, kostnader och den utskrivbara checklistan. Ingen kontaktuppgift krävs för att läsa eller skriva ut den.
- Ett avsnitt förklarar vad informationen omfattar och vad besökaren ska be om innan eventuell privat hjälp avtalas.
- Den oberoende rollen är synlig direkt under sidhuvudet på både spanska och engelska sidor.
- Gemensamma kort, sidfot, källavsnitt, sidhuvud och mobilnavigation får samma visuella system. Dekorativa stämplar och perforerade kort får mindre utrymme.
- Menylänken “Otros destinos” leder till den nya destinationsdelen. Befintliga fragment `#servicios` och `#ruta` finns kvar.

### Kontakt och integritet

- Kontakt på spanska och engelska har en frivillig meddelandehjälp med destination och ämne.
- Valen stannar i webbläsaren. Hjälpen gör ingen POST, lagrar inte valen och skickar inga dokument.
- Besökaren ser den förberedda texten och öppnar WhatsApp för att själv granska och skicka den. Det av beställaren bekräftade numret +595 992 279599 används från uppdateringen den 5 oktober.
- En fungerande direktlänk finns när JavaScript är avstängt.
- Texten skiljer allmänna frågor från konsulär tidsbokning och beslut. Den ber besökaren kontrollera vem som ansvarar innan mer information delas.
- Integritetssidorna beskriver det aktiva WhatsApp-flödet. Analytik är fortfarande avstängd. Det befintliga formuläret kan återaktiveras med samma byggflagga efter separat driftverifiering; detta uppdrag har inte aktiverat det.

### Källor och fakta

- Kostnadsguiden anger nu **USD 185 för B1/B2-ansökningsavgiften**, att den inte är återbetalningsbar och att aktuellt belopp ska kontrolleras före betalning. Kontrolltid anges som 4 oktober 2026. Beloppet presenteras separat från andra officiella avgifter, privata honorar och personliga resekostnader.
- Detta belopp kontrollerades mot [U.S. Department of State — Fees for Visa Services](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html). Det är inte ett servicepris eller ett totalt resepris.
- DS-160-guidens befintliga formulärlänk kontrollerades mot [Department of State — DS-160 FAQs](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html). Inga nya blanketter, behörighetsregler eller handläggningstider infördes.
- Källhänvisningar rättades på nio guider: Mexiko, Storbritannien, paraguayanska pass, Chile/Uruguay, Brasilien/Argentina, ESTA, visumfoto, 221(g) och destinationsöversikten.
- Relevanta primärkällor omfattar [GOV.UK:s visumkontroll](https://www.gov.uk/check-uk-visa), [GOV.UK ETA](https://www.gov.uk/eta), [Mexikos ambassad i Paraguay](https://embamex.sre.gob.mx/paraguay/index.php/index.php?id=15&option=com_content&view=article), [Paraguays polis — Identificaciones](https://www.policianacional.gov.py/identificaciones/), [Chile SERMIG](https://serviciomigraciones.cl/permanencia-transitoria/), [Uruguays utrikesministerium](https://www.gub.uy/ministerio-relaciones-exteriores/comunicacion/publicaciones/visas-para-ingresar-uruguay), [Argentina — MERCOSUR-dokument](https://www.argentina.gob.ar/migraciones/documentos-de-viaje-del-mercosur) och [Brasiliens konsulära information](https://www.gov.br/mre/pt-br/assuntos/portal-consular/quem-contatar/vistos).
- USA-guiderna pekar vid behov direkt på [Visa Waiver Program](https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html), [fotokraven](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html) och [negativa beslut](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-denials.html).
- Ett ärvt generellt påstående om att beslut alltid kommer efter intervju ersattes med hänvisning till det tillämpliga officiella förfarandet. Det undviker att beskriva intervju som obligatorisk för samtliga fall.
- Vissa myndighetssidor använder automatiska besöksskydd. Källänkarna finns kvar till de rätta myndigheterna; det påstås inte att alla externa sidor alltid är tillgängliga för automatiska klienter.

### SEO och driftkod

- Inga nya URL:er skapades i denna PR. Alla publicerade adresser, title, H1, metabeskrivningar, canonical och hreflang behålls: **0 skillnader mot de 37 livesidorna** för dessa fält. Resultatet finns i [seo-preservation-2026-10-04.json](seo-preservation-2026-10-04.json).
- Sitemap/robots behåller kodbasens befintliga 64 indexerbara sidor och fyra nyttosidor utanför sitemap.
- JSON-LD byggs fortsatt från synliga frågor och svar. Organization/WebSite/WebPage används; inga påhittade Service-, pris- eller recensionsuppgifter införs. [Schema.org FAQPage](https://schema.org/FAQPage) kontrollerades; inga löften om sökresultat görs.
- PHP:s lagringsfel ger ett tydligt generiskt felsvar utan råa varningar. Misslyckade lås stänger filhandtag, och skrivning av frekvensbegränsningen kontrolleras.
- De befintliga lokala testerna använder nu en buffrande HTTP-klient som undviker ett parserfel i den installerade Node 24.19-miljön. Hjälpen är låst till `127.0.0.1` och ingår inte i publiceringspaketet.
- Ingen ny databas, Node-server på webbhotellet eller ramverksmigration infördes.

## Tester och bildgranskning

| Kontroll | Resultat |
|---|---|
| Byggning | PASS; 68 HTML-/nyttosidor genereras från källfiler |
| Preflight och PHP-syntax | PASS; 68 routes, 64 sitemap-poster, 89 använda tillgångar |
| Befintliga formulärintegrationstester | PASS; 18 tester, syntetiska uppgifter och lokal CRM-mock |
| Lokal webbläsarkontroll | PASS; 64 indexerbara sidor, 18 screenshots och 10 interaktionskontroller |
| Desktop/mobil | 1440 och 390 px; startsida, USA, Kanada, Spanien, kontakt, FAQ, DS-160, integritet och engelsk kontakt |
| Ytterligare layout | 320 och 768 px, 200 % text, inga horisontella överflöden i kontrollerade vyer |
| Tangentbord och fokus | Mobilmeny öppnas, Escape stänger, fokus återgår; WhatsApp-dialog och länkar kontrollerade |
| Meddelandehjälp | Val kodas rätt i WhatsApp-länken; ingen POST, ingen filuppladdning; engelska och utan JavaScript testat |
| Bilder/JavaScript | Bilder laddade, en H1 per vy, inga JavaScript-fel; reducerad rörelse testad |
| URL:er/metadata/schema | Canonical, indexering, titel/H1-bevarande, JSON-LD, 404, index- och slash-redirects kontrollerade |
| ZIP | 176 tillåtna filer, rotkorrekt, byte-verifierat och testat efter uppackning; alla 68 routes fungerar |
| Publiceringshygien | ZIP utesluter källor, rapporter, testfiler, node_modules, privata inställningar och bildgenerationsmetadata |

Felfallen för CSRF, telefon, e-post, honeypot, dubbelleverans, saknat CRM-kvitto, CRM-avslag, timeout, tillfällig kö, escapad text, frekvensbegränsning och otillgänglig lagring testades. **Inga riktiga leads eller WhatsApp-meddelanden skickades.**

Inledande testfel rapporterades och löstes: bildkontrollen fick vänta på sena bilder; Node/PHP-kombinationens HTTP-parserproblem fick en lokal testklient; ett verkligt PHP-lagringsfel fick en kodfix. De slutliga kontrollerna anges ovan.

Skärmbilder för live togs efter webbhotellets kontroll och med inlästa kort. Samtliga före- och efterbilder finns i den lokala arbetsmappen `visas-audit/before` respektive `visas-audit/after`. Ett urval är sparat i detta repo:

- [Desktop före/efter](preview/comparison-1440.png)
- [Mobil före/efter](preview/comparison-390.png)
- [Kontakt desktop](preview/contacto-1440.png)
- [Kontakt mobil](preview/contacto-390.png)
- [Webbläsarresultat](browser-qa-2026-10-04.json)

## Higgsfield

**1 kredit totalt**, av högst 50. En bild i GPT Image 2.5 Sunburst, medium, 2k. Inga omtagningar eller misslyckade beställningar. Övriga bilder återanvänds. Se [förbrukningsloggen](HIGGSFIELD-LEDGER-2026-10-04.md).

## Publiceringsunderlag och kvarstående driftuppgifter

Paketet finns lokalt som `dist/visas-com-py-hostinger-2026-10-04.zip`, med SHA-256-fil och `dist/release-manifest.json`. Det extraheras med `index.html`, `.htaccess`, `assets/` och PHP-filer direkt i webbrot. ZIP-filen innehåller inga privata CRM-inställningar. Den faktiska kontrollsumman finns bredvid den färdiga ZIP-filen.

Koden och paketet är verifierade lokalt. Före publicering ska webbhotellets verkliga Apache/LiteSpeed-regler kontrolleras på staging enligt [DEPLOY.md](../DEPLOY.md): noindex på staging, indexering på produktion, skydd av interna filer, säkerhetsheaders och redirects. Ta backup och bevara `.well-known`, verifieringsfiler och `visas-private`. Ingen hostingverifiering eller driftsättning har gjorts i detta uppdrag.

Följande uppgifter kräver ägare/drift:

1. Bekräfta juridisk operatör och vem som svarar på det befintliga WhatsApp-numret. Designen löser avsaknaden genom tydlig informationsroll och genom att inte hitta på namn, adress, RUC eller servicepriser.
2. Om betald rådgivning ska erbjudas senare: godkänn ansvarig person, omfattning, honorar och villkor först. BUSINESS.md:s föreslagna priser har inte publicerats.
3. Granska webbhotellets första-besökskontroll, botåtkomst och faktisk fältprestanda. Ingen Lighthouse-, CrUX-, Search Console- eller rankningspoäng påstås.
4. Bekräfta när kodbasens redan tillagda 27 guider ska tas live. Denna PR lägger inte till dem, men ett fullständigt paket från `main` innehåller dem. Källfixarna förbättrar flera av dem; detta är ingen fullständig juridisk omgranskning av varje äldre mening.
5. Håll formuläret avstängt tills CRM-mottagare, privat lagring, integritetsvillkor och schemalagd köövervakning verifierats separat.
6. Säkerställ att Hostinger väljer den avsedda livegrenen. GitHubs defaultgren pekar fortfarande på den andra ombyggnaden. Denna PR riktas därför uttryckligen mot `main`.

## Reproducera kontrollerna

Bygg med `npm ci`, `npm run build`, `npm run preflight` och `npm test`. `npm run package` bygger, testar och skapar ZIP; PHP 8.1+ och Python 3 behövs lokalt. Webbhotellet behöver PHP, inte Node.

Starta den lokala PHP-previewen med `npm run serve`. Kör `npm run verify:browser` med Playwright tillgängligt. Valfria miljövariabler: `VISAS_PLAYWRIGHT_MODULE` för modulens sökväg och `VISAS_BROWSER_EXECUTABLE` för installerad Chrome. Standardport är 8787. Testet accepterar enbart lokal preview; `VISAS_PREVIEW_URL` kan ange annan lokal port. Resultaten skrivs till ignorerade `test-results/browser`.

## Uppföljning: WhatsApp, 5 oktober 2026

- Beställaren angav **+595 992 279599**. Alla 398 statiska WhatsApp-länkar på 68 sidor använder det numret.
- Varje meddelande anger visas.com.py, sidans namn och dess kanoniska adress. Startsidesmenyn tar med valt intresse; kontaktförberedelsen tar med vald destination och ämne.
- Spanska, engelska, länkar i guider, mobilmeny, sidfot och flöden utan JavaScript omfattas. Det avstängda formulärets eventuella uppföljning får samma nummer, källa, ämne och referens i både JSON- och HTML-svar.
- Frågeparametrar och fragment läggs inte i WhatsApp-meddelandena. Inga meddelanden skickades.
- Kontroll: byggning och preflight godkända; 18 lokala integrationstester och 10 webbläsarkontroller godkända. Se [WhatsApp-kontrollen](whatsapp-qa-2026-10-05.json).
- Uppdaterat publiceringspaket: dist/visas-com-py-hostinger-2026-10-05.zip. PR #4 ska förbli öppen och **inte draft**; ingen merge eller publicering görs.
