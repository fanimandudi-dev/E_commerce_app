import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Filter
} from 'lucide-react'
import { useVendorStore, VendorProduct } from '../../features/vendor/vendorStore'
import './styles/product-list.css'

export function ProductList() {
  const { products, filteredProducts, filters, setFilters, toggleProductAvailability } = useVendorStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof VendorProduct; direction: 'asc' | 'desc' } | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all')

  const categories = [...new Set(products.map(p => p.category))]

  // Tri des produits
  const sortedProducts = [...(filteredProducts && filteredProducts.length > 0 ? filteredProducts : products)].sort((a, b) => {
    if (!sortConfig) return 0
    
    const key = sortConfig.key as keyof (typeof a)
    if (a[key] !== undefined && b[key] !== undefined) {
      if (a[key]! < b[key]!) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[key]! > b[key]!) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
    }
    return 0
  })

  // Filtrage local
  const displayedProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesAvailability = selectedAvailability === 'all' || 
      (selectedAvailability === 'available' && product.available) ||
      (selectedAvailability === 'unavailable' && !product.available)
    
    return matchesSearch && matchesCategory && matchesAvailability
  })

  const requestSort = (key: keyof VendorProduct) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIndicator = (key: keyof VendorProduct) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  const handleToggleAvailability = (productId: string) => {
    toggleProductAvailability(productId)
  }

  return (
    <div className="product-list">
      {/* Header */}
      <div className="product-list__header">
        <div className="product-list__title">
          <h2>Mes produits</h2>
          <span className="product-list__count">{products.length} produits</span>
        </div>
        
        <div className="product-list__actions">
          <div className="product-list__search">
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            className="product-list__filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="product-list__filters">
          <div className="product-filter-group">
            <label>Catégorie</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="product-filter-group">
            <label>Disponibilité</label>
            <select 
              value={selectedAvailability} 
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="available">Disponibles</option>
              <option value="unavailable">Indisponibles</option>
            </select>
          </div>
          
          <button 
            className="product-filter-reset"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedAvailability('all')
              setSearchQuery('')
            }}
          >
            Réinitialiser
          </button>
        </div>
      )}

      {/* Table */}
      <div className="product-list__table-container">
        <table className="product-list__table">
          <thead>
            <tr>
              <th className="product-list__th product-list__th--image">
                <span>Image</span>
              </th>
              <th 
                className="product-list__th product-list__th--name"
                onClick={() => requestSort('name')}
              >
                <span>Nom du produit</span>
                {getSortIndicator('name')}
              </th>
              <th 
                className="product-list__th product-list__th--category"
                onClick={() => requestSort('category')}
              >
                <span>Catégorie</span>
                {getSortIndicator('category')}
              </th>
              <th 
                className="product-list__th product-list__th--price"
                onClick={() => requestSort('price')}
              >
                <span>Prix</span>
                {getSortIndicator('price')}
              </th>
              <th 
                className="product-list__th product-list__th--stock"
                onClick={() => requestSort('stock')}
              >
                <span>Stock</span>
                {getSortIndicator('stock')}
              </th>
              <th 
                className="product-list__th product-list__th--sales"
                onClick={() => requestSort('sales')}
              >
                <span>Ventes</span>
                {getSortIndicator('sales')}
              </th>
              <th className="product-list__th product-list__th--availability">
                <span>Disponible</span>
              </th>
              <th className="product-list__th product-list__th--actions">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map(product => (
                <tr key={product.id} className="product-list__row">
                  <td className="product-list__td product-list__td--image">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-list__img"
                      />
                    ) : (
                      <div className="product-list__placeholder">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  
                  <td className="product-list__td product-list__td--name">
                    <div className="product-list__name-cell">
                      <span className="product-list__name">{product.name}</span>
                      <span className="product-list__description">{product.description.slice(0, 40)}{product.description.length > 40 ? '...' : ''}</span>
                    </div>
                  </td>
                  
                  <td className="product-list__td product-list__td--category">
                    <span className="product-list__category-badge">
                      {product.category}
                    </span>
                  </td>
                  
                  <td className="product-list__td product-list__td--price">
                    <span className="product-list__price">
                      FC {product.price.toLocaleString()}
                    </span>
                  </td>
                  
                  <td className="product-list__td product-list__td--stock">
                    <span className={`product-list__stock ${(product.stock ?? 0) <= 5 ? 'product-list__stock--low' : ''}`}>
                      {product.stock ?? 0}
                    </span>
                  </td>
                  
                  <td className="product-list__td product-list__td--sales">
                    <span className="product-list__sales">{product.sales ?? 0}</span>
                  </td>
                  
                  <td className="product-list__td product-list__td--availability">
                    <button 
                      className={`product-list__availability-toggle ${product.available ? 'product-list__availability-toggle--active' : ''}`}
                      onClick={() => handleToggleAvailability(product.id)}
                      aria-label={product.available ? 'Désactiver' : 'Activer'}
                    >
                      <span className="product-list__availability-dot" />
                      <span>{product.available ? 'Oui' : 'Non'}</span>
                    </button>
                  </td>
                  
                  <td className="product-list__td product-list__td--actions">
                    <div className="product-list__action-buttons">
                      <Link 
                        to={`/vendor/products/${product.id}`} 
                        className="product-list__action-button product-list__action-button--view"
                        aria-label="Voir"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link 
                        to={`/vendor/products/${product.id}/edit`} 
                        className="product-list__action-button product-list__action-button--edit"
                        aria-label="Modifier"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        className="product-list__action-button product-list__action-button--delete"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="product-list__empty">
                <td colSpan={8}>
                  <div className="product-list__empty-state">
                    <span>Aucun produit trouvé</span>
                    <p>Essayez de modifier vos filtres ou ajoutez un nouveau produit</p>
                    <Link to="/vendor/products/new" className="product-list__empty-action">
                      Ajouter un produit
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="product-list__footer">
        <span className="product-list__showing">
          Affichage {displayedProducts.length} sur {products.length} produits
        </span>
      </div>
    </div>
  )
}
