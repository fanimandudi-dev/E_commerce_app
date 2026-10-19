import { Banknote, Bell, CheckCheck, Gift, PackageCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import type { Notification } from '../domain/models'
import { initialNotifications } from '../mocks/data'

const icons = { order: PackageCheck, promo: Gift, payment: Banknote, delivery: Truck }
export function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications)
  const markAll = () => setItems(items.map(item => ({ ...item, read: true })))
  return <div className="notifications-page"><PageHeader title="Notifications" subtitle={`${items.filter(item => !item.read).length} nouvelle${items.filter(item => !item.read).length > 1 ? 's' : ''}`} back action={<button className="text-button" onClick={markAll}><CheckCheck size={15}/> Tout lire</button>}/><div className="notification-filters"><button className="active">Toutes</button><button>Commandes</button><button>Paiements</button></div><div className="notification-list">{items.map((item: Notification) => { const Icon = icons[item.type]; return <article className={!item.read ? 'unread' : ''} key={item.id}><div className={`notification-icon ${item.type}`}><Icon size={19}/></div><div><h3>{item.title}</h3><p>{item.message}</p><span>{item.time}</span></div>{!item.read && <i/>}</article>})}</div><div className="notification-end"><Bell size={16}/> Vous êtes à jour</div></div>
}
