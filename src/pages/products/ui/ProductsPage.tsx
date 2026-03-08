import { lazy, Suspense } from 'react'

import { useSession } from '@/app/providers/use-session'
import { useAddProduct } from '@/features/add-product'
import { useProductsFilters } from '@/features/products-filters'
import { ProductsTopbar } from '@/pages/products/ui/ProductsTopbar'
import { ProductsTableSection } from '@/widgets/products-table-section'

import styles from './ProductsPage.module.scss'

const AddProductModal = lazy(async () => {
  const module = await import('@/pages/products/ui/AddProductModal')

  return { default: module.AddProductModal }
})

export const ProductsPage = () => {
  const { logout, session } = useSession()
  const { actions: filterActions, state: filters } = useProductsFilters()

  const { actions: addProductActions, state: addProductState } = useAddProduct({
    onProductAdded: filterActions.resetPage,
    page: filters.page,
    query: filters.debouncedQuery,
    sortField: filters.sortField,
    sortOrder: filters.sortOrder,
  })

  return (
    <main className={styles.page}>
      <ProductsTopbar query={filters.query} onLogout={logout} onQueryChange={filterActions.setQuery} />

      <ProductsTableSection
        accessToken={session?.accessToken}
        isSubmittingProduct={addProductState.isSubmittingProduct}
        localProducts={addProductState.visibleLocalProducts}
        page={filters.page}
        query={filters.debouncedQuery}
        sortField={filters.sortField}
        sortOrder={filters.sortOrder}
        onClearLocalProducts={addProductActions.clearLocalProducts}
        onOpenAddModal={addProductActions.openAddModal}
        onPageChange={filterActions.setPage}
        onToggleSort={filterActions.toggleSort}
      />

      {addProductState.isAddModalOpen ? (
        <Suspense fallback={null}>
          <AddProductModal
            isOpen={addProductState.isAddModalOpen}
            isSubmitting={addProductState.isSubmittingProduct}
            onClose={addProductActions.closeAddModal}
            onSubmit={addProductActions.addProduct}
          />
        </Suspense>
      ) : null}
    </main>
  )
}
