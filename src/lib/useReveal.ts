import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they enter the viewport.
 *
 * `.reveal` starts hidden (opacity 0) and becomes visible once `.is-visible`
 * is added. Elements are added to the DOM at many times — initial render, route
 * navigation, and category/tab switches — so a one-shot querySelectorAll would
 * miss later ones and leave them stuck invisible (this showed up as blank
 * sections and a blank page after navigating back). A MutationObserver watches
 * for every `.reveal` node that ever appears and registers it; anything already
 * in/above the viewport is shown immediately, the rest reveal on scroll, and a
 * pageshow handler covers bfcache restores. Nothing can stay stuck hidden.
 */
export function useReveal() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add('is-visible')
    const vh = () => window.innerHeight || document.documentElement.clientHeight

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  show(entry.target)
                  io!.unobserve(entry.target)
                }
              }
            },
            { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
          )
        : null

    const register = (el: Element) => {
      if (el.classList.contains('is-visible')) return
      const r = el.getBoundingClientRect()
      // Already on screen (or above it) -> reveal now, no waiting.
      if (r.height > 0 && r.top < vh() * 0.98 && r.bottom > -40) {
        show(el)
        return
      }
      if (io) io.observe(el)
      else show(el)
    }

    const scan = (root: ParentNode = document) =>
      root.querySelectorAll('.reveal:not(.is-visible)').forEach(register)

    scan()

    // Catch nodes added after the first render (navigation, tab switches, any
    // re-render) so freshly mounted .reveal nodes are always handled.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          const el = node as Element
          if (el.classList?.contains('reveal')) register(el)
          el.querySelectorAll?.('.reveal:not(.is-visible)').forEach(register)
        }
      }
    })
    mo.observe(document.getElementById('root') ?? document.body, {
      childList: true,
      subtree: true,
    })

    // Safety net + bfcache restore: never leave an on-screen element hidden.
    const revealVisible = () => {
      const h = vh()
      for (const el of document.querySelectorAll('.reveal:not(.is-visible)')) {
        if (el.getBoundingClientRect().top < h) show(el)
      }
    }
    const timer = window.setInterval(revealVisible, 700)
    const onPageShow = () => scan()
    window.addEventListener('pageshow', onPageShow)

    return () => {
      io?.disconnect()
      mo.disconnect()
      window.clearInterval(timer)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
