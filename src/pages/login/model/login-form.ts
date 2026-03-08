import { z } from 'zod'

import type { AuthLoginResponseDto } from '@/shared/api/generated/auth-login.dto'
import type { Session } from '@/shared/auth/session.types'

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'Введите логин'),
  password: z.string().trim().min(1, 'Введите пароль'),
  remember: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const loginFormDefaultValues: LoginFormValues = {
  username: '',
  password: '',
  remember: true,
}

export const mapAuthLoginDtoToSession = (dto: AuthLoginResponseDto): Session => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
  username: dto.username,
  firstName: dto.firstName,
  lastName: dto.lastName,
  image: dto.image,
})
