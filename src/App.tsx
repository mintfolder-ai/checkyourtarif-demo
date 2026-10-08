import { useCallback, useEffect, useState } from 'react'
import { useReveal } from './lib/useReveal'
import { useRoute } from './lib/useRoute'
import { Header } from './components/portal/Header'
import { Hero } from './components/portal/Hero'
import { CompareModule } from './components/compare/CompareModule'
import { AIBand } from './components/portal/AIBand'
import { TrustBand } from './components/portal/TrustBand'
import { Steps } from './components/portal/Steps'
import { Footer } from './components/portal/Footer'
import { FlightPage } from './components/flight/FlightPage'
import { LoginPage } from './components/portal/LoginPage'
import { askComparisonAI } from './lib/ai'

export default function App() {
  const route = useRoute()
  const [activeCat, setActiveCat] = useState('strom')
  const [note, setNote] = useState<string | null>(null)

  useReveal()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  // Switching category manually clears any stale AI-search note.
  const selectCat = useCallback((id: string) => {
    setActiveCat(id)
    setNote(null)
  }, [])

  const pick = useCallback((catId: string, msg: string) => {
    const h = window.location.hash
    if (h.startsWith('#/flug') || h.startsWith('#/login')) window.location.hash = '/'
    setActiveCat(catId)
    setNote(msg)
    requestAnimationFrame(() => {
      setTimeout(() => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    })
  }, [])

  const search = useCallback(async (q: string) => {
    const res = await askComparisonAI(q)
    pick(res.category.id, `KI-Treffer für „${q}"`)
  }, [pick])

  let content
  if (route === '/flug') {
    content = <FlightPage />
  } else if (route === '/login') {
    content = <LoginPage />
  } else {
    content = (
      <>
        <Hero onPick={pick} />
        <CompareModule activeCat={activeCat} setActiveCat={selectCat} note={note} />
        <AIBand />
        <TrustBand />
        <Steps />
      </>
    )
  }

  return (
    <>
      <Header onSearch={search} />
      <main>{content}</main>
      <Footer />
    </>
  )
}
