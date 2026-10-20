export type ProductCategory = 'boissons' | 'snacks' | 'gateaux' | 'repas'
export type ProductTag = string

export interface VendorSummary {
  id: string
  name: string
  initials: string
  active: boolean
}

export interface Vendor extends VendorSummary {
  campusId: string
  description: string
  specialty: string
  image: string
  accentColor: string
  email?: string
  phone?: string
  address?: string
  createdAt?: string
}

export interface Product {
  id: string
  name: string
  shortName: string
  description: string
  price: number
  image: string
  category: ProductCategory
  preparationMinutes: number
  popular?: boolean
  available: boolean
  vendor: VendorSummary
}

export interface Category {
  id: ProductCategory
  name: string
  emoji: string
  color: string
}

export interface CampusLocation {
  id: string
  campusId: string
  label: string
  description: string
  active: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled'
export type PaymentMethod = 'cash'
export type PaymentStatus = 'pending' | 'received' | 'cancelled'

export interface Order {
  id: string
  items: CartItem[]
  vendor: VendorSummary
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  createdAt: string
  deliveryLocation: Pick<CampusLocation, 'id' | 'label'>
  deliveryInstructions?: string
  code: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'order' | 'promo' | 'payment' | 'delivery'
  time: string
  read: boolean
}

export interface User {
  id: string
  name: string
  firstName: string
  phone: string
  email: string
  faculty: string
  role: 'student' | 'seller' | 'admin'
  vendorId?: string
}
