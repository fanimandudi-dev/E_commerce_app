import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  User,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Printer
} from 'lucide-react'
import { useVendorStore, VendorOrder } from '../../features/vendor/vendorStore'
import type { OrderStatus, PaymentStatus } from '../../domain/models'
import './styles/order-detail.css'

export function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { orders, updateOrderStatus } = useVendorStore()
  
  const [order, setOrder] = useState<VendorOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (id && orders.length > 0) {
      const foundOrder = orders.find(o => o.id === id)
      if (foundOrder) {
        setOrder(foundOrder)
      }
      setIsLoading(false)
    }
  }, [id, orders])

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { bg: 'var(--warning-light)', color: 'var(--warning)' }
      case 'preparing':
        return { bg: 'var(--info-light)', color: 'var(--info)' }
      case 'ready':
        return { bg: 'var(--primary-light)', color: 'var(--primary)' }
      case 'out_for_delivery':
      case 'completed':
        return { bg: 'var(--success-light)', color: 'var(--success)' }
      case 'cancelled':
        return { bg: 'var(--danger-light)', color: 'var(--danger)' }
      default:
        return { bg: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'preparing':
        return <Package size={16} />
      case 'ready':
      case 'out_for_delivery':
      case 'completed':
        return <CheckCircle size={16} />
      case 'cancelled':
        return <XCircle size={16} />
      default:
        return <AlertCircle size={16} />
    }
  }

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return { bg: 'var(--warning-light)', color: 'var(--warning)' }
      case 'received':
        return { bg: 'var(--success-light)', color: 'var(--success)' }
      case 'cancelled':
        return { bg: 'var(--danger-light)', color: 'var(--danger)' }
      default:
        return { bg: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
    }
  }

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order || !id) return
    
    setIsUpdating(true)
    setShowStatusMenu(false)
    
    try {
      await updateOrderStatus(id, newStatus)
      setOrder({ ...order, status: newStatus })
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getTotalAmount = () => {
    if (!order) return 0
    return order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="order-detail">
        <div className="order-detail__loading">
          <div className="order-detail__spinner" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-detail">
        <div className="order-detail__not-found">
          <h2>Commande non trouvée</h2>
          <p>La commande que vous cherchez n'existe pas ou a été supprimée.</p>
          <Link to="/vendor/orders" className="order-detail__back-link">
            Retour à la liste des commandes
          </Link>
        </div>
      </div>
    )
  }

  const statusColor = getStatusColor(order.status)
  const paymentColor = getPaymentStatusColor(order.paymentStatus)

  return (
    <div className="order-detail">
      {/* Header */}
      <div className="order-detail__header">
        <Link to="/vendor/orders" className="order-detail__back-button">
          <ArrowLeft size={20} />
          <span>Retour aux commandes</span>
        </Link>
        
        <div className="order-detail__header-actions">
          <button className="order-detail__action-button">
            <Printer size={18} />
            <span>Imprimer</span>
          </button>
          
          <div className="order-detail__status-dropdown">
            <button 
              className="order-detail__status-button"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              disabled={isUpdating}
            >
              {getStatusIcon(order.status)}
              <span>{order.status}</span>
              <MoreVertical size={16} />
            </button>
            
            {showStatusMenu && (
              <div className="order-detail__status-menu">
                {(['pending', 'preparing', 'ready', 'out_for_delivery'] as OrderStatus[]).map(status => (
                  <button 
                    key={status}
                    className="order-detail__status-option"
                    onClick={() => handleStatusChange(status)}
                    disabled={isUpdating}
                  >
                    {status === 'pending' && <Clock size={16} />}
                    {status === 'preparing' && <Package size={16} />}
                    {status === 'ready' && <CheckCircle size={16} />}
                    {status === 'out_for_delivery' && <CheckCircle size={16} />}
                    <span>{status}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="order-detail__content">
        {/* Order Header */}
        <div className="order-detail__order-header">
          <div className="order-detail__order-id">
            <span className="order-detail__order-id-label">Commande</span>
            <span className="order-detail__order-id-value">#{order.id}</span>
          </div>
          
          <div className="order-detail__status-badge" style={statusColor}>
            {getStatusIcon(order.status)}
            <span>{order.status}</span>
          </div>
        </div>

        {/* Order Info Grid */}
        <div className="order-detail__info-grid">
          <div className="order-detail__info-card">
            <h3 className="order-detail__info-title">
              <Calendar size={18} />
              Dates
            </h3>
            <div className="order-detail__info-content">
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Créée le</span>
                <span className="order-detail__info-value">{formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="order-detail__info-card">
            <h3 className="order-detail__info-title">
              <User size={18} />
              Client
            </h3>
            <div className="order-detail__info-content">
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Nom</span>
                <span className="order-detail__info-value">{order.customerName || 'Non spécifié'}</span>
              </div>
            </div>
          </div>

          <div className="order-detail__info-card">
            <h3 className="order-detail__info-title">
              <MapPin size={18} />
              Livraison
            </h3>
            <div className="order-detail__info-content">
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Lieu</span>
                <span className="order-detail__info-value">{order.deliveryLocation?.label || 'Non spécifié'}</span>
              </div>
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Instructions</span>
                <span className="order-detail__info-value">
                  {order.deliveryInstructions || 'Aucune'}
                </span>
              </div>
            </div>
          </div>

          <div className="order-detail__info-card">
            <h3 className="order-detail__info-title">
              <DollarSign size={18} />
              Paiement
            </h3>
            <div className="order-detail__info-content">
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Méthode</span>
                <span className="order-detail__info-value">{order.paymentMethod}</span>
              </div>
              <div className="order-detail__info-item">
                <span className="order-detail__info-label">Statut</span>
                <div className="order-detail__payment-status" style={paymentColor}>
                  {order.paymentStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="order-detail__items-section">
          <h3 className="order-detail__items-title">
            <Package size={20} />
            Produits ({order.items.length})
          </h3>
          
          <div className="order-detail__items-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-detail__item">
                <div className="order-detail__item-image">
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.name} />
                  ) : (
                    <div className="order-detail__item-image-placeholder">
                      {item.product.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="order-detail__item-info">
                  <h4 className="order-detail__item-name">{item.product.name}</h4>
                  <p className="order-detail__item-description">{item.product.description}</p>
                  <div className="order-detail__item-meta">
                    <span className="order-detail__item-price">FC {item.product.price.toLocaleString()}</span>
                    <span className="order-detail__item-quantity">x {item.quantity}</span>
                  </div>
                </div>
                
                <div className="order-detail__item-total">
                  FC {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="order-detail__summary">
            <div className="order-detail__summary-row">
              <span>Sous-total</span>
              <span>FC {getTotalAmount().toLocaleString()}</span>
            </div>
            <div className="order-detail__summary-row">
              <span>Livraison</span>
              <span>FC 0</span>
            </div>
            <div className="order-detail__summary-row order-detail__summary-row--total">
              <span>Total</span>
              <span>FC {getTotalAmount().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isUpdating && (
        <div className="order-detail__updating-overlay">
          <div className="order-detail__updating">
            <div className="order-detail__updating-spinner" />
            <span>Mise à jour...</span>
          </div>
        </div>
      )}
    </div>
  )
}
