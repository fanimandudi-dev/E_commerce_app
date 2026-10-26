import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Search, Truck } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useVendorStore, VendorOrder } from '../../features/vendor/vendorStore'
import '../../components/vendor/styles/deliveries-page.css'

export function VendorDeliveriesPage() {
  const { orders } = useVendorStore()
  const [query, setQuery] = useState('')

  // Filtrer les commandes qui nécessitent une livraison/remise
  const deliveryOrders = orders.filter((order: VendorOrder) => 
    ['preparing', 'ready', 'out_for_delivery'].includes(order.status)
  )

  const filtered = deliveryOrders.filter((order: VendorOrder) => {
    const text = `${order.id} ${order.customerName || ''} ${order.deliveryLocation?.label || ''}`.toLowerCase()
    return text.includes(query.toLowerCase())
  })

  const statusLabels: Record<string, string> = {
    preparing: 'En préparation',
    ready: 'Prête pour remise',
    out_for_delivery: 'En route',
  }

  return (
    <div className="vendor-deliveries-page">
      <PageHeader 
        title="Livraisons et remises" 
        subtitle="Suivez les remises en cours"
      />

      <div className="vendor-deliveries-page__search">
        <Search size={16} className="vendor-deliveries-page__search-icon" />
        <input 
          type="text" 
          className="vendor-deliveries-page__search-input"
          placeholder="Rechercher une commande ou un lieu de remise..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState 
          icon={Truck} 
          title="Aucune livraison en cours" 
          text="Vos commandes prêtes pour la remise apparaîtront ici." 
          action="Voir toutes les commandes" 
          to="/vendor/orders"
        />
      ) : (
        <div className="vendor-deliveries-page__list">
          {filtered.map((order: VendorOrder) => (
            <Link 
              to={`/vendor/orders/${order.id}`} 
              key={order.id} 
              className="vendor-delivery-card"
            >
              <div className="vendor-delivery-card__header">
                <div className="vendor-delivery-card__info">
                  <span className="vendor-delivery-card__id">Commande #{order.id}</span>
                  <span className={`vendor-delivery-card__status vendor-delivery-card__status--${order.status}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
                <span className="vendor-delivery-card__time">
                  {new Date(order.createdAt).toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              
              <div className="vendor-delivery-card__body">
                <div className="vendor-delivery-card__customer">
                  <span className="vendor-delivery-card__customer-name">{order.customerName || 'Client inconnu'}</span>
                  {order.customerEmail && (
                    <span className="vendor-delivery-card__customer-phone">{order.customerEmail}</span>
                  )}
                </div>
                
                <div className="vendor-delivery-card__location">
                  <MapPin size={14} />
                  <span>{order.deliveryLocation?.label || 'Point de remise non spécifié'}</span>
                </div>
              </div>

              <div className="vendor-delivery-card__footer">
                <span className="vendor-delivery-card__items">
                  {order.items.length} produit{order.items.length > 1 ? 's' : ''}
                </span>
                <span className="vendor-delivery-card__total">
                  Total: {order.total} FC
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default VendorDeliveriesPage
