import { ArrowRightLeft, X } from 'lucide-react'
import type { Product, VendorSummary } from '../../domain/models'

interface VendorSwitchDialogProps {
  currentVendor: VendorSummary
  product: Product
  onCancel: () => void
  onConfirm: () => void
}

export function VendorSwitchDialog({ currentVendor, product, onCancel, onConfirm }: VendorSwitchDialogProps) {
  return <div className="dialog-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onCancel() }}>
    <section className="vendor-switch-dialog" role="dialog" aria-modal="true" aria-labelledby="vendor-switch-title">
      <button className="dialog-close" onClick={onCancel} aria-label="Fermer"><X size={19}/></button>
      <div className="dialog-icon"><ArrowRightLeft size={25}/></div>
      <h2 id="vendor-switch-title">Changer de boutique&nbsp;?</h2>
      <p>Votre panier contient des produits de <b>{currentVendor.name}</b>. Pour ajouter <b>{product.shortName}</b> de {product.vendor.name}, votre panier actuel doit être vidé.</p>
      <div className="dialog-actions">
        <button className="button button--outline" onClick={onCancel}>Garder mon panier</button>
        <button className="button button--primary" onClick={onConfirm}>Vider et ajouter</button>
      </div>
    </section>
  </div>
}
