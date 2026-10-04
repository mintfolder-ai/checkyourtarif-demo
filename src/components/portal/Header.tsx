import { useEffect, useState } from 'react'
import { Icon } from '../ui/Icon'
import { CATEGORIES } from '../../data/categories'

export function Header({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`hdr ${stuck ? 'hdr--stuck' : ''}`}>
      <div className="hdr__top">
        <div className="shell hdr__top-inner">
          <span><Icon name="check" /> 100 % kostenlos &amp; unverbindlich</span>
          <span><Icon name="shield" /> TÜV-geprüftes Vergleichsportal</span>
          <span><Icon name="user" /> Über 2,4 Mio. zufriedene Nutzer</span>
          <span className="hdr__top-right"><Icon name="headset" /> Mo bis Sa, 8 bis 20 Uhr erreichbar</span>
        </div>
      </div>

      <div className="hdr__main">
        <div className="shell hdr__main-inner">
          <a className="hdr__brand" href="#/" aria-label="Check Your Tarif Startseite">
            <span className="hdr__mark" aria-hidden="true">C<span>Y</span>T</span>
            <span className="hdr__brand-text">
              Check Your <strong>Tarif</strong>
            </span>
          </a>

          <form
            className="hdr__search"
            onSubmit={(e) => {
              e.preventDefault()
              if (q.trim()) onSearch(q.trim())
            }}
          >
            <Icon name="search" className="hdr__search-icon" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Wonach suchst du? z. B. Strom, Handytarif, Kfz …"
              aria-label="Suche"
            />
            <button type="submit">Vergleichen</button>
          </form>

          <div className="hdr__actions">
            <a className="hdr__login" href="#start">
              <Icon name="user" /> <span>Anmelden</span>
            </a>
            <button
              className="hdr__burger"
              aria-label="Menü"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>

      <nav className={`hdr__nav ${open ? 'is-open' : ''}`} aria-label="Hauptkategorien">
        <div className="shell hdr__nav-inner">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                onSearch(c.name)
              }}
            >
              <Icon name={c.icon} /> {c.name}
            </a>
          ))}
          <a href="#/flug" className="hdr__nav-flight">
            <Icon name="plane" /> Flüge
          </a>
          <a href="https://checkyourtarif.de/top-deals" target="_blank" rel="noopener noreferrer" className="hdr__nav-deal">
            <Icon name="trophy" /> Top-Deals
          </a>
        </div>
      </nav>
    </header>
  )
}
