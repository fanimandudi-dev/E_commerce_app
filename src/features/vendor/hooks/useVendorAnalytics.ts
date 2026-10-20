import { useCallback, useMemo } from 'react'
import { useVendorStore } from '../vendorStore'
import type { VendorOrder, VendorProduct } from '../vendorStore'

export interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  averageOrderValue: number
  popularProducts: VendorProduct[]
  revenueByDay: { date: string; revenue: number }[]
  ordersByDay: { date: string; count: number }[]
  revenueByProduct: { productId: string; productName: string; revenue: number }[]
  topCustomers: { customerId: string; customerName: string; totalSpent: number; orderCount: number }[]
  statusDistribution: { status: string; count: number }[]
  paymentStatusDistribution: { status: string; count: number }[]
}

export interface AnalyticsFilter {
  period: 'day' | 'week' | 'month' | 'year' | 'custom'
  startDate: string | null
  endDate: string | null
}

export interface UseVendorAnalyticsReturn {
  analytics: AnalyticsData
  loading: boolean
  error: string | null
  filters: AnalyticsFilter
  setFilters: (filters: Partial<AnalyticsFilter>) => void
  getRevenueOverTime: (days?: number) => { date: string; revenue: number }[]
  getOrdersOverTime: (days?: number) => { date: string; count: number }[]
  getProductPerformance: () => { product: VendorProduct; quantity: number; revenue: number }[]
  getCustomerStats: () => { customerName: string; totalSpent: number; orderCount: number }[]
  getSalesByCategory: () => { category: string; revenue: number; count: number }[]
  getHourlySales: () => { hour: number; count: number }[]
}

export function useVendorAnalytics(): UseVendorAnalyticsReturn {
  const { orders, products, loading, error } = useVendorStore()

  const [filters, setFilters] = useMemo(() => {
    const initialFilters: AnalyticsFilter = {
      period: 'month',
      startDate: null,
      endDate: null,
    }
    return [initialFilters, (newFilters: Partial<AnalyticsFilter>) => {}] as const
  }, [])

  // Calculate analytics data
  const analytics = useMemo((): AnalyticsData => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const totalProducts = products.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Popular products (by quantity sold)
    const productSales = new Map<string, { product: VendorProduct; quantity: number; revenue: number }>()
    products.forEach(product => {
      productSales.set(product.id, { product, quantity: 0, revenue: 0 })
    })
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = productSales.get(item.product.id)
        if (existing) {
          existing.quantity += item.quantity
          existing.revenue += item.product.price * item.quantity
        }
      })
    })
    
    const popularProducts = Array.from(productSales.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(v => v.product)

    // Revenue by day
    const revenueByDayMap = new Map<string, number>()
    orders.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      revenueByDayMap.set(date, (revenueByDayMap.get(date) || 0) + order.total)
    })
    
    const revenueByDay = Array.from(revenueByDayMap.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Orders by day
    const ordersByDayMap = new Map<string, number>()
    orders.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      ordersByDayMap.set(date, (ordersByDayMap.get(date) || 0) + 1)
    })
    
    const ordersByDay = Array.from(ordersByDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Revenue by product
    const revenueByProduct = Array.from(productSales.values())
      .filter(v => v.revenue > 0)
      .map(v => ({
        productId: v.product.id,
        productName: v.product.name,
        revenue: v.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)

    // Top customers
    const customerStats = new Map<string, { customerName: string; totalSpent: number; orderCount: number }>()
    orders.forEach(order => {
      const customerId = order.customerId || order.customerEmail || 'unknown'
      const existing = customerStats.get(customerId)
      if (existing) {
        existing.totalSpent += order.total
        existing.orderCount += 1
      } else {
        customerStats.set(customerId, {
          customerName: order.customerName || 'Unknown',
          totalSpent: order.total,
          orderCount: 1,
        })
      }
    })
    
    const topCustomers = Array.from(customerStats.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5)
      .map(c => ({
        customerId: c.customerName,
        customerName: c.customerName,
        totalSpent: c.totalSpent,
        orderCount: c.orderCount,
      }))

    // Status distribution
    const statusDistributionMap = new Map<string, number>()
    orders.forEach(order => {
      statusDistributionMap.set(order.status, (statusDistributionMap.get(order.status) || 0) + 1)
    })
    
    const statusDistribution = Array.from(statusDistributionMap.entries())
      .map(([status, count]) => ({ status, count }))

    // Payment status distribution
    const paymentStatusDistributionMap = new Map<string, number>()
    orders.forEach(order => {
      paymentStatusDistributionMap.set(
        order.paymentStatus || 'unknown',
        (paymentStatusDistributionMap.get(order.paymentStatus || 'unknown') || 0) + 1
      )
    })
    
    const paymentStatusDistribution = Array.from(paymentStatusDistributionMap.entries())
      .map(([status, count]) => ({ status, count }))

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      averageOrderValue,
      popularProducts,
      revenueByDay,
      ordersByDay,
      revenueByProduct,
      topCustomers,
      statusDistribution,
      paymentStatusDistribution,
    }
  }, [orders, products])

  const getRevenueOverTime = useCallback((days: number = 30) => {
    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    
    const dailyRevenue = new Map<string, number>()
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt)
      if (orderDate >= startDate) {
        const date = orderDate.toISOString().split('T')[0]
        dailyRevenue.set(date, (dailyRevenue.get(date) || 0) + order.total)
      }
    })
    
    const result: { date: string; revenue: number }[] = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      result.push({
        date: dateStr,
        revenue: dailyRevenue.get(dateStr) || 0,
      })
    }
    
    return result
  }, [orders])

  const getOrdersOverTime = useCallback((days: number = 30) => {
    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    
    const dailyOrders = new Map<string, number>()
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt)
      if (orderDate >= startDate) {
        const date = orderDate.toISOString().split('T')[0]
        dailyOrders.set(date, (dailyOrders.get(date) || 0) + 1)
      }
    })
    
    const result: { date: string; count: number }[] = []
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      result.push({
        date: dateStr,
        count: dailyOrders.get(dateStr) || 0,
      })
    }
    
    return result
  }, [orders])

  const getProductPerformance = useCallback(() => {
    const productPerformance = products.map(product => {
      let quantity = 0
      let revenue = 0
      
      orders.forEach(order => {
        order.items.forEach(item => {
          if (item.product.id === product.id) {
            quantity += item.quantity
            revenue += item.product.price * item.quantity
          }
        })
      })
      
      return { product, quantity, revenue }
    })
    
    return productPerformance.sort((a, b) => b.revenue - a.revenue)
  }, [products, orders])

  const getCustomerStats = useCallback(() => {
    const customerStatsMap = new Map<string, { customerName: string; totalSpent: number; orderCount: number }>()
    
    orders.forEach(order => {
      const key = order.customerId || order.customerEmail || 'unknown'
      const existing = customerStatsMap.get(key)
      
      if (existing) {
        existing.totalSpent += order.total
        existing.orderCount += 1
      } else {
        customerStatsMap.set(key, {
          customerName: order.customerName || 'Unknown',
          totalSpent: order.total,
          orderCount: 1,
        })
      }
    })
    
    return Array.from(customerStatsMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
  }, [orders])

  const getSalesByCategory = useCallback(() => {
    const categoryStats = new Map<string, { revenue: number; count: number }>()
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const product = products.find(p => p.id === item.product.id)
        if (product) {
          const existing = categoryStats.get(product.category)
          if (existing) {
            existing.revenue += item.product.price * item.quantity
            existing.count += item.quantity
          } else {
            categoryStats.set(product.category, {
              revenue: item.product.price * item.quantity,
              count: item.quantity,
            })
          }
        }
      })
    })
    
    return Array.from(categoryStats.entries())
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
  }, [orders, products])

  const getHourlySales = useCallback(() => {
    const hourlyCount = new Array(24).fill(0)
    
    orders.forEach(order => {
      const hour = new Date(order.createdAt).getHours()
      hourlyCount[hour] = (hourlyCount[hour] || 0) + 1
    })
    
    return hourlyCount.map((count, hour) => ({ hour, count }))
  }, [orders])

  return {
    analytics,
    loading,
    error,
    filters,
    setFilters,
    getRevenueOverTime,
    getOrdersOverTime,
    getProductPerformance,
    getCustomerStats,
    getSalesByCategory,
    getHourlySales,
  }
}

export default useVendorAnalytics
