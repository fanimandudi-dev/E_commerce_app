import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { VendorProduct } from '../../features/vendor/vendorStore'
import './styles/product-performance.css'

interface ProductPerformanceProps {
  rank: number
  product: VendorProduct
}

export function ProductPerformance({ rank, product }: ProductPerformanceProps) {
  const sales = product.sales ?? 0
  const rating = product.rating ?? 0
  
  const getTrendIcon = () => {
    if (rating > 4) return <TrendingUp size={14} />
    if (rating < 3) return <TrendingDown size={14} />
    return <Minus size={14} />
  }

  const getTrendColor = () => {
    if (rating > 4) return 'product-performance--positive'
    if (rating < 3) return 'product-performance--negative'
    return 'product-performance--neutral'
  }

  return (
    <div className="product-performance">
      <div className="product-performance__rank">
        <span>{rank}</span>
      </div>
      
      <div className="product-performance__image">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="product-performance__img"
          />
        ) : (
          <div className="product-performance__placeholder">
            {product.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="product-performance__info">
        <span className="product-performance__name">{product.name}</span>
        <span className="product-performance__category">{product.category}</span>
      </div>
      
      <div className="product-performance__sales">
        <span className="product-performance__sales-count">{sales}</span>
        <span className="product-performance__sales-label">ventes</span>
      </div>
      
      <div className={`product-performance__trend ${getTrendColor()}`}>
        {getTrendIcon()}
        <span>{rating.toFixed(1)}</span>
      </div>
      
      <div className="product-performance__price">
        FC {product.price.toLocaleString()}
      </div>
    </div>
  )
}
