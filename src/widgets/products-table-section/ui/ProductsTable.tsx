import { ScrollArea } from '@mantine/core'
import { memo, useMemo } from 'react'

import type { ProductItem, SortField, SortOrder } from '@/entities/product'
import { cn } from '@/shared/lib/cn'

import { ProductsTableHead } from './ProductsTableHead'
import { ProductsTableRow } from './ProductsTableRow'
import { ProductsTableSkeletonRows } from './ProductsTableSkeletonRows'
import styles from './ProductsTable.module.scss'

interface ProductsTableProps {
  isAllVisibleSelected: boolean
  isInitialLoading: boolean
  isPartiallyVisibleSelected: boolean
  isTableUpdating: boolean
  products: ProductItem[]
  selectedProductIds: Array<ProductItem['id']>
  sortField: SortField
  sortOrder: SortOrder
  onToggleAllVisibleProducts: () => void
  onToggleSelectedProduct: (productId: ProductItem['id']) => void
  onToggleSort: (field: Exclude<SortField, null>) => void
}

export const ProductsTable = memo(function ProductsTable({
  isAllVisibleSelected,
  isInitialLoading,
  isPartiallyVisibleSelected,
  isTableUpdating,
  products,
  selectedProductIds,
  sortField,
  sortOrder,
  onToggleAllVisibleProducts,
  onToggleSelectedProduct,
  onToggleSort,
}: ProductsTableProps) {
  const selectedProductIdsSet = useMemo(() => new Set(selectedProductIds), [selectedProductIds])

  return (
    <ScrollArea className={styles.tableScroll}>
      <div className={cn(styles.tableWrap, isTableUpdating && styles.tableWrapDisabled)}>
        <table aria-busy={isTableUpdating} className={styles.table}>
          <colgroup>
            <col className={styles.productColumn} />
            <col className={styles.vendorColumn} />
            <col className={styles.skuColumn} />
            <col className={styles.ratingColumn} />
            <col className={styles.priceColumn} />
            <col className={styles.plusColumn} />
            <col className={styles.menuColumn} />
          </colgroup>

          <ProductsTableHead
            isAllVisibleSelected={isAllVisibleSelected}
            isPartiallyVisibleSelected={isPartiallyVisibleSelected}
            sortField={sortField}
            sortOrder={sortOrder}
            onToggleAllVisibleProducts={onToggleAllVisibleProducts}
            onToggleSort={onToggleSort}
          />

          <tbody>
            {isInitialLoading ? (
              <ProductsTableSkeletonRows />
            ) : products.length ? (
              products.map((product) => (
                <ProductsTableRow
                  isSelected={selectedProductIdsSet.has(product.id)}
                  key={product.id}
                  product={product}
                  onToggleSelectedProduct={onToggleSelectedProduct}
                />
              ))
            ) : (
              <tr>
                <td className={styles.emptyState} colSpan={7}>
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  )
})
