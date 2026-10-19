import { Search, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { ProductCard } from '../features/products/ProductCard'
import { useProducts } from '../features/products/useProducts'
import { categories } from '../mocks/data'
import type { ProductCategory } from '../domain/models'

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('category') as ProductCategory | null
  const [category, setCategory] = useState<ProductCategory | 'all'>(initial ?? 'all')
  const [query, setQuery] = useState('')
  const { products, isLoading, error, retry } = useProducts()
  const filtered = useMemo(() => products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category
    const text = `${product.name} ${product.vendor.name}`.toLowerCase()
    return matchesCategory && text.includes(query.toLowerCase())
  }), [products, category, query])
  const selectCategory = (value: ProductCategory | 'all') => { setCategory(value); value === 'all' ? setParams({}) : setParams({ category: value }) }

  return <div className="products-page">
    <PageHeader title="Tous les produits" subtitle="Chaque produit appartient à une boutique du campus" back/>
    <div className="catalog-tools"><label className="search-input"><Search size={19}/><input placeholder="Rechercher un produit ou une boutique…" value={query} onChange={event => setQuery(event.target.value)}/></label></div>
    <div className="filter-tabs"><button className={category === 'all' ? 'active' : ''} onClick={() => selectCategory('all')}>Tout</button>{categories.map(item => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => selectCategory(item.id)}>{item.name}</button>)}</div>
    <div className="catalog-summary"><span><b>{filtered.length}</b> produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</span><span>Toutes les boutiques</span></div>
    {isLoading ? <div className="catalog-grid">{[1,2,3,4].map(i => <div className="product-skeleton" key={i}/>)}</div> : error ? <div className="empty-state"><h2>Une erreur est survenue</h2><p>{error}</p><button className="button button--primary" onClick={retry}>Réessayer</button></div> : filtered.length === 0 ? <div className="empty-state"><span><ShoppingBag size={28}/></span><h2>Aucun produit trouvé</h2><p>Essayez un autre mot ou une autre catégorie.</p></div> : <div className="catalog-grid">{filtered.map(product => <ProductCard key={product.id} product={product}/>)}</div>}
  </div>
}
