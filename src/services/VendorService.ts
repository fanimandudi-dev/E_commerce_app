import type { Vendor } from '../domain/models'
import type { VendorRepository } from './repositories/VendorRepository'

export class VendorService {
  constructor(private readonly repository: VendorRepository) {}

  getVendors(): Promise<Vendor[]> { return this.repository.getAll() }
  getVendor(id: string): Promise<Vendor | null> { return this.repository.getById(id) }
  getActiveVendors(): Promise<Vendor[]> {
    return this.repository.getAll().then(items => items.filter(item => item.active))
  }
}
