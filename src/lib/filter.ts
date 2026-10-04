import type { Offer } from '../data/offers'
import type { Facet } from '../data/facets'

export type FilterState = {
  maxPrice: number | null
  minRating: number | null
  providers: string[]
  minRange: Record<string, number>
  checks: Record<string, string[]>
}

export const emptyFilters = (): FilterState => ({
  maxPrice: null,
  minRating: null,
  providers: [],
  minRange: {},
  checks: {},
})

export function applyFilters(offers: Offer[], facets: Facet[], f: FilterState): Offer[] {
  return offers.filter((o) => {
    if (f.maxPrice != null && o.priceNum > f.maxPrice) return false
    if (f.minRating != null && o.rating < f.minRating) return false
    if (f.providers.length > 0 && !f.providers.includes(o.provider)) return false

    for (const facet of facets) {
      if (facet.kind === 'range') {
        const min = f.minRange[facet.id]
        if (min != null && min > 0) {
          const v = o[facet.field] ?? 0
          if (v < min) return false
        }
      }
      if (facet.kind === 'check') {
        const selected = f.checks[facet.id]
        if (selected && selected.length > 0) {
          const hit = selected.some((v) => o.tags.includes(v))
          if (!hit) return false
        }
      }
    }
    return true
  })
}

export function countActive(f: FilterState): number {
  let n = 0
  if (f.maxPrice != null) n++
  if (f.minRating != null) n++
  n += f.providers.length
  n += Object.values(f.minRange).filter((v) => v > 0).length
  n += Object.values(f.checks).reduce((a, c) => a + c.length, 0)
  return n
}
