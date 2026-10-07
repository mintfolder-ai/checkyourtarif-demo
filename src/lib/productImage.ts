/**
 * Device images for the demo cards.
 *
 * These are bundled locally (not fetched from an external CDN), so they always
 * render for every visitor regardless of browser shields or ad-/script-blockers
 * — external image CDNs get blocked (e.g. by Brave Shields) and would show
 * nothing on a client demo. Clean vector device illustrations keyed by device
 * type, in the brand style.
 */
import laptopImg from '../assets/devices/laptop.svg'
import tabletImg from '../assets/devices/tablet.svg'
import tvImg from '../assets/devices/tv.svg'
import phoneImg from '../assets/devices/phone.svg'

const IMAGES: Record<string, string> = {
  laptop: laptopImg,
  tablet: tabletImg,
  tv: tvImg,
  handy: phoneImg,
}

/** Returns a bundled device image URL for a device category, or null otherwise. */
export function productImage(categoryId: string, _offerId: string): string | null {
  return IMAGES[categoryId] ?? null
}
