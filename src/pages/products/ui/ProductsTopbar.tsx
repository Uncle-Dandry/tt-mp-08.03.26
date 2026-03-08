import { Button, TextInput } from '@mantine/core'
import { memo } from 'react'

import SearchIcon from '@/shared/assets/icons/search.svg?react'

import styles from './ProductsTopbar.module.scss'

interface ProductsTopbarProps {
  query: string
  onLogout: () => void
  onQueryChange: (value: string) => void
}

export const ProductsTopbar = memo(function ProductsTopbar({
  query,
  onLogout,
  onQueryChange
}: ProductsTopbarProps) {
  return (
    <div className={styles.topbar}>
      <h1 className={styles.pageTitle}>Товары</h1>

      <TextInput
        aria-label="Поиск"
        leftSectionWidth={54}
        classNames={{ input: styles.searchInput, section: styles.searchSection }}
        leftSection={<SearchIcon aria-hidden className={styles.searchIcon} />}
        placeholder="Найти"
        value={query}
        onChange={(event) => onQueryChange(event.currentTarget.value)}
      />

      <Button className={styles.logoutButton} onClick={onLogout} variant="subtle">
        Выйти
      </Button>
    </div>
  )
})
