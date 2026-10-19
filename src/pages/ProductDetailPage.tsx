import { ArrowLeft, ArrowLeftRight, Check, Clock3, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Store } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../features/products/useProducts'
import { useCartStore } from '../features/cart/cartStore'
import { VendorSwitchDialog } from '../features/cart/VendorSwitchDialog'
import { formatPrice } from '../utils/format'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, isLoading } = useProduct(id)
  const { vendor: cartVendor, addItem, replaceWith } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [showConflict, setShowConflict] = useState(false)

  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1600)
    return () => window.clearTimeout(timer)
  }, [added])

  if (isLoading) return <div className="detail-loading"><div/><div/></div>
  if (!product) return <div className="empty-state"><h2>Produit introuvable</h2><Link to="/explore?view=products" className="button button--primary">Retour aux produits</Link></div>

  const conflicts = Boolean(cartVendor && cartVendor.id !== product.vendor.id)
  const unavailable = !product.available || !product.vendor.active
  const add = () => {
    const result = addItem(product, quantity)
    if (result === 'vendor-conflict') setShowConflict(true)
    if (result === 'added') setAdded(true)
  }

  return <>
    <div className="product-detail">
      <section className="product-detail__visual"><button className="detail-back" onClick={() => navigate(-1)} aria-label="Retour"><ArrowLeft size={21}/></button><button className="detail-like" aria-label="Ajouter aux favoris"><Heart size={20}/></button><span className="detail-tag">{product.available ? 'Disponible' : 'Indisponible'}</span><img src={product.image} alt={product.name}/><div className="detail-trust"><span><Clock3 size={14}/> {product.preparationMinutes} min</span></div></section>
      <section className="product-detail__content">
        <div className="detail-category">{product.category.toUpperCase()}</div>
        <h1>{product.name}</h1>
        <Link to={`/vendors/${product.vendor.id}`} className="detail-vendor"><span>{product.vendor.initials}</span><div><small>PROPOSÉ PAR</small><b>{product.vendor.name}</b></div><Store size={18}/></Link>
        <p className="detail-description">{product.description}</p>
        <div className="detail-features"><span><Check size={15}/> Produit disponible</span><span><ShieldCheck size={15}/> Remise sur le campus</span></div>
        <div className="detail-divider"/>
        <div className="detail-price"><div><span>Prix unitaire</span><strong>{formatPrice(product.price)}</strong></div><div className="quantity quantity--large"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Réduire la quantité"><Minus size={17}/></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Augmenter la quantité"><Plus size={17}/></button></div></div>
        <button disabled={unavailable} className={`button button--primary button--block button--large ${added ? 'button--success' : ''}`} onClick={add}>{unavailable ? 'Produit indisponible' : added ? <><Check size={19}/> Ajouté au panier</> : conflicts ? <><ArrowLeftRight size={19}/> Changer de boutique pour ajouter</> : <><ShoppingBag size={19}/> Ajouter · {formatPrice(product.price * quantity)}</>}</button>
        <Link to="/cart" className="detail-cart-link">Voir mon panier</Link>
      </section>
    </div>
    {showConflict && cartVendor && <VendorSwitchDialog currentVendor={cartVendor} product={product} onCancel={() => setShowConflict(false)} onConfirm={() => { replaceWith(product, quantity); setShowConflict(false); setAdded(true) }}/>} 
  </>
}
