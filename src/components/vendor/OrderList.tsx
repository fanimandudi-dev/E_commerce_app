import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Filter
} from 'lucide-react'
import { useVendorStore, VendorOrder } from '../../features/vendor/vendorStore'
import './styles/order-list.css'

export interface OrderListProps {
  orders?: VendorOrder[]
}

export function OrderList({ orders: externalOrders }: OrderListProps) {
  const { orders: storeOrders } = useVendorStore()
  const displayOrders = externalOrders || storeOrders
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof VendorOrder; direction: 'asc' | 'desc' } | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Tri des commandes
  const sortedOrders = [...displayOrders].sort((a, b) => {
    if (!sortConfig) return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    
    const key = sortConfig.key as keyof (typeof a)
    if (a[key] !== undefined && b[key] !== undefined) {
      if (a[key]! < b[key]!) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[key]! > b[key]!) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
    }
    return 0
  })

  // Filtrage local
  const displayedOrders = sortedOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendor?.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const requestSort = (key: keyof VendorOrder) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIndicator = (key: keyof VendorOrder) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    preparing: 'En préparation',
    ready: 'Prête',
    out_for_delivery: 'En route',
    completed: 'Terminée',
    cancelled: 'Annulée'
  }

  const statusClasses: Record<string, string> = {
    pending: 'waiting',
    preparing: 'preparing',
    ready: 'confirmed',
    out_for_delivery: 'delivering',
    completed: 'delivered',
    cancelled: 'cancelled'
  }

  const formatPrice = (amount: number) => {
    return `FC ${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="vendor-order-list">
      {/* Header */}
      <div className="vendor-order-list__header">
        <div className="vendor-order-list__title">
          <h2>Liste des commandes</h2>
          <span className="vendor-order-list__count">{displayOrders.length} commandes</span>
        </div>
        
        <div className="vendor-order-list__actions">
          <div className="vendor-order-list__search">
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="vendor-order-list__filter">
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="vendor-order-list__filter-select"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="preparing">En préparation</option>
              <option value="ready">Prête</option>
              <option value="out_for_delivery">En route</option>
              <option value="completed">Terminée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
          
          <Link to="/vendor/orders/new" className="vendor-order-list__add-button">
            Nouvelle commande
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="vendor-order-list__table-container">
        <table className="vendor-order-list__table">
          <thead>
            <tr>
              <th 
                className="vendor-order-list__th vendor-order-list__th--id"
                onClick={() => requestSort('id')}
              >
                <span>N° Commande</span>
                {getSortIndicator('id')}
              </th>
              <th 
                className="vendor-order-list__th vendor-order-list__th--date"
                onClick={() => requestSort('createdAt')}
              >
                <span>Date</span>
                {getSortIndicator('createdAt')}
              </th>
              <th className="vendor-order-list__th vendor-order-list__th--customer">
                <span>Client</span>
              </th>
              <th className="vendor-order-list__th vendor-order-list__th--items">
                <span>Produits</span>
              </th>
              <th 
                className="vendor-order-list__th vendor-order-list__th--total"
                onClick={() => requestSort('total')}
              >
                <span>Total</span>
                {getSortIndicator('total')}
              </th>
              <th 
                className="vendor-order-list__th vendor-order-list__th--status"
                onClick={() => requestSort('status')}
              >
                <span>Statut</span>
                {getSortIndicator('status')}
              </th>
              <th className="vendor-order-list__th vendor-order-list__th--actions">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map(order => (
                <tr key={order.id} className="vendor-order-list__row">
                  <td className="vendor-order-list__td vendor-order-list__td--id">
                    <span className="vendor-order-list__id">#{order.id}</span>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--date">
                    <span>{formatDate(order.createdAt || '')}</span>
                    <small>{new Date(order.createdAt || '').toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</small>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--customer">
                    <div className="vendor-order-list__customer">
                      <span className="vendor-order-list__customer-name">{order.customerName || 'Client inconnu'}</span>
                      {order.customerEmail && (
                        <span className="vendor-order-list__customer-email">{order.customerEmail}</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--items">
                    <span className="vendor-order-list__items-count">{order.items.length} produit{order.items.length > 1 ? 's' : ''}</span>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--total">
                    <span className="vendor-order-list__total">{formatPrice(order.total)}</span>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--status">
                    <span className={`vendor-order-list__status vendor-order-list__status--${statusClasses[order.status] || 'waiting'}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  
                  <td className="vendor-order-list__td vendor-order-list__td--actions">
                    <div className="vendor-order-list__action-buttons">
                      <Link 
                        to={`/vendor/orders/${order.id}`} 
                        className="vendor-order-list__action-button vendor-order-list__action-button--view"
                        aria-label="Voir"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link 
                        to={`/vendor/orders/${order.id}/edit`} 
                        className="vendor-order-list__action-button vendor-order-list__action-button--edit"
                        aria-label="Modifier"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        className="vendor-order-list__action-button vendor-order-list__action-button--delete"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="vendor-order-list__empty">
                <td colSpan={7}>
                  <div className="vendor-order-list__empty-state">
                    <span>Aucune commande trouvée</span>
                    <p>Essayez de modifier vos filtres ou attendez de nouvelles commandes</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="vendor-order-list__footer">
        <span className="vendor-order-list__showing">
          Affichage {displayedOrders.length} sur {displayOrders.length} commandes
        </span>
      </div>
    </div>
  )
}
