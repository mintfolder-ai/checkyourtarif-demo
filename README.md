# Check Your Tarif — KI-Vergleichsplattform

Premium, KI-gestuetzte Vergleichs-Landingpage fuer Strom, Gas, DSL, Handy,
Versicherungen und Kredite. Dunkles Luxus-Design mit echtem 3D-Hero (Three.js),
scrollbasierten Animationen und einem Tarif-Assistenten, der Freitext-Anfragen
der passenden Kategorie zuordnet und direkt zum jeweiligen Vergleichsrechner
verlinkt.

## Stack

- **Vite + React 18 + TypeScript**
- **Three.js** — 3D-Hero ("Intelligence Core"), pointer-reaktiv, pausiert
  ausserhalb des Viewports, respektiert `prefers-reduced-motion`
- **Tailwind CSS** + CSS-Custom-Properties als Design-Tokens
- Keine schweren Animations-Libs: Scroll-Reveals via IntersectionObserver

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production-Build nach dist/
npm run preview  # Build lokal testen
```

## Architektur

```
src/
├── data/categories.ts        Kategorien + Deep-Links zu den Vergleichsrechnern
├── lib/ai.ts                 Pluggable KI-Brain (Demo-Modus + Live-Endpoint)
├── lib/useReveal.ts          Scroll-Reveal + Reduced-Motion-Helfer
├── components/
│   ├── nav/Navbar            Glass-Navigation, sticky
│   ├── hero/Hero + HeroCanvas 3D-Hero
│   ├── assistant/            KI-Tarif-Assistent (Herzstueck)
│   ├── categories/           Bento-Grid der Kategorien
│   ├── sections/             HowItWorks, Stats, Footer
│   └── ui/Icon               Inline-SVG-Icons
└── styles/                   tokens.css, global.css, components.css
```

## KI-Assistent: Demo vs. Live

Standardmaessig laeuft ein transparenter clientseitiger Klassifikator
(Demo-Modus) — kein Schluessel, kein Netzwerk. Fuer echte KI-Antworten in
`.env` eine Backend-Route setzen, die Claude serverseitig aufruft:

```
VITE_AI_ENDPOINT=https://api.deine-domain.de/compare
```

Der API-Key bleibt dabei ausschliesslich serverseitig. Siehe `.env.example`.

## Monetarisierung

Alle Kategorie- und Ergebnis-CTAs verlinken auf die bestehenden, affiliate-
gestuetzten Vergleichsrechner (communicationads, financeAds, Check24, Tarifcheck)
unter checkyourtarif.de. Die Affiliate-Offenlegung steht im Footer.

## Status

Prototyp / v0.1 — eine Seite, sechs Kernkategorien. Naechste Schritte siehe
unten.

### Roadmap

- Eigene Unterseiten pro Kategorie mit eingebettetem Rechner statt Deep-Link
- Live-KI ueber Backend-Proxy (Claude) inkl. Rueckfragen-Dialog
- Vergleichstabellen mit echten Tarifdaten (API/Feed)
- i18n, Cookie-Consent (nur-essenziell by default), Analytics
- Lighthouse-Pass + Core-Web-Vitals-Budget
