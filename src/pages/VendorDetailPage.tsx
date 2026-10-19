import { ArrowLeft, Search, ShoppingBag, Store } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { ProductCategory } from '../domain/models'
import { ProductCard } from '../features/products/ProductCard'
import { useVendorProducts } from '../features/products/useProducts'
import { useCartStore } from '../features/cart/cartStore'
import { useVendor } from '../features/vendors/useVendors'
import { categories } from '../mocks/data'

export function VendorDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vendor, isLoading: vendorLoading } = useVendor(id)
  const { products, isLoading, error } = useVendorProducts(id)
  const cartVendor = useCartStore(state => state.vendor)
  const itemCount = useCartStore(state => state.items.reduce((count, item) => count + item.quantity, 0))
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const filtered = useMemo(() => products.filter(product => (category === 'all' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())), [products, category, query])

  if (vendorLoading) return <div className="vendor-store-loading"><div/><div/></div>
  if (!vendor) return <div className="empty-state"><span><Store size={28}/></span><h2>Boutique introuvable</h2><p>Cette boutique n’est plus disponible.</p><Link to="/explore" className="button button--primary">Voir les boutiques</Link></div>

  return <div className="vendor-store">
    <section className="vendor-store__hero" style={{ background: vendor.accentColor }}>
      <button className="detail-back" onClick={() => navigate(-1)} aria-label="Retour"><ArrowLeft size={21}/></button>
      <img src={vendor.image} alt=""/>
      <div className="vendor-store__overlay"/>
      <div className="vendor-store__identity"><div className="vendor-avatar vendor-avatar--large">{vendor.initials}</div><div><span className={`vendor-status ${vendor.active ? 'is-active' : ''}`}>{vendor.active ? 'Disponible' : 'Indisponible'}</span><h1>{vendor.name}</h1><p>{vendor.specialty}</p></div></div>
    </section>
    <div className="vendor-store__content">
      <p className="vendor-store__description">{vendor.description}</p>
      {cartVendor && <div className={`store-cart-context ${cartVendor.id === vendor.id ? 'is-current' : ''}`}><ShoppingBag size={19}/><span>{cartVendor.id === vendor.id ? <><b>Votre panier dans cette boutique</b><small>{itemCount} article{itemCount > 1 ? 's' : ''} · Continuez votre sélection</small></> : <><b>Panier en cours chez {cartVendor.name}</b><small>Un changement vous sera demandé avant tout ajout.</small></>}</span>{cartVendor.id === vendor.id && <Link to="/cart">Voir</Link>}</div>}
      {!vendor.active && <div className="store-unavailable-note">Cette boutique est actuellement indisponible. Vous pouvez consulter ses produits, mais pas les commander.</div>}
      <div className="catalog-tools"><label className="search-input"><Search size={19}/><input placeholder={`Rechercher chez ${vendor.name}…`} value={query} onChange={event => setQuery(event.target.value)}/></label></div>
      <div className="filter-tabs"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>Tout</button>{categories.filter(item => products.some(product => product.category === item.id)).map(item => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div>
      <div className="catalog-summary"><span><b>{filtered.length}</b> produit{filtered.length > 1 ? 's' : ''}</span><span>{vendor.name}</span></div>
      {isLoading ? <div className="catalog-grid">{[1,2,3].map(i => <div className="product-skeleton" key={i}/>)}</div> : error ? <div className="inline-error">{error}</div> : filtered.length === 0 ? <div className="empty-state"><span><ShoppingBag size={28}/></span><h2>Aucun produit trouvé</h2><p>Essayez une autre catégorie ou un autre terme.</p></div> : <div className="catalog-grid">{filtered.map(product => <ProductCard product={product} key={product.id}/>)}</div>}
    </div>
  </div>
}
