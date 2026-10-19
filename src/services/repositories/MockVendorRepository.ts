import type { Vendor } from '../../domain/models'
import { vendors } from '../../mocks/data'
import type { VendorRepository } from './VendorRepository'

const wait = (ms = 280) => new Promise(resolve => setTimeout(resolve, ms))

export class MockVendorRepository implements VendorRepository {
  async getAll(): Promise<Vendor[]> {
    await wait()
    return structuredClone(vendors)
  }

  async getById(id: string): Promise<Vendor | null> {
    await wait(180)
    return structuredClone(vendors.find(vendor => vendor.id === id) ?? null)
  }
}
