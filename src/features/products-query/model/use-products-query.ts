import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { getProducts, PRODUCTS_PAGE_SIZE, mapProductDtoToProductItem, sortProducts, type ProductItem, type SortField, type SortOrder } from '@/entities/product'
import { getErrorMessage } from '@/shared/api/http-error'

const PRODUCTS_QUERY_KEY = ['products'] as const

interface UseProductsQueryOptions {
  accessToken?: string
  localProducts: ProductItem[]
  page: number
  query: string
  sortField: SortField
  sortOrder: SortOrder
}

export const useProductsQuery = ({
  accessToken,
  localProducts,
  page,
  query,
  sortField,
  sortOrder
}: UseProductsQueryOptions) => {
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, query, page, sortField, sortOrder, accessToken],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await getProducts({
        accessToken,
        limit: PRODUCTS_PAGE_SIZE,
        page,
        query,
        sortField,
        sortOrder,
      })

      return {
        ...response,
        products: response.products.map(mapProductDtoToProductItem),
      }
    },
  })

  const products = useMemo(() => {
    const remoteProducts = productsQuery.data?.products ?? []

    return sortProducts([...localProducts, ...remoteProducts], sortField, sortOrder)
  }, [localProducts, productsQuery.data?.products, sortField, sortOrder])

  const refreshProducts = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY, refetchType: 'active' })
  }, [queryClient])

  const total = (productsQuery.data?.total ?? 0) + localProducts.length
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PAGE_SIZE))
  const isInitialLoading = productsQuery.isPending && !productsQuery.data
  const isTableUpdating = productsQuery.isFetching && !isInitialLoading

  return {
    actions: {
      refreshProducts,
    },
    state: {
      errorMessage: productsQuery.error ? getErrorMessage(productsQuery.error, 'Не удалось загрузить список товаров') : null,
      isError: productsQuery.isError,
      isInitialLoading,
      isTableUpdating,
      products,
      total,
      totalPages,
    },
  }
}
