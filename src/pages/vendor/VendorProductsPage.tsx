import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { ProductList } from '../../components/vendor/ProductList'
import '../../components/vendor/styles/products-page.css'

export function VendorProductsPage() {
  return (
    <div className="vendor-products-page">
      <PageHeader 
        title="Mes produits" 
        subtitle="Gérez votre catalogue de produits"
        action={
          <Link to="/vendor/products/new" className="button button--primary">
            <Plus size={16} /> Nouveau produit
          </Link>
        }
      />

      <div className="vendor-products-page__content">
        <div className="vendor-products-page__list-container">
          <ProductList />
        </div>
      </div>
    </div>
  )
}

export default VendorProductsPage
