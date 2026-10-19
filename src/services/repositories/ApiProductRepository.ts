import type { Product, ProductCategory } from '../../domain/models'
import type { ProductRepository } from './ProductRepository'

/** Drop-in implementation for the future backend. UI and hooks do not change. */
export class ApiProductRepository implements ProductRepository {
  constructor(private readonly baseUrl = '/api') {}

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`API error ${response.status}`)
    return response.json() as Promise<T>
  }

  getAll() { return this.request<Product[]>('/products') }
  getById(id: string) { return this.request<Product | null>(`/products/${id}`) }
  getByCategory(category: ProductCategory) { return this.request<Product[]>(`/products?category=${category}`) }
  getByVendor(vendorId: string) { return this.request<Product[]>(`/products?vendorId=${vendorId}`) }
}
