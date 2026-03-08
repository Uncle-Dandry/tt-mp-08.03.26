import { useCallback, useMemo, useState } from 'react'

import type { ProductItem } from '@/entities/product'

export const useProductsSelection = (products: ProductItem[]) => {
  const [selectedProductIds, setSelectedProductIds] = useState<Array<ProductItem['id']>>([])

  const visibleProductIds = useMemo(() => products.map((product) => product.id), [products])
  const selectedProductIdSet = useMemo(() => new Set(selectedProductIds), [selectedProductIds])
  const selectedVisibleCount = useMemo(
    () => visibleProductIds.reduce<number>((count, productId) => count + (selectedProductIdSet.has(productId) ? 1 : 0), 0),
    [selectedProductIdSet, visibleProductIds],
  )

  const toggleSelectedProduct = useCallback((productId: ProductItem['id']) => {
    setSelectedProductIds((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    )
  }, [])

  const toggleAllVisibleProducts = useCallback(() => {
    setSelectedProductIds((current) => {
      const isAllVisibleSelected = visibleProductIds.length > 0 && selectedVisibleCount === visibleProductIds.length

      if (isAllVisibleSelected) {
        return current.filter((id) => !visibleProductIds.includes(id))
      }

      const nextIds = new Set(current)
      visibleProductIds.forEach((id) => nextIds.add(id))
      return Array.from(nextIds)
    })
  }, [selectedVisibleCount, visibleProductIds])

  const clearSelection = useCallback(() => {
    setSelectedProductIds([])
  }, [])

  const isAllVisibleSelected = visibleProductIds.length > 0 && selectedVisibleCount === visibleProductIds.length
  const isPartiallyVisibleSelected = selectedVisibleCount > 0 && !isAllVisibleSelected

  return {
    actions: {
      clearSelection,
      toggleAllVisibleProducts,
      toggleSelectedProduct,
    },
    state: {
      isAllVisibleSelected,
      isPartiallyVisibleSelected,
      selectedProductIds,
    },
  }
}
