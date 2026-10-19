import { useCallback, useEffect, useState } from 'react'
import { productService } from '../../app/dependencies'
import type { Product } from '../../domain/models'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try { setProducts(await productService.getProducts()) }
    catch { setError('Impossible de charger les produits.') }
    finally { setIsLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  return { products, isLoading, error, retry: load }
}

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!id) { setIsLoading(false); return }
    setIsLoading(true)
    productService.getProduct(id).then(setProduct).finally(() => setIsLoading(false))
  }, [id])
  return { product, isLoading }
}

export function useVendorProducts(vendorId?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!vendorId) { setIsLoading(false); return }
    setIsLoading(true); setError(null)
    productService.getProductsByVendor(vendorId)
      .then(setProducts)
      .catch(() => setError('Impossible de charger les produits de cette boutique.'))
      .finally(() => setIsLoading(false))
  }, [vendorId])

  return { products, isLoading, error }
}
