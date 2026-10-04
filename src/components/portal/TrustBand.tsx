import { Icon, StarRating } from '../ui/Icon'

export function TrustBand() {
  return (
    <section className="trust reveal">
      <div className="shell trust__grid">
        <div className="trust__item">
          <div className="trust__score">4,8</div>
          <div>
            <StarRating value={4.8} />
            <p>aus 128.400 Bewertungen</p>
          </div>
        </div>
        <div className="trust__item">
          <Icon name="shield" className="trust__ic" />
          <div><strong>TÜV-geprüft</strong><p>Sicherheit &amp; Datenschutz</p></div>
        </div>
        <div className="trust__item">
          <Icon name="trophy" className="trust__ic" />
          <div><strong>Testsieger 2026</strong><p>Kategorie Vergleichsportale</p></div>
        </div>
        <div className="trust__item">
          <Icon name="user" className="trust__ic" />
          <div><strong>2,4 Mio. Nutzer</strong><p>vertrauen auf uns</p></div>
        </div>
      </div>
    </section>
  )
}
