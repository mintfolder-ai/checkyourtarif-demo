import { useState } from 'react'
import { Icon } from '../ui/Icon'
import logoUrl from '../../assets/logo.png'

export function LoginPage() {
  const [sent, setSent] = useState(false)

  return (
    <section className="login">
      <div className="login__card">
        <a href="#/" className="login__logo" aria-label="Zur Startseite">
          <img src={logoUrl} alt="Check Your Tarif" width="190" height="53" />
        </a>
        <h1 className="login__title">Anmelden</h1>
        <p className="login__sub">Melde dich an, um deine Vergleiche und Favoriten zu verwalten.</p>

        {sent ? (
          <div className="login__done" role="status">
            <Icon name="check" /> Anmeldung im Prototyp deaktiviert. Im Live-Betrieb wirst du hier eingeloggt.
          </div>
        ) : (
          <form
            className="login__form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label className="login__field">
              <span>E-Mail-Adresse</span>
              <div className="login__input">
                <Icon name="user" />
                <input type="email" required placeholder="name@beispiel.de" autoComplete="email" />
              </div>
            </label>
            <label className="login__field">
              <span>Passwort</span>
              <div className="login__input">
                <Icon name="lock" />
                <input type="password" required placeholder="••••••••" autoComplete="current-password" />
              </div>
            </label>

            <div className="login__row">
              <label className="login__remember">
                <input type="checkbox" /> Angemeldet bleiben
              </label>
              <a href="#/login" className="login__forgot">Passwort vergessen?</a>
            </div>

            <button type="submit" className="btn btn--block">
              <Icon name="lock" className="btn__icon" /> Anmelden
            </button>
          </form>
        )}

        <div className="login__divider"><span>oder</span></div>
        <a href="#/login" className="btn btn--ghost btn--block">Neues Konto erstellen</a>

        <p className="login__back"><a href="#/">&larr; Zurück zur Startseite</a></p>
      </div>
    </section>
  )
}
