import { cn } from '@/shared/lib/cn'

import styles from './ProductsTableSkeletonRows.module.scss'

const INITIAL_SKELETON_ROWS = Array.from({ length: 5 }, (_, index) => `skeleton-${index}`)

export const ProductsTableSkeletonRows = () => INITIAL_SKELETON_ROWS.map((rowKey) => (
  <tr className={styles.skeletonRow} key={rowKey}>
    <td>
      <div className={styles.productCell}>
        <span className={cn(styles.skeletonBlock, styles.skeletonCheckbox)} />
        <span className={cn(styles.skeletonBlock, styles.skeletonThumb)} />

        <div className={styles.productMeta}>
          <span className={cn(styles.skeletonBlock, styles.skeletonTitle)} />
          <span className={cn(styles.skeletonBlock, styles.skeletonCategory)} />
        </div>
      </div>
    </td>

    <td>
      <span className={cn(styles.skeletonBlock, styles.skeletonVendor)} />
    </td>

    <td>
      <span className={cn(styles.skeletonBlock, styles.skeletonSku)} />
    </td>

    <td>
      <span className={cn(styles.skeletonBlock, styles.skeletonRating)} />
    </td>

    <td>
      <span className={cn(styles.skeletonBlock, styles.skeletonPrice)} />
    </td>

    <td className={styles.actionCell}>
      <span className={cn(styles.skeletonBlock, styles.skeletonPlus)} />
    </td>

    <td className={styles.actionCell}>
      <span className={cn(styles.skeletonBlock, styles.skeletonMenu)} />
    </td>
  </tr>
))
