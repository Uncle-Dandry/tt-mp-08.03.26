import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'

import { SessionProvider } from '@/app/providers/session-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Notifications position="bottom-right" />
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
