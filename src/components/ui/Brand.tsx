import { Utensils } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="Food Campus">
    <span className="brand__mark"><Utensils size={compact ? 18 : 24} strokeWidth={2.4} /></span>
    <span className="brand__word"><b>Food</b><em>Campus</em></span>
  </div>
}
