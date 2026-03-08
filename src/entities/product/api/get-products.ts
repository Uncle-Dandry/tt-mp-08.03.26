import { apiClient } from '@/shared/api/client'
import type { ProductDto } from '@/shared/api/generated/product.dto'
import type { ProductsResponseDto } from '@/shared/api/generated/products-response.dto'

export interface GetProductsParams {
  accessToken?: string
  limit: number
  page: number
  query: string
  sortField: string | null
  sortOrder: 'asc' | 'desc'
}

export const getProducts = async (params: GetProductsParams) => {
  const skip = (params.page - 1) * params.limit
  const endpoint = params.query ? '/products/search' : '/products'

  const { data } = await apiClient.get<ProductsResponseDto>(endpoint, {
    headers: params.accessToken
      ? {
          Authorization: `Bearer ${params.accessToken}`,
        }
      : undefined,
    params: {
      limit: params.limit,
      skip,
      q: params.query || undefined,
      sortBy: params.sortField || undefined,
      order: params.sortField ? params.sortOrder : undefined,
    },
  })

  return data
}

export type { ProductDto }
