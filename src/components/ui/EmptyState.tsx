import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyState({ icon: Icon, title, text, action, to }: { icon: LucideIcon; title: string; text: string; action?: string; to?: string }) {
  return <div className="empty-state"><span><Icon size={30} /></span><h2>{title}</h2><p>{text}</p>{action && to && <Link className="button button--primary" to={to}>{action}</Link>}</div>
}
