import { memo } from 'react'

import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg?react'
import { cn } from '@/shared/lib/cn'
import { usePagination } from '@/shared/lib/pagination/use-pagination'

import styles from './ProductsPagination.module.scss'
import { PRODUCTS_PAGE_SIZE } from '@/entities/product'

interface ProductsPaginationProps {
  page: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize?: number
}

export const ProductsPagination = memo(function ProductsPagination({
  page,
  total,
  totalPages,
  onPageChange,
  pageSize = PRODUCTS_PAGE_SIZE,
}: ProductsPaginationProps) {
  const paginationItems = usePagination(page, totalPages)
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, total)

  return (
    <div className={styles.paginationRow}>
      <p className={styles.paginationInfo}>
        Показано <span className={styles.paginationInfoValue}>{rangeStart}-{rangeEnd}</span> из <span className={styles.paginationInfoValue}>{total}</span>
      </p>

      <div className={styles.pagination}>
        <button className={styles.paginationArrow} disabled={page === 1} onClick={() => onPageChange(page - 1)} type="button">
          <ArrowRightIcon aria-hidden className={cn(styles.arrowIcon, styles.arrowLeft)} />
        </button>

        {paginationItems.map((item) => {
          if (typeof item !== 'number') {
            return (
              <span aria-hidden className={styles.paginationEllipsis} key={item}>
                ...
              </span>
            )
          }

          return (
            <button
              key={item}
              className={cn(styles.paginationNumber, item === page && styles.paginationNumberActive)}
              onClick={() => onPageChange(item)}
              type="button"
            >
              {item}
            </button>
          )
        })}

        <button
          className={styles.paginationArrow}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          <ArrowRightIcon aria-hidden className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  )
})
