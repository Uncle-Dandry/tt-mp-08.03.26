import { Loader } from '@mantine/core'

import styles from './AppLoader.module.scss'

export const AppLoader = () => {
  return (
    <div className={styles.root}>
      <Loader color="var(--color-blue)" type="dots" />
    </div>
  )
}
