import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { SessionContext, type SessionContextValue } from '@/app/providers/session-context'
import { clearSession, readSession, writeSession } from '@/shared/auth/session-storage'
import { type PersistMode, type Session } from '@/shared/auth/session.types'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setSession(readSession())
    setIsHydrated(true)
  }, [])

  const login = useCallback((nextSession: Session, persistMode: PersistMode) => {
    writeSession(nextSession, persistMode)
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      isHydrated,
      isAuthenticated: session !== null,
      session,
      login,
      logout,
    }),
    [isHydrated, login, logout, session],
  )

  return <SessionContext value={value}>{children}</SessionContext>
}
