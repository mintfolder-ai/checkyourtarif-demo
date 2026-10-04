import { Icon, StarRating } from '../ui/Icon'
import type { Offer } from '../../data/offers'

export function OfferCard({ offer, rank, href }: { offer: Offer; rank: number; href: string }) {
  return (
    <article className={`offer ${rank === 1 ? 'offer--top' : ''}`}>
      <div className="offer__rank">
        <span className="offer__rank-num">{rank}</span>
        {offer.badge && (
          <span className="offer__badge">
            {rank === 1 && <Icon name="trophy" />} {offer.badge}
          </span>
        )}
      </div>

      <div className="offer__provider">
        <div className="offer__logo" aria-hidden="true">
          {offer.provider.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h3 className="offer__name">{offer.provider}</h3>
          <p className="offer__plan">{offer.plan}</p>
          <div className="offer__rating">
            <StarRating value={offer.rating} />
            <span>{offer.rating.toFixed(1)}</span>
            <span className="offer__reviews">({offer.reviews.toLocaleString('de-DE')})</span>
          </div>
        </div>
      </div>

      <ul className="offer__features">
        {offer.features.map((f) => (
          <li key={f}><Icon name="check" /> {f}</li>
        ))}
      </ul>

      <div className="offer__price">
        {offer.save && <span className="offer__save">{offer.save}</span>}
        {offer.oldPrice && <span className="offer__old">{offer.oldPrice} €</span>}
        <div className="offer__price-main">
          <span className="offer__amount">{offer.price}</span>
          <span className="offer__unit">{offer.priceUnit}</span>
        </div>
        <a className="btn btn--orange offer__cta" href={href} target="_blank" rel="noopener noreferrer">
          Zum Angebot <Icon name="arrow" />
        </a>
        <span className="offer__fine">kostenlos &amp; unverbindlich</span>
      </div>
    </article>
  )
}
