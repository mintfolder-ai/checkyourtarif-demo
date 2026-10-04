import { TILES, CATEGORIES } from '../../data/categories'
import { Icon } from '../ui/Icon'

export function CategoryMega({ onPick }: { onPick: (catId: string, note: string) => void }) {
  const coreIds = new Set(CATEGORIES.map((c) => c.name))

  return (
    <section className="mega" id="kategorien">
      <div className="shell">
        <div className="mega__head reveal">
          <div>
            <p className="eyebrow">Alle Kategorien</p>
            <h2 className="section-title">Ein Portal für jeden Vergleich</h2>
          </div>
          <p className="section-sub">Wähle eine Kategorie oder frag einfach die KI.</p>
        </div>

        <div className="mega__grid reveal">
          {TILES.map((t) => {
            const core = CATEGORIES.find((c) => c.name === t.name)
            const isCore = coreIds.has(t.name)
            return isCore && core ? (
              <button
                key={t.name}
                className="tile"
                onClick={() => onPick(core.id, `Kategorie gewählt: ${core.name}`)}
              >
                {t.hot && <span className="tile__hot">beliebt</span>}
                <span className="tile__icon"><Icon name={t.icon} /></span>
                <span className="tile__name">{t.name}</span>
              </button>
            ) : t.href.startsWith('#') ? (
              <a key={t.name} className="tile" href={t.href}>
                {t.hot && <span className="tile__hot">beliebt</span>}
                <span className="tile__icon"><Icon name={t.icon} /></span>
                <span className="tile__name">{t.name}</span>
              </a>
            ) : (
              <a key={t.name} className="tile" href={t.href} target="_blank" rel="noopener noreferrer">
                {t.hot && <span className="tile__hot">beliebt</span>}
                <span className="tile__icon"><Icon name={t.icon} /></span>
                <span className="tile__name">{t.name}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
