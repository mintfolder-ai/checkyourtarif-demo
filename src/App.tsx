import { useCallback, useEffect, useState } from 'react'
import { useReveal } from './lib/useReveal'
import { useRoute } from './lib/useRoute'
import { Header } from './components/portal/Header'
import { Hero } from './components/portal/Hero'
import { CategoryMega } from './components/portal/CategoryMega'
import { CompareModule } from './components/compare/CompareModule'
import { AIBand } from './components/portal/AIBand'
import { TrustBand } from './components/portal/TrustBand'
import { Steps } from './components/portal/Steps'
import { Footer } from './components/portal/Footer'
import { FlightPage } from './components/flight/FlightPage'
import { askComparisonAI } from './lib/ai'

export default function App() {
  const route = useRoute()
  const [activeCat, setActiveCat] = useState('strom')
  const [note, setNote] = useState<string | null>(null)

  useReveal()
  // Re-run reveal observer when switching routes.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  const pick = useCallback((catId: string, msg: string) => {
    if (window.location.hash.startsWith('#/flug')) window.location.hash = '/'
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

  return (
    <>
      <Header onSearch={search} />
      {route === '/flug' ? (
        <main>
          <FlightPage />
        </main>
      ) : (
        <main>
          <Hero onPick={pick} />
          <CategoryMega onPick={pick} />
          <CompareModule activeCat={activeCat} setActiveCat={setActiveCat} note={note} />
          <AIBand />
          <TrustBand />
          <Steps />
        </main>
      )}
      <Footer />
    </>
  )
}
