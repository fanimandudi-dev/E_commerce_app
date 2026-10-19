import { ArrowRight, Clock3, Leaf, MapPin } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brand } from '../../components/ui/Brand'
import './SplashScreen.css'

const SPLASH_DURATION_MS = 15_000

export function SplashScreen() {
  const navigate = useNavigate()
  const timerRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const continueToLogin = useCallback(() => {
    clearTimer()
    navigate('/login')
  }, [clearTimer, navigate])

  useEffect(() => {
    timerRef.current = window.setTimeout(continueToLogin, SPLASH_DURATION_MS)
    return clearTimer
  }, [clearTimer, continueToLogin])

  return <main className="splash-screen">
    <button className="splash-skip" type="button" onClick={continueToLogin}>
      Passer <ArrowRight size={15} aria-hidden="true" />
    </button>

    <div className="splash-shape splash-shape--top" aria-hidden="true" />
    <div className="splash-shape splash-shape--bottom" aria-hidden="true" />

    <div className="splash-layout">
      <section className="splash-copy" aria-labelledby="splash-title">
        <div className="splash-brand"><Brand /></div>
        <div className="splash-kicker"><Leaf size={14} aria-hidden="true" /> Frais, simple et pensé pour vous</div>
        <h1 id="splash-title">La pause qui nourrit <em>votre productivité.</em></h1>
        <p>Vos boissons, snacks et repas préférés, préparés avec soin et livrés là où vous étudiez.</p>

        <div className="splash-actions">
          <button className="splash-primary" type="button" onClick={continueToLogin}>
            Commencer <ArrowRight size={19} aria-hidden="true" />
          </button>
          <span>Redirection automatique dans 15 secondes</span>
        </div>

        <div className="splash-progress" aria-hidden="true"><i /></div>
        <div className="splash-benefits" aria-label="Avantages Food Campus">
          <span><Clock3 size={15} aria-hidden="true" /> Prêt en 10–15 min</span>
          <span><MapPin size={15} aria-hidden="true" /> Partout sur le campus</span>
        </div>
      </section>

      <section className="splash-visual" aria-label="Sélection de produits Food Campus">
        <div className="splash-visual__disc" aria-hidden="true" />
        <img className="splash-visual__main" src="/food-campus-products.webp" alt="Jus frais, eau, gâteau au chocolat et snacks Food Campus" />
        <div className="splash-product splash-product--juice">
          <img src="/products/jus-mangue.webp" alt="Jus de mangue frais" />
          <span><b>Jus frais</b><small>600 FC</small></span>
        </div>
        <div className="splash-product splash-product--cake">
          <img src="/products/gateau-chocolat.webp" alt="Gâteau au chocolat" />
          <span><b>Choco fondant</b><small>Le préféré du campus</small></span>
        </div>
        <div className="splash-stamp" aria-hidden="true"><b>100%</b><span>pause<br/>plaisir</span></div>
      </section>
    </div>

    <footer className="splash-footer">
      <span>FOOD CAMPUS · KINSHASA</span>
      <span>Une expérience pensée pour les étudiants</span>
    </footer>
  </main>
}
