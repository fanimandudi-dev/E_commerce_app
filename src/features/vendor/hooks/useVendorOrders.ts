import { useCallback, useMemo, useState } from 'react'
import { useVendorStore, selectVendorOrders } from '../vendorStore'
import type { VendorOrder } from '../vendorStore'
import type { OrderStatus } from '../../../domain/models'

export interface OrderFilter {
  status: OrderStatus | 'all'
  dateRange: 'today' | 'week' | 'month' | 'all'
  search: string
  minAmount: number | null
  maxAmount: number | null
}

export interface UseVendorOrdersReturn {
  orders: VendorOrder[]
  filteredOrders: VendorOrder[]
  loading: boolean
  error: string | null
  filters: OrderFilter
  setFilters: (filters: Partial<OrderFilter>) => void
  resetFilters: () => void
  getOrderById: (id: string) => VendorOrder | null
  getOrdersByStatus: (status: OrderStatus) => VendorOrder[]
  getRecentOrders: (limit?: number) => VendorOrder[]
  getPendingOrders: () => VendorOrder[]
  getCompletedOrders: () => VendorOrder[]
  getOrdersByDate: (date: string) => VendorOrder[]
  getTodayOrders: () => VendorOrder[]
  getWeekOrders: () => VendorOrder[]
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>
  confirmPayment: (orderId: string) => Promise<void>
  getOrderStats: () => {
    total: number
    pending: number
    preparing: number
    completed: number
    cancelled: number
    totalRevenue: number
  }
}

export function useVendorOrders(): UseVendorOrdersReturn {
  const { orders, loading, error, filters, setFilters: storeSetFilters, updateOrderStatus, confirmPayment } = useVendorStore()
  
  const filteredOrders = useVendorStore(selectVendorOrders)

  // Local filters state
  const [localFilters, setLocalFilters] = useState<OrderFilter>({
    status: 'all',
    dateRange: 'all',
    search: '',
    minAmount: null,
    maxAmount: null,
  })

  // Apply local filters
  const applyFilters = useCallback((orders: VendorOrder[]) => {
    return orders.filter(order => {
      // Search filter (customer name, email, order ID)
      if (localFilters.search) {
        const searchLower = localFilters.search.toLowerCase()
        if (!order.id.toLowerCase().includes(searchLower) &&
            !order.customerName?.toLowerCase().includes(searchLower) &&
            !order.customerEmail?.toLowerCase().includes(searchLower)) {
          return false
        }
      }
      
      // Status filter
      if (localFilters.status !== 'all' && order.status !== localFilters.status) {
        return false
      }
      
      // Date range filter
      if (localFilters.dateRange !== 'all') {
        const orderDate = new Date(order.createdAt)
        const now = new Date()
        
        switch (localFilters.dateRange) {
          case 'today':
            if (orderDate.toDateString() !== now.toDateString()) {
              return false
            }
            break
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            if (orderDate < weekAgo) {
              return false
            }
            break
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            if (orderDate < monthAgo) {
              return false
            }
            break
        }
      }
      
      // Amount range filter
      if (localFilters.minAmount !== null && order.total < localFilters.minAmount) {
        return false
      }
      if (localFilters.maxAmount !== null && order.total > localFilters.maxAmount) {
        return false
      }
      
      return true
    })
  }, [localFilters])

  const filteredWithLocal = useMemo(() => {
    return applyFilters(filteredOrders)
  }, [filteredOrders, applyFilters])

  const setFilters = useCallback((newFilters: Partial<OrderFilter>) => {
    // Update store filters for status
    if (newFilters.status !== undefined) {
      storeSetFilters({ orderStatus: newFilters.status })
    }
    
    // Update local filters
    setLocalFilters((prev: OrderFilter) => ({ ...prev, ...newFilters }))
  }, [storeSetFilters])

  const resetFilters = useCallback(() => {
    storeSetFilters({ orderStatus: 'all' })
    setLocalFilters({
      status: 'all',
      dateRange: 'all',
      search: '',
      minAmount: null,
      maxAmount: null,
    })
  }, [storeSetFilters])

  const getOrderById = useCallback((id: string) => {
    return orders.find(o => o.id === id) ?? null
  }, [orders])

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter(o => o.status === status)
  }, [orders])

  const getRecentOrders = useCallback((limit: number = 10) => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }, [orders])

  const getPendingOrders = useCallback(() => {
    return orders.filter(o => o.status === 'pending')
  }, [orders])

  const getCompletedOrders = useCallback(() => {
    return orders.filter(o => o.status === 'completed')
  }, [orders])

  const getOrdersByDate = useCallback((date: string) => {
    return orders.filter(o => new Date(o.createdAt).toDateString() === new Date(date).toDateString())
  }, [orders])

  const getTodayOrders = useCallback(() => {
    const today = new Date().toDateString()
    return orders.filter(o => new Date(o.createdAt).toDateString() === today)
  }, [orders])

  const getWeekOrders = useCallback(() => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return orders.filter(o => new Date(o.createdAt) >= weekAgo)
  }, [orders])

  const getOrderStats = useCallback(() => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pending').length
    const preparing = orders.filter(o => o.status === 'preparing').length
    const completed = orders.filter(o => o.status === 'completed').length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    
    return {
      total,
      pending,
      preparing,
      completed,
      cancelled,
      totalRevenue,
    }
  }, [orders])

  const updateOrderStatusWrapper = useCallback(async (orderId: string, status: OrderStatus) => {
    await updateOrderStatus(orderId, status)
  }, [updateOrderStatus])

  const confirmPaymentWrapper = useCallback(async (orderId: string) => {
    await confirmPayment(orderId)
  }, [confirmPayment])

  return {
    orders,
    filteredOrders: filteredWithLocal,
    loading,
    error,
    filters: localFilters,
    setFilters,
    resetFilters,
    getOrderById,
    getOrdersByStatus,
    getRecentOrders,
    getPendingOrders,
    getCompletedOrders,
    getOrdersByDate,
    getTodayOrders,
    getWeekOrders,
    updateOrderStatus: updateOrderStatusWrapper,
    confirmPayment: confirmPaymentWrapper,
    getOrderStats,
  }
}

export default useVendorOrders
