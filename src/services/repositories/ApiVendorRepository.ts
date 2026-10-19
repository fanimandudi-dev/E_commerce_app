import type { Vendor } from '../../domain/models'
import type { VendorRepository } from './VendorRepository'

/** Drop-in implementation for the future backend. */
export class ApiVendorRepository implements VendorRepository {
  constructor(private readonly baseUrl = '/api') {}

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`API error ${response.status}`)
    return response.json() as Promise<T>
  }

  getAll() { return this.request<Vendor[]>('/vendors') }
  getById(id: string) { return this.request<Vendor | null>(`/vendors/${id}`) }
}
