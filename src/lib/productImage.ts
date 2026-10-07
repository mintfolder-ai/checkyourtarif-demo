/**
 * Real product photos for the device demo cards.
 *
 * The brand names in the demo data are illustrative, so we show a representative
 * real photo per device type from a CDN that always resolves to an actual photo
 * (LoremFlickr serves real Flickr Creative-Commons images by keyword). A stable
 * per-offer "lock" seed keeps the same image across reloads while giving variety
 * between cards. If the CDN ever fails to load, OfferCard falls back to the
 * provider monogram, so a broken image is never shown.
 */
const KEYWORDS: Record<string, string> = {
  laptop: 'laptop,notebook',
  tv: 'television,flatscreen',
  tablet: 'tablet,ipad',
  handy: 'smartphone,phone',
}

function seedFrom(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100000
  return h || 1
}

/** Returns a product image URL for a device category, or null for non-device ones. */
export function productImage(categoryId: string, offerId: string): string | null {
  const kw = KEYWORDS[categoryId]
  if (!kw) return null
  return `https://loremflickr.com/320/320/${kw}?lock=${seedFrom(offerId)}`
}
