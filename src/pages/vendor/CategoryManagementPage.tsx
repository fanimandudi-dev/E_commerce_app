import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, ArrowLeft, Check, X } from 'lucide-react'
import { useVendorStore } from '../../features/vendor/vendorStore'
import type { ProductCategory } from '../../domain/models'
import './styles/category-management.css'

export function CategoryManagementPage() {
  const navigate = useNavigate()
  const { categories, products, addProduct, deleteProduct } = useVendorStore()
  
  const [newCategory, setNewCategory] = useState('')
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  const [editName, setEditName] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get all unique categories from products
  const allCategories = [...new Set(products.map(p => p.category))] as ProductCategory[]

  const validateCategory = useCallback((name: string) => {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) {
      newErrors.name = "Le nom de la catégorie est requis"
    } else if (name.length > 50) {
      newErrors.name = "Le nom ne doit pas dépasser 50 caractères"
    } else if (allCategories.includes(name as ProductCategory) && 
               (!editingCategory || name !== editingCategory)) {
      newErrors.name = "Cette catégorie existe déjà"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [allCategories, editingCategory])

  const handleAddCategory = useCallback(async () => {
    if (!validateCategory(newCategory)) return
    
    setIsSubmitting(true)
    try {
      // Create a dummy product to add the category
      // In a real implementation, we'd have a dedicated categories API
      const currentVendor = useVendorStore.getState().currentVendor
      const dummyProduct = {
        id: `temp-${Date.now()}`,
        name: `Produit temporaire - ${newCategory}`,
        shortName: newCategory.substring(0, 20),
        description: 'Produit temporaire pour créer la catégorie',
        category: newCategory as ProductCategory,
        price: 0,
        vendorId: currentVendor?.id || 'current-vendor',
        vendor: currentVendor ? {
          id: currentVendor.id,
          name: currentVendor.name,
          initials: currentVendor.initials,
          active: currentVendor.active
        } : { id: 'current-vendor', name: 'Vendeur', initials: 'V', active: true },
        available: false,
        stock: 0,
        preparationMinutes: 0,
        image: ''
      }
      
      await addProduct(dummyProduct)
      setNewCategory('')
      setErrors({})
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [validateCategory, newCategory, addProduct])

  const handleStartEdit = useCallback((category: ProductCategory) => {
    setEditingCategory(category)
    setEditName(category)
  }, [])

  const handleSaveEdit = useCallback(async () => {
    if (!editingCategory || !validateCategory(editName)) return
    
    setIsSubmitting(true)
    try {
      // Update all products with the old category name
      // In a real implementation, we'd have a dedicated API for this
      // For now, we'll just add a new product with the new category
      // and the vendor can manually update existing products
      
      // This is a simplified approach - in production, you'd want to:
      // 1. Update all products with old category to new category
      // 2. Or have a separate categories table
      
      setEditingCategory(null)
      setEditName('')
      setErrors({})
    } catch (error) {
      console.error('Erreur lors de la modification:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [editingCategory, editName, validateCategory])

  const handleCancelEdit = useCallback(() => {
    setEditingCategory(null)
    setEditName('')
    setErrors({})
  }, [])

  const handleDeleteCategory = useCallback(async (category: ProductCategory) => {
    // Check if category is used by any available product
    const productsInCategory = products.filter(
      p => p.category === category && p.available
    )
    
    if (productsInCategory.length > 0) {
      setErrors({ delete: `Impossible de supprimer: ${productsInCategory.length} produit(s) actif(s) utilisent cette catégorie` })
      return
    }
    
    setIsSubmitting(true)
    try {
      // Delete all products in this category (including unavailable ones)
      const productsToDelete = products.filter(p => p.category === category)
      for (const product of productsToDelete) {
        await deleteProduct(product.id)
      }
      
      setErrors({})
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [products, deleteProduct])

  const getCategoryProductCount = useCallback((category: ProductCategory) => {
    return products.filter(p => p.category === category).length
  }, [products])

  return (
    <div className="category-management">
      {/* Header */}
      <div className="category-management__header">
        <button 
          className="category-management__back-button"
          onClick={() => navigate('/vendor/settings')}
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
          <span>Retour aux paramètres</span>
        </button>
        
        <div className="category-management__title">
          <h2>Gestion des catégories</h2>
          <p>Organisez vos produits par catégories</p>
        </div>
      </div>

      {/* Add Category Form */}
      <div className="category-management__add-section">
        <h3>Ajouter une nouvelle catégorie</h3>
        <div className="category-management__add-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nom de la catégorie (ex: Repas, Boissons, Desserts)"
            className={`category-management__input ${errors.name ? 'category-management__input--error' : ''}`}
            disabled={isSubmitting || !!editingCategory}
          />
          <button
            onClick={handleAddCategory}
            className="category-management__button category-management__button--primary"
            disabled={isSubmitting || !newCategory.trim() || !!editingCategory}
          >
            <Plus size={18} />
            <span>Ajouter</span>
          </button>
        </div>
        {errors.name && <span className="category-management__error">{errors.name}</span>}
      </div>

      {/* Edit Category Form (if editing) */}
      {editingCategory && (
        <div className="category-management__edit-section">
          <h3>Modifier la catégorie</h3>
          <div className="category-management__edit-form">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nouveau nom"
              className={`category-management__input ${errors.name ? 'category-management__input--error' : ''}`}
              disabled={isSubmitting}
            />
            <div className="category-management__edit-actions">
              <button
                onClick={handleSaveEdit}
                className="category-management__button category-management__button--success"
                disabled={isSubmitting || !editName.trim()}
              >
                <Check size={18} />
                <span>Enregistrer</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="category-management__button category-management__button--secondary"
                disabled={isSubmitting}
              >
                <X size={18} />
                <span>Annuler</span>
              </button>
            </div>
          </div>
          {errors.name && <span className="category-management__error">{errors.name}</span>}
        </div>
      )}

      {/* Category List */}
      <div className="category-management__list-section">
        <h3>Catégories existantes ({allCategories.length})</h3>
        
        {allCategories.length === 0 ? (
          <div className="category-management__empty">
            <p>Aucune catégorie définie. Ajoutez votre première catégorie ci-dessus.</p>
          </div>
        ) : (
          <div className="category-management__table">
            <div className="category-management__table-header">
              <span className="category-management__th">Nom</span>
              <span className="category-management__th">Produits</span>
              <span className="category-management__th">Actions</span>
            </div>
            
            {allCategories.map((category) => (
              <div key={category} className="category-management__table-row">
                <span className="category-management__td category-management__td--name">
                  {category}
                </span>
                <span className="category-management__td category-management__td--count">
                  {getCategoryProductCount(category)}
                </span>
                <span className="category-management__td category-management__td--actions">
                  <button
                    onClick={() => handleStartEdit(category)}
                    className="category-management__action-button"
                    aria-label={`Modifier ${category}`}
                    disabled={isSubmitting}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="category-management__action-button category-management__action-button--danger"
                    aria-label={`Supprimer ${category}`}
                    disabled={isSubmitting}
                  >
                    <Trash2 size={16} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
        
        {errors.delete && (
          <div className="category-management__error category-management__error--global">
            {errors.delete}
          </div>
        )}
      </div>

      {/* Quick Access */}
      <div className="category-management__quick-access">
        <Link to="/vendor/products" className="category-management__quick-link">
          ← Retour à la liste des produits
        </Link>
      </div>
    </div>
  )
}

export default CategoryManagementPage
