import { ProductService } from '../services/ProductService'
import { VendorService } from '../services/VendorService'
import { ApiProductRepository } from '../services/repositories/ApiProductRepository'
import { ApiVendorRepository } from '../services/repositories/ApiVendorRepository'
import { MockProductRepository } from '../services/repositories/MockProductRepository'
import { MockVendorRepository } from '../services/repositories/MockVendorRepository'

const useApi = import.meta.env.VITE_DATA_SOURCE === 'api'
const apiUrl = import.meta.env.VITE_API_URL || '/api'

const productRepository = useApi
  ? new ApiProductRepository(apiUrl)
  : new MockProductRepository()

const vendorRepository = useApi
  ? new ApiVendorRepository(apiUrl)
  : new MockVendorRepository()

export const productService = new ProductService(productRepository)
export const vendorService = new VendorService(vendorRepository)
