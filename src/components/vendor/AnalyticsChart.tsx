import { useState, useEffect } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Calendar, TrendingUp, TrendingDown, Package } from 'lucide-react'
import { useVendorStore } from '../../features/vendor/vendorStore'
import './styles/analytics-chart.css'

// Enregistrer les composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartData {
  labels: string[]
  values: number[]
}

export function AnalyticsChart() {
  const { orders, products } = useVendorStore()
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')
  const [activeChart, setActiveChart] = useState<'sales' | 'products' | 'revenue'>('sales')

  // Générer les données pour les graphiques
  const generateChartData = () => {
    const now = new Date()
    let labels: string[] = []
    
    switch (timeRange) {
      case 'week':
        // Derniers 7 jours
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString('fr-FR', { weekday: 'short' }))
        }
        break
      case 'month':
        // Derniers 30 jours
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }))
        }
        break
      case 'year':
        // Derniers 12 mois
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now)
          date.setMonth(date.getMonth() - i)
          labels.push(date.toLocaleDateString('fr-FR', { month: 'short' }))
        }
        break
    }

    return { labels }
  }

  // Calculer les ventes par période
  const calculateSalesData = (labels: string[]): number[] => {
    return labels.map(label => {
      // Simuler des données de ventes
      return Math.floor(Math.random() * 50) + 10
    })
  }

  // Calculer le revenu par période
  const calculateRevenueData = (labels: string[]): number[] => {
    return labels.map(label => {
      // Simuler des données de revenu
      return Math.floor(Math.random() * 20000) + 5000
    })
  }

  // Calculer les produits vendus par catégorie
  const calculateProductData = (): ChartData => {
    const categories: Record<string, number> = {}
    
    products.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + (product.sales || 0)
    })

    return {
      labels: Object.keys(categories),
      values: Object.values(categories)
    }
  }

  const chartData = generateChartData()
  const salesData = calculateSalesData(chartData.labels)
  const revenueData = calculateRevenueData(chartData.labels)
  const productData = calculateProductData()

  // Configuration commune des graphiques
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        title: {
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        body: {
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }

  // Données pour le graphique des ventes
  const salesChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Ventes',
        data: salesData,
        borderColor: 'var(--primary)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'var(--primary)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  }

  // Données pour le graphique du revenu
  const revenueChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Revenu (FC)',
        data: revenueData,
        borderColor: 'var(--success)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'var(--success)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  }

  // Données pour le graphique des produits
  const productChartData = {
    labels: productData.labels,
    datasets: [
      {
        label: 'Produits vendus',
        data: productData.values,
        backgroundColor: [
          'var(--primary)',
          'var(--success)',
          'var(--info)',
          'var(--warning)',
          'var(--danger)',
          'var(--primary-light)',
          'var(--success-light)'
        ],
        borderWidth: 0,
        hoverOffset: 8
      }
    ]
  }

  // Options pour le graphique en ligne
  const lineOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins?.legend,
        display: false
      }
    }
  }

  // Options pour le graphique en barres
  const barOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins?.legend,
        display: false
      }
    }
  }

  // Options pour le graphique en donut
  const doughnutOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins?.legend,
        position: 'right' as const
      }
    },
    cutout: '65%'
  }

  // Calculer les statistiques globales
  const totalSales = orders.length
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + (item.product.price * item.quantity), 0)
  }, 0)
  const totalProducts = products.length
  const topProduct = products.length > 0 
    ? products.reduce((max, product) => (product.sales || 0) > (max.sales || 0) ? product : max, products[0])
    : null

  return (
    <div className="analytics-chart">
      {/* Header */}
      <div className="analytics-chart__header">
        <h2 className="analytics-chart__title">
          Statistiques de vente
        </h2>
        
        <div className="analytics-chart__controls">
          {/* Time Range Selector */}
          <div className="analytics-chart__time-selector">
            <button 
              className={`analytics-chart__time-button ${timeRange === 'week' ? 'analytics-chart__time-button--active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Semaine
            </button>
            <button 
              className={`analytics-chart__time-button ${timeRange === 'month' ? 'analytics-chart__time-button--active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Mois
            </button>
            <button 
              className={`analytics-chart__time-button ${timeRange === 'year' ? 'analytics-chart__time-button--active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Année
            </button>
          </div>

          {/* Chart Type Selector */}
          <div className="analytics-chart__chart-selector">
            <button 
              className={`analytics-chart__chart-button ${activeChart === 'sales' ? 'analytics-chart__chart-button--active' : ''}`}
              onClick={() => setActiveChart('sales')}
            >
              <TrendingUp size={16} />
              <span>Ventes</span>
            </button>
            <button 
              className={`analytics-chart__chart-button ${activeChart === 'revenue' ? 'analytics-chart__chart-button--active' : ''}`}
              onClick={() => setActiveChart('revenue')}
            >
              <TrendingUp size={16} />
              <span>Revenu</span>
            </button>
            <button 
              className={`analytics-chart__chart-button ${activeChart === 'products' ? 'analytics-chart__chart-button--active' : ''}`}
              onClick={() => setActiveChart('products')}
            >
              <Package size={16} />
              <span>Produits</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="analytics-chart__stats">
        <div className="analytics-chart__stat">
          <div className="analytics-chart__stat-icon analytics-chart__stat-icon--sales">
            <TrendingUp size={20} />
          </div>
          <div className="analytics-chart__stat-info">
            <span className="analytics-chart__stat-value">{totalSales}</span>
            <span className="analytics-chart__stat-label">Commandes totales</span>
          </div>
        </div>

        <div className="analytics-chart__stat">
          <div className="analytics-chart__stat-icon analytics-chart__stat-icon--revenue">
            <TrendingUp size={20} />
          </div>
          <div className="analytics-chart__stat-info">
            <span className="analytics-chart__stat-value">FC {totalRevenue.toLocaleString()}</span>
            <span className="analytics-chart__stat-label">Revenu total</span>
          </div>
        </div>

        <div className="analytics-chart__stat">
          <div className="analytics-chart__stat-icon analytics-chart__stat-icon--products">
            <Package size={20} />
          </div>
          <div className="analytics-chart__stat-info">
            <span className="analytics-chart__stat-value">{totalProducts}</span>
            <span className="analytics-chart__stat-label">Produits</span>
          </div>
        </div>

        {topProduct && (
          <div className="analytics-chart__stat">
            <div className="analytics-chart__stat-icon analytics-chart__stat-icon--top">
              <TrendingUp size={20} />
            </div>
            <div className="analytics-chart__stat-info">
              <span className="analytics-chart__stat-value">{topProduct.sales}</span>
              <span className="analytics-chart__stat-label">Meilleure vente</span>
            </div>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="analytics-chart__container">
        {activeChart === 'sales' && (
          <div className="analytics-chart__chart-wrapper">
            <Line 
              data={salesChartData} 
              options={lineOptions}
            />
          </div>
        )}

        {activeChart === 'revenue' && (
          <div className="analytics-chart__chart-wrapper">
            <Line 
              data={revenueChartData} 
              options={lineOptions}
            />
          </div>
        )}

        {activeChart === 'products' && (
          <div className="analytics-chart__chart-wrapper analytics-chart__chart-wrapper--doughnut">
            <Doughnut 
              data={productChartData} 
              options={doughnutOptions}
            />
          </div>
        )}
      </div>
    </div>
  )
}
