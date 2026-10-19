import { Outlet } from 'react-router-dom'
import { Brand } from '../ui/Brand'

export function AuthLayout() {
  return <main className="auth-layout">
    <section className="auth-visual"><Brand /><div className="auth-visual__copy"><span>FOOD CAMPUS</span><h1>La pause qui nourrit<br/>votre productivité.</h1><p>Commandez. Récupérez. Profitez — sans quitter votre campus.</p></div><img src="/food-campus-products.webp" alt="Boissons et snacks Food Campus" /></section>
    <section className="auth-panel"><Outlet /></section>
  </main>
}
