import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import './styles/stat-card.css'

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  progress?: number
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red'
}

export function StatCard({
  icon,
  title,
  value,
  change,
  changeType = 'neutral',
  progress,
  color = 'blue'
}: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'stat-card--green'
      case 'blue': return 'stat-card--blue'
      case 'purple': return 'stat-card--purple'
      case 'orange': return 'stat-card--orange'
      case 'red': return 'stat-card--red'
      default: return 'stat-card--blue'
    }
  }

  const renderChangeIcon = () => {
    switch (changeType) {
      case 'positive': return <TrendingUp size={14} />
      case 'negative': return <TrendingDown size={14} />
      case 'neutral': return <Minus size={14} />
      default: return <Minus size={14} />
    }
  }

  return (
    <div className={`stat-card ${getColorClass()}`}>
      <div className="stat-card__icon">
        {icon}
      </div>
      
      <div className="stat-card__content">
        <span className="stat-card__title">{title}</span>
        <div className="stat-card__value-row">
          <h3 className="stat-card__value">{value}</h3>
          
          {change !== undefined && (
            <span className={`stat-card__change stat-card__change--${changeType}`}>
              {renderChangeIcon()}
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
          )}
        </div>
        
        {progress !== undefined && (
          <div className="stat-card__progress">
            <div 
              className="stat-card__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
