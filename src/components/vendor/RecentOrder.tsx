import { Clock, CheckCircle, XCircle, MoreVertical } from 'lucide-react'
import { VendorOrder } from '../../features/vendor/vendorStore'
import './styles/recent-order.css'

interface RecentOrderProps {
  order: VendorOrder
}

export function RecentOrder({ order }: RecentOrderProps) {
  const getStatusColor = () => {
    switch (order.status) {
      case 'completed': return 'recent-order--completed'
      case 'pending': return 'recent-order--pending'
      case 'cancelled': return 'recent-order--cancelled'
      default: return 'recent-order--pending'
    }
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'completed': return <CheckCircle size={14} />
      case 'pending': return <Clock size={14} />
      case 'cancelled': return <XCircle size={14} />
      default: return <Clock size={14} />
    }
  }

  const getStatusLabel = () => {
    switch (order.status) {
      case 'completed': return 'Complétée'
      case 'pending': return 'En attente'
      case 'cancelled': return 'Annulée'
      default: return 'En attente'
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`recent-order ${getStatusColor()}`}>
      <div className="recent-order__header">
        <div className="recent-order__info">
          <span className="recent-order__id">#{order.id.slice(0, 8)}...</span>
          <span className="recent-order__date">{formatDate(order.createdAt)}</span>
        </div>
        
        <div className="recent-order__status">
          <span className="recent-order__status-icon">
            {getStatusIcon()}
          </span>
          <span className="recent-order__status-label">{getStatusLabel()}</span>
        </div>
      </div>

      <div className="recent-order__body">
        <div className="recent-order__customer">
          <span className="recent-order__customer-name">{order.customerName ?? 'Inconnu'}</span>
          <span className="recent-order__customer-email">{order.customerEmail ?? ''}</span>
        </div>

        <div className="recent-order__items">
          {order.items.map((item, index) => (
            <div key={index} className="recent-order__item">
              <span className="recent-order__item-name">
                {item.product.name} × {item.quantity}
              </span>
              <span className="recent-order__item-price">
                FC {(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-order__footer">
        <div className="recent-order__total">
          <span>Total:</span>
          <span className="recent-order__total-amount">
            FC {order.total.toLocaleString()}
          </span>
        </div>
        
        <button className="recent-order__actions" aria-label="Plus d'actions">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  )
}
