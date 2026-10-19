import { useCallback, useEffect, useState } from 'react'
import { vendorService } from '../../app/dependencies'
import type { Vendor } from '../../domain/models'

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try { setVendors(await vendorService.getVendors()) }
    catch { setError('Impossible de charger les boutiques.') }
    finally { setIsLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  return { vendors, isLoading, error, retry: load }
}

export function useVendor(id?: string) {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) { setIsLoading(false); return }
    setIsLoading(true)
    vendorService.getVendor(id).then(setVendor).finally(() => setIsLoading(false))
  }, [id])

  return { vendor, isLoading }
}
