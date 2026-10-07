import { useEffect, useRef, useState } from 'react'
import type { Check24Widget as Widget } from '../../data/check24'

/**
 * Mounts a live CHECK24 partner widget inside an isolated <iframe>.
 *
 * The CHECK24 loader scripts can use document.write; running them directly in
 * the page would wipe the whole SPA (blank page on load / tab switch, mostly on
 * mobile). Hosting each widget in its own srcdoc iframe keeps any document.write
 * contained to that iframe, so the main page never goes blank. The iframe is
 * auto-sized from CHECK24's postMessage height events, with a generous fallback
 * height so the area is never visually empty.
 */
export function Check24Widget({ widget }: { widget: Widget }) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setReady(false)
    setFailed(false)

    const dataAttrs = widget.data
      ? Object.entries(widget.data)
          .map(([k, v]) => `data-${k}="${v}"`)
          .join(' ')
      : ''

    const srcdoc =
      '<!doctype html><html lang="de"><head>' +
      '<meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<base target="_top">' +
      '<style>html,body{margin:0;padding:0;background:transparent;' +
      "font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}" +
      'iframe{width:100%!important;border:0}</style></head><body>' +
      `<div style="width:100%" id="${widget.containerId}" ${dataAttrs}></div>` +
      // NOT async: run synchronously during the iframe's parse so a loader that
      // uses document.write inserts inline here (contained to this iframe) instead
      // of being ignored by the browser.
      `<scr` + `ipt src="${widget.scriptSrc}"></scr` + `ipt>` +
      '</body></html>'

    const frame = frameRef.current
    if (frame) frame.srcdoc = srcdoc

    // CHECK24 widgets post their rendered height; apply it to the iframe.
    const onMessage = (e: MessageEvent) => {
      if (!/check24/i.test(e.origin)) return
      let h: number | null = null
      const d = e.data
      if (typeof d === 'number') h = d
      else if (d && typeof d === 'object' && typeof (d as { height?: number }).height === 'number')
        h = (d as { height: number }).height
      else if (typeof d === 'string') {
        const m = d.match(/(\d{3,5})/)
        if (m && /(height|iframe|c24|size)/i.test(d)) h = parseInt(m[1], 10)
      }
      if (h && h > 320 && h < 6000 && frameRef.current) {
        frameRef.current.style.height = h + 'px'
        setReady(true)
      }
    }
    window.addEventListener('message', onMessage)

    // If nothing has rendered after a while, surface a graceful fallback.
    const failTimer = window.setTimeout(() => setFailed((f) => (ready ? f : true)), 15000)
    const readyTimer = window.setTimeout(() => setReady(true), 4000)

    return () => {
      window.removeEventListener('message', onMessage)
      window.clearTimeout(failTimer)
      window.clearTimeout(readyTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget.containerId, widget.scriptSrc])

  return (
    <div className="c24w">
      {!ready && (
        <div className="c24w__loading" role="status" aria-live="polite">
          <span className="c24w__spinner" aria-hidden="true" />
          <span>Live-Vergleich wird geladen …</span>
        </div>
      )}
      <iframe
        ref={frameRef}
        className="c24w__frame"
        title="CHECK24 Live-Vergleich"
        scrolling="no"
        onLoad={() => window.setTimeout(() => setReady(true), 1200)}
      />
      {failed && (
        <p className="c24w__fallback">
          Der Live-Vergleich lädt gerade nicht. Bitte lade die Seite neu oder
          deaktiviere einen aktiven Ad-/Script-Blocker.
        </p>
      )}
    </div>
  )
}
