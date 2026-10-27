import { ProductForm } from '../../components/vendor/ProductForm'
import './ProductFormPage.css'

export function ProductFormPage() {
  return (
    <div className="product-form-page">
      <div className="product-form-page__card">
        <ProductForm mode="create" />
      </div>
    </div>
  )
}

export function ProductEditPage() {
  return (
    <div className="product-form-page">
      <div className="product-form-page__card">
        <ProductForm mode="edit" />
      </div>
    </div>
  )
}

export default ProductFormPage
