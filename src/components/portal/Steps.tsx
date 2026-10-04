import { Icon } from '../ui/Icon'

const STEPS = [
  { icon: 'search', title: 'Anfrage stellen', text: 'Kategorie wählen oder der KI in eigenen Worten sagen, was du brauchst.' },
  { icon: 'spark', title: 'KI vergleicht', text: 'Hunderte Tarife werden nach Preis, Leistung und Bewertung analysiert.' },
  { icon: 'piggy', title: 'Wechseln & sparen', text: 'Bestes Angebot wählen und in wenigen Minuten online abschließen.' },
]

export function Steps() {
  return (
    <section className="steps">
      <div className="shell">
        <div className="steps__head reveal">
          <p className="eyebrow">So funktioniert es</p>
          <h2 className="section-title">In drei Schritten zum besten Tarif</h2>
        </div>
        <ol className="steps__grid">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step reveal">
              <span className="step__num">{i + 1}</span>
              <span className="step__icon"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
