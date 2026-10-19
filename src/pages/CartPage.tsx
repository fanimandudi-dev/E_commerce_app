import { ArrowRight, Banknote, ShoppingBag, Store, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { QuantityControl } from '../components/ui/QuantityControl'
import { cartTotal, useCartStore } from '../features/cart/cartStore'
import { formatPrice } from '../utils/format'

export function CartPage() {
  const { items, vendor, increment, decrement, removeItem, clear } = useCartStore()
  const subtotal = cartTotal(items)
  if (!items.length) return <div><PageHeader title="Mon panier" back/><EmptyState icon={ShoppingBag} title="Votre panier est vide" text="Le premier produit ajouté déterminera la boutique de votre panier." action="Explorer les boutiques" to="/explore"/></div>

  return <div className="cart-page">
    <PageHeader title="Mon panier" subtitle={`${items.length} produit${items.length > 1 ? 's' : ''} dans une seule boutique`} back action={<button className="text-button text-button--danger" onClick={clear}><Trash2 size={15}/> Tout supprimer</button>}/>
    <div className="cart-layout">
      <section className="cart-list">
        {vendor && <Link to={`/vendors/${vendor.id}`} className="cart-vendor-banner"><span>{vendor.initials}</span><div><small>VOTRE COMMANDE CHEZ</small><b>{vendor.name}</b></div><Store size={20}/></Link>}
        <div className="cart-list__heading"><h2>Votre sélection</h2><span>Prix</span></div>
        {items.map(item => <article className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.name}/><div className="cart-item__info"><span>{item.product.category}</span><h3>{item.product.shortName}</h3><small>Préparation estimée : {item.product.preparationMinutes} min</small><button onClick={() => removeItem(item.product.id)}><Trash2 size={14}/> Supprimer</button></div><div className="cart-item__controls"><strong>{formatPrice(item.product.price * item.quantity)}</strong><QuantityControl value={item.quantity} onIncrease={() => increment(item.product.id)} onDecrease={() => decrement(item.product.id)} compact/></div></article>)}
      </section>
      <aside className="order-summary"><span className="eyebrow">RÉCAPITULATIF</span><h2>Commande chez {vendor?.name}</h2><div className="summary-row"><span>Sous-total</span><b>{formatPrice(subtotal)}</b></div><div className="summary-row"><span>Remise sur le campus</span><b className="free">Offerte</b></div><div className="summary-row muted"><span>Frais de service</span><b>0 FC</b></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-cash"><Banknote size={18}/><span><b>À payer en espèces</b><small>Directement à la boutique lors de la remise.</small></span></div><Link to="/checkout" className="button button--primary button--large button--block">Continuer <ArrowRight size={18}/></Link></aside>
    </div>
    <Link to={vendor ? `/vendors/${vendor.id}` : '/explore'} className="continue-shopping">← Continuer chez {vendor?.name ?? 'cette boutique'}</Link>
  </div>
}
