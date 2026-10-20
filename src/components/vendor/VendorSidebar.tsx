import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBasket, 
  Truck, 
  BarChart3, 
  Settings,
  PlusSquare,
  List,
  Clock,
  CheckSquare
} from 'lucide-react'
import { useVendorStore } from '../../features/vendor/vendorStore'

const navItems = [
  {
    to: '/vendor',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    matches: ['/vendor'],
  },
  {
    to: '/vendor/products',
    label: 'Produits',
    icon: Package,
    matches: ['/vendor/products'],
    children: [
      { to: '/vendor/products', label: 'Liste', icon: List },
      { to: '/vendor/products/new', label: 'Ajouter', icon: PlusSquare },
    ],
  },
  {
    to: '/vendor/orders',
    label: 'Commandes',
    icon: ShoppingBasket,
    matches: ['/vendor/orders'],
    children: [
      { to: '/vendor/orders', label: 'Toutes', icon: List },
      { to: '/vendor/orders?status=pending', label: 'En attente', icon: Clock },
      { to: '/vendor/orders?status=preparing', label: 'En préparation', icon: Truck },
      { to: '/vendor/orders?status=ready', label: 'Prêtes', icon: CheckSquare },
    ],
  },
  {
    to: '/vendor/deliveries',
    label: 'Livraisons',
    icon: Truck,
    matches: ['/vendor/deliveries'],
  },
  {
    to: '/vendor/analytics',
    label: 'Statistiques',
    icon: BarChart3,
    matches: ['/vendor/analytics'],
  },
  {
    to: '/vendor/settings',
    label: 'Paramètres',
    icon: Settings,
    matches: ['/vendor/settings'],
  },
]

export function VendorSidebar() {
  const location = useLocation()
  const currentVendor = useVendorStore(state => state.currentVendor)

  return (
    <aside className="vendor-sidebar">
      <div className="vendor-sidebar__header">
        <div className="vendor-brand">
          <span className="vendor-brand__initials">
            {currentVendor?.initials || 'FC'}
          </span>
          <div className="vendor-brand__info">
            <h3>{currentVendor?.name || 'Ma Boutique'}</h3>
            <span className="vendor-brand__specialty">
              {currentVendor?.specialty || 'Gestion boutique'}
            </span>
          </div>
        </div>
      </div>

      <nav className="vendor-sidebar__nav" aria-label="Navigation vendeur">
        <ul className="vendor-nav-list">
          {navItems.map((item) => {
            const active = item.matches.some((path) => 
              location.pathname === path || 
              location.pathname.startsWith(`${path}/`)
            )
            const hasChildren = item.children && item.children.length > 0
            const childrenActive = hasChildren && item.children.some(
              (child) => location.pathname === child.to || location.pathname.startsWith(`${child.to}/`)
            )

            return (
              <li key={item.to} className="vendor-nav-item">
                <Link 
                  to={item.to} 
                  className={`vendor-nav-link ${active || childrenActive ? 'active' : ''}`}
                  aria-current={active || childrenActive ? 'page' : undefined}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {hasChildren && (
                    <span className="vendor-nav-chevron">▼</span>
                  )}
                </Link>
                {hasChildren && (active || childrenActive) && (
                  <ul className="vendor-nav-sublist">
                    {item.children?.map((child) => {
                      const childActive = location.pathname === child.to || 
                        location.pathname.startsWith(`${child.to}/`)
                      return (
                        <li key={child.to} className="vendor-nav-subitem">
                          <Link 
                            to={child.to}
                            className={`vendor-nav-sublink ${childActive ? 'active' : ''}`}
                          >
                            <child.icon size={16} />
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="vendor-sidebar__footer">
        <Link to="/home" className="vendor-footer-link">
          ← Retour à l'espace étudiant
        </Link>
      </div>
    </aside>
  )
}
