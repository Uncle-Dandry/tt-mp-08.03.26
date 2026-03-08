import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useSession } from '@/app/providers/use-session'
import { PATHS } from '@/shared/routes/paths'
import { AppLoader } from '@/shared/ui/app-loader/AppLoader'

export const PublicOnlyRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isHydrated } = useSession()

  if (!isHydrated) {
    return <AppLoader />
  }

  if (isAuthenticated) {
    return <Navigate replace to={PATHS.products} />
  }

  return children
}
