import type { Product, ProductCategory } from '../../domain/models'

export interface ProductRepository {
  getAll(): Promise<Product[]>
  getById(id: string): Promise<Product | null>
  getByCategory(category: ProductCategory): Promise<Product[]>
  getByVendor(vendorId: string): Promise<Product[]>
}
