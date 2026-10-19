import type { Product, ProductCategory } from '../../domain/models'
import { products } from '../../mocks/data'
import type { ProductRepository } from './ProductRepository'

const wait = (ms = 360) => new Promise(resolve => setTimeout(resolve, ms))

export class MockProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    await wait()
    return structuredClone(products)
  }
  async getById(id: string): Promise<Product | null> {
    await wait(220)
    return structuredClone(products.find(product => product.id === id) ?? null)
  }
  async getByCategory(category: ProductCategory): Promise<Product[]> {
    await wait()
    return structuredClone(products.filter(product => product.category === category))
  }
  async getByVendor(vendorId: string): Promise<Product[]> {
    await wait()
    return structuredClone(products.filter(product => product.vendor.id === vendorId))
  }
}
