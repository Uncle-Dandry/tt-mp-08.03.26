import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core'
import { memo } from 'react'
import { Controller, useWatch, type UseFormReturn } from 'react-hook-form'

import type { LoginFormValues } from '@/pages/login/model/login-form'
import CrossIcon from '@/shared/assets/icons/cross.svg?react'
import EyeIcon from '@/shared/assets/icons/eye.svg?react'
import LockIcon from '@/shared/assets/icons/lock.svg?react'
import UserIcon from '@/shared/assets/icons/user.svg?react'

import styles from './LoginForm.module.scss'

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>
  isSubmitting: boolean
  onClearUsername: () => void
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>
}

const FORM_CLASS_NAMES = {
  input: styles.input,
  section: styles.inputSection,
  wrapper: styles.inputWrapper,
} as const

const PASSWORD_CLASS_NAMES = {
  input: styles.input,
  section: styles.inputSection,
  innerInput: styles.innerInput,
  visibilityToggle: styles.visibilityToggle,
} as const

export const LoginForm = memo(function LoginForm({ form, isSubmitting, onClearUsername, onSubmit }: LoginFormProps) {
  const username = useWatch({ control: form.control, name: 'username' })

  return (
    <form className={styles.form} onSubmit={(event) => void onSubmit(event)}>
      <div className={styles.fields}>
        <div>
          <label className={styles.label} htmlFor="username">
            Логин
          </label>

          <TextInput
            id="username"
            aria-label="Логин"
            autoComplete="username"
            leftSectionWidth={52}
            classNames={FORM_CLASS_NAMES}
            error={form.formState.errors.username?.message}
            leftSection={(
              <span className={styles.inputIconBox}>
                <UserIcon aria-hidden className={styles.leadingIconUser} />
              </span>
            )}
            rightSection={username ? (
              <button aria-label="Очистить логин" className={styles.clearButton} onClick={onClearUsername} type="button">
                <CrossIcon aria-hidden className={styles.clearIcon} />
              </button>
            ) : undefined}
            rightSectionWidth={52}
            placeholder="test"
            {...form.register('username')}
          />
        </div>

        <div>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>

          <PasswordInput
            id="password"
            aria-label="Пароль"
            autoComplete="current-password"
            leftSectionWidth={52}
            radius={12}
            classNames={PASSWORD_CLASS_NAMES}
            error={form.formState.errors.password?.message}
            leftSection={(
              <span className={styles.inputIconBox}>
                <LockIcon aria-hidden className={styles.leadingIconLock} />
              </span>
            )}
            placeholder="•••••••••••••"
            visibilityToggleIcon={() => (
              <span className={styles.inputIconBox}>
                <EyeIcon aria-hidden className={styles.eyeIcon} />
              </span>
            )}
            {...form.register('password')}
          />
        </div>
      </div>

      <div className={styles.keepRow}>
        <Controller
          control={form.control}
          name="remember"
          render={({ field }) => (
            <Checkbox
              aria-label="Запомнить данные"
              checked={field.value}
              classNames={{
                body: styles.checkboxBody,
                icon: styles.checkboxMantineIcon,
                input: styles.checkboxInput,
                label: styles.checkboxLabel,
              }}
              label="Запомнить данные"
              name={field.name}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              ref={field.ref}
            />
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button className={styles.submitButton} loading={isSubmitting} type="submit">
          Войти
        </Button>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>или</span>
          <span className={styles.dividerLine} />
        </div>
      </div>
    </form>
  )
})
