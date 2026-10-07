import { useEffect, useState } from 'react'
import { Icon } from '../ui/Icon'
import { CATEGORIES } from '../../data/categories'
import logoUrl from '../../assets/logo.avif'

export function Header({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`hdr ${stuck ? 'hdr--stuck' : ''}`}>
      <div className="hdr__main">
        <div className="shell hdr__main-inner">
          <a className="hdr__brand" href="#/" aria-label="Check Your Tarif Startseite">
            <img className="hdr__logo" src={logoUrl} alt="Check Your Tarif" width="180" height="51" />
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
            <a className="hdr__login" href="#/login">
              <Icon name="user" /> <span>Anmelden</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="hdr__nav" aria-label="Hauptkategorien">
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
