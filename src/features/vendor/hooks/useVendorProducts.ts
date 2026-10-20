import { useCallback, useMemo, useState } from 'react'
import { useVendorStore, selectVendorProducts } from '../vendorStore'
import type { VendorProduct } from '../vendorStore'
import type { ProductCategory, ProductTag } from '../../../domain/models'

export interface UseVendorProductsReturn {
  products: VendorProduct[]
  filteredProducts: VendorProduct[]
  categories: ProductCategory[]
  tags: ProductTag[]
  loading: boolean
  error: string | null
  filters: {
    category: ProductCategory | null
    search: string
    availability: boolean | 'all'
    minPrice: number | null
    maxPrice: number | null
    tags: ProductTag[]
  }
  setFilters: (filters: Partial<UseVendorProductsReturn['filters']>) => void
  resetFilters: () => void
  getProductById: (id: string) => VendorProduct | null
  getProductsByCategory: (category: ProductCategory) => VendorProduct[]
  getPopularProducts: () => VendorProduct[]
  getAvailableProducts: () => VendorProduct[]
  getProductsByTag: (tag: ProductTag) => VendorProduct[]
}

export function useVendorProducts(): UseVendorProductsReturn {
  const { products, loading, error, filters, setFilters: storeSetFilters } = useVendorStore()
  
  const filteredProducts = useVendorStore(selectVendorProducts)

  // Extract unique categories and tags from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set<ProductCategory>()
    products.forEach(p => uniqueCategories.add(p.category))
    return Array.from(uniqueCategories).sort()
  }, [products])

  const tags = useMemo(() => {
    const uniqueTags = new Set<ProductTag>()
    products.forEach(p => p.tags?.forEach(tag => uniqueTags.add(tag)))
    return Array.from(uniqueTags).sort()
  }, [products])

  // Local filters state
  const [localFilters, setLocalFilters] = useState<{
    category: ProductCategory | null
    search: string
    availability: boolean | 'all'
    minPrice: number | null
    maxPrice: number | null
    tags: ProductTag[]
  }>({
    category: null,
    search: '',
    availability: 'all',
    minPrice: null,
    maxPrice: null,
    tags: [],
  })

  // Apply all filters
  const applyFilters = useCallback((products: VendorProduct[]) => {
    return products.filter(product => {
      // Search filter
      if (localFilters.search && !product.name.toLowerCase().includes(localFilters.search.toLowerCase()) &&
          !product.description.toLowerCase().includes(localFilters.search.toLowerCase())) {
        return false
      }
      
      // Category filter
      if (localFilters.category && product.category !== localFilters.category) {
        return false
      }
      
      // Availability filter
      if (localFilters.availability !== 'all' && product.available !== localFilters.availability) {
        return false
      }
      
      // Price range filter
      if (localFilters.minPrice !== null && product.price < localFilters.minPrice) {
        return false
      }
      if (localFilters.maxPrice !== null && product.price > localFilters.maxPrice) {
        return false
      }
      
      // Tags filter
      if (localFilters.tags.length > 0 && !localFilters.tags.some(tag => product.tags?.includes(tag))) {
        return false
      }
      
      return true
    })
  }, [localFilters])

  const filteredWithLocal = useMemo(() => {
    return applyFilters(filteredProducts)
  }, [filteredProducts, applyFilters])

  const setFilters = useCallback((newFilters: Partial<UseVendorProductsReturn['filters']>) => {
    // Update store filters for availability
    if (newFilters.availability !== undefined) {
      storeSetFilters({ productAvailability: newFilters.availability })
    }
    
    // Update local filters
    setLocalFilters(prev => ({ ...prev, ...newFilters }))
  }, [storeSetFilters])

  const resetFilters = useCallback(() => {
    storeSetFilters({ productAvailability: 'all' })
    setLocalFilters({
      category: null,
      search: '',
      availability: 'all',
      minPrice: null,
      maxPrice: null,
      tags: [],
    })
  }, [storeSetFilters])

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id) ?? null
  }, [products])

  const getProductsByCategory = useCallback((category: ProductCategory) => {
    return products.filter(p => p.category === category)
  }, [products])

  const getPopularProducts = useCallback(() => {
    return [...products]
      .filter(p => p.popular)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  }, [products])

  const getAvailableProducts = useCallback(() => {
    return products.filter(p => p.available)
  }, [products])

  const getProductsByTag = useCallback((tag: ProductTag) => {
    return products.filter(p => p.tags?.includes(tag))
  }, [products])

  return {
    products,
    filteredProducts: filteredWithLocal,
    categories,
    tags,
    loading,
    error,
    filters: localFilters,
    setFilters,
    resetFilters,
    getProductById,
    getProductsByCategory,
    getPopularProducts,
    getAvailableProducts,
    getProductsByTag,
  }
}

export default useVendorProducts
