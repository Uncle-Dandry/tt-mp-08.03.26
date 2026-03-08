import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useSession } from '@/app/providers/use-session'
import { PATHS } from '@/shared/routes/paths'
import { AppLoader } from '@/shared/ui/app-loader/AppLoader'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isHydrated } = useSession()
  const location = useLocation()

  if (!isHydrated) {
    return <AppLoader />
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={PATHS.login} />
  }

  return children
}
