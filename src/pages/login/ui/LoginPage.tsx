import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

import { loginFormSchema } from '@/pages/login/model/login-form'
import { useLoginForm } from '@/pages/login/model/use-login-form'
import { LoginForm } from '@/pages/login/ui/LoginForm'
import { LoginHero } from '@/pages/login/ui/LoginHero'
import { PATHS } from '@/shared/routes/paths'

import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  const { clearUsername, form, handleSubmit, isSubmitting } = useLoginForm({
    resolver: zodResolver(loginFormSchema),
  })

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.cardInner}>
          <LoginHero />

          <LoginForm form={form} isSubmitting={isSubmitting} onClearUsername={clearUsername} onSubmit={handleSubmit} />

          <p className={styles.bottomText}>
            Нет аккаунта? <Link to={PATHS.login}>Создать</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
