/**
 * Real device photos for the demo cards.
 *
 * The visitor's browser fetches these from the internet (keyword image thumbnails),
 * so they are real product photos, varied per card. If a URL fails to load, the
 * card falls through to the next candidate and finally to a bundled vector
 * illustration — so a broken image is never shown.
 */
import laptopImg from '../assets/devices/laptop.svg'
import tabletImg from '../assets/devices/tablet.svg'
import tvImg from '../assets/devices/tv.svg'
import phoneImg from '../assets/devices/phone.svg'

const FALLBACK: Record<string, string> = {
  laptop: laptopImg,
  tablet: tabletImg,
  tv: tvImg,
  handy: phoneImg,
}

/** Search queries per category, varied so cards don't all show the same photo. */
const QUERIES: Record<string, string[]> = {
  laptop: ['apple macbook laptop', 'dell xps laptop silver', 'lenovo thinkpad laptop', 'asus zenbook laptop'],
  tv: ['samsung qled tv', 'lg oled tv', 'sony bravia smart tv', 'flat screen tv 4k'],
  tablet: ['apple ipad tablet', 'samsung galaxy tab tablet', 'android tablet', 'ipad air tablet'],
  handy: ['apple iphone smartphone', 'samsung galaxy smartphone', 'android smartphone black'],
}

/** A keyword image thumbnail URL (fetched by the visitor's browser). */
function bing(host: number, q: string): string {
  return `https://tse${host}.mm.bing.net/th?q=${encodeURIComponent(q)}&w=400&h=400&c=7&rs=1&p=0&dpr=2`
}

/**
 * Returns an ordered list of image candidates for a device card: real internet
 * photos first, the bundled illustration last. OfferCard advances on error.
 */
export function productImages(categoryId: string, index: number): string[] {
  const fallback = FALLBACK[categoryId]
  if (!fallback) return []
  const queries = QUERIES[categoryId] ?? []
  const q = queries.length ? queries[index % queries.length] : categoryId
  return [bing(1, q), bing(2, q), fallback]
}
