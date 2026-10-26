import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVendorStore } from '../../features/vendor/vendorStore'
import { CategoryManagementPage } from '../../pages/vendor/CategoryManagementPage'
import { 
  User, 
  Store, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Pencil,
  Save,
  X,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Tag
} from 'lucide-react'
import './styles/settings-page.css'

export function SettingsPage() {
  const { vendor, updateVendor, loading, error } = useVendorStore()
  const [activeSection, setActiveSection] = useState<'profile' | 'store' | 'notifications' | 'security' | 'help' | 'categories'>('profile')
  const [editMode, setEditMode] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string | File | null>>({})
  const [notificationSettings, setNotificationSettings] = useState<Record<string, boolean>>({
    orderUpdates: true,
    newMessages: true,
    promotions: true,
    systemAlerts: true,
    emailNotifications: true,
    pushNotifications: true
  })
  const [securitySettings, setSecuritySettings] = useState<Record<string, boolean>>({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordChanges: true,
    deviceManagement: false
  })

  // Initialiser les données du formulaire
  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || '',
        email: vendor.email || '',
        phone: vendor.phone || '',
        storeName: vendor.name || '',
        storeDescription: vendor.description || '',
        storeAddress: vendor.address || '',
        storeLogo: null,
        storeBanner: null
      })
    }
  }, [vendor])

  // Gérer le changement de section
  const handleSectionChange = (section: 'profile' | 'store' | 'notifications' | 'security' | 'help' | 'categories') => {
    setActiveSection(section)
    setEditMode(null)
  }

  // Gérer le changement de champ
  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (section: string) => {
    if (vendor) {
      const updateData: Record<string, string> = {}
      
      if (section === 'profile') {
        updateData.name = formData.name as string
        updateData.email = formData.email as string
        updateData.phone = formData.phone as string
      } else if (section === 'store') {
        updateData.name = formData.storeName as string
        updateData.description = formData.storeDescription as string
        updateData.address = formData.storeAddress as string
      }

      updateVendor(vendor.id, updateData)
      setEditMode(null)
    }
  }

  // Gérer l'annulation de l'édition
  const handleCancel = () => {
    setEditMode(null)
    if (vendor) {
      setFormData({
        name: vendor.name || '',
        email: vendor.email || '',
        phone: vendor.phone || '',
        storeName: vendor.name || '',
        storeDescription: vendor.description || '',
        storeAddress: vendor.address || '',
        storeLogo: null,
        storeBanner: null
      })
    }
  }

  // Gérer le changement de fichier
  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }))
    }
  }

  // Gérer le changement de paramètre de notification
  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  // Gérer le changement de paramètre de sécurité
  const handleSecurityChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="settings-page__loading">
        <div className="settings-page__spinner"></div>
        <p>Chargement des paramètres...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="settings-page__error">
        <p>Erreur lors du chargement des paramètres: {error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    )
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-page__header">
        <h1 className="settings-page__title">Paramètres</h1>
        <p className="settings-page__subtitle">Gérez les paramètres de votre boutique et de votre compte</p>
      </div>

      {/* Main Content */}
      <div className="settings-page__content">
        {/* Sidebar Navigation */}
        <nav className="settings-page__sidebar">
          <ul className="settings-page__nav-list">
            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'profile' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('profile')}
              >
                <User size={20} />
                <span>Profil</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>

            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'store' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('store')}
              >
                <Store size={20} />
                <span>Ma Boutique</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>

            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'categories' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('categories')}
              >
                <Tag size={20} />
                <span>Catégories</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>

            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'notifications' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('notifications')}
              >
                <Bell size={20} />
                <span>Notifications</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>

            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'security' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('security')}
              >
                <Shield size={20} />
                <span>Sécurité</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>

            <li className="settings-page__nav-item">
              <button 
                className={`settings-page__nav-button ${activeSection === 'help' ? 'settings-page__nav-button--active' : ''}`}
                onClick={() => handleSectionChange('help')}
              >
                <HelpCircle size={20} />
                <span>Aide et support</span>
                <ChevronRight size={16} className="settings-page__nav-icon" />
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Section */}
        <main className="settings-page__main">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <User size={24} />
                  Informations personnelles
                </h2>
                {editMode !== 'profile' && (
                  <button 
                    className="settings-page__edit-button"
                    onClick={() => setEditMode('profile')}
                  >
                    <Pencil size={16} />
                    Modifier
                  </button>
                )}
              </div>

              <div className="settings-page__section-content">
                <div className="settings-page__form">
                  {/* Avatar */}
                  <div className="settings-page__avatar-section">
                    <div className="settings-page__avatar">
                      {formData.name ? (
                        <span className="settings-page__avatar-initials">
                          {(formData.name as string).split(' ').map(n => n[0]).join('')}
                        </span>
                      ) : (
                        <User size={40} />
                      )}
                    </div>
                    {editMode === 'profile' && (
                      <label className="settings-page__file-upload">
                        <Upload size={16} />
                        Changer la photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('avatar', e)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="settings-page__fields">
                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Nom complet</label>
                      {editMode === 'profile' ? (
                        <input
                          type="text"
                          value={formData.name as string}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="settings-page__field-input"
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.name as string || 'Non spécifié'}</div>
                      )}
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Adresse e-mail</label>
                      {editMode === 'profile' ? (
                        <input
                          type="email"
                          value={formData.email as string}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="settings-page__field-input"
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.email as string || 'Non spécifié'}</div>
                      )}
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Téléphone</label>
                      {editMode === 'profile' ? (
                        <input
                          type="tel"
                          value={formData.phone as string}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="settings-page__field-input"
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.phone as string || 'Non spécifié'}</div>
                      )}
                    </div>
                  </div>

                  {/* Edit Actions */}
                  {editMode === 'profile' && (
                    <div className="settings-page__actions">
                      <button 
                        className="settings-page__action-button settings-page__action-button--secondary"
                        onClick={handleCancel}
                      >
                        <X size={16} />
                        Annuler
                      </button>
                      <button 
                        className="settings-page__action-button settings-page__action-button--primary"
                        onClick={() => handleSubmit('profile')}
                      >
                        <Save size={16} />
                        Enregistrer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Store Section */}
          {activeSection === 'store' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <Store size={24} />
                  Informations de la boutique
                </h2>
                {editMode !== 'store' && (
                  <button 
                    className="settings-page__edit-button"
                    onClick={() => setEditMode('store')}
                  >
                    <Pencil size={16} />
                    Modifier
                  </button>
                )}
              </div>

              <div className="settings-page__section-content">
                <div className="settings-page__form">
                  {/* Store Banner and Logo */}
                  <div className="settings-page__store-media">
                    <div className="settings-page__banner">
                      <div className="settings-page__banner-placeholder">
                        <Store size={48} />
                        <span>Bannière de la boutique</span>
                      </div>
                      {editMode === 'store' && (
                        <label className="settings-page__file-upload settings-page__file-upload--banner">
                          <Upload size={16} />
                          Changer la bannière
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('storeBanner', e)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                    
                    <div className="settings-page__logo">
                      <div className="settings-page__logo-placeholder">
                        <Store size={32} />
                      </div>
                      {editMode === 'store' && (
                        <label className="settings-page__file-upload">
                          <Upload size={16} />
                          Changer le logo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('storeLogo', e)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Store Form Fields */}
                  <div className="settings-page__fields">
                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Nom de la boutique</label>
                      {editMode === 'store' ? (
                        <input
                          type="text"
                          value={formData.storeName as string}
                          onChange={(e) => handleInputChange('storeName', e.target.value)}
                          className="settings-page__field-input"
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.storeName as string || 'Non spécifié'}</div>
                      )}
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Description</label>
                      {editMode === 'store' ? (
                        <textarea
                          value={formData.storeDescription as string}
                          onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                          className="settings-page__field-input settings-page__field-input--textarea"
                          rows={4}
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.storeDescription as string || 'Aucune description'}</div>
                      )}
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Adresse</label>
                      {editMode === 'store' ? (
                        <input
                          type="text"
                          value={formData.storeAddress as string}
                          onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                          className="settings-page__field-input"
                        />
                      ) : (
                        <div className="settings-page__field-value">{formData.storeAddress as string || 'Non spécifié'}</div>
                      )}
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Statut de la boutique</label>
                      <div className="settings-page__field-value">
                        <span className={`settings-page__status-badge ${vendor?.active ? 'settings-page__status-badge--active' : 'settings-page__status-badge--inactive'}`}>
                          {vendor?.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="settings-page__field">
                      <label className="settings-page__field-label">Date de création</label>
                      <div className="settings-page__field-value">
                        {vendor?.createdAt ? new Date(vendor.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : 'Non spécifié'}
                      </div>
                    </div>
                  </div>

                  {/* Edit Actions */}
                  {editMode === 'store' && (
                    <div className="settings-page__actions">
                      <button 
                        className="settings-page__action-button settings-page__action-button--secondary"
                        onClick={handleCancel}
                      >
                        <X size={16} />
                        Annuler
                      </button>
                      <button 
                        className="settings-page__action-button settings-page__action-button--primary"
                        onClick={() => handleSubmit('store')}
                      >
                        <Save size={16} />
                        Enregistrer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Categories Section */}
          {activeSection === 'categories' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <Tag size={24} />
                  Gestion des catégories
                </h2>
              </div>
              <div className="settings-page__section-content">
                <CategoryManagementPage />
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <Bell size={24} />
                  Préférences de notification
                </h2>
              </div>

              <div className="settings-page__section-content">
                <div className="settings-page__settings-group">
                  <h3 className="settings-page__group-title">Notifications de commande</h3>
                  <p className="settings-page__group-description">Recevez des notifications pour les mises à jour des commandes</p>
                  
                  <div className="settings-page__settings-list">
                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Nouvelle commande</span>
                        <span className="settings-page__setting-description">Notification lorsqu'une nouvelle commande est passée</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.orderUpdates}
                          onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Statut de la commande</span>
                        <span className="settings-page__setting-description">Notification lors du changement de statut</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.orderUpdates}
                          onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Nouveaux messages</span>
                        <span className="settings-page__setting-description">Notification pour les nouveaux messages des clients</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.newMessages}
                          onChange={(e) => handleNotificationChange('newMessages', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-page__settings-group">
                  <h3 className="settings-page__group-title">Notifications marketing</h3>
                  
                  <div className="settings-page__settings-list">
                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Promotions</span>
                        <span className="settings-page__setting-description">Notification pour les promotions et offres spéciales</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.promotions}
                          onChange={(e) => handleNotificationChange('promotions', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Alertes système</span>
                        <span className="settings-page__setting-description">Notification pour les alertes système importantes</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.systemAlerts}
                          onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-page__settings-group">
                  <h3 className="settings-page__group-title">Canaux de notification</h3>
                  
                  <div className="settings-page__settings-list">
                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Notifications par e-mail</span>
                        <span className="settings-page__setting-description">Recevoir des notifications par e-mail</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Notifications push</span>
                        <span className="settings-page__setting-description">Recevoir des notifications push sur l'appareil</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-page__actions">
                  <button 
                    className="settings-page__action-button settings-page__action-button--primary"
                    onClick={() => alert('Paramètres de notification enregistrés')}
                  >
                    <Save size={16} />
                    Enregistrer les paramètres
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <Shield size={24} />
                  Paramètres de sécurité
                </h2>
              </div>

              <div className="settings-page__section-content">
                <div className="settings-page__settings-group">
                  <h3 className="settings-page__group-title">Authentification</h3>
                  
                  <div className="settings-page__settings-list">
                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Authentification à deux facteurs</span>
                        <span className="settings-page__setting-description">Ajoutez une couche supplémentaire de sécurité à votre compte</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Alertes de connexion</span>
                        <span className="settings-page__setting-description">Recevez des alertes pour les nouvelles connexions</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={securitySettings.loginAlerts}
                          onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Changements de mot de passe</span>
                        <span className="settings-page__setting-description">Recevez des notifications pour les changements de mot de passe</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordChanges}
                          onChange={(e) => handleSecurityChange('passwordChanges', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>

                    <div className="settings-page__setting">
                      <label className="settings-page__setting-label">
                        <span className="settings-page__setting-name">Gestion des appareils</span>
                        <span className="settings-page__setting-description">Gérez les appareils connectés à votre compte</span>
                      </label>
                      <label className="settings-page__toggle">
                        <input
                          type="checkbox"
                          checked={securitySettings.deviceManagement}
                          onChange={(e) => handleSecurityChange('deviceManagement', e.target.checked)}
                        />
                        <span className="settings-page__toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-page__settings-group">
                  <h3 className="settings-page__group-title">Actions de sécurité</h3>
                  
                  <div className="settings-page__actions-list">
                    <button className="settings-page__action-card">
                      <Lock size={24} />
                      <div className="settings-page__action-info">
                        <span className="settings-page__action-name">Changer le mot de passe</span>
                        <span className="settings-page__action-description">Mettez à jour votre mot de passe</span>
                      </div>
                      <ChevronRight size={20} />
                    </button>

                    <button className="settings-page__action-card">
                      <Shield size={24} />
                      <div className="settings-page__action-info">
                        <span className="settings-page__action-name">Vérifier la sécurité</span>
                        <span className="settings-page__action-description">Vérifiez la sécurité de votre compte</span>
                      </div>
                      <ChevronRight size={20} />
                    </button>

                    <button className="settings-page__action-card settings-page__action-card--danger">
                      <Trash2 size={24} />
                      <div className="settings-page__action-info">
                        <span className="settings-page__action-name">Supprimer le compte</span>
                        <span className="settings-page__action-description">Supprimez définitivement votre compte</span>
                      </div>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="settings-page__actions">
                  <button 
                    className="settings-page__action-button settings-page__action-button--primary"
                    onClick={() => alert('Paramètres de sécurité enregistrés')}
                  >
                    <Save size={16} />
                    Enregistrer les paramètres
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {activeSection === 'help' && (
            <div className="settings-page__section">
              <div className="settings-page__section-header">
                <h2 className="settings-page__section-title">
                  <HelpCircle size={24} />
                  Aide et support
                </h2>
              </div>

              <div className="settings-page__section-content">
                <div className="settings-page__help-grid">
                  <div className="settings-page__help-card">
                    <HelpCircle size={32} />
                    <h3 className="settings-page__help-title">Centre d'aide</h3>
                    <p className="settings-page__help-description">Trouvez des réponses aux questions fréquentes</p>
                    <button className="settings-page__help-button">
                      Visiter le centre d'aide
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="settings-page__help-card">
                    <Bell size={32} />
                    <h3 className="settings-page__help-title">Contactez-nous</h3>
                    <p className="settings-page__help-description">Contactez notre équipe de support</p>
                    <button className="settings-page__help-button">
                      Envoyer un message
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="settings-page__help-card">
                    <CreditCard size={32} />
                    <h3 className="settings-page__help-title">Paiements</h3>
                    <p className="settings-page__help-description">Questions sur les paiements et factures</p>
                    <button className="settings-page__help-button">
                      En savoir plus
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="settings-page__help-card">
                    <Store size={32} />
                    <h3 className="settings-page__help-title">Gestion de boutique</h3>
                    <p className="settings-page__help-description">Guide pour gérer votre boutique</p>
                    <button className="settings-page__help-button">
                      Lire le guide
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="settings-page__help-section">
                  <h3 className="settings-page__help-section-title">Informations sur l'application</h3>
                  <div className="settings-page__help-info-grid">
                    <div className="settings-page__help-info">
                      <span className="settings-page__help-info-label">Version</span>
                      <span className="settings-page__help-info-value">1.0.0</span>
                    </div>
                    <div className="settings-page__help-info">
                      <span className="settings-page__help-info-label">Dernière mise à jour</span>
                      <span className="settings-page__help-info-value">20 Octobre 2026</span>
                    </div>
                    <div className="settings-page__help-info">
                      <span className="settings-page__help-info-label">Politique de confidentialité</span>
                      <span className="settings-page__help-info-value">
                        <a href="#" className="settings-page__help-link">Lire</a>
                      </span>
                    </div>
                    <div className="settings-page__help-info">
                      <span className="settings-page__help-info-label">Conditions d'utilisation</span>
                      <span className="settings-page__help-info-value">
                        <a href="#" className="settings-page__help-link">Lire</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
