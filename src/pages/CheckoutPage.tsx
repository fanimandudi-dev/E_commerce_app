import { Banknote, Check, ChevronDown, Info, MapPin, Store } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { cartTotal, useCartStore } from '../features/cart/cartStore'
import { useOrderStore } from '../features/orders/orderStore'
import { campusLocations } from '../mocks/data'
import { formatPrice } from '../utils/format'

export function CheckoutPage() {
  const { items, vendor, clear } = useCartStore()
  const createOrder = useOrderStore(state => state.createOrder)
  const [locationId, setLocationId] = useState(campusLocations[0].id)
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const total = cartTotal(items)

  if (!items.length || !vendor) return <Navigate to="/explore" replace/>
  const selectedLocation = campusLocations.find(location => location.id === locationId) ?? campusLocations[0]

  async function confirmOrder() {
    setLoading(true); setError('')
    try {
      const order = await createOrder({ items, vendor: vendor!, total, deliveryLocation: selectedLocation, deliveryInstructions: instructions })
      clear()
      navigate(`/order-success/${order.id}`)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible de créer la commande.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="checkout-page"><PageHeader title="Confirmer la commande" subtitle={`Votre commande sera transmise à ${vendor.name}`} back/>
    <div className="checkout-layout"><section className="checkout-form">
      <div className="checkout-step"><div className="step-title"><span>1</span><div><h2>Votre boutique</h2><p>Cette commande sera préparée et remise par une seule boutique.</p></div></div><div className="checkout-vendor"><span>{vendor.initials}</span><div><small>COMMANDE CHEZ</small><b>{vendor.name}</b></div><Check size={19}/></div></div>
      <div className="checkout-step"><div className="step-title"><span>2</span><div><h2>Point de remise</h2><p>Où souhaitez-vous recevoir votre commande&nbsp;?</p></div></div><label className="select-field"><MapPin size={19}/><select value={locationId} onChange={event => setLocationId(event.target.value)}>{campusLocations.filter(location => location.active).map(location => <option value={location.id} key={location.id}>{location.label} — {location.description}</option>)}</select><ChevronDown size={17}/></label><label className="instructions-field"><span>Instructions pour la remise <small>facultatif</small></span><textarea maxLength={240} value={instructions} onChange={event => setInstructions(event.target.value)} placeholder="Ex. : Je serai devant l’entrée principale."/><small>{instructions.length}/240</small></label></div>
      <div className="checkout-step"><div className="step-title"><span>3</span><div><h2>Paiement en espèces</h2><p>Aucun paiement n’est demandé maintenant.</p></div></div><div className="cash-payment-card"><Banknote size={26}/><div><small>MONTANT À PRÉPARER</small><strong>{formatPrice(total)}</strong><p>Remettez ce montant à {vendor.name}, puis présentez votre QR. La boutique scannera le QR et confirmera la réception de l’argent.</p></div></div><div className="cash-sequence"><span><b>1</b> Remettez les espèces</span><span><b>2</b> Présentez le QR</span><span><b>3</b> Attendez la confirmation</span></div></div>
    </section>
    <aside className="payment-summary"><span className="eyebrow">VOTRE COMMANDE</span><div className="summary-vendor-line"><Store size={16}/><b>{vendor.name}</b></div><div className="payment-items">{items.map(item => <div key={item.product.id}><img src={item.product.image} alt=""/><span><b>{item.product.shortName}</b><small>Qté {item.quantity}</small></span><strong>{formatPrice(item.product.price * item.quantity)}</strong></div>)}</div><div className="summary-row"><span>Point de remise</span><b>{selectedLocation.label}</b></div><div className="summary-total"><span>Total en espèces</span><strong>{formatPrice(total)}</strong></div>{error && <div className="form-error checkout-error">{error}</div>}<button className="button button--primary button--large button--block" disabled={loading} onClick={confirmOrder}>{loading ? 'Création en cours…' : `Confirmer · ${formatPrice(total)}`}</button><p><Info size={14}/> Vous ne payez rien en ligne.</p></aside></div>
  </div>
}
