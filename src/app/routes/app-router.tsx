import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '@/app/routes/protected-route'
import { PublicOnlyRoute } from '@/app/routes/public-only-route'
import { PATHS } from '@/shared/routes/paths'
import { AppLoader } from '@/shared/ui/app-loader/AppLoader'

const LoginPage = lazy(async () => {
  const module = await import('@/pages/login/ui/LoginPage')

  return { default: module.LoginPage }
})

const ProductsPage = lazy(async () => {
  const module = await import('@/pages/products/ui/ProductsPage')

  return { default: module.ProductsPage }
})

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path={PATHS.root} element={<Navigate to={PATHS.login} replace />} />

          <Route
            path={PATHS.login}
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path={PATHS.products}
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={PATHS.login} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
