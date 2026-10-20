import { useState } from 'react'
import { Bell, CheckCheck, Clock, PackageCheck, X } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useVendorStore } from '../../features/vendor/vendorStore'

type NotificationType = 'order' | 'payment' | 'system' | 'promo'

interface VendorNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  time: string
  orderId?: string
  data?: Record<string, unknown>
}

const mockNotifications: VendorNotification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Nouvelle commande',
    message: 'Vous avez reçu une nouvelle commande #1001 de Jean Dupont',
    read: false,
    time: 'Il y a 5 min',
    orderId: '1001'
  },
  {
    id: '2',
    type: 'order',
    title: 'Commande prête',
    message: 'La commande #1000 est prête pour la remise',
    read: false,
    time: 'Il y a 15 min',
    orderId: '1000'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Paiement confirmé',
    message: 'Le paiement de la commande #999 a été confirmé',
    read: true,
    time: 'Il y a 1 heure',
    orderId: '999'
  },
  {
    id: '4',
    type: 'system',
    title: 'Mise à jour système',
    message: 'Votre catalogue a été synchronisé avec succès',
    read: true,
    time: 'Hier à 10:00'
  }
]

const notificationIcons: Record<NotificationType, typeof Bell> = {
  order: PackageCheck,
  payment: CheckCheck,
  system: Clock,
  promo: Bell
}

const notificationColors: Record<NotificationType, string> = {
  order: '#16a34a',
  payment: '#16a34a',
  system: '#374151',
  promo: '#d97706'
}

export function VendorNotificationsPage() {
  const [notifications, setNotifications] = useState<VendorNotification[]>(mockNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="vendor-notifications-page">
      <PageHeader 
        title="Notifications" 
        subtitle={`${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`}
        action={
          <button 
            className="vendor-notifications-page__mark-all"
            onClick={markAllAsRead}
          >
            <CheckCheck size={14} />
            Tout marquer comme lu
          </button>
        }
      />

      {notifications.length === 0 ? (
        <EmptyState 
          icon={Bell} 
          title="Aucune notification" 
          text="Vous serez notifié des nouvelles commandes et activités." 
        />
      ) : (
        <div className="vendor-notifications-page__list">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type]
            const color = notificationColors[notification.type]
            
            return (
              <button 
                key={notification.id} 
                className={`vendor-notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="vendor-notification-item__icon" style={{ background: color + '20' }}>
                  <Icon size={18} color={color} />
                </div>
                <div className="vendor-notification-item__content">
                  <div className="vendor-notification-item__header">
                    <h4 className="vendor-notification-item__title">{notification.title}</h4>
                    <span className="vendor-notification-item__time">{notification.time}</span>
                  </div>
                  <p className="vendor-notification-item__message">{notification.message}</p>
                  {notification.orderId && (
                    <span className="vendor-notification-item__order-ref">
                      Commande #{notification.orderId}
                    </span>
                  )}
                </div>
                {!notification.read && (
                  <div className="vendor-notification-item__unread-indicator" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default VendorNotificationsPage
