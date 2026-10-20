import { Bell, ChevronRight, HelpCircle, GraduationCap, LogOut, Mail, MapPin, Phone, Settings, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { useAuthStore } from '../features/auth/authStore'

export function ProfilePage() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  const links = [
    { icon: Settings, label: 'Paramètres', text: 'Préférences et apparence', to: '/settings' },
    { icon: Bell, label: 'Notifications', text: 'Gérer vos alertes', to: '/notifications' },
    { icon: ShieldCheck, label: 'Confidentialité', text: 'Sécurité de votre compte', to: '/settings' },
    { icon: HelpCircle, label: 'Aide & support', text: 'Questions fréquentes et assistance', to: '/settings' },
  ]
  return <div className="profile-page"><PageHeader title="Mon profil" subtitle="Gérez vos informations personnelles"/><section className="profile-card"><div className="profile-cover"/><div className="profile-avatar">{user?.firstName.charAt(0) ?? 'E'}<button aria-label="Modifier la photo">✎</button></div><h2>{user?.name ?? 'Étudiant'}</h2><span className="student-badge"><GraduationCap size={14}/> Étudiant</span><div className="profile-contact"><span><Phone size={16}/><b>{user?.phone}</b></span><span><Mail size={16}/><b>{user?.email}</b></span><span><MapPin size={16}/><b>{user?.faculty}</b></span></div><button className="button button--outline">Modifier mon profil</button></section><section className="profile-menu">{links.map(({ icon: Icon, label, text, to }) => <button key={label} onClick={() => navigate(to)}><span><Icon size={19}/></span><div><b>{label}</b><small>{text}</small></div><ChevronRight size={17}/></button>)}<button className="logout" onClick={() => { logout(); navigate('/login') }}><span><LogOut size={19}/></span><div><b>Se déconnecter</b><small>À bientôt sur Food Campus</small></div><ChevronRight size={17}/></button></section></div>
}
