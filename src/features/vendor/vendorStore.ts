import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, Vendor, Order, CampusLocation, ProductCategory, ProductTag, OrderStatus, PaymentMethod, PaymentStatus } from '../../domain/models'

export type { Vendor, Product, Order, CampusLocation, ProductCategory, ProductTag, OrderStatus, PaymentMethod, PaymentStatus }

export type VendorProduct = Product & {
  vendorId: string
  stock?: number
  rating?: number
  tags?: ProductTag[]
  sales?: number
  createdAt?: string
  updatedAt?: string
}

export type VendorOrder = Order & {
  vendorId: string
  customerId?: string
  customerName?: string
  customerEmail?: string
  createdAt?: string
}

export interface VendorState {
  currentVendor: Vendor | null
  vendor: Vendor | null
  products: VendorProduct[]
  orders: VendorOrder[]
  selectedProduct: VendorProduct | null
  selectedOrder: VendorOrder | null
  campusLocations: CampusLocation[]
  categories: ProductCategory[]
  stats: {
    totalRevenue: number
    totalOrders: number
    popularProducts: VendorProduct[]
  }
  filters: {
    productAvailability: boolean | 'all'
    orderStatus: OrderStatus | 'all'
  }
  filteredProducts: VendorProduct[]
  loading: boolean
  error: string | null
  // Actions
  setCurrentVendor: (vendor: Vendor) => void
  setProducts: (products: VendorProduct[]) => void
  addProduct: (product: VendorProduct) => void
  updateProduct: (id: string, data: Partial<VendorProduct>) => void
  deleteProduct: (id: string) => void
  setOrders: (orders: VendorOrder[]) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  confirmPayment: (orderId: string) => void
  setSelectedProduct: (product: VendorProduct | null) => void
  setSelectedOrder: (order: VendorOrder | null) => void
  setFilters: (filters: Partial<VendorState['filters']>) => void
  toggleProductAvailability: (productId: string) => void
  updateVendor: (vendorId: string, data: Partial<Vendor>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateStats: () => void
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set, get) => {
      const getFilteredProducts = (products: VendorProduct[], filters: VendorState['filters']) => {
        if (filters.productAvailability === 'all') return products
        return products.filter(p => p.available === filters.productAvailability)
      }

      const actions = {
        setCurrentVendor: (vendor: Vendor) => set({ currentVendor: vendor, vendor: vendor }),
        setProducts: (products: VendorProduct[]) => {
          const state = get()
          set({
            products,
            categories: [...new Set(products.map(p => p.category))] as ProductCategory[],
            filteredProducts: getFilteredProducts(products, state.filters),
          })
        },
        addProduct: (product: VendorProduct) => {
          const state = get()
          const updatedProducts = [...state.products, product]
          set({
            products: updatedProducts,
            categories: [...new Set(updatedProducts.map(p => p.category))] as ProductCategory[],
            filteredProducts: getFilteredProducts(updatedProducts, state.filters),
          })
        },
        updateProduct: (id: string, data: Partial<VendorProduct>) => {
          const state = get()
          const updatedProducts = state.products.map((p) => (p.id === id ? { ...p, ...data } : p))
          set({
            products: updatedProducts,
            categories: [...new Set(updatedProducts.map(p => p.category))] as ProductCategory[],
            filteredProducts: getFilteredProducts(updatedProducts, state.filters),
          })
        },
        deleteProduct: (id: string) => {
          const state = get()
          const filteredProducts = state.products.filter((p) => p.id !== id)
          set({
            products: filteredProducts,
            categories: [...new Set(filteredProducts.map(p => p.category))] as ProductCategory[],
            filteredProducts: getFilteredProducts(filteredProducts, state.filters),
          })
        },
        setOrders: (orders: VendorOrder[]) => set({ orders }),
        updateOrderStatus: (orderId: string, status: OrderStatus) => set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        })),
        confirmPayment: (orderId: string) => set((state) => ({
          orders: state.orders.map((o) => (
            o.id === orderId ? { ...o, paymentStatus: 'received' } : o
          )),
        })),
        setSelectedProduct: (product: VendorProduct | null) => set({ selectedProduct: product }),
        setSelectedOrder: (order: VendorOrder | null) => set({ selectedOrder: order }),
        setFilters: (filters: Partial<VendorState['filters']>) => {
          const state = get()
          const newFilters = { ...state.filters, ...filters }
          set({
            filters: newFilters,
            filteredProducts: getFilteredProducts(state.products, newFilters),
          })
        },
        toggleProductAvailability: (productId: string) => {
          const state = get()
          const updatedProducts = state.products.map(p =>
            p.id === productId ? { ...p, available: !p.available } : p
          )
          set({
            products: updatedProducts,
            filteredProducts: getFilteredProducts(updatedProducts, state.filters),
          })
        },
        updateVendor: (vendorId: string, data: Partial<Vendor>) => {
          const state = get()
          const updatedVendor = state.currentVendor?.id === vendorId
            ? { ...state.currentVendor, ...data }
            : state.currentVendor
          set({
            currentVendor: updatedVendor,
            vendor: updatedVendor,
          })
        },
        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string | null) => set({ error }),
        updateStats: () => {
          const state = get()
          const totalRevenue = state.orders.reduce(
            (sum, order) => sum + order.total,
            0
          )
          const popularProducts = [...state.products]
            .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
            .slice(0, 5)
          set({
            stats: {
              totalRevenue,
              totalOrders: state.orders.length,
              popularProducts,
            },
          })
        },
      }

      return {
        currentVendor: null,
        vendor: null,
        products: [],
        orders: [],
        selectedProduct: null,
        selectedOrder: null,
        campusLocations: [],
        categories: [],
        stats: {
          totalRevenue: 0,
          totalOrders: 0,
          popularProducts: [],
        },
        filters: {
          productAvailability: 'all',
          orderStatus: 'all',
        },
        filteredProducts: [],
        loading: false,
        error: null,
        ...actions,
      }
    },
    {
      name: 'food-campus-vendor',
      version: 2,
      migrate: (persistedState: any) => ({
        ...persistedState,
        loading: false,
        error: null,
        version: 2,
        vendor: persistedState.currentVendor || null,
        categories: persistedState.categories || [],
        filteredProducts: persistedState.filteredProducts || [],
      }),
    }
  )
)

// Selector helpers
export const selectVendorProducts = (state: VendorState) => {
  const { products, filters } = state
  if (filters.productAvailability === 'all') return products
  return products.filter((p) => p.available === filters.productAvailability)
}

export const selectVendorOrders = (state: VendorState) => {
  const { orders, filters } = state
  if (filters.orderStatus === 'all') return orders
  return orders.filter((o) => o.status === filters.orderStatus)
}
