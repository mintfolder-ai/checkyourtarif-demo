import { useMemo, useState } from 'react'
import { FLIGHTS, type Flight } from '../../data/flights'
import { Icon } from '../ui/Icon'

type Sort = 'preis' | 'dauer' | 'abflug'

export function FlightPage() {
  const [trip, setTrip] = useState<'round' | 'one'>('round')
  const [from, setFrom] = useState('FRA Frankfurt')
  const [to, setTo] = useState('JFK New York')
  const [searching, setSearching] = useState(false)

  const [sort, setSort] = useState<Sort>('preis')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [stops, setStops] = useState<number[]>([])
  const [airlines, setAirlines] = useState<string[]>([])

  const allAirlines = Array.from(new Set(FLIGHTS.map((f) => f.airline)))

  const results = useMemo(() => {
    let list = FLIGHTS.filter((f) => {
      if (maxPrice != null && f.priceNum > maxPrice) return false
      if (stops.length > 0 && !stops.includes(Math.min(f.stops, 1))) return false
      if (airlines.length > 0 && !airlines.includes(f.airline)) return false
      return true
    })
    list = [...list]
    if (sort === 'preis') list.sort((a, b) => a.priceNum - b.priceNum)
    if (sort === 'dauer') list.sort((a, b) => a.durationMin - b.durationMin)
    if (sort === 'abflug') list.sort((a, b) => a.depart.localeCompare(b.depart))
    return list
  }, [maxPrice, stops, airlines, sort])

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const runSearch = () => {
    setSearching(true)
    setTimeout(() => setSearching(false), 700)
    document.getElementById('flug-ergebnisse')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v]

  const activeFilters = (maxPrice != null ? 1 : 0) + stops.length + airlines.length

  return (
    <div className="flug">
      <section className="flug__hero">
        <div className="shell">
          <h1 className="flug__title">
            <Icon name="plane" /> Flüge vergleichen &amp; günstig buchen
          </h1>
          <p className="flug__sub">Finde in Sekunden den besten Flug aus hunderten Verbindungen.</p>

          <div className="flug__search">
            <div className="flug__trip">
              <button className={trip === 'round' ? 'is-on' : ''} onClick={() => setTrip('round')}>Hin- und Rückflug</button>
              <button className={trip === 'one' ? 'is-on' : ''} onClick={() => setTrip('one')}>Nur Hinflug</button>
            </div>

            <div className="flug__fields">
              <label className="flug__field">
                <span><Icon name="pin" /> Von</span>
                <input value={from} onChange={(e) => setFrom(e.target.value)} list="airports" />
              </label>
              <button className="flug__swap" onClick={swap} aria-label="Tausche Start und Ziel">
                <Icon name="swap" />
              </button>
              <label className="flug__field">
                <span><Icon name="pin" /> Nach</span>
                <input value={to} onChange={(e) => setTo(e.target.value)} list="airports" />
              </label>
              <label className="flug__field">
                <span><Icon name="calendar" /> Hinflug</span>
                <input type="date" defaultValue="2026-11-14" />
              </label>
              <label className={`flug__field ${trip === 'one' ? 'is-disabled' : ''}`}>
                <span><Icon name="calendar" /> Rückflug</span>
                <input type="date" defaultValue="2026-11-21" disabled={trip === 'one'} />
              </label>
              <label className="flug__field flug__field--sm">
                <span><Icon name="users" /> Reisende</span>
                <select defaultValue="1">
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>)}
                </select>
              </label>
              <button className="btn btn--orange flug__go" onClick={runSearch}>
                <Icon name="search" /> Flüge suchen
              </button>
            </div>
            <datalist id="airports">
              {['FRA Frankfurt', 'MUC München', 'BER Berlin', 'JFK New York', 'BCN Barcelona', 'IST Istanbul', 'DXB Dubai'].map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
          </div>
        </div>
      </section>

      <section className="flug__results shell" id="flug-ergebnisse">
        <div className="cmp__layout">
          <aside className="cmp__aside is-open">
            <div className="filters">
              <div className="filters__head">
                <h3><Icon name="filter" /> Filter</h3>
                {activeFilters > 0 && (
                  <button className="filters__reset" onClick={() => { setMaxPrice(null); setStops([]); setAirlines([]) }}>
                    Zurücksetzen ({activeFilters})
                  </button>
                )}
              </div>

              <div className="fgroup">
                <h4 className="fgroup__title">Max. Preis</h4>
                <div className="fslider">
                  <input type="range" min={350} max={700} step={10} value={maxPrice ?? 700}
                    onChange={(e) => setMaxPrice(Number(e.target.value) >= 700 ? null : Number(e.target.value))} />
                  <div className="fslider__val">{maxPrice == null ? 'egal (bis 700 €)' : `bis ${maxPrice} €`}</div>
                </div>
              </div>

              <div className="fgroup">
                <h4 className="fgroup__title">Stopps</h4>
                {[{ v: 0, l: 'Direktflug' }, { v: 1, l: 'Max. 1 Stopp' }].map((o) => (
                  <label key={o.v} className={`fcheck ${stops.includes(o.v) ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={stops.includes(o.v)} onChange={() => setStops((s) => toggle(s, o.v))} />
                    <span className="fcheck__box"><Icon name="check" /></span>
                    <span className="fcheck__label">{o.l}</span>
                    <span className="fcheck__count">{FLIGHTS.filter((f) => Math.min(f.stops, 1) === o.v).length}</span>
                  </label>
                ))}
              </div>

              <div className="fgroup">
                <h4 className="fgroup__title">Fluggesellschaft</h4>
                {allAirlines.map((a) => (
                  <label key={a} className={`fcheck ${airlines.includes(a) ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={airlines.includes(a)} onChange={() => setAirlines((s) => toggle(s, a))} />
                    <span className="fcheck__box"><Icon name="check" /></span>
                    <span className="fcheck__label">{a}</span>
                    <span className="fcheck__count">{FLIGHTS.filter((f) => f.airline === a).length}</span>
                  </label>
                ))}
              </div>

              <div className="filters__foot"><Icon name="lock" /> Sichere, kostenlose Suche</div>
            </div>
          </aside>

          <div className="cmp__main">
            <div className="cmp__bar">
              <span className="cmp__count"><strong>{results.length}</strong> Flüge · {from.split(' ')[0]} nach {to.split(' ')[0]}</span>
              <div className="cmp__sort">
                <span>Sortieren:</span>
                {(['preis', 'dauer', 'abflug'] as Sort[]).map((s) => (
                  <button key={s} className={sort === s ? 'is-active' : ''} onClick={() => setSort(s)}>
                    {s === 'preis' ? 'Preis' : s === 'dauer' ? 'Dauer' : 'Abflug'}
                  </button>
                ))}
              </div>
            </div>

            {searching ? (
              <div className="flug__loading"><span className="dot" /><span className="dot" /><span className="dot" /> Suche beste Verbindungen …</div>
            ) : (
              <div className="flug__list">
                {results.map((f) => <FlightCard key={f.id} f={f} />)}
              </div>
            )}

            <p className="cmp__disclaimer">
              Beispielhafte Flugdarstellung zu Demonstrationszwecken. Fluglinien-Namen
              dienen der Veranschaulichung. Buchung über den angebundenen Partner.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function FlightCard({ f }: { f: Flight }) {
  return (
    <article className="fcard">
      <div className="fcard__airline">
        <span className="fcard__logo">{f.code}</span>
        <span className="fcard__name">{f.airline}</span>
      </div>

      <div className="fcard__route">
        <div className="fcard__point">
          <strong>{f.depart}</strong>
          <span>{f.from}</span>
        </div>
        <div className="fcard__line">
          <span className="fcard__dur">{f.durationText}</span>
          <div className="fcard__track"><i /></div>
          <span className={`fcard__stops ${f.stops === 0 ? 'is-direct' : ''}`}>
            {f.stops === 0 ? 'Direkt' : f.stopInfo}
          </span>
        </div>
        <div className="fcard__point fcard__point--end">
          <strong>{f.arrive}</strong>
          <span>{f.to}</span>
        </div>
      </div>

      <div className="fcard__buy">
        {f.badge && <span className="fcard__badge">{f.badge}</span>}
        <div className="fcard__price"><span>{f.price}</span> €</div>
        <span className="fcard__perp">pro Person</span>
        <a className="btn btn--orange" href="https://checkyourtarif.de/top-deals" target="_blank" rel="noopener noreferrer">
          Auswählen <Icon name="arrow" />
        </a>
      </div>
    </article>
  )
}
