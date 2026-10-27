import { ArrowRight, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Vendor } from '../../domain/models'
import './VendorCard.css'

export function VendorCard({ vendor, productCount }: { vendor: Vendor; productCount?: number }) {
  return <article className="vendor-card">
    <Link to={`/vendors/${vendor.id}`} className="vendor-card__image" style={{ background: vendor.accentColor }}>
      <img src={vendor.image} alt="" />
      <span className={`vendor-status ${vendor.active ? 'is-active' : ''}`}>{vendor.active ? 'Disponible' : 'Indisponible'}</span>
    </Link>
    <div className="vendor-card__body">
      <div className="vendor-avatar" aria-hidden="true">{vendor.initials}</div>
      <div className="vendor-card__identity"><Link to={`/vendors/${vendor.id}`}><h3>{vendor.name}</h3></Link><p>{vendor.specialty}</p></div>
      <Link to={`/vendors/${vendor.id}`} className="vendor-card__link" aria-label={`Voir la boutique ${vendor.name}`}><ArrowRight size={17}/></Link>
    </div>
    {typeof productCount === 'number' && <div className="vendor-card__foot"><Store size={14}/>{productCount} produit{productCount > 1 ? 's' : ''}</div>}
  </article>
}
