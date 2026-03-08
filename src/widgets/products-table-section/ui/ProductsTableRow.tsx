import { memo } from 'react'

import type { ProductItem } from '@/entities/product'
import DotsThreeIcon from '@/shared/assets/icons/dots-three-circle.svg?react'
import PlusWhiteIcon from '@/shared/assets/icons/plus-white.svg?react'
import { cn } from '@/shared/lib/cn'
import { formatPrice, formatRating } from '@/shared/lib/format'

import styles from './ProductsTableRow.module.scss'

const renderPrice = (value: number) => {
  const [whole = '', fraction = ''] = formatPrice(value).split(',')

  return (
    <>
      <span>{whole}</span>
      {fraction ? <span className={styles.priceFraction}>,{fraction}</span> : null}
    </>
  )
}

interface ProductsTableRowProps {
  isSelected: boolean
  product: ProductItem
  onToggleSelectedProduct: (productId: ProductItem['id']) => void
}

export const ProductsTableRow = memo(function ProductsTableRow({
  isSelected,
  product,
  onToggleSelectedProduct
}: ProductsTableRowProps) {
  return (
    <tr className={cn(isSelected && styles.selectedRow)}>
      <td>
        <div className={styles.productCell}>
          <button
            aria-label={`Выбрать ${product.title}`}
            className={cn(styles.checkbox, isSelected && styles.checkboxSelected)}
            onClick={() => onToggleSelectedProduct(product.id)}
            type="button"
          />

          {product.thumbnail ? (
            <img alt="" className={styles.thumb} src={product.thumbnail} />
          ) : (
            <div className={styles.thumbPlaceholder}>{product.title.slice(0, 1)}</div>
          )}

          <div className={styles.productMeta}>
            <div className={styles.productTitle}>{product.title}</div>
            <div className={styles.productCategory}>{product.category}</div>
          </div>
        </div>
      </td>

      <td className={styles.vendorCell}>{product.vendor}</td>
      <td className={styles.skuCell}>{product.sku}</td>
      <td className={cn(styles.ratingCell, product.rating < 3 && styles.ratingLow)}>{formatRating(product.rating)}</td>
      <td className={styles.priceCell}>{renderPrice(product.price)}</td>

      <td className={styles.actionCell}>
        <button aria-label={`Быстрое действие для ${product.title}`} className={styles.rowPlusAction} type="button">
          <PlusWhiteIcon aria-hidden className={styles.rowPlusIcon} />
        </button>
      </td>

      <td className={styles.actionCell}>
        <button aria-label={`Действия для ${product.title}`} className={styles.rowAction} type="button">
          <DotsThreeIcon aria-hidden className={styles.rowActionIcon} />
        </button>
      </td>
    </tr>
  )
})
