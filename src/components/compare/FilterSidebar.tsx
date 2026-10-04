import type { Offer } from '../../data/offers'
import type { Facet } from '../../data/facets'
import { RATING_OPTIONS } from '../../data/facets'
import { type FilterState, countActive } from '../../lib/filter'
import { Icon, StarRating } from '../ui/Icon'

type Props = {
  facets: Facet[]
  offers: Offer[]
  filters: FilterState
  setFilters: (updater: (prev: FilterState) => FilterState) => void
  onReset: () => void
}

export function FilterSidebar({ facets, offers, filters, setFilters, onReset }: Props) {
  const active = countActive(filters)

  const toggleCheck = (facetId: string, value: string) =>
    setFilters((p) => {
      const cur = p.checks[facetId] ?? []
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
      return { ...p, checks: { ...p.checks, [facetId]: next } }
    })

  const toggleProvider = (name: string) =>
    setFilters((p) => ({
      ...p,
      providers: p.providers.includes(name)
        ? p.providers.filter((n) => n !== name)
        : [...p.providers, name],
    }))

  const providers = Array.from(new Set(offers.map((o) => o.provider)))

  return (
    <aside className="filters" aria-label="Filter">
      <div className="filters__head">
        <h3><Icon name="filter" /> Filter</h3>
        {active > 0 && (
          <button className="filters__reset" onClick={onReset}>
            Zurücksetzen ({active})
          </button>
        )}
      </div>

      {facets.map((facet) => (
        <div className="fgroup" key={facet.id}>
          <h4 className="fgroup__title">{facet.label}</h4>

          {facet.kind === 'price' && (
            <div className="fslider">
              <input
                type="range"
                min={0}
                max={facet.max}
                step={facet.step}
                value={filters.maxPrice ?? facet.max}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    maxPrice: Number(e.target.value) >= facet.max ? null : Number(e.target.value),
                  }))
                }
              />
              <div className="fslider__val">
                {filters.maxPrice == null
                  ? `egal (bis ${facet.max} ${facet.unit})`
                  : `bis ${filters.maxPrice} ${facet.unit}`}
              </div>
            </div>
          )}

          {facet.kind === 'range' && (
            <div className="fslider">
              <input
                type="range"
                min={0}
                max={facet.max}
                step={facet.step}
                value={filters.minRange[facet.id] ?? 0}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    minRange: { ...p.minRange, [facet.id]: Number(e.target.value) },
                  }))
                }
              />
              <div className="fslider__val">
                {(filters.minRange[facet.id] ?? 0) === 0
                  ? 'egal'
                  : `ab ${filters.minRange[facet.id]} ${facet.unit}`}
              </div>
            </div>
          )}

          {facet.kind === 'rating' && (
            <div className="frating">
              {RATING_OPTIONS.map((r) => (
                <label key={r.value} className={filters.minRating === r.value ? 'is-on' : ''}>
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === r.value}
                    onChange={() =>
                      setFilters((p) => ({ ...p, minRating: p.minRating === r.value ? null : r.value }))
                    }
                  />
                  <StarRating value={r.value} />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          )}

          {facet.kind === 'check' &&
            facet.options.map((opt) => {
              const n = offers.filter((o) => o.tags.includes(opt.value)).length
              const checked = (filters.checks[facet.id] ?? []).includes(opt.value)
              return (
                <label key={opt.value} className={`fcheck ${checked ? 'is-on' : ''}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggleCheck(facet.id, opt.value)} />
                  <span className="fcheck__box"><Icon name="check" /></span>
                  <span className="fcheck__label">{opt.label}</span>
                  <span className="fcheck__count">{n}</span>
                </label>
              )
            })}

          {facet.kind === 'provider' &&
            providers.map((name) => {
              const n = offers.filter((o) => o.provider === name).length
              const checked = filters.providers.includes(name)
              return (
                <label key={name} className={`fcheck ${checked ? 'is-on' : ''}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggleProvider(name)} />
                  <span className="fcheck__box"><Icon name="check" /></span>
                  <span className="fcheck__label">{name}</span>
                  <span className="fcheck__count">{n}</span>
                </label>
              )
            })}
        </div>
      ))}

      <div className="filters__foot">
        <Icon name="lock" /> Sichere, kostenlose Nutzung
      </div>
    </aside>
  )
}
