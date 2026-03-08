import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import {
  buildLocalProduct,
  matchesProductQuery,
  sortProducts,
  type AddProductValues,
  type ProductItem,
  type SortField,
  type SortOrder,
} from '@/entities/product'

interface UseAddProductOptions {
  page: number
  query: string
  sortField: SortField
  sortOrder: SortOrder
  onProductAdded: () => void
}

export const useAddProduct = ({
  onProductAdded,
  page,
  query,
  sortField,
  sortOrder
}: UseAddProductOptions) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [localProducts, setLocalProducts] = useState<ProductItem[]>([])

  const addProductMutation = useMutation({
    mutationFn: (values: AddProductValues) => {
      const next = buildLocalProduct(values)
      setLocalProducts((current) => [next, ...current])
      return Promise.resolve(next)
    },
    onSuccess: () => {
      onProductAdded()
      notifications.show({
        title: 'Готово',
        message: 'Товар добавлен',
        color: 'blue',
      })
      setIsAddModalOpen(false)
    },
  })

  const visibleLocalProducts = useMemo(() => {
    if (page !== 1) {
      return []
    }

    return sortProducts(
      localProducts.filter((item) => matchesProductQuery(item, query)),
      sortField,
      sortOrder,
    )
  }, [localProducts, page, query, sortField, sortOrder])

  const openAddModal = useCallback(() => {
    setIsAddModalOpen(true)
  }, [])

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false)
  }, [])

  const clearLocalProducts = useCallback(() => {
    setLocalProducts([])
  }, [])

  return {
    actions: {
      addProduct: addProductMutation.mutateAsync,
      clearLocalProducts,
      closeAddModal,
      openAddModal,
    },
    state: {
      isAddModalOpen,
      isSubmittingProduct: addProductMutation.isPending,
      visibleLocalProducts,
    },
  }
}
