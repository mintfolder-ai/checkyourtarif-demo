import { useEffect, useState } from 'react'

/** Minimal hash router. Returns the normalized route, e.g. '/flug' or '/'. */
export function useRoute(): string {
  const read = () => {
    const h = window.location.hash.replace(/^#/, '')
    if (h.startsWith('/')) return h.split('?')[0]
    return '/'
  }
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function go(path: string) {
  window.location.hash = path
}
