import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { ProductList } from '../../components/vendor/ProductList'
import { useVendorStore } from '../../features/vendor/vendorStore'
import { categories } from '../../mocks/data'
import type { ProductCategory } from '../../domain/models'

export function VendorProductsPage() {
  const { products } = useVendorStore()
  const [params, setParams] = useSearchParams()
  const initial = params.get('category') as ProductCategory | null
  const [category, setCategory] = useState<ProductCategory | 'all'>(initial ?? 'all')
  const [query, setQuery] = useState('')

  const filtered = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category
    const text = `${product.name} ${product.description}`.toLowerCase()
    return matchesCategory && text.includes(query.toLowerCase())
  })

  const selectCategory = (value: ProductCategory | 'all') => {
    setCategory(value)
    value === 'all' ? setParams({}) : setParams({ category: value })
  }

  return (
    <div className="vendor-products-page">
      <PageHeader 
        title="Mes produits" 
        subtitle="Gérez votre catalogue de produits"
      />
      
      <div className="vendor-products-page__actions">
        <div className="vendor-products-page__search">
          <Search size={16} className="vendor-products-page__search-icon" />
          <input 
            type="text" 
            className="vendor-products-page__search-input"
            placeholder="Rechercher un produit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Link to="/vendor/products/new" className="vendor-products-page__add-button">
          <Plus size={16} />
          Nouveau produit
        </Link>
      </div>

      <div className="vendor-products-page__filter-tabs">
        <button 
          className={`vendor-products-page__tab ${category === 'all' ? 'active' : ''}`}
          onClick={() => selectCategory('all')}
        >
          Tout
        </button>
        {categories.map(item => (
          <button 
            key={item.id} 
            className={`vendor-products-page__tab ${category === item.id ? 'active' : ''}`}
            onClick={() => selectCategory(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="vendor-products-page__content">
        <ProductList />
      </div>
    </div>
  )
}

export default VendorProductsPage
