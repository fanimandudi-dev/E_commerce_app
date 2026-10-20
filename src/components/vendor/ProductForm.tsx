import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Upload,
  X,
  Check,
  AlertCircle
} from 'lucide-react'
import { useVendorStore, VendorProduct } from '../../features/vendor/vendorStore'
import type { ProductCategory } from '../../domain/models'
import './styles/product-form.css'

interface ProductFormProps {
  mode: 'create' | 'edit'
}

interface ProductFormData {
  name: string
  shortName: string
  description: string
  category: ProductCategory
  price: number
  stock: number
  available: boolean
  preparationMinutes: number
  image?: File | null
  imageUrl?: string
}

export function ProductForm({ mode }: ProductFormProps) {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { products, addProduct, updateProduct, categories } = useVendorStore()
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    shortName: '',
    description: '',
    category: categories.length > 0 ? categories[0] : 'repas',
    price: 0,
    stock: 0,
    available: true,
    preparationMinutes: 0,
    image: null,
    imageUrl: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Charger les données du produit en mode édition
  useEffect(() => {
    if (mode === 'edit' && id && products.length > 0) {
      const product = products.find(p => p.id === id)
      if (product) {
        setFormData({
          name: product.name,
          shortName: product.shortName || '',
          description: product.description,
          category: product.category,
          price: product.price,
          stock: product.stock ?? 0,
          available: product.available,
          preparationMinutes: product.preparationMinutes ?? 0,
          image: null,
          imageUrl: product.image || ''
        })
        setImagePreview(product.image || null)
      }
    }
  }, [mode, id, products])

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom du produit est requis"
    } else if (formData.name.length > 100) {
      newErrors.name = "Le nom ne doit pas dépasser 100 caractères"
    }
    
    if (!formData.shortName?.trim()) {
      newErrors.shortName = "Le nom court est requis"
    } else if (formData.shortName!.length > 20) {
      newErrors.shortName = "Le nom court ne doit pas dépasser 20 caractères"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise"
    } else if (formData.description.length > 500) {
      newErrors.description = "La description ne doit pas dépasser 500 caractères"
    }
    
    if (!formData.category) {
      newErrors.category = "La catégorie est requise"
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0"
    } else if (formData.price > 100000) {
      newErrors.price = "Le prix ne doit pas dépasser 100 000 FC"
    }
    
    if (formData.preparationMinutes !== undefined && formData.preparationMinutes < 0) {
      newErrors.preparationMinutes = "Le temps de préparation ne peut pas être négatif"
    } else if (formData.preparationMinutes !== undefined && formData.preparationMinutes > 1440) {
      newErrors.preparationMinutes = "Le temps de préparation ne doit pas dépasser 1440 minutes"
    }
    
    if (formData.stock !== undefined && formData.stock < 0) {
      newErrors.stock = "Le stock ne peut pas être négatif"
    } else if (formData.stock !== undefined && formData.stock > 10000) {
      newErrors.stock = "Le stock ne doit pas dépasser 10 000"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    const numericValue = type === 'number' ? parseFloat(value) || 0 : value
    const booleanValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    const finalValue = type === 'checkbox' ? booleanValue : (type === 'number' ? numericValue : value)
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))
  }, [])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "L'image ne doit pas dépasser 5 Mo" }))
        return
      }
      
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: "Format d'image non valide (JPEG, PNG, WebP uniquement)" }))
        return
      }
      
      setFormData(prev => ({ ...prev, image: file }))
      setImagePreview(URL.createObjectURL(file))
      setErrors(prev => ({ ...prev, image: '' }))
    }
  }, [])

  const handleRemoveImage = useCallback(() => {
    setFormData(prev => ({ ...prev, image: null, imageUrl: '' }))
    setImagePreview(null)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simuler le téléchargement de l'image
      let imageUrl = formData.imageUrl
      
      if (formData.image && formData.image instanceof File) {
        // Ici, on simule l'upload. Dans une vraie implémentation, 
        // on utiliserait un service de stockage
        imageUrl = URL.createObjectURL(formData.image)
      }
      
      const productData = {
        name: formData.name,
        shortName: formData.shortName || '',
        description: formData.description,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        available: formData.available,
        preparationMinutes: formData.preparationMinutes ?? 0,
        image: imageUrl || ''
      }
      
      if (mode === 'create') {
        await addProduct(productData as VendorProduct)
      } else if (mode === 'edit' && id) {
        await updateProduct(id, productData as Partial<VendorProduct>)
      }
      
      // Rediriger vers la liste des produits
      navigate('/vendor/products')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [validateForm, formData, mode, id, navigate, addProduct, updateProduct])

  const handleCancel = useCallback(() => {
    navigate('/vendor/products')
  }, [navigate])

  return (
    <div className="product-form">
      {/* Header */}
      <div className="product-form__header">
        <button 
          className="product-form__back-button"
          onClick={handleCancel}
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>
        
        <div className="product-form__title">
          <h2>{mode === 'create' ? 'Ajouter un produit' : 'Modifier le produit'}</h2>
          <p>{mode === 'create' ? 'Créez un nouveau produit pour votre boutique' : 'Modifiez les informations de votre produit'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form__form">
        {/* Image Upload */}
        <div className="product-form__section">
          <h3 className="product-form__section-title">Image du produit</h3>
          <div className="product-form__image-upload">
            <div className="product-form__image-preview">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Aperçu" />
                  <button 
                    type="button" 
                    className="product-form__image-remove"
                    onClick={handleRemoveImage}
                    aria-label="Supprimer l'image"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="product-form__image-placeholder">
                  <Upload size={40} color="#9ca3af" />
                  <span>Ajouter une image</span>
                  <span className="product-form__image-hint">JPEG, PNG ou WebP (max 5 Mo)</span>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              id="image-upload"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="product-form__image-input"
              disabled={isSubmitting}
            />
            
            <label htmlFor="image-upload" className="product-form__image-label">
              Choisir une image
            </label>
            
            {errors.image && (
              <span className="product-form__error">{errors.image}</span>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="product-form__section">
          <h3 className="product-form__section-title">Informations de base</h3>
          
          <div className="product-form__grid">
            <div className="product-form__field">
              <label htmlFor="name" className="product-form__label">
                Nom du produit *
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Sandwich Poulet Grillé"
                className={`product-form__input ${errors.name ? 'product-form__input--error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && <span className="product-form__error">{errors.name}</span>}
            </div>

            <div className="product-form__field">
              <label htmlFor="category" className="product-form__label">
                Catégorie *
              </label>
              <select 
                id="category" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`product-form__input product-form__input--select ${errors.category ? 'product-form__input--error' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.length > 0 && categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="product-form__error">{errors.category}</span>}
            </div>
          </div>

          <div className="product-form__field product-form__field--full">
            <label htmlFor="description" className="product-form__label">
              Description *
            </label>
            <textarea 
              id="description" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre produit..."
              rows={4}
              className={`product-form__input product-form__input--textarea ${errors.description ? 'product-form__input--error' : ''}`}
              disabled={isSubmitting}
            />
            <span className="product-form__char-count">
              {formData.description.length}/500 caractères
            </span>
            {errors.description && <span className="product-form__error">{errors.description}</span>}
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="product-form__section">
          <h3 className="product-form__section-title">Prix et stock</h3>
          
          <div className="product-form__grid">
            <div className="product-form__field">
              <label htmlFor="price" className="product-form__label">
                Prix (FC) *
              </label>
              <div className="product-form__input-wrapper">
                <span className="product-form__input-prefix">FC</span>
                <input 
                  type="number" 
                  id="price" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="10"
                  placeholder="0"
                  className={`product-form__input ${errors.price ? 'product-form__input--error' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && <span className="product-form__error">{errors.price}</span>}
            </div>

            <div className="product-form__field">
              <label htmlFor="stock" className="product-form__label">
                Stock *
              </label>
              <input 
                type="number" 
                id="stock" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={`product-form__input ${errors.stock ? 'product-form__input--error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.stock && <span className="product-form__error">{errors.stock}</span>}
            </div>
          </div>

          <div className="product-form__field">
            <label className="product-form__checkbox-label">
              <input 
                type="checkbox" 
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="product-form__checkbox"
                disabled={isSubmitting}
              />
              <span className="product-form__checkbox-text">
                Produit disponible à la vente
              </span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="product-form__actions">
          <button 
            type="button" 
            className="product-form__button product-form__button--secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <X size={18} />
            <span>Annuler</span>
          </button>
          
          <button 
            type="submit" 
            className="product-form__button product-form__button--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="product-form__spinner" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Check size={18} />
                <span>{mode === 'create' ? 'Ajouter le produit' : 'Enregistrer les modifications'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
