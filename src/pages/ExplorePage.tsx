import { Search, ShoppingBag, Store } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { ProductCard } from '../features/products/ProductCard'
import { useProducts } from '../features/products/useProducts'
import { VendorCard } from '../features/vendors/VendorCard'
import { useVendors } from '../features/vendors/useVendors'

type ExploreView = 'vendors' | 'products'

export function ExplorePage() {
  const [params, setParams] = useSearchParams()
  const initialView = params.get('view') === 'products' ? 'products' : 'vendors'
  const [view, setView] = useState<ExploreView>(initialView)
  const [query, setQuery] = useState('')
  const { vendors, isLoading: vendorsLoading, error: vendorsError, retry: retryVendors } = useVendors()
  const { products, isLoading: productsLoading, error: productsError, retry: retryProducts } = useProducts()

  const selectView = (next: ExploreView) => {
    setView(next)
    setParams({ view: next })
  }
  const normalized = query.trim().toLowerCase()
  const filteredVendors = useMemo(() => vendors.filter(vendor => !normalized || `${vendor.name} ${vendor.specialty}`.toLowerCase().includes(normalized)), [vendors, normalized])
  const filteredProducts = useMemo(() => products.filter(product => !normalized || `${product.name} ${product.vendor.name}`.toLowerCase().includes(normalized)), [products, normalized])

  return <div className="explore-page">
    <PageHeader title="Explorer" subtitle="Trouvez une boutique ou un produit sur votre campus"/>
    <label className="search-input explore-search"><Search size={19}/><input placeholder="Rechercher une boutique ou un produit…" value={query} onChange={event => setQuery(event.target.value)}/></label>
    <div className="market-tabs" role="tablist" aria-label="Type de recherche">
      <button role="tab" aria-selected={view === 'vendors'} className={view === 'vendors' ? 'active' : ''} onClick={() => selectView('vendors')}><Store size={17}/> Boutiques</button>
      <button role="tab" aria-selected={view === 'products'} className={view === 'products' ? 'active' : ''} onClick={() => selectView('products')}><ShoppingBag size={17}/> Produits</button>
    </div>

    {view === 'vendors' && <section aria-label="Boutiques">
      <div className="catalog-summary"><span><b>{filteredVendors.length}</b> boutique{filteredVendors.length > 1 ? 's' : ''}</span><span>Campus principal</span></div>
      {vendorsLoading ? <div className="vendor-grid">{[1,2,3].map(i => <div className="vendor-skeleton" key={i}/>)}</div>
        : vendorsError ? <div className="inline-error">{vendorsError} <button onClick={retryVendors}>Réessayer</button></div>
        : filteredVendors.length === 0 ? <div className="empty-state"><span><Store size={28}/></span><h2>Aucune boutique trouvée</h2><p>Essayez un autre nom ou consultez les produits.</p></div>
        : <div className="vendor-grid">{filteredVendors.map(vendor => <VendorCard vendor={vendor} productCount={products.filter(product => product.vendor.id === vendor.id).length} key={vendor.id}/>)}</div>}
    </section>}

    {view === 'products' && <section aria-label="Produits">
      <div className="catalog-summary"><span><b>{filteredProducts.length}</b> produit{filteredProducts.length > 1 ? 's' : ''}</span><span>Toutes les boutiques</span></div>
      {productsLoading ? <div className="catalog-grid">{[1,2,3,4].map(i => <div className="product-skeleton" key={i}/>)}</div>
        : productsError ? <div className="inline-error">{productsError} <button onClick={retryProducts}>Réessayer</button></div>
        : filteredProducts.length === 0 ? <div className="empty-state"><span><ShoppingBag size={28}/></span><h2>Aucun produit trouvé</h2><p>Essayez un autre mot ou parcourez les boutiques.</p></div>
        : <div className="catalog-grid">{filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)}</div>}
    </section>}
  </div>
}
