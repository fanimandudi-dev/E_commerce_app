import { Banknote, Check, ChevronRight, Home, ShieldCheck, Store } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Link, useParams } from 'react-router-dom'
import { useOrderStore } from '../features/orders/orderStore'
import { formatPrice } from '../utils/format'

export function OrderSuccessPage() {
  const { id } = useParams()
  const order = useOrderStore(state => state.orders.find(item => item.id === id))
  if (!order) return <div className="empty-state"><h2>Commande introuvable</h2><Link to="/orders" className="button button--primary">Mes commandes</Link></div>

  return <div className="success-page">
    <div className="success-check"><Check size={32}/></div><span className="eyebrow">COMMANDE ENREGISTRÉE</span><h1>Votre commande a bien été transmise</h1><p>{order.vendor.name} peut maintenant consulter et préparer votre commande. Aucun paiement n’a encore été effectué.</p>
    <section className="ticket"><div className="ticket__top"><span>Commande</span><b>#{order.id}</b></div><div className="ticket-vendor"><span>{order.vendor.initials}</span><div><small>VOTRE BOUTIQUE</small><b>{order.vendor.name}</b></div><Store size={18}/></div><div className="ticket__qr"><QRCodeSVG value={order.code} size={164} level="M"/><span>{order.code}</span><small>Présentez ce QR uniquement lors de la remise</small></div><div className="ticket__details"><div><span>À payer en espèces</span><b>{formatPrice(order.total)}</b></div><div><span>Point de remise</span><b>{order.deliveryLocation.label}</b></div></div></section>
    <div className="success-cash-reminder"><Banknote size={21}/><span><b>Préparez le montant exact si possible.</b><small>Après avoir reçu l’argent, la boutique scannera votre QR et confirmera le paiement.</small></span></div>
    <div className="success-actions"><Link to={`/orders/${order.id}`} className="button button--primary">Suivre ma commande <ChevronRight size={17}/></Link><Link to="/home" className="button button--outline"><Home size={17}/> Retour à l’accueil</Link></div><div className="success-help"><ShieldCheck size={17}/> QR personnel et utilisable une seule fois</div>
  </div>
}
