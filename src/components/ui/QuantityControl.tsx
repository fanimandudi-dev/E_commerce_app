import { Minus, Plus } from 'lucide-react'

export function QuantityControl({ value, onDecrease, onIncrease, compact = false }: { value: number; onDecrease: () => void; onIncrease: () => void; compact?: boolean }) {
  return <div className={`quantity ${compact ? 'quantity--compact' : ''}`}>
    <button onClick={onDecrease} aria-label="Diminuer"><Minus size={14} /></button>
    <span>{value}</span>
    <button onClick={onIncrease} aria-label="Augmenter"><Plus size={14} /></button>
  </div>
}
