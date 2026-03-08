import { z } from 'zod'

import type { ProductDto } from '@/shared/api/generated/product.dto'

export const PRODUCTS_PAGE_SIZE = 5

export type SortField = 'price' | 'rating' | null
export type SortOrder = 'asc' | 'desc'

export interface ProductItem {
  id: number | string
  title: string
  vendor: string
  sku: string
  rating: number
  price: number
  category: string
  thumbnail?: string
  isLocal?: boolean
}

export const addProductSchema = z.object({
  title: z.string().trim().min(1, 'Введите наименование'),
  price: z.number().positive('Введите корректную цену'),
  vendor: z.string().trim().min(1, 'Введите вендора'),
  sku: z.string().trim().min(1, 'Введите артикул'),
})

export type AddProductValues = z.infer<typeof addProductSchema>

export const mapProductDtoToProductItem = (dto: ProductDto): ProductItem => ({
  id: dto.id,
  title: dto.title,
  vendor: dto.brand,
  sku: dto.sku,
  rating: dto.rating,
  price: dto.price,
  category: dto.category,
  thumbnail: dto.thumbnail,
})

export const sortProducts = (items: ProductItem[], sortField: SortField, sortOrder: SortOrder) => {
  if (!sortField) {
    return items
  }

  const direction = sortOrder === 'asc' ? 1 : -1

  return [...items].sort((left, right) => (left[sortField] - right[sortField]) * direction)
}

export const matchesProductQuery = (item: ProductItem, query: string) => {
  if (!query) {
    return true
  }

  const normalizedQuery = query.toLowerCase()

  return [item.title, item.vendor, item.sku, item.category].some((value) => value.toLowerCase().includes(normalizedQuery))
}

export const buildLocalProduct = (values: AddProductValues): ProductItem => ({
  id: `local-${crypto.randomUUID()}`,
  title: values.title,
  vendor: values.vendor,
  sku: values.sku,
  price: values.price,
  rating: 0,
  category: 'Новый товар',
  isLocal: true,
})

export const getSortField = (value: string | null): SortField => (
  value === 'price' || value === 'rating' ? value : null
)

export const getSortOrder = (value: string | null): SortOrder => (
  value === 'asc' ? 'asc' : 'desc'
)

export const getPage = (value: string | null) => {
  const page = Number(value ?? '1')

  return Number.isFinite(page) && page > 0 ? page : 1
}
