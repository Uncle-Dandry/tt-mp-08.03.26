import logo from '@/shared/assets/brand/logo.svg'

import styles from './LoginHero.module.scss'

export const LoginHero = () => {
  return (
    <>
      <div className={styles.logoWrap}>
        <img alt="Logotype" className={styles.logo} height={34} src={logo} width={35} />
      </div>

      <header className={styles.header}>
        <h1 className={styles.title} data-text="Добро пожаловать!">Добро пожаловать!</h1>
        <div className={styles.subtitleWrap}>
          <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
        </div>
      </header>
    </>
  )
}
