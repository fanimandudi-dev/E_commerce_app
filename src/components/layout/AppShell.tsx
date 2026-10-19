import { Banknote, Bell, ClipboardList, Heart, Home, Search, ShoppingBag, Store, UserRound } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Brand } from '../ui/Brand'
import { cartCount, cartTotal, useCartStore } from '../../features/cart/cartStore'
import { formatPrice } from '../../utils/format'
import { useAuthStore } from '../../features/auth/authStore'

const navItems = [
  { to: '/home', label: 'Accueil', icon: Home, matches: ['/home'] },
  { to: '/explore', label: 'Explorer', icon: Store, matches: ['/explore', '/vendors', '/products'] },
  { to: '/orders', label: 'Commandes', icon: ClipboardList, matches: ['/orders', '/order-success'] },
  { to: '/profile', label: 'Profil', icon: UserRound, matches: ['/profile', '/settings'] },
]

function Navigation({ mobile = false }: { mobile?: boolean }) {
  const location = useLocation()
  return <nav className={mobile ? 'bottom-nav' : 'side-nav'} aria-label="Navigation principale">
    {navItems.map(({ to, label, icon: Icon, matches }) => {
      const active = matches.some(path => location.pathname === path || location.pathname.startsWith(`${path}/`))
      return <Link key={to} to={to} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><Icon size={mobile ? 20 : 19}/><span>{label}</span></Link>
    })}
  </nav>
}

export function AppShell() {
  const { items, vendor } = useCartStore()
  const user = useAuthStore(state => state.user)
  const count = cartCount(items)
  const location = useLocation()
  const detailPage = /\/products\/.+/.test(location.pathname)

  return <div className="app-shell">
    <aside className="sidebar">
      <Brand/>
      <div className="sidebar__caption">ESPACE ÉTUDIANT</div>
      <Navigation/>
      <div className="sidebar__profile"><div className="avatar">{user?.firstName.charAt(0) ?? 'E'}</div><div><b>{user?.name ?? 'Étudiant'}</b><span>{user?.faculty ?? 'Campus'}</span></div></div>
    </aside>

    <div className="app-main">
      <div className="desktop-topbar">
        <Link to="/explore" className="top-search"><Search size={18}/><span>Rechercher une boutique ou un produit…</span><kbd>⌘ K</kbd></Link>
        <Link to="/notifications" className="top-action" aria-label="Notifications"><Bell size={20}/><i/></Link>
        <Link to="/cart" className="top-action" aria-label="Panier"><ShoppingBag size={20}/>{count > 0 && <b>{count}</b>}</Link>
      </div>
      <main className={`page-content ${detailPage ? 'page-content--detail' : ''}`}><Outlet/></main>
    </div>

    <aside className="context-panel">
      <div className="context-panel__head"><h2>Mon panier</h2><Link to="/cart">Voir tout</Link></div>
      {items.length === 0 ? <div className="mini-empty"><ShoppingBag size={28}/><b>Votre panier est vide</b><span>Le premier produit choisira votre boutique.</span></div> : <>
        {vendor && <Link to={`/vendors/${vendor.id}`} className="context-vendor"><span>{vendor.initials}</span><div><small>COMMANDE CHEZ</small><b>{vendor.name}</b></div></Link>}
        <div className="mini-cart">{items.slice(0,3).map(item => <div key={item.product.id}><img src={item.product.image} alt=""/><span><b>{item.product.shortName}</b><small>{item.quantity} × {formatPrice(item.product.price)}</small></span></div>)}</div>
        <div className="mini-total"><span>Total</span><b>{formatPrice(cartTotal(items))}</b></div><Link className="button button--primary button--block" to="/cart">Voir le panier</Link>
      </>}
      <div className="context-cash-note"><Banknote size={24}/><div><b>Paiement en espèces</b><p>Vous payez directement la boutique lors de la remise, puis votre QR confirme la commande.</p></div></div>
      <div className="context-trust"><span><span className="clock-dot">●</span>Une boutique par panier</span><span><Heart size={15}/>Simple et clair</span></div>
    </aside>

    <div className="mobile-topbar"><Brand compact/><div><Link to="/notifications" className="icon-button" aria-label="Notifications"><Bell size={20}/></Link><Link to="/cart" className="icon-button cart-icon" aria-label="Panier"><ShoppingBag size={20}/>{count > 0 && <b>{count}</b>}</Link></div></div>
    {!detailPage && <Navigation mobile/>}
  </div>
}
