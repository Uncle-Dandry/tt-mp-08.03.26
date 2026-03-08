import { createContext } from 'react'

import type { PersistMode, Session } from '@/shared/auth/session.types'

export interface SessionContextValue {
  isHydrated: boolean
  isAuthenticated: boolean
  session: Session | null
  login: (session: Session, persistMode: PersistMode) => void
  logout: () => void
}

export const SessionContext = createContext<SessionContextValue | null>(null)
