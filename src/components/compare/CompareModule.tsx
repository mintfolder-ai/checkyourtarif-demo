import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES } from '../../data/categories'
import { OFFERS } from '../../data/offers'
import { FACETS, type Facet } from '../../data/facets'
import { applyFilters, countActive, emptyFilters, type FilterState } from '../../lib/filter'
import { OfferCard } from './OfferCard'
import { FilterSidebar } from './FilterSidebar'
import { Icon } from '../ui/Icon'

type Sort = 'empfohlen' | 'preis' | 'bewertung'

type Props = {
  activeCat: string
  setActiveCat: (id: string) => void
  note: string | null
}

export function CompareModule({ activeCat, setActiveCat, note }: Props) {
  const [sort, setSort] = useState<Sort>('empfohlen')
  const [filters, setFilters] = useState<FilterState>(emptyFilters())
  const [showFilters, setShowFilters] = useState(false)

  const category = CATEGORIES.find((c) => c.id === activeCat) ?? CATEGORIES[0]
  const offers = OFFERS[category.id] ?? []
  const facets = FACETS[category.id] ?? []

  // Reset filters whenever the category changes.
  useEffect(() => {
    setFilters(emptyFilters())
    setSort('empfohlen')
  }, [activeCat])

  const results = useMemo(() => {
    const filtered = applyFilters(offers, facets, filters)
    const list = [...filtered]
    if (sort === 'preis') list.sort((a, b) => a.priceNum - b.priceNum)
    if (sort === 'bewertung') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [offers, facets, filters, sort])

  const active = countActive(filters)

  return (
    <section className="cmp" id="vergleich">
      <div className="shell">
        <div className="cmp__head reveal">
          <p className="eyebrow">Live-Vergleich</p>
          <h2 className="section-title">Die besten Tarife im direkten Vergleich</h2>
          <p className="section-sub">
            Filtere wie bei den Großen, sortiere transparent, finde deinen Tarif.
          </p>
        </div>

        <div className="cmp__tabs reveal" role="tablist" aria-label="Kategorien">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === activeCat}
              className={`cmp__tab ${c.id === activeCat ? 'is-active' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              <Icon name={c.icon} /> {c.name}
            </button>
          ))}
        </div>

        {note && (
          <div className="cmp__note" role="status">
            <Icon name="spark" /> {note}
          </div>
        )}

        <div className="cmp__layout">
          <div className={`cmp__aside ${showFilters ? 'is-open' : ''}`}>
            <FilterSidebar
              facets={facets}
              offers={offers}
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(emptyFilters())}
            />
          </div>

          <div className="cmp__main">
            <div className="cmp__bar">
              <button className="cmp__filterbtn" onClick={() => setShowFilters((v) => !v)}>
                <Icon name="filter" /> Filter {active > 0 && <span>{active}</span>}
              </button>
              <span className="cmp__count">
                <strong>{results.length}</strong> von {offers.length} Tarifen
              </span>
              <div className="cmp__sort">
                <span>Sortieren:</span>
                {(['empfohlen', 'preis', 'bewertung'] as Sort[]).map((s) => (
                  <button key={s} className={sort === s ? 'is-active' : ''} onClick={() => setSort(s)}>
                    {s === 'empfohlen' ? 'Empfohlen' : s === 'preis' ? 'Günstigster' : 'Beste Bewertung'}
                  </button>
                ))}
              </div>
            </div>

            {active > 0 && (
              <ActiveChips filters={filters} facets={facets} setFilters={setFilters} />
            )}

            {results.length > 0 ? (
              <div className="cmp__list">
                {results.map((o, i) => (
                  <OfferCard key={o.id} offer={o} rank={i + 1} href={category.href} />
                ))}
              </div>
            ) : (
              <div className="cmp__empty">
                <Icon name="search" />
                <p>Keine Tarife mit diesen Filtern. Passe die Auswahl an.</p>
                <button className="btn btn--ghost" onClick={() => setFilters(emptyFilters())}>
                  Filter zurücksetzen
                </button>
              </div>
            )}

            <p className="cmp__disclaimer">
              Beispielhafte Tarifdarstellung. Die persönliche Berechnung erfolgt im
              kostenlosen Vergleichsrechner. Anbieternamen dienen der Veranschaulichung.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ActiveChips({
  filters,
  facets,
  setFilters,
}: {
  filters: FilterState
  facets: Facet[]
  setFilters: (u: (p: FilterState) => FilterState) => void
}) {
  const chips: { key: string; label: string; clear: () => void }[] = []

  if (filters.maxPrice != null)
    chips.push({ key: 'price', label: `bis ${filters.maxPrice} €`, clear: () => setFilters((p) => ({ ...p, maxPrice: null })) })
  if (filters.minRating != null)
    chips.push({ key: 'rating', label: `ab ${filters.minRating.toString().replace('.', ',')} ⭐`, clear: () => setFilters((p) => ({ ...p, minRating: null })) })
  for (const name of filters.providers)
    chips.push({ key: `p-${name}`, label: name, clear: () => setFilters((p) => ({ ...p, providers: p.providers.filter((n) => n !== name) })) })
  for (const [fid, min] of Object.entries(filters.minRange)) {
    if (!min) continue
    const f = facets.find((x) => x.id === fid)
    const unit = f && f.kind === 'range' ? f.unit : ''
    chips.push({ key: `r-${fid}`, label: `ab ${min} ${unit}`, clear: () => setFilters((p) => ({ ...p, minRange: { ...p.minRange, [fid]: 0 } })) })
  }
  for (const [fid, values] of Object.entries(filters.checks)) {
    const f = facets.find((x) => x.id === fid)
    for (const v of values) {
      const label = f && f.kind === 'check' ? f.options.find((o) => o.value === v)?.label ?? v : v
      chips.push({
        key: `c-${fid}-${v}`,
        label,
        clear: () => setFilters((p) => ({ ...p, checks: { ...p.checks, [fid]: (p.checks[fid] ?? []).filter((x) => x !== v) } })),
      })
    }
  }

  return (
    <div className="chips-active">
      {chips.map((c) => (
        <button key={c.key} className="chip-x" onClick={c.clear}>
          {c.label} <span aria-hidden="true">×</span>
        </button>
      ))}
    </div>
  )
}
