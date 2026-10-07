import { useEffect, useRef, useState } from 'react'
import type { Check24Widget as Widget } from '../../data/check24'

/**
 * Mounts a live CHECK24 partner widget: builds the exact target <div> the loader
 * expects, then injects the loader <script> which replaces it with the live
 * comparison iframe. Everything is created fresh on mount and torn down on
 * unmount, so switching category tabs re-initialises the widget cleanly (the
 * loader finds a brand-new div each time it runs).
 */
export function Check24Widget({ widget }: { widget: Widget }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    setFailed(false)
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
    script.onerror = () => setFailed(true)
    host.appendChild(script)

    return () => {
      host.innerHTML = ''
    }
  }, [widget.containerId, widget.scriptSrc, widget.data])

  return (
    <div className="c24w">
      <div ref={hostRef} className="c24w__host" aria-live="polite" />
      {failed && (
        <p className="c24w__fallback">
          Der Live-Vergleich konnte nicht geladen werden. Bitte lade die Seite neu
          oder deaktiviere einen aktiven Ad-/Script-Blocker.
        </p>
      )}
    </div>
  )
}
