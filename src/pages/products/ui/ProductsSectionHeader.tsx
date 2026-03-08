import { ActionIcon, Button } from '@mantine/core'
import { memo } from 'react'

import PlusCircleWhiteIcon from '@/shared/assets/icons/plus-circle-white.svg?react'
import RefreshIcon from '@/shared/assets/icons/refresh-arrows.svg?react'

import styles from './ProductsSectionHeader.module.scss'

interface ProductsSectionHeaderProps {
  isDisabled: boolean
  onOpenAddModal: () => void
  onRefresh: () => void
}

export const ProductsSectionHeader = memo(function ProductsSectionHeader({
  isDisabled,
  onOpenAddModal,
  onRefresh,
}: ProductsSectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Все позиции</h2>

      <div className={styles.headerActions}>
        <ActionIcon aria-label="Обновить список" className={styles.refreshButton} disabled={isDisabled} onClick={onRefresh} variant="default">
          <RefreshIcon aria-hidden className={styles.actionIcon} />
        </ActionIcon>

        <Button className={styles.addButton} disabled={isDisabled} leftSection={<PlusCircleWhiteIcon aria-hidden className={styles.plusIcon} />} onClick={onOpenAddModal}>
          Добавить
        </Button>
      </div>
    </div>
  )
})
