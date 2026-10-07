import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they scroll into view.
 *
 * `.reveal` starts hidden (opacity 0) and becomes visible once `.is-visible`
 * is added. This MUST re-run whenever the rendered content changes (route
 * navigation), otherwise freshly mounted `.reveal` nodes are never observed and
 * stay invisible — which showed up as a blank page after navigating back. It
 * also reveals anything already in the viewport immediately and has a safety
 * net so no element can ever stay stuck hidden (above the restored scroll
 * position on back/forward, blocked observer, bfcache restore, etc.).
 *
 * Pass a value that changes on navigation (the current route) so the effect
 * re-runs and picks up the new nodes.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const show = (el: Element) => el.classList.add('is-visible')
    const pending = () => Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))

    let els = pending()

    // Reveal whatever is already on screen right away (no wait for a callback).
    const vh = window.innerHeight || document.documentElement.clientHeight
    for (const el of els) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.95 && r.bottom > 0) show(el)
    }

    els = pending()
    if (els.length === 0) return

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show(entry.target)
              io?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
      )
      els.forEach((el) => io!.observe(el))
    } else {
      els.forEach(show)
    }

    // Safety net: never leave on-screen content hidden. If the observer hasn't
    // revealed an element that is in or above the viewport shortly after it
    // mounted, reveal it anyway (below-the-fold elements still animate on
    // scroll). All remaining get revealed on bfcache restore.
    const revealVisible = () => {
      const h = window.innerHeight || document.documentElement.clientHeight
      for (const el of pending()) if (el.getBoundingClientRect().top < h) show(el)
    }
    const timer = window.setTimeout(revealVisible, 900)
    // bfcache restore (back/forward from another page) doesn't re-run React.
    const onPageShow = () => pending().forEach(show)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      io?.disconnect()
      window.clearTimeout(timer)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [dep])
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
