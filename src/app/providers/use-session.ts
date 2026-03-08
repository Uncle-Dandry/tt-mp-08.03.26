import { useContext } from 'react'

import { SessionContext, type SessionContextValue } from '@/app/providers/session-context'

export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used inside SessionProvider')
  }

  return context
}
