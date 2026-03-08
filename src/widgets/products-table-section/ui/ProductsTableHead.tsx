import { memo } from 'react'

import type { SortField, SortOrder } from '@/entities/product'
import { cn } from '@/shared/lib/cn'

import styles from './ProductsTableHead.module.scss'

interface ProductsTableHeadProps {
  isAllVisibleSelected: boolean
  isPartiallyVisibleSelected: boolean
  sortField: SortField
  sortOrder: SortOrder
  onToggleAllVisibleProducts: () => void
  onToggleSort: (field: Exclude<SortField, null>) => void
}

export const ProductsTableHead = memo(function ProductsTableHead({
  isAllVisibleSelected,
  isPartiallyVisibleSelected,
  sortField,
  sortOrder,
  onToggleAllVisibleProducts,
  onToggleSort,
}: ProductsTableHeadProps) {
  return (
    <thead>
      <tr>
        <th>
          <div className={styles.productHeader}>
            <button
              aria-label="Выделить все товары на странице"
              aria-pressed={isAllVisibleSelected}
              className={cn(
                styles.headerCheckbox,
                isAllVisibleSelected && styles.checkboxSelected,
                isPartiallyVisibleSelected && styles.checkboxIndeterminate,
              )}
              onClick={onToggleAllVisibleProducts}
              type="button"
            />

            <span className={styles.headerTitle}>Наименование</span>
          </div>
        </th>

        <th>
          <div className={cn(styles.headerTitle, styles.headerTitleCentered)}>Вендор</div>
        </th>

        <th>
          <div className={cn(styles.headerTitle, styles.headerTitleCentered)}>Артикул</div>
        </th>

        <th>
          <button className={cn(styles.sortButton, styles.sortButtonCentered)} onClick={() => onToggleSort('rating')} type="button">
            Оценка
            <span className={cn(styles.sortIcon, sortField === 'rating' && styles.sortIconActive)} data-order={sortOrder}>
              ↑
            </span>
          </button>
        </th>

        <th>
          <button className={cn(styles.sortButton, styles.sortButtonCentered)} onClick={() => onToggleSort('price')} type="button">
            Цена, ₽
            <span className={cn(styles.sortIcon, sortField === 'price' && styles.sortIconActive)} data-order={sortOrder}>
              ↑
            </span>
          </button>
        </th>

        <th />
        <th />
      </tr>
    </thead>
  )
})
