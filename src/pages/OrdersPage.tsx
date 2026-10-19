import { Banknote, Check, ChefHat, CircleDot, Clock3, MapPin, PackageCheck, QrCode, Store, Truck } from 'lucide-react'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import type { Order, OrderStatus } from '../domain/models'
import { useOrderStore } from '../features/orders/orderStore'
import { formatDate, formatPrice } from '../utils/format'

const status: Record<OrderStatus, { label: string; className: string; description: string }> = {
  pending: { label: 'En attente', className: 'waiting', description: 'La boutique va prendre connaissance de votre commande.' },
  preparing: { label: 'En préparation', className: 'preparing', description: 'Votre commande est en cours de préparation.' },
  ready: { label: 'Prête', className: 'confirmed', description: 'Votre commande est prête pour la remise.' },
  out_for_delivery: { label: 'En route', className: 'delivering', description: 'La boutique se dirige vers votre point de remise.' },
  completed: { label: 'Terminée', className: 'delivered', description: 'La commande et le paiement ont été confirmés.' },
  cancelled: { label: 'Annulée', className: 'cancelled', description: 'Cette commande a été annulée.' },
}

type OrderFilter = 'all' | 'active' | 'finished'

export function OrdersPage() {
  const orders = useOrderStore(state => state.orders)
  const [filter, setFilter] = useState<OrderFilter>('all')
  const visible = orders.filter(order => filter === 'all' || filter === 'active' ? filter === 'all' || !['completed', 'cancelled'].includes(order.status) : ['completed', 'cancelled'].includes(order.status))

  return <div className="orders-page"><PageHeader title="Mes commandes" subtitle="Suivez chaque commande et son paiement séparément"/><div className="order-tabs"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Toutes <span>{orders.length}</span></button><button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>En cours</button><button className={filter === 'finished' ? 'active' : ''} onClick={() => setFilter('finished')}>Terminées</button></div>{visible.length === 0 ? <EmptyState icon={PackageCheck} title="Aucune commande" text="Vos commandes apparaîtront ici."/> : <div className="orders-list">{visible.map(order => <OrderCard order={order} key={order.id}/>)}</div>}</div>
}

function OrderCard({ order }: { order: Order }) {
  const state = status[order.status]
  return <Link to={`/orders/${order.id}`} className="order-card">
    <div className="order-card__header"><div><span>{order.vendor.name}</span><small>Commande #{order.id} · {formatDate(order.createdAt)}</small></div><b className={`status-badge ${state.className}`}>{state.label}</b></div>
    <div className="order-card__body"><div className="order-thumbs">{order.items.slice(0,3).map(item => <img src={item.product.image} alt="" key={item.product.id}/>)}</div><div className="order-card__info"><b>{order.items.map(item => `${item.quantity}× ${item.product.shortName}`).join(', ')}</b><span><MapPin size={13}/>{order.deliveryLocation.label}</span></div><strong>{formatPrice(order.total)}</strong></div>
    <div className="order-card__footer"><span className={`payment-pill ${order.paymentStatus}`}><Banknote size={13}/>{order.paymentStatus === 'received' ? 'Espèces reçues' : order.paymentStatus === 'cancelled' ? 'Paiement annulé' : 'À payer en espèces'}</span><span className="order-card__details">Voir les détails →</span></div>
  </Link>
}

const steps: { id: Exclude<OrderStatus, 'cancelled'>; label: string; icon: typeof Clock3 }[] = [
  { id: 'pending', label: 'Commande enregistrée', icon: Clock3 },
  { id: 'preparing', label: 'En préparation', icon: ChefHat },
  { id: 'ready', label: 'Prête pour la remise', icon: PackageCheck },
  { id: 'out_for_delivery', label: 'En route vers vous', icon: Truck },
  { id: 'completed', label: 'Commande terminée', icon: Check },
]

export function OrderDetailPage() {
  const { id } = useParams()
  const order = useOrderStore(state => state.orders.find(item => item.id === id))
  if (!order) return <div><PageHeader title="Commande introuvable" back/><EmptyState icon={PackageCheck} title="Cette commande n’existe pas" text="Retournez à votre historique pour consulter vos commandes." action="Mes commandes" to="/orders"/></div>

  const current = status[order.status]
  const currentIndex = order.status === 'cancelled' ? -1 : steps.findIndex(step => step.id === order.status)
  const activeOrder = !['completed', 'cancelled'].includes(order.status)

  return <div className="order-detail-page"><PageHeader title={`Commande #${order.id}`} subtitle={order.vendor.name} back/>
    <section className={`tracking-hero ${order.status === 'cancelled' ? 'is-cancelled' : ''}`}><div>{order.status === 'completed' ? <Check size={28}/> : order.status === 'cancelled' ? <CircleDot size={28}/> : <Truck size={28}/>}</div><span>STATUT DE LA COMMANDE</span><h2>{current.label}</h2><p>{current.description}</p></section>
    <div className="order-detail-grid"><div>
      <section className="tracking-list"><h2>Progression</h2>{steps.map((step, index) => { const Icon = step.icon; const done = currentIndex >= index; const active = currentIndex === index; return <div className={`tracking-row ${done ? 'done' : ''} ${active ? 'active' : ''}`} key={step.id}><span><Icon size={15}/></span><div><b>{step.label}</b><small>{done ? active ? 'Étape actuelle' : 'Terminé' : 'À venir'}</small></div></div>})}</section>
      <section className="order-products-card"><h2>Contenu de la commande</h2>{order.items.map(item => <div key={item.product.id}><img src={item.product.image} alt=""/><span><b>{item.product.shortName}</b><small>{item.quantity} × {formatPrice(item.product.price)}</small></span><strong>{formatPrice(item.product.price * item.quantity)}</strong></div>)}</section>
    </div><aside className="order-facts-card"><div className="order-fact-vendor"><span>{order.vendor.initials}</span><div><small>BOUTIQUE</small><b>{order.vendor.name}</b></div><Store size={18}/></div><div className="order-fact"><MapPin size={18}/><span><small>POINT DE REMISE</small><b>{order.deliveryLocation.label}</b></span></div><div className="order-fact"><Banknote size={18}/><span><small>PAIEMENT</small><b>{order.paymentStatus === 'received' ? 'Espèces reçues' : order.paymentStatus === 'cancelled' ? 'Annulé' : `${formatPrice(order.total)} à payer`}</b></span></div>{order.deliveryInstructions && <div className="order-instructions"><small>INSTRUCTIONS</small><p>{order.deliveryInstructions}</p></div>}{activeOrder && <div className="order-qr"><QrCode size={18}/><h3>Votre QR de remise</h3><QRCodeSVG value={order.code} size={150} level="M"/><b>{order.code}</b><p>Présentez-le seulement après avoir remis les espèces.</p></div>}</aside></div>
  </div>
}
