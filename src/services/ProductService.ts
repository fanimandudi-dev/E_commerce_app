import type { Product, ProductCategory } from '../domain/models'
import type { ProductRepository } from './repositories/ProductRepository'

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  getProducts(): Promise<Product[]> { return this.repository.getAll() }
  getProduct(id: string): Promise<Product | null> { return this.repository.getById(id) }
  getPopularProducts(): Promise<Product[]> {
    return this.repository.getAll().then(items => items.filter(item => item.popular && item.available))
  }
  getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.repository.getByCategory(category)
  }
  getProductsByVendor(vendorId: string): Promise<Product[]> {
    return this.repository.getByVendor(vendorId)
  }
}
