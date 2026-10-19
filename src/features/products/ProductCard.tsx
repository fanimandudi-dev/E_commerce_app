import { ArrowLeftRight, Check, Clock3, Plus, Store } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../domain/models'
import { useCartStore } from '../cart/cartStore'
import { VendorSwitchDialog } from '../cart/VendorSwitchDialog'
import { formatPrice } from '../../utils/format'

export function ProductCard({ product, horizontal = false }: { product: Product; horizontal?: boolean }) {
  const { vendor: cartVendor, addItem, replaceWith } = useCartStore()
  const [showConflict, setShowConflict] = useState(false)
  const [added, setAdded] = useState(false)
  const conflicts = Boolean(cartVendor && cartVendor.id !== product.vendor.id)
  const unavailable = !product.available || !product.vendor.active

  useEffect(() => {
    if (!added) return
    const timer = window.setTimeout(() => setAdded(false), 1200)
    return () => window.clearTimeout(timer)
  }, [added])

  const add = () => {
    const result = addItem(product)
    if (result === 'vendor-conflict') setShowConflict(true)
    if (result === 'added') setAdded(true)
  }

  return <>
    <article className={`product-card ${horizontal ? 'product-card--horizontal' : ''} ${unavailable ? 'is-unavailable' : ''}`}>
      <Link to={`/products/${product.id}`} className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" />
        {product.popular && <span className="product-card__badge">Populaire</span>}
        {unavailable && <span className="product-card__unavailable">Indisponible</span>}
      </Link>
      <div className="product-card__body">
        <Link to={`/products/${product.id}`}><h3>{product.shortName}</h3></Link>
        <Link to={`/vendors/${product.vendor.id}`} className="product-card__vendor"><Store size={12}/> {product.vendor.name}</Link>
        <div className="product-card__meta"><span><Clock3 size={12}/> Prêt en {product.preparationMinutes} min</span></div>
        <div className="product-card__footer">
          <strong>{formatPrice(product.price)}</strong>
          <button disabled={unavailable} className={added ? 'is-added' : conflicts ? 'has-conflict' : ''} onClick={add} aria-label={unavailable ? `${product.name} indisponible` : conflicts ? `Changer de boutique pour ajouter ${product.name}` : `Ajouter ${product.name}`}>
            {added ? <Check size={17}/> : conflicts ? <ArrowLeftRight size={16}/> : <Plus size={17}/>} 
          </button>
        </div>
      </div>
    </article>
    {showConflict && cartVendor && <VendorSwitchDialog currentVendor={cartVendor} product={product} onCancel={() => setShowConflict(false)} onConfirm={() => { replaceWith(product); setShowConflict(false); setAdded(true) }}/>} 
  </>
}
