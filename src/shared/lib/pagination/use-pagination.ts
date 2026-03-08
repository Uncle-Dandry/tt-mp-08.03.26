import { useMemo } from 'react'

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

const getPaginationItems = (page: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-end', totalPages]
  }

  if (page >= totalPages - 3) {
    return [1, 'ellipsis-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis-start', page - 1, page, page + 1, 'ellipsis-end', totalPages]
}

export const usePagination = (page: number, totalPages: number) => useMemo(
  () => getPaginationItems(page, totalPages), [page, totalPages]
)
