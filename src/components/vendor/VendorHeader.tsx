import { Link, useLocation } from 'react-router-dom'
import { Bell, QrCode, Search, UserRound } from 'lucide-react'
import { useVendorStore } from '../../features/vendor/vendorStore'
import { useAuthStore } from '../../features/auth/authStore'

export function VendorHeader() {
  const location = useLocation()
  const currentVendor = useVendorStore(state => state.currentVendor)
  const user = useAuthStore(state => state.user)

  // Extraire le titre de la page à partir du pathname
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/vendor' || path === '/vendor/dashboard') return 'Tableau de bord'
    if (path.startsWith('/vendor/products')) return 'Produits'
    if (path.startsWith('/vendor/orders')) return 'Commandes'
    if (path.startsWith('/vendor/deliveries')) return 'Livraisons'
    if (path.startsWith('/vendor/analytics')) return 'Statistiques'
    if (path.startsWith('/vendor/settings')) return 'Paramètres'
    return 'Food Campus Vendor'
  }

  return (
    <header className="vendor-header">
      <div className="vendor-header__left">
        <div className="vendor-header__title">
          <h1>{getPageTitle()}</h1>
          {currentVendor && (
            <span className="vendor-header__subtitle">
              {currentVendor.name}
            </span>
          )}
        </div>
      </div>

      <div className="vendor-header__right">
        {/* Search - Hidden on mobile */}
        <div className="vendor-header__search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Rechercher dans la boutique..." 
            className="vendor-search-input"
          />
        </div>
        
        {/* QR Scanner */}
        <Link to="/vendor/orders" className="vendor-header__action" aria-label="Scanner QR Code">
          <QrCode size={20} />
          <span className="vendor-action-tooltip">Scanner QR</span>
        </Link>
        
        {/* Notifications */}
        <Link to="/vendor/notifications" className="vendor-header__action" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </Link>
        
        {/* User Menu */}
        <div className="vendor-header__user">
          <div className="vendor-user-avatar">
            {(user?.firstName || user?.name || 'V').charAt(0).toUpperCase()}
          </div>
          <div className="vendor-user-info">
            <span className="vendor-user-name">{user?.name || user?.firstName || 'Vendeur'}</span>
            <span className="vendor-user-role">Vendeur</span>
          </div>
        </div>
      </div>
    </header>
  )
}
