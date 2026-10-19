import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CampusLocation, CartItem, Order, VendorSummary } from '../../domain/models'
import { initialOrders } from '../../mocks/data'

interface CreateOrderInput {
  items: CartItem[]
  vendor: VendorSummary
  total: number
  deliveryLocation: CampusLocation
  deliveryInstructions?: string
}

interface OrderState {
  orders: Order[]
  lastOrderId: string | null
  createOrder: (input: CreateOrderInput) => Promise<Order>
}

export const useOrderStore = create<OrderState>()(persist((set) => ({
  orders: initialOrders,
  lastOrderId: null,
  createOrder: async ({ items, vendor, total, deliveryLocation, deliveryInstructions }) => {
    await new Promise(resolve => setTimeout(resolve, 900))
    if (!items.length || items.some(item => item.product.vendor.id !== vendor.id)) {
      throw new Error('Le panier doit contenir les produits d’une seule boutique.')
    }
    const suffix = Math.floor(100000 + Math.random() * 899999).toString()
    const order: Order = {
      id: `FC${suffix}`,
      items,
      vendor,
      total,
      status: 'pending',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      deliveryLocation: { id: deliveryLocation.id, label: deliveryLocation.label },
      deliveryInstructions: deliveryInstructions?.trim() || undefined,
      code: `FC${suffix}${Date.now().toString().slice(-3)}`,
    }
    set(state => ({ orders: [order, ...state.orders], lastOrderId: order.id }))
    return order
  },
}), {
  name: 'food-campus-orders',
  version: 2,
  migrate: () => ({ orders: initialOrders, lastOrderId: null }),
}))
