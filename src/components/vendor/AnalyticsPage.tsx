import { useState, useEffect } from 'react'
import { useVendorStore } from '../../features/vendor/vendorStore'
import { AnalyticsChart } from './AnalyticsChart'
import { StatCard } from './StatCard'
import { TrendingUp, TrendingDown, Package, Users, Clock, Calendar, Filter } from 'lucide-react'
import './styles/analytics-page.css'

export function AnalyticsPage() {
  const { orders, products, loading, error } = useVendorStore()
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('month')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  // Calculer les statistiques
  const calculateStats = () => {
    // Ventes totales
    const totalSales = orders.length
    
    // Revenus totaux
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.items.reduce((itemSum, item) => 
        itemSum + (item.product.price * item.quantity), 0)
    }, 0)
    
    // Produits totaux vendus
    const totalProductsSold = orders.reduce((sum, order) => {
      return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
    }, 0)
    
    // Clients uniques (simulé)
    const uniqueCustomers = new Set(orders.map(order => order.customerId)).size
    
    // Commandes en attente
    const pendingOrders = orders.filter(order => order.status === 'pending').length
    
    // Commandes complétées
    const completedOrders = orders.filter(order => order.status === 'completed').length
    
    // Taux de complétion
    const completionRate = totalSales > 0 ? Math.round((completedOrders / totalSales) * 100) : 0
    
    // Produit le plus populaire
    const productSales: Record<string, number> = {}
    orders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.product.name] = (productSales[item.product.name] || 0) + item.quantity
      })
    })
    const topProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0]
    
    // Catégorie la plus populaire
    const categorySales: Record<string, number> = {}
    products.forEach(product => {
      const productTotal = orders.reduce((sum, order) => {
        const item = order.items.find(i => i.product.id === product.id)
        return sum + (item ? item.quantity : 0)
      }, 0)
      categorySales[product.category] = (categorySales[product.category] || 0) + productTotal
    })
    const topCategory = Object.entries(categorySales).sort((a, b) => b[1] - a[1])[0]

    return {
      totalSales,
      totalRevenue,
      totalProductsSold,
      uniqueCustomers,
      pendingOrders,
      completedOrders,
      completionRate,
      topProduct,
      topCategory
    }
  }

  const stats = calculateStats()

  // Formater le revenu
  const formatRevenue = (amount: number): string => {
    return `FC ${amount.toLocaleString()}`
  }

  // Gérer le changement de période
  const handlePeriodChange = (period: 'today' | 'week' | 'month' | 'year' | 'custom') => {
    setFilterPeriod(period)
    // Réinitialiser les dates personnalisées
    if (period !== 'custom') {
      setStartDate('')
      setEndDate('')
    }
  }

  // Appliquer le filtre personnalisé
  const applyCustomFilter = () => {
    // Logique de filtrage personnalisé
    console.log('Filtre personnalisé appliqué:', startDate, endDate)
  }

  // Effet pour charger les données
  useEffect(() => {
    // Les données sont déjà chargées via le store
  }, [])

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="analytics-page__loading">
        <div className="analytics-page__spinner"></div>
        <p>Chargement des statistiques...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics-page__error">
        <p>Erreur lors du chargement des statistiques: {error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    )
  }

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="analytics-page__header">
        <div className="analytics-page__header-left">
          <h1 className="analytics-page__title">Tableau de bord analytique</h1>
          <p className="analytics-page__subtitle">Analysez les performances de votre boutique</p>
        </div>
        
        <div className="analytics-page__header-right">
          {/* Filtre de période */}
          <div className="analytics-page__filter">
            <div className="analytics-page__filter-buttons">
              <button 
                className={`analytics-page__filter-button ${filterPeriod === 'today' ? 'analytics-page__filter-button--active' : ''}`}
                onClick={() => handlePeriodChange('today')}
              >
                Aujourd'hui
              </button>
              <button 
                className={`analytics-page__filter-button ${filterPeriod === 'week' ? 'analytics-page__filter-button--active' : ''}`}
                onClick={() => handlePeriodChange('week')}
              >
                Semaine
              </button>
              <button 
                className={`analytics-page__filter-button ${filterPeriod === 'month' ? 'analytics-page__filter-button--active' : ''}`}
                onClick={() => handlePeriodChange('month')}
              >
                Mois
              </button>
              <button 
                className={`analytics-page__filter-button ${filterPeriod === 'year' ? 'analytics-page__filter-button--active' : ''}`}
                onClick={() => handlePeriodChange('year')}
              >
                Année
              </button>
              <button 
                className={`analytics-page__filter-button ${filterPeriod === 'custom' ? 'analytics-page__filter-button--active' : ''}`}
                onClick={() => handlePeriodChange('custom')}
              >
                <Filter size={16} />
                Personnalisé
              </button>
            </div>

            {/* Dates personnalisées */}
            {filterPeriod === 'custom' && (
              <div className="analytics-page__custom-dates">
                <div className="analytics-page__date-picker">
                  <Calendar size={16} className="analytics-page__date-icon" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="analytics-page__date-input"
                  />
                </div>
                <span className="analytics-page__date-separator">à</span>
                <div className="analytics-page__date-picker">
                  <Calendar size={16} className="analytics-page__date-icon" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="analytics-page__date-input"
                  />
                </div>
                <button 
                  className="analytics-page__apply-button"
                  onClick={applyCustomFilter}
                >
                  Appliquer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="analytics-page__stats-grid">
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Ventes totales"
          value={stats.totalSales.toString()}
          change={12.5}
          changeType="positive"
          color="green"
        />

        <StatCard
          icon={<Package size={24} />}
          title="Produits vendus"
          value={stats.totalProductsSold.toString()}
          change={8.3}
          changeType="positive"
          color="blue"
        />

        <StatCard
          icon={<Users size={24} />}
          title="Clients uniques"
          value={stats.uniqueCustomers.toString()}
          change={5.2}
          changeType="positive"
          color="green"
        />

        <StatCard
          icon={<TrendingUp size={24} />}
          title="Revenu total"
          value={formatRevenue(stats.totalRevenue)}
          change={15.7}
          changeType="positive"
          color="orange"
        />

        <StatCard
          icon={<Clock size={24} />}
          title="Commandes en attente"
          value={stats.pendingOrders.toString()}
          change={-2.1}
          changeType="negative"
          color="red"
        />

        <StatCard
          icon={<TrendingUp size={24} />}
          title="Taux de complétion"
          value={`${stats.completionRate}%`}
          change={3.4}
          changeType="positive"
          color="green"
        />
      </div>

      {/* Top Performers */}
      <div className="analytics-page__top-performers">
        <div className="analytics-page__performer-card">
          <div className="analytics-page__performer-header">
            <h3 className="analytics-page__performer-title">Produit le plus populaire</h3>
          </div>
          <div className="analytics-page__performer-content">
            {stats.topProduct ? (
              <>
                <div className="analytics-page__performer-info">
                  <span className="analytics-page__performer-name">{stats.topProduct[0]}</span>
                  <span className="analytics-page__performer-value">{stats.topProduct[1]} unités</span>
                </div>
                <div className="analytics-page__performer-progress">
                  <div 
                    className="analytics-page__performer-progress-bar"
                    style={{ width: `${Math.min((stats.topProduct[1] / (stats.totalProductsSold || 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="analytics-page__performer-empty">Aucun produit vendu</p>
            )}
          </div>
        </div>

        <div className="analytics-page__performer-card">
          <div className="analytics-page__performer-header">
            <h3 className="analytics-page__performer-title">Catégorie la plus populaire</h3>
          </div>
          <div className="analytics-page__performer-content">
            {stats.topCategory ? (
              <>
                <div className="analytics-page__performer-info">
                  <span className="analytics-page__performer-name">{stats.topCategory[0]}</span>
                  <span className="analytics-page__performer-value">{stats.topCategory[1]} unités</span>
                </div>
                <div className="analytics-page__performer-progress">
                  <div 
                    className="analytics-page__performer-progress-bar"
                    style={{ width: `${Math.min((stats.topCategory[1] / (stats.totalProductsSold || 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="analytics-page__performer-empty">Aucune catégorie</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="analytics-page__chart-section">
        <AnalyticsChart />
      </div>

      {/* Recent Orders Table */}
      <div className="analytics-page__recent-orders">
        <div className="analytics-page__section-header">
          <h3 className="analytics-page__section-title">Commandes récentes</h3>
          <button className="analytics-page__view-all-button">
            Voir tout
          </button>
        </div>
        
        <div className="analytics-page__table-container">
          <table className="analytics-page__table">
            <thead className="analytics-page__table-header">
              <tr>
                <th className="analytics-page__table-th">ID Commande</th>
                <th className="analytics-page__table-th">Client</th>
                <th className="analytics-page__table-th">Produits</th>
                <th className="analytics-page__table-th">Montant</th>
                <th className="analytics-page__table-th">Statut</th>
                <th className="analytics-page__table-th">Date</th>
              </tr>
            </thead>
            <tbody className="analytics-page__table-body">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="analytics-page__table-row">
                  <td className="analytics-page__table-td">#{order.id.slice(-8)}</td>
                  <td className="analytics-page__table-td">Client {(order.customerId || 'Unknown').slice(-4)}</td>
                  <td className="analytics-page__table-td">{order.items.length}</td>
                  <td className="analytics-page__table-td">
                    FC {order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()}
                  </td>
                  <td className="analytics-page__table-td">
                    <span className={`analytics-page__status-badge analytics-page__status-badge--${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="analytics-page__table-td">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {orders.length === 0 && (
            <div className="analytics-page__table-empty">
              <p>Aucune commande récente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
