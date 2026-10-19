import type { Vendor } from '../../domain/models'

export interface VendorRepository {
  getAll(): Promise<Vendor[]>
  getById(id: string): Promise<Vendor | null>
}
