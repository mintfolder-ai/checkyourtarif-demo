import { TILES } from '../../data/categories'
import { Icon } from '../ui/Icon'

const BASE = 'https://checkyourtarif.de'

const LEGAL = [
  { label: 'Impressum', href: `${BASE}/impressum` },
  { label: 'Datenschutz', href: `${BASE}/datenschutzerklaerung` },
  { label: 'AGB', href: `${BASE}/agb` },
  { label: 'Über uns', href: `${BASE}/ueber-uns` },
  { label: 'Kontakt', href: `${BASE}/kontakt` },
]

const SERVICE = [
  { label: 'Kündigungshilfe', href: `${BASE}/kuendigungshilfe` },
  { label: 'Verträge widerrufen', href: `${BASE}/vertraege-widerrufen` },
  { label: 'Gratis SIM-Karten', href: `${BASE}/gratis-simkarten` },
  { label: 'Top-Deals', href: `${BASE}/top-deals` },
]

export function Footer() {
  return (
    <footer className="ftr">
      <div className="shell ftr__grid">
        <div className="ftr__brand">
          <span className="hdr__mark" aria-hidden="true">C<span>Y</span>T</span>
          <p>
            Dein KI-gestütztes Vergleichsportal für Strom, Gas, Internet,
            Mobilfunk, Versicherungen und Kredite. Kostenlos, unabhängig und
            TÜV-geprüft.
          </p>
          <div className="ftr__badges">
            <span><Icon name="shield" /> TÜV</span>
            <span><Icon name="trophy" /> Testsieger 2026</span>
            <span><Icon name="lock" /> SSL</span>
          </div>
        </div>

        <nav className="ftr__col" aria-label="Kategorien">
          <h4>Kategorien</h4>
          {TILES.slice(0, 8).map((t) => (
            <a key={t.name} href={t.href} target="_blank" rel="noopener noreferrer">{t.name}</a>
          ))}
        </nav>

        <nav className="ftr__col" aria-label="Service">
          <h4>Service</h4>
          {SERVICE.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </nav>

        <nav className="ftr__col" aria-label="Rechtliches">
          <h4>Rechtliches</h4>
          {LEGAL.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </nav>
      </div>

      <div className="ftr__disclosure shell">
        Hinweis: Einige Links sind Werbe- bzw. Affiliate-Links. Bei Abschluss kann
        eine Vergütung entstehen. Der Vergleich bleibt für dich kostenlos.
      </div>

      <div className="ftr__bar">
        <div className="shell ftr__bar-inner">
          <span>© {new Date().getFullYear()} Check Your Tarif</span>
          <span>Made with KI · Prototyp</span>
        </div>
      </div>
    </footer>
  )
}
