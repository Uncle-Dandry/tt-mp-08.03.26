import { Progress } from '@mantine/core'

import styles from './PageProgress.module.scss'

export const PageProgress = () => {
  return (
    <div aria-label="Загрузка товаров" className={styles.root} role="status">
      <Progress animated color="var(--color-blue)" radius="xl" size="xs" value={100} />
    </div>
  )
}
