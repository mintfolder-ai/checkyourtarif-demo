import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { askComparisonAI, SAMPLE_QUERIES } from '../../lib/ai'

export function Hero({ onPick }: { onPick: (catId: string, note: string) => void }) {
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)

  async function run(text: string) {
    const query = text.trim()
    if (!query) return
    setQ(query)
    setBusy(true)
    const res = await askComparisonAI(query)
    setBusy(false)
    onPick(res.category.id, `KI-Treffer für „${query}" · ${Math.round(res.confidence * 100)} % Sicherheit`)
  }

  return (
    <section className="hero" id="start">
      <div className="shell hero__grid">
        <div className="hero__left">
          <span className="hero__pill">
            <Icon name="spark" /> Neu: KI-gestützter Vergleich
          </span>
          <h1 className="hero__h1">
            Vergleiche <span className="hero__u">alles</span>. Spare bei allem.
          </h1>
          <p className="hero__lead">
            Strom, Gas, Internet, Handy, Versicherungen und Kredite. Unsere KI
            findet aus hunderten Tarifen den günstigsten, der zu dir passt.
          </p>

          <form
            className="hero__ai"
            onSubmit={(e) => {
              e.preventDefault()
              void run(q)
            }}
          >
            <Icon name="spark" className="hero__ai-spark" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Beschreibe, was du brauchst, z. B. Allnet-Flat mit 50 GB"
              aria-label="KI-Suche"
            />
            <button type="submit" disabled={busy}>
              {busy ? 'Analysiere …' : 'KI fragen'}
            </button>
          </form>

          <div className="hero__chips">
            {SAMPLE_QUERIES.slice(0, 4).map((s) => (
              <button key={s} className="hero__chip" onClick={() => void run(s)}>
                {s}
              </button>
            ))}
          </div>

          <ul className="hero__usp">
            <li><Icon name="check" /> 100 % kostenlos</li>
            <li><Icon name="lock" /> SSL-sicher</li>
            <li><Icon name="trophy" /> Testsieger-Tarife</li>
          </ul>
        </div>

        <aside className="hero__card" aria-label="Sparpotenzial">
          <div className="hero__card-head">
            <span>Dein Sparpotenzial</span>
            <Icon name="piggy" />
          </div>
          <ul className="hero__save-list">
            <li><span><Icon name="bolt" /> Strom</span><b>bis 850 €</b></li>
            <li><span><Icon name="flame" /> Gas</span><b>bis 1.000 €</b></li>
            <li><span><Icon name="car" /> Kfz</span><b>bis 420 €</b></li>
            <li><span><Icon name="wifi" /> DSL</span><b>385 € Cashback</b></li>
          </ul>
          <div className="hero__card-total">
            <span>Gesamt pro Jahr</span>
            <strong>über 2.600 €</strong>
          </div>
          <a className="btn btn--orange btn--block" href="#vergleich">
            Jetzt vergleichen <Icon name="arrow" />
          </a>
        </aside>
      </div>
    </section>
  )
}
