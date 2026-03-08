import { Button } from '@mantine/core'
import { useCallback } from 'react'

import type { ProductItem, SortField, SortOrder } from '@/entities/product'
import { useProductsQuery } from '@/features/products-query'
import { useProductsSelection } from '@/features/products-selection'
import { ProductsPagination } from '@/pages/products/ui/ProductsPagination'
import { ProductsSectionHeader } from '@/pages/products/ui/ProductsSectionHeader'
import { PageProgress } from '@/shared/ui/page-progress/PageProgress'

import { ProductsTable } from './ProductsTable'
import styles from './ProductsTableSection.module.scss'

interface ProductsTableSectionProps {
  accessToken?: string
  isSubmittingProduct: boolean
  localProducts: ProductItem[]
  page: number
  query: string
  sortField: SortField
  sortOrder: SortOrder
  onClearLocalProducts: () => void
  onOpenAddModal: () => void
  onPageChange: (page: number) => void
  onToggleSort: (field: Exclude<SortField, null>) => void
}

export const ProductsTableSection = ({
  accessToken,
  isSubmittingProduct,
  localProducts,
  page,
  query,
  sortField,
  sortOrder,
  onClearLocalProducts,
  onOpenAddModal,
  onPageChange,
  onToggleSort,
}: ProductsTableSectionProps) => {
  const { actions: productsQueryActions, state: productsQueryState } = useProductsQuery({
    accessToken,
    localProducts,
    page,
    query,
    sortField,
    sortOrder,
  })

  const { actions: selectionActions, state: selectionState } = useProductsSelection(productsQueryState.products)

  const handleRefresh = useCallback(() => {
    onClearLocalProducts()
    selectionActions.clearSelection()
    void productsQueryActions.refreshProducts()
  }, [onClearLocalProducts, productsQueryActions, selectionActions])

  return (
    <section className={styles.tableCard}>
      <ProductsSectionHeader
        isDisabled={productsQueryState.isInitialLoading || isSubmittingProduct}
        onOpenAddModal={onOpenAddModal}
        onRefresh={handleRefresh}
      />

      {productsQueryState.isError ? (
        <div className={styles.errorState}>
          <p>
            {productsQueryState.errorMessage ?? 'Не удалось загрузить список товаров'}
          </p>

          <Button onClick={handleRefresh} variant="light">
            Повторить
          </Button>
        </div>
      ) : (
        <>
          <ProductsTable
            isAllVisibleSelected={selectionState.isAllVisibleSelected}
            isInitialLoading={productsQueryState.isInitialLoading}
            isPartiallyVisibleSelected={selectionState.isPartiallyVisibleSelected}
            isTableUpdating={productsQueryState.isTableUpdating}
            products={productsQueryState.products}
            selectedProductIds={selectionState.selectedProductIds}
            sortField={sortField}
            sortOrder={sortOrder}
            onToggleAllVisibleProducts={selectionActions.toggleAllVisibleProducts}
            onToggleSelectedProduct={selectionActions.toggleSelectedProduct}
            onToggleSort={onToggleSort}
          />

          {productsQueryState.isInitialLoading ? (
            <div className={styles.paginationProgressRow}>
              <PageProgress />
            </div>
          ) : (
            <ProductsPagination
              page={page}
              total={productsQueryState.total}
              totalPages={productsQueryState.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </section>
  )
}
