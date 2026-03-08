export type PersistMode = 'local' | 'session'

export interface Session {
  accessToken: string
  refreshToken?: string
  username: string
  firstName?: string
  lastName?: string
  image?: string
}
