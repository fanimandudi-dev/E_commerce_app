import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react'
import { useVendorStore } from '../../features/vendor/vendorStore'
import { useAuthStore } from '../../features/auth/authStore'
import { StatCard } from '../../components/vendor/StatCard'
import { RecentOrder } from '../../components/vendor/RecentOrder'
import { ProductPerformance } from '../../components/vendor/ProductPerformance'
import '../vendor/styles/vendor-dashboard.css'

export function VendorDashboard() {
  const { stats, orders, products } = useVendorStore()
  const user = useAuthStore(state => state.user)

  // Calculer les pourcentages
  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length
  const totalOrders = pendingOrders + completedOrders + cancelledOrders
  const completionRate = getPercentage(completedOrders, totalOrders)

  return (
    <div className="vendor-dashboard">
      {/* Header Section */}
      <div className="vendor-dashboard__header">
        <div className="vendor-dashboard__welcome">
          <h2>Bonjour, {user?.firstName ?? 'Vendeur'} !</h2>
          <p>Voici l'état de votre boutique aujourd'hui</p>
        </div>
        <Link to="/vendor/analytics" className="vendor-dashboard__view-all">
          Voir toutes les statistiques
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="vendor-dashboard__stats">
        <StatCard
          icon={<DollarSign size={20} />}
          title="Chiffre d'affaires"
          value={`FC ${stats.totalRevenue.toLocaleString()}`}
          change={0}
          changeType="positive"
          color="green"
        />
        
        <StatCard
          icon={<ShoppingCart size={20} />}
          title="Commandes"
          value={totalOrders.toString()}
          change={0}
          changeType="positive"
          color="blue"
        />
        
        <StatCard
          icon={<Package size={20} />}
          title="Produits"
          value={products.length.toString()}
          change={0}
          changeType="neutral"
          color="purple"
        />
        
        <StatCard
          icon={<Users size={20} />}
          title="Clients"
          value={new Set(orders.map(o => o.customerId)).size.toString()}
          change={0}
          changeType="positive"
          color="orange"
        />
        
        <StatCard
          icon={<CheckCircle size={20} />}
          title="Taux de complétion"
          value={`${completionRate}%`}
          progress={completionRate}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="vendor-dashboard__grid">
        {/* Recent Orders */}
        <div className="vendor-dashboard__section">
          <div className="vendor-section__header">
            <h3>Commandes récentes</h3>
            <Link to="/vendor/orders" className="vendor-section__link">
              Toutes les commandes
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="vendor-recent-orders">
            {orders.length > 0 ? (
              orders.slice(0, 5).map(order => (
                <RecentOrder 
                  key={order.id} 
                  order={order} 
                />
              ))
            ) : (
              <div className="vendor-empty-state">
                <Package size={48} color="#9ca3af" />
                <p>Aucune commande récente</p>
                <Link to="/vendor/products" className="vendor-empty-state__action">
                  Ajouter des produits
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="vendor-dashboard__section">
          <div className="vendor-section__header">
            <h3>Produits populaires</h3>
            <Link to="/vendor/products" className="vendor-section__link">
              Tous les produits
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="vendor-top-products">
            {stats.popularProducts.length > 0 ? (
              stats.popularProducts.slice(0, 5).map((product, index) => (
                <ProductPerformance 
                  key={product.id} 
                  rank={index + 1}
                  product={product} 
                />
              ))
            ) : (
              <div className="vendor-empty-state">
                <TrendingUp size={48} color="#9ca3af" />
                <p>Aucun produit populaire</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="vendor-dashboard__section vendor-quick-actions">
          <div className="vendor-section__header">
            <h3>Actions rapides</h3>
          </div>
          
          <div className="vendor-quick-actions__grid">
            <Link to="/vendor/products/new" className="vendor-quick-action">
              <div className="vendor-quick-action__icon" style={{ background: '#dbeafe' }}>
                <Package size={20} color="#2563eb" />
              </div>
              <div className="vendor-quick-action__text">
                <span>Nouveau produit</span>
                <p>Ajouter un produit à votre catalogue</p>
              </div>
            </Link>
            
            <Link to="/vendor/orders/new" className="vendor-quick-action">
              <div className="vendor-quick-action__icon" style={{ background: '#dcfce7' }}>
                <ShoppingCart size={20} color="#16a34a" />
              </div>
              <div className="vendor-quick-action__text">
                <span>Nouvelle commande</span>
                <p>Créer une commande manuelle</p>
              </div>
            </Link>
            
            <Link to="/vendor/analytics" className="vendor-quick-action">
              <div className="vendor-quick-action__icon" style={{ background: '#fef3c7' }}>
                <TrendingUp size={20} color="#d97706" />
              </div>
              <div className="vendor-quick-action__text">
                <span>Statistiques</span>
                <p>Analyser vos performances</p>
              </div>
            </Link>
            
            <Link to="/vendor/settings" className="vendor-quick-action">
              <div className="vendor-quick-action__icon" style={{ background: '#f3e8ff' }}>
                <Users size={20} color="#9333ea" />
              </div>
              <div className="vendor-quick-action__text">
                <span>Paramètres</span>
                <p>Configurer votre boutique</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="vendor-dashboard__section">
          <div className="vendor-section__header">
            <h3>Statut des commandes</h3>
          </div>
          
          <div className="vendor-status-distribution">
            <div className="vendor-status-item">
              <div className="vendor-status-item__header">
                <div className="vendor-status-indicator" style={{ background: '#dcfce7' }}>
                  <CheckCircle size={16} color="#16a34a" />
                </div>
                <span>Complétées</span>
              </div>
              <div className="vendor-status-bar">
                <div 
                  className="vendor-status-bar__fill"
                  style={{ 
                    width: `${getPercentage(completedOrders, totalOrders)}%`,
                    background: '#16a34a'
                  }}
                />
              </div>
              <span className="vendor-status-count">{completedOrders}</span>
            </div>
            
            <div className="vendor-status-item">
              <div className="vendor-status-item__header">
                <div className="vendor-status-indicator" style={{ background: '#fef3c7' }}>
                  <Clock size={16} color="#d97706" />
                </div>
                <span>En attente</span>
              </div>
              <div className="vendor-status-bar">
                <div 
                  className="vendor-status-bar__fill"
                  style={{ 
                    width: `${getPercentage(pendingOrders, totalOrders)}%`,
                    background: '#d97706'
                  }}
                />
              </div>
              <span className="vendor-status-count">{pendingOrders}</span>
            </div>
            
            <div className="vendor-status-item">
              <div className="vendor-status-item__header">
                <div className="vendor-status-indicator" style={{ background: '#fee2e2' }}>
                  <XCircle size={16} color="#dc2626" />
                </div>
                <span>Annulées</span>
              </div>
              <div className="vendor-status-bar">
                <div 
                  className="vendor-status-bar__fill"
                  style={{ 
                    width: `${getPercentage(cancelledOrders, totalOrders)}%`,
                    background: '#dc2626'
                  }}
                />
              </div>
              <span className="vendor-status-count">{cancelledOrders}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
