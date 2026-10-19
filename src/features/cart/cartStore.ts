import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, VendorSummary } from '../../domain/models'

export type AddItemResult = 'added' | 'vendor-conflict' | 'unavailable'

interface CartState {
  items: CartItem[]
  vendor: VendorSummary | null
  addItem: (product: Product, quantity?: number) => AddItemResult
  replaceWith: (product: Product, quantity?: number) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  removeItem: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(persist((set, get) => ({
  items: [],
  vendor: null,
  addItem: (product, quantity = 1) => {
    if (!product.available || !product.vendor.active) return 'unavailable'
    const state = get()
    if (state.vendor && state.vendor.id !== product.vendor.id) return 'vendor-conflict'
    const found = state.items.find(item => item.product.id === product.id)
    set({
      vendor: state.vendor ?? product.vendor,
      items: found
        ? state.items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...state.items, { product, quantity }],
    })
    return 'added'
  },
  replaceWith: (product, quantity = 1) => set({
    vendor: product.vendor,
    items: [{ product, quantity }],
  }),
  increment: productId => set(state => ({
    items: state.items.map(item => item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item),
  })),
  decrement: productId => set(state => {
    const items = state.items.flatMap(item => item.product.id !== productId
      ? [item]
      : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [])
    return { items, vendor: items.length ? state.vendor : null }
  }),
  removeItem: productId => set(state => {
    const items = state.items.filter(item => item.product.id !== productId)
    return { items, vendor: items.length ? state.vendor : null }
  }),
  clear: () => set({ items: [], vendor: null }),
}), {
  name: 'food-campus-cart',
  version: 2,
  migrate: () => ({ items: [], vendor: null }),
}))

export const cartTotal = (items: CartItem[]) => items.reduce((total, item) => total + item.product.price * item.quantity, 0)
export const cartCount = (items: CartItem[]) => items.reduce((count, item) => count + item.quantity, 0)
