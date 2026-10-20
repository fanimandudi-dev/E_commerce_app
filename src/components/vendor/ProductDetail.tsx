import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Package,
  Tag,
  DollarSign,
  MoreVertical
} from 'lucide-react'
import { useVendorStore, VendorProduct } from '../../features/vendor/vendorStore'
import './styles/product-detail.css'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, deleteProduct } = useVendorStore()
  
  const [product, setProduct] = useState<VendorProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find(p => p.id === id)
      if (foundProduct) {
        setProduct(foundProduct)
      }
      setIsLoading(false)
    }
  }, [id, products])

  const handleToggleVisibility = () => {
    if (!product) return
    // Mettre à jour la disponibilité
    // Dans une vraie implémentation, on utiliserait updateProduct
  }

  const handleDelete = async () => {
    if (!product || !id) return
    
    setIsDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/vendor/products')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleEdit = () => {
    if (product && id) {
      navigate(`/vendor/products/${id}/edit`)
    }
  }

  if (isLoading) {
    return (
      <div className="product-detail">
        <div className="product-detail__loading">
          <div className="product-detail__spinner" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="product-detail__not-found">
          <h2>Produit non trouvé</h2>
          <p>Le produit que vous cherchez n'existe pas ou a été supprimé.</p>
          <Link to="/vendor/products" className="product-detail__back-link">
            Retour à la liste des produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      {/* Header */}
      <div className="product-detail__header">
        <Link to="/vendor/products" className="product-detail__back-button">
          <ArrowLeft size={20} />
          <span>Retour aux produits</span>
        </Link>
        
        <div className="product-detail__actions">
          <button 
            className="product-detail__action-button product-detail__action-button--edit"
            onClick={handleEdit}
          >
            <Edit size={18} />
            <span>Modifier</span>
          </button>
          
          <button 
            className="product-detail__action-button product-detail__action-button--delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 size={18} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="product-detail__content">
        {/* Product Card */}
        <div className="product-detail__card">
          {/* Image */}
          <div className="product-detail__image-container">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="product-detail__image"
              />
            ) : (
              <div className="product-detail__image-placeholder">
                {product.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            {/* Availability Badge */}
            <span className={`product-detail__badge ${product.available ? 'product-detail__badge--available' : 'product-detail__badge--unavailable'}`}>
              {product.available ? 'Disponible' : 'Indisponible'}
            </span>
          </div>

          {/* Info */}
          <div className="product-detail__info">
            <div className="product-detail__header-info">
              <h1 className="product-detail__name">{product.name}</h1>
              <span className="product-detail__category">
                <Tag size={14} />
                {product.category}
              </span>
            </div>
            
            <p className="product-detail__description">{product.description}</p>
            
            <div className="product-detail__price">
              <DollarSign size={18} />
              <span>FC {product.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="product-detail__stats">
          <div className="product-detail__stat">
            <div className="product-detail__stat-icon product-detail__stat-icon--stock">
              <Package size={20} />
            </div>
            <div className="product-detail__stat-info">
              <span className="product-detail__stat-value">{product.stock ?? 0}</span>
              <span className="product-detail__stat-label">En stock</span>
            </div>
          </div>

          <div className="product-detail__stat">
            <div className="product-detail__stat-icon product-detail__stat-icon--sales">
              <Clock size={20} />
            </div>
            <div className="product-detail__stat-info">
              <span className="product-detail__stat-value">{product.sales ?? 0}</span>
              <span className="product-detail__stat-label">Ventes</span>
            </div>
          </div>

          <div className="product-detail__stat">
            <div className="product-detail__stat-icon product-detail__stat-icon--created">
              <Calendar size={20} />
            </div>
            <div className="product-detail__stat-info">
              <span className="product-detail__stat-value">-</span>
              <span className="product-detail__stat-label">Créé le</span>
            </div>
          </div>

          <div className="product-detail__stat">
            <div className="product-detail__stat-icon product-detail__stat-icon--updated">
              <Calendar size={20} />
            </div>
            <div className="product-detail__stat-info">
              <span className="product-detail__stat-value">-</span>
              <span className="product-detail__stat-label">Mis à jour</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="product-detail__additional">
          <div className="product-detail__additional-item">
            <span className="product-detail__additional-label">ID du produit</span>
            <span className="product-detail__additional-value">{product.id}</span>
          </div>
          
          <div className="product-detail__additional-item">
            <span className="product-detail__additional-label">Visibilité</span>
            <span className="product-detail__additional-value">
              {product.available ? 'Visible pour les clients' : 'Masqué aux clients'}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="product-detail__modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="product-detail__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="product-detail__modal-title">
              Supprimer le produit
            </h3>
            <p className="product-detail__modal-text">
              Êtes-vous sûr de vouloir supprimer "{product.name}" ? Cette action ne peut pas être annulée.
            </p>
            <div className="product-detail__modal-actions">
              <button 
                className="product-detail__modal-button product-detail__modal-button--cancel"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button 
                className="product-detail__modal-button product-detail__modal-button--delete"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="product-detail__modal-spinner" />
                    Suppression...
                  </>
                ) : (
                  'Supprimer définitivement'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
