import { ProductForm } from '../../components/vendor/ProductForm'

export function ProductFormPage() {
  return <ProductForm mode="create" />
}

export function ProductEditPage() {
  return <ProductForm mode="edit" />
}

export default ProductFormPage
