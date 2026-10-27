import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { ProductList } from '../../components/vendor/ProductList'
import './VendorProductsPage.css'

export function VendorProductsPage() {
  return (
    <div className="vendor-products-page">
      <div className="vendor-products-page__content">
        <div className="vendor-products-page__card">
          <div className="vendor-products-page__actions-bar">
            <div className="vendor-products-page__actions-left">
              <div className="vendor-products-page__search-container">
                <Search size={18} className="vendor-products-page__search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="vendor-products-page__search-input"
                />
              </div>
              <button className="vendor-products-page__filter-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>Filtres</span>
              </button>
            </div>
            <div className="vendor-products-page__actions-right">
              <Link to="/vendor/products/new" className="vendor-products-page__add-btn">
                <Plus size={18} />
                <span>Nouveau produit</span>
              </Link>
            </div>
          </div>
          
          <div className="vendor-products-page__list-container">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorProductsPage
