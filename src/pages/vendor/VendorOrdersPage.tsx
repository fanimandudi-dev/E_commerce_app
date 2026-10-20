import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { OrderList } from '../../components/vendor/OrderList'
import { useVendorStore, VendorOrder } from '../../features/vendor/vendorStore'
import type { OrderStatus } from '../../domain/models'

type OrderFilter = 'all' | 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'

export function VendorOrdersPage() {
  const { orders } = useVendorStore()
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = orders.filter((order: VendorOrder) => {
    const matchesStatus = filter === 'all' || order.status === filter
    const text = `${order.id} ${order.customerName || ''}`.toLowerCase()
    return matchesStatus && text.includes(query.toLowerCase())
  })

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  const statusLabels: Record<OrderFilter, string> = {
    all: 'Toutes',
    pending: 'En attente',
    preparing: 'En préparation',
    ready: 'Prête',
    completed: 'Terminée',
    cancelled: 'Annulée',
  }

  return (
    <div className="vendor-orders-page">
      <PageHeader 
        title="Commandes" 
        subtitle="Gérez les commandes de votre boutique"
      />

      <div className="vendor-orders-page__actions">
        <div className="vendor-orders-page__search">
          <Search size={16} className="vendor-orders-page__search-icon" />
          <input 
            type="text" 
            className="vendor-orders-page__search-input"
            placeholder="Rechercher une commande ou un client..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Link to="/vendor/orders/new" className="vendor-orders-page__add-button">
          Nouvelle commande
        </Link>
      </div>

      <div className="vendor-orders-page__tabs">
        {(['all', 'pending', 'preparing', 'ready', 'completed', 'cancelled'] as OrderFilter[]).map((status) => (
          <button 
            key={status} 
            className={`vendor-orders-page__tab ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {statusLabels[status]}
            <span className="vendor-orders-page__tab-count">{statusCounts[status]}</span>
          </button>
        ))}
      </div>

      <div className="vendor-orders-page__content">
        <OrderList orders={filtered} />
      </div>
    </div>
  )
}

export default VendorOrdersPage
