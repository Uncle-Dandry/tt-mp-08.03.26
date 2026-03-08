import { useDebouncedValue } from '@mantine/hooks'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getPage, getSortField, getSortOrder, type SortField, type SortOrder } from '@/entities/product'

export interface ProductsFiltersState {
  debouncedQuery: string
  page: number
  query: string
  sortField: SortField
  sortOrder: SortOrder
}

export const useProductsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = getPage(searchParams.get('page'))
  const query = searchParams.get('q') ?? ''
  const sortField = getSortField(searchParams.get('sortField'))
  const sortOrder = getSortOrder(searchParams.get('sortOrder'))
  const [debouncedQuery] = useDebouncedValue(query, 350)

  const updateSearchParams = useCallback((next: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key)
        return
      }

      nextParams.set(key, value)
    })

    setSearchParams(nextParams)
  }, [searchParams, setSearchParams])

  const setPage = useCallback((nextPage: number) => {
    updateSearchParams({ page: String(nextPage) })
  }, [updateSearchParams])

  const resetPage = useCallback(() => {
    updateSearchParams({ page: '1' })
  }, [updateSearchParams])

  const setQuery = useCallback((value: string) => {
    updateSearchParams({
      q: value || null,
      page: '1',
    })
  }, [updateSearchParams])

  const toggleSort = useCallback((field: Exclude<SortField, null>) => {
    const nextOrder = sortField === field && sortOrder === 'desc' ? 'asc' : 'desc'

    updateSearchParams({
      sortField: field,
      sortOrder: nextOrder,
      page: '1',
    })
  }, [sortField, sortOrder, updateSearchParams])

  return {
    actions: {
      resetPage,
      setPage,
      setQuery,
      toggleSort,
    },
    state: {
      debouncedQuery,
      page,
      query,
      sortField,
      sortOrder,
    } satisfies ProductsFiltersState,
  }
}
