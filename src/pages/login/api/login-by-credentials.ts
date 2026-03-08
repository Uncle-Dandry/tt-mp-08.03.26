import { apiClient } from '@/shared/api/client'
import type { AuthLoginResponseDto } from '@/shared/api/generated/auth-login.dto'

interface LoginPayload {
  username: string
  password: string
}

export const loginByCredentials = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<AuthLoginResponseDto>('/auth/login', {
    ...payload,
    expiresInMins: 60,
  })

  return data
}
