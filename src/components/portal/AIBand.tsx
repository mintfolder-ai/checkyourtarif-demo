import { lazy, Suspense } from 'react'
import { Icon } from '../ui/Icon'
import { ErrorBoundary } from '../ui/ErrorBoundary'

const PremiumCanvas = lazy(() =>
  import('./PremiumCanvas').then((m) => ({ default: m.PremiumCanvas })),
)

const POINTS = [
  { icon: 'spark', title: 'Versteht natürliche Sprache', text: 'Beschreibe dein Anliegen in eigenen Worten statt Formulare auszufüllen.' },
  { icon: 'bolt', title: 'Analysiert in Echtzeit', text: 'Hunderte Tarife werden nach Preis, Leistung und Bewertung gewichtet.' },
  { icon: 'trophy', title: 'Nennt den echten Testsieger', text: 'Transparente Empfehlung mit Begründung, nicht nach Provision sortiert.' },
]

export function AIBand() {
  return (
    <section className="kiband">
      <div className="shell kiband__grid">
        <div className="kiband__text reveal">
          <span className="kiband__pill"><Icon name="spark" /> Künstliche Intelligenz</span>
          <h2 className="kiband__title">
            Die erste Vergleichsplattform mit <span>echter KI</span>
          </h2>
          <p className="kiband__lead">
            Kein starres Formular. Unsere KI versteht, was du wirklich brauchst,
            und findet aus tausenden Kombinationen den besten Tarif, in Sekunden.
          </p>
          <ul className="kiband__points">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="kiband__ic"><Icon name={p.icon} /></span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="btn btn--orange" href="#start">
            KI-Vergleich starten <Icon name="arrow" />
          </a>
        </div>

        <div className="kiband__visual reveal">
          <ErrorBoundary fallback={<div className="kiband__canvas kiband__fallback" aria-hidden="true" />}>
            <Suspense fallback={<div className="kiband__canvas" />}>
              <PremiumCanvas />
            </Suspense>
          </ErrorBoundary>
          <div className="kiband__float kiband__float--1">
            <Icon name="check" /> Bestpreis gefunden
          </div>
          <div className="kiband__float kiband__float--2">
            <Icon name="spark" /> 98 % Trefferquote
          </div>
        </div>
      </div>
    </section>
  )
}
