import { useCallback, useEffect } from 'react'
import { useVendorStore } from '../vendorStore'
import type { Vendor, Product, Order, CampusLocation, VendorSummary, OrderStatus } from '../../../domain/models'
import { VendorProduct, VendorOrder } from '../vendorStore'

// Mock vendor data for demonstration
const mockVendor: Vendor = {
  id: 'vendor_001',
  name: 'Fresh Corner',
  initials: 'FC',
  active: true,
  campusId: 'campus_001',
  description: 'Fresh and healthy meals for students',
  specialty: 'Food & Beverages',
  image: '/images/fresh-corner-logo.png',
  accentColor: '#4CAF50',
}

const mockProducts: VendorProduct[] = [
  {
    id: 'prod_001',
    vendorId: 'vendor_001',
    name: 'Vegetable Salad',
    shortName: 'Salad',
    description: 'Fresh garden salad with assorted vegetables',
    price: 3500,
    category: 'repas',
    image: '/images/salad.jpg',
    preparationMinutes: 10,
    available: true,
    vendor: { id: 'vendor_001', name: 'Fresh Corner', initials: 'FC', active: true },
    stock: 50,
    popular: true,
    rating: 4.7,
    tags: ['healthy', 'vegetarian', 'fresh'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_002',
    vendorId: 'vendor_001',
    name: 'Chicken Burger',
    shortName: 'Burger',
    description: 'Juicy chicken burger with special sauce',
    price: 5500,
    category: 'repas',
    image: '/images/burger.jpg',
    preparationMinutes: 15,
    available: true,
    vendor: { id: 'vendor_001', name: 'Fresh Corner', initials: 'FC', active: true },
    stock: 30,
    popular: true,
    rating: 4.3,
    tags: ['fast-food', 'chicken', 'spicy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_003',
    vendorId: 'vendor_001',
    name: 'Fresh Orange Juice',
    shortName: 'Juice',
    description: 'Naturally squeezed orange juice',
    price: 2500,
    category: 'boissons',
    image: '/images/juice.jpg',
    preparationMinutes: 5,
    available: true,
    vendor: { id: 'vendor_001', name: 'Fresh Corner', initials: 'FC', active: true },
    stock: 40,
    popular: false,
    rating: 4.6,
    tags: ['fresh', 'juice', 'healthy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockCampusLocations: CampusLocation[] = [
  { id: 'loc_001', campusId: 'campus_001', label: 'Bibliothèque centrale', description: 'Building B, Floor 1', active: true },
  { id: 'loc_002', campusId: 'campus_001', label: 'Faculté d\'informatique', description: 'Building C, Floor 2', active: true },
  { id: 'loc_003', campusId: 'campus_001', label: 'Entrée principale', description: 'Main Campus Entrance', active: true },
  { id: 'loc_004', campusId: 'campus_001', label: 'Résidence universitaire', description: 'Student Housing Complex', active: true },
]

const mockVendorSummary: VendorSummary = {
  id: 'vendor_001',
  name: 'Fresh Corner',
  initials: 'FC',
  active: true,
}

const mockOrders: VendorOrder[] = [
  {
    id: 'order_001',
    code: 'QR_ORDER_001',
    vendorId: 'vendor_001',
    customerId: 'student_001',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@student.edu',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[2], quantity: 1 },
    ],
    vendor: mockVendorSummary,
    total: 9500,
    status: 'completed',
    paymentMethod: 'cash',
    paymentStatus: 'received',
    deliveryLocation: { id: 'loc_001', label: 'Bibliothèque centrale' },
    deliveryInstructions: 'Please deliver to the study area',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: 'order_002',
    code: 'QR_ORDER_002',
    vendorId: 'vendor_001',
    customerId: 'student_002',
    customerName: 'Marie Martin',
    customerEmail: 'marie.martin@student.edu',
    items: [
      { product: mockProducts[1], quantity: 1 },
    ],
    vendor: mockVendorSummary,
    total: 5500,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    deliveryLocation: { id: 'loc_002', label: 'Faculté d\'informatique' },
    deliveryInstructions: '',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 'order_003',
    code: 'QR_ORDER_003',
    vendorId: 'vendor_001',
    customerId: 'student_003',
    customerName: 'Pierre Lambert',
    customerEmail: 'pierre.lambert@student.edu',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 1 },
    ],
    vendor: mockVendorSummary,
    total: 9000,
    status: 'preparing',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    deliveryLocation: { id: 'loc_003', label: 'Entrée principale' },
    deliveryInstructions: 'Urgent - please expedite',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
]

export interface UseVendorReturn {
  vendor: Vendor | null
  products: VendorProduct[]
  orders: VendorOrder[]
  campusLocations: CampusLocation[]
  loading: boolean
  error: string | null
  fetchVendor: (vendorId: string) => Promise<void>
  updateVendor: (vendorId: string, data: Partial<Vendor>) => Promise<void>
  fetchProducts: (vendorId: string) => Promise<void>
  addProduct: (product: Omit<VendorProduct, 'id' | 'vendorId' | 'createdAt' | 'updatedAt'>) => Promise<VendorProduct>
  updateProduct: (productId: string, data: Partial<VendorProduct>) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
  fetchOrders: (vendorId: string) => Promise<void>
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>
  confirmPayment: (orderId: string) => Promise<void>
  getStats: () => {
    totalRevenue: number
    totalOrders: number
    popularProducts: VendorProduct[]
  }
}

export function useVendor(): UseVendorReturn {
  const {
    currentVendor,
    products,
    orders,
    campusLocations,
    loading,
    error,
    setCurrentVendor,
    setProducts,
    addProduct: storeAddProduct,
    updateProduct: storeUpdateProduct,
    deleteProduct: storeDeleteProduct,
    setOrders,
    updateOrderStatus: storeUpdateOrderStatus,
    confirmPayment: storeConfirmPayment,
    updateVendor: storeUpdateVendor,
    setLoading,
    setError,
    updateStats,
    stats,
  } = useVendorStore()

  // Initialize with mock data
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true)
        // Simulate API calls
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        setCurrentVendor(mockVendor)
        setProducts(mockProducts)
        setOrders(mockOrders)
        setLoading(false)
        updateStats()
      } catch (err) {
        setError('Failed to initialize vendor data')
        setLoading(false)
      }
    }

    if (!currentVendor) {
      initialize()
    }
  }, [])

  const fetchVendor = useCallback(async (vendorId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const vendor = { ...mockVendor, id: vendorId }
      setCurrentVendor(vendor)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch vendor')
      setLoading(false)
    }
  }, [setCurrentVendor, setLoading, setError])

  const updateVendor = useCallback(async (vendorId: string, data: Partial<Vendor>) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      storeUpdateVendor(vendorId, data)
      setLoading(false)
    } catch (err) {
      setError('Failed to update vendor')
      setLoading(false)
    }
  }, [storeUpdateVendor, setLoading, setError])

  const fetchProducts = useCallback(async (vendorId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const vendorProducts = mockProducts.map(p => ({ ...p, vendorId }))
      setProducts(vendorProducts)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch products')
      setLoading(false)
    }
  }, [setProducts, setLoading, setError])

  const addProduct = useCallback(async (productData: Omit<VendorProduct, 'id' | 'vendorId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const vendor = useVendorStore.getState().currentVendor
      if (!vendor) {
        throw new Error('No vendor selected')
      }
      
      const newProduct: VendorProduct = {
        ...productData,
        id: `prod_${Date.now()}`,
        vendorId: vendor.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      storeAddProduct(newProduct)
      setLoading(false)
      return newProduct
    } catch (err) {
      setError('Failed to add product')
      setLoading(false)
      throw err
    }
  }, [storeAddProduct, setLoading, setError])

  const updateProduct = useCallback(async (productId: string, data: Partial<VendorProduct>) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      storeUpdateProduct(productId, {
        ...data,
        updatedAt: new Date().toISOString(),
      })
      setLoading(false)
    } catch (err) {
      setError('Failed to update product')
      setLoading(false)
    }
  }, [storeUpdateProduct, setLoading, setError])

  const deleteProduct = useCallback(async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      storeDeleteProduct(productId)
      setLoading(false)
    } catch (err) {
      setError('Failed to delete product')
      setLoading(false)
    }
  }, [storeDeleteProduct, setLoading, setError])

  const fetchOrders = useCallback(async (vendorId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const vendorOrders = mockOrders.map(o => ({ ...o, vendorId }))
      setOrders(vendorOrders)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch orders')
      setLoading(false)
    }
  }, [setOrders, setLoading, setError])

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      storeUpdateOrderStatus(orderId, status)
      setLoading(false)
    } catch (err) {
      setError('Failed to update order status')
      setLoading(false)
    }
  }, [storeUpdateOrderStatus, setLoading, setError])

  const confirmPayment = useCallback(async (orderId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      storeConfirmPayment(orderId)
      setLoading(false)
    } catch (err) {
      setError('Failed to confirm payment')
      setLoading(false)
    }
  }, [storeConfirmPayment, setLoading, setError])

  const getStats = useCallback(() => {
    return stats
  }, [stats])

  return {
    vendor: currentVendor,
    products,
    orders,
    campusLocations: campusLocations.length > 0 ? campusLocations : mockCampusLocations,
    loading,
    error,
    fetchVendor,
    updateVendor,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchOrders,
    updateOrderStatus,
    confirmPayment,
    getStats,
  }
}

export default useVendor
