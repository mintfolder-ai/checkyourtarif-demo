import { useEffect, useRef, useState } from 'react'
import type { Check24Widget as Widget } from '../../data/check24'

/**
 * Mounts a live CHECK24 partner widget using the official embed method: a target
 * <div> with the fixed id (+ data-* attributes) and the loader <script>. The
 * loader injects CHECK24's comparison iframe into the div and auto-sizes it to
 * fit its content via postMessage, so the host page grows and scrolls normally
 * (no fixed height, no clipping). Everything is created fresh on mount and torn
 * down on unmount, so switching category tabs re-initialises cleanly.
 */
export function Check24Widget({ widget }: { widget: Widget }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    setReady(false)
    host.innerHTML = ''

    const target = document.createElement('div')
    target.style.width = '100%'
    target.id = widget.containerId
    if (widget.data) {
      for (const [k, v] of Object.entries(widget.data)) target.setAttribute(`data-${k}`, v)
    }
    host.appendChild(target)

    const script = document.createElement('script')
    script.src = widget.scriptSrc
    script.async = true
    host.appendChild(script)

    // Hide the spinner once the widget has injected its comparison iframe.
    const mo = new MutationObserver(() => {
      if (target.querySelector('iframe')) {
        setReady(true)
        mo.disconnect()
      }
    })
    mo.observe(target, { childList: true, subtree: true })
    const fallback = window.setTimeout(() => setReady(true), 6000)

    return () => {
      mo.disconnect()
      window.clearTimeout(fallback)
      host.innerHTML = ''
    }
  }, [widget.containerId, widget.scriptSrc])

  return (
    <div className="c24w">
      {!ready && (
        <div className="c24w__loading" role="status" aria-live="polite">
          <span className="c24w__spinner" aria-hidden="true" />
          <span>Live-Vergleich wird geladen …</span>
        </div>
      )}
      <div ref={hostRef} className="c24w__host" />
    </div>
  )
}
