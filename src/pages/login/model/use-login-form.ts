import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSession } from '@/app/providers/use-session'
import { loginByCredentials } from '@/pages/login/api/login-by-credentials'
import {
  loginFormDefaultValues,
  mapAuthLoginDtoToSession,
  type LoginFormValues,
} from '@/pages/login/model/login-form'
import { getErrorMessage } from '@/shared/api/http-error'
import { PATHS } from '@/shared/routes/paths'

interface LocationState {
  from?: {
    pathname: string
  }
}

interface UseLoginFormOptions {
  resolver: Resolver<LoginFormValues>
}

export const useLoginForm = ({ resolver }: UseLoginFormOptions) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useSession()
  const locationState = (location.state as LocationState | null | undefined) ?? null
  const redirectTo = locationState?.from?.pathname ?? PATHS.products

  const form = useForm<LoginFormValues>({
    defaultValues: loginFormDefaultValues,
    mode: 'onSubmit',
    resolver,
  })

  const loginMutation = useMutation({
    mutationFn: loginByCredentials,
    onError: (error) => {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error, 'Не удалось авторизоваться'),
        title: 'Ошибка авторизации',
      })
    },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    const data = await loginMutation.mutateAsync({ username: values.username, password: values.password })
    login(mapAuthLoginDtoToSession(data), values.remember ? 'local' : 'session')
    void navigate(redirectTo, { replace: true })
  })

  const clearUsername = useCallback(() => {
    form.setValue('username', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }, [form])

  return {
    clearUsername,
    form,
    handleSubmit,
    isSubmitting: loginMutation.isPending,
  }
}
