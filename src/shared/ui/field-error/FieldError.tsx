import styles from './FieldError.module.scss'

interface FieldErrorProps {
  message?: string
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) {
    return null
  }

  return <div className={styles.root}>{message}</div>
}
