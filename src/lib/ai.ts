import { CATEGORIES, type Category } from '../data/categories'

export type AIResult = {
  category: Category
  confidence: number
  reasoning: string
  followups: string[]
}

/**
 * Pluggable comparison brain.
 *
 * Demo mode (default): a transparent client-side classifier matches the query
 * against category keywords and returns a recommendation with reasoning. No key,
 * no network, works offline.
 *
 * Live mode: set VITE_AI_ENDPOINT to a backend route that proxies Claude
 * (the API key stays server-side, never in the browser). The endpoint receives
 * { query } and must return { categoryId, reasoning, followups }.
 */
export async function askComparisonAI(query: string): Promise<AIResult> {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT as string | undefined

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      if (res.ok) {
        const data = await res.json()
        const category = CATEGORIES.find((c) => c.id === data.categoryId)
        if (category) {
          return {
            category,
            confidence: data.confidence ?? 0.9,
            reasoning: data.reasoning ?? defaultReasoning(category),
            followups: data.followups ?? defaultFollowups(category),
          }
        }
      }
    } catch {
      /* fall through to demo classifier */
    }
  }

  return demoClassify(query)
}

function demoClassify(query: string): AIResult {
  const q = query.toLowerCase()
  const scored = CATEGORIES.map((category) => {
    let score = 0
    for (const kw of category.keywords) {
      if (q.includes(kw)) score += kw.length >= 5 ? 3 : 2
    }
    return { category, score }
  }).sort((a, b) => b.score - a.score)

  const top = scored[0]
  const category = top.score > 0 ? top.category : CATEGORIES[0]
  const confidence = top.score > 0 ? Math.min(0.62 + top.score * 0.08, 0.98) : 0.55

  return {
    category,
    confidence,
    reasoning:
      top.score > 0
        ? defaultReasoning(category)
        : `Ich konnte deine Anfrage keiner Kategorie eindeutig zuordnen. Mein Vorschlag als Startpunkt ist ${category.name} — oder wähle unten direkt eine Kategorie.`,
    followups: defaultFollowups(category),
  }
}

function defaultReasoning(c: Category): string {
  return `Für "${c.name}" vergleiche ich die relevanten Anbieter und sortiere nach Preis, Leistung und Bewertung. Durchschnittlich lassen sich hier ${c.savings} ${c.savingsUnit.replace('€', 'Euro')} herausholen. Klicke auf Vergleich starten, um deinen persönlichen Tarif zu berechnen.`
}

function defaultFollowups(c: Category): string[] {
  const map: Record<string, string[]> = {
    strom: ['Wie hoch ist dein Jahresverbrauch in kWh?', 'Suchst du Ökostrom?'],
    gas: ['Wie groß ist deine Wohnfläche?', 'Postleitzahl für regionale Preise?'],
    dsl: ['Welche Geschwindigkeit brauchst du?', 'Kabel oder Glasfaser verfügbar?'],
    handy: ['Wie viel Datenvolumen brauchst du?', 'Mit oder ohne neues Smartphone?'],
    kfz: ['Fahranfänger oder langjährig unfallfrei?', 'Haftpflicht oder Vollkasko?'],
    kredit: ['Welche Kreditsumme und Laufzeit?', 'Verwendungszweck des Kredits?'],
    laptop: ['Wie viel RAM und Speicher brauchst du?', 'Mit oder ohne 5G-Datenflat?'],
    tv: ['Welche Bildschirmgröße passt zu dir?', 'OLED oder QLED bevorzugt?'],
    tablet: ['Brauchst du 5G unterwegs?', 'Mit Eingabestift zum Arbeiten?'],
  }
  return map[c.id] ?? ['Welche Kategorie interessiert dich?']
}

export const SAMPLE_QUERIES = [
  'Ich zahle 95 Euro Strom im Monat, geht das günstiger?',
  'Allnet-Flat mit viel Datenvolumen gesucht',
  'Kfz-Versicherung für Fahranfänger',
  'Schnelles Internet für Homeoffice',
  'Ratenkredit für ein neues Auto',
]
