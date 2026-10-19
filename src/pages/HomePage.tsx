import { ArrowRight, Banknote, Bell, MapPin, PackageCheck, Search, Sparkles, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../mocks/data'
import { useProducts } from '../features/products/useProducts'
import { ProductCard } from '../features/products/ProductCard'
import { useAuthStore } from '../features/auth/authStore'
import { useVendors } from '../features/vendors/useVendors'
import { VendorCard } from '../features/vendors/VendorCard'
import { useOrderStore } from '../features/orders/orderStore'

export function HomePage() {
  const user = useAuthStore(state => state.user)
  const orders = useOrderStore(state => state.orders)
  const { products, isLoading, error, retry } = useProducts()
  const { vendors, isLoading: vendorsLoading } = useVendors()
  const popular = products.filter(item => item.popular)
  const activeOrder = orders.find(order => !['completed', 'cancelled'].includes(order.status))
  const dateLabel = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toUpperCase()

  return <div className="home-page">
    <section className="mobile-greeting"><div><span>Bonjour,</span><h1>{user?.firstName ?? 'Étudiant'} <span>👋🏾</span></h1></div><Link to="/notifications" className="icon-button" aria-label="Notifications"><Bell size={20}/></Link></section>
    <section className="welcome-row"><div><span className="eyebrow">{dateLabel}</span><h1>Bonjour, {user?.firstName ?? 'Étudiant'} <span>👋🏾</span></h1><p>Quelle boutique vous ferait plaisir aujourd’hui&nbsp;?</p></div><div className="campus-status"><i/><span><b>Campus principal</b><small>Points de remise officiels</small></span></div></section>
    <Link to="/explore" className="mobile-search"><Search size={18}/><span>Rechercher une boutique ou un produit</span></Link>

    {activeOrder && <Link to={`/orders/${activeOrder.id}`} className="active-order-card"><span><PackageCheck size={21}/></span><div><small>COMMANDE EN COURS</small><b>{activeOrder.vendor.name}</b><p>Commande #{activeOrder.id} · Voir le suivi</p></div><ArrowRight size={20}/></Link>}

    <section className="hero-card">
      <div className="hero-card__copy"><span className="hero-chip"><Sparkles size={13}/> Plusieurs boutiques, un campus</span><h2>Votre pause,<br/><em>chez votre boutique préférée.</em></h2><p>Choisissez une boutique, composez votre panier et payez en espèces à la remise.</p><Link to="/explore" className="button button--light">Voir les boutiques <ArrowRight size={17}/></Link><div className="hero-facts"><span><Store size={15}/> Boutiques du campus</span><span><Banknote size={15}/> Paiement en espèces</span></div></div>
      <div className="hero-card__visual"><div className="hero-orbit hero-orbit--one"/><div className="hero-orbit hero-orbit--two"/><img src="/food-campus-products.webp" alt="Sélection de produits Food Campus"/><span className="hero-price">Dès <b>200 FC</b></span></div>
    </section>

    <section className="section-block"><div className="section-heading"><div><span>LES BOUTIQUES DU CAMPUS</span><h2>Choisir une boutique</h2></div><Link to="/explore">Tout voir <ArrowRight size={15}/></Link></div>
      {vendorsLoading ? <div className="vendor-grid vendor-grid--home">{[1,2,3].map(i => <div className="vendor-skeleton" key={i}/>)}</div> : <div className="vendor-grid vendor-grid--home">{vendors.slice(0,3).map(vendor => <VendorCard vendor={vendor} productCount={products.filter(product => product.vendor.id === vendor.id).length} key={vendor.id}/>)}</div>}
    </section>

    <section className="section-block"><div className="section-heading"><div><span>À CHAQUE ENVIE</span><h2>Explorer les catégories</h2></div><Link to="/products">Tout voir <ArrowRight size={15}/></Link></div><div className="category-grid">{categories.map(category => <Link to={`/products?category=${category.id}`} className="category-card" key={category.id} style={{ '--category-color': category.color } as React.CSSProperties}><div>{category.emoji}</div><span>{category.name}</span><small>Découvrir <ArrowRight size={12}/></small></Link>)}</div></section>

    <section className="section-block"><div className="section-heading"><div><span>À DÉCOUVRIR</span><h2>Produits populaires</h2></div><Link to="/explore?view=products">Tout voir <ArrowRight size={15}/></Link></div>
      {isLoading ? <div className="product-grid">{[1,2,3].map(i => <div className="product-skeleton" key={i}/>)}</div> : error ? <div className="inline-error">{error} <button onClick={retry}>Réessayer</button></div> : <div className="product-grid">{popular.map(product => <ProductCard product={product} key={product.id}/>)}</div>}
    </section>
    <div className="campus-reassurance"><MapPin size={18}/><span><b>Remise sur le campus</b><small>Vous choisirez un point officiel avant de confirmer votre commande.</small></span></div>
  </div>
}
