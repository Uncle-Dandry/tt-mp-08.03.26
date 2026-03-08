import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { AppProviders } from '@/app/providers/app-providers'
import { AppRouter } from '@/app/routes/app-router'
import '@/app/styles/global.scss'
import '@/app/styles/mantine.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>,
)
