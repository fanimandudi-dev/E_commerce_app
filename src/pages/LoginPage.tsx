import { ArrowRight, Eye, LockKeyhole, Phone, ShieldCheck, Store } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Brand } from '../components/ui/Brand'
import { useAuthStore } from '../features/auth/authStore'

export function LoginPage() {
  const [phone, setPhone] = useState('+243 970 000 007')
  const [password, setPassword] = useState('campus2026')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVendor, setIsVendor] = useState(false)
  const login = useAuthStore(state => state.login)
  const loginAsVendor = useAuthStore(state => state.loginAsVendor)
  const navigate = useNavigate()
  const location = useLocation()
  const destination = (location.state as { from?: string } | null)?.from || (isVendor ? '/vendor/dashboard' : '/home')

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('')
    const ok = isVendor 
      ? await loginAsVendor(phone, password) 
      : await login(phone, password, false)
    setLoading(false)
    if (ok) navigate(destination, { replace: true })
    else setError('Veuillez renseigner vos identifiants.')
  }

  function toggleVendorMode() {
    setIsVendor(!isVendor)
    // Update default phone for vendor
    if (!isVendor) {
      setPhone('+243 970 000 001')
    } else {
      setPhone('+243 970 000 007')
    }
  }

  return <div className="login-card">
    <div className="login-mobile-brand"><Brand/></div>
    <div className="login-card__intro"><span className="eyebrow">BON RETOUR PARMI NOUS</span><h2>Connectez-vous</h2><p>Accédez aux boutiques de votre campus et suivez vos commandes.</p></div>
    <form onSubmit={submit}>
      <label>Numéro de téléphone<div className="field"><Phone size={18}/><input value={phone} onChange={event => setPhone(event.target.value)} placeholder="+243 000 000 000" autoComplete="tel"/></div></label>
      <label>Mot de passe<div className="field"><LockKeyhole size={18}/><input value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password"/><Eye size={17}/></div></label>
      <div className="form-row"><label className="checkbox"><input type="checkbox" defaultChecked/> Se souvenir de moi</label><a href="#forgot">Mot de passe oublié&nbsp;?</a></div>
      <div className="vendor-toggle">
        <button 
          type="button" 
          className={`button button--small ${isVendor ? 'button--primary' : 'button--secondary'}`}
          onClick={toggleVendorMode}
        >
          <Store size={16} />
          {isVendor ? 'Mode Vendeur' : 'Se connecter en tant que vendeur'}
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}
      <button className="button button--primary button--block button--large" disabled={loading}>{loading ? 'Connexion…' : <>Se connecter <ArrowRight size={18}/></>}</button>
    </form>
    <p className="signup-copy">Pas encore de compte&nbsp;? <a href="#register">Créer un compte</a></p>
    <div className="login-secure"><ShieldCheck size={16}/> Connexion requise · Données protégées</div>
  </div>
}
