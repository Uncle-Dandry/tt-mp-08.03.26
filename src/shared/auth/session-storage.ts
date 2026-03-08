import { type Session } from '@/shared/auth/session.types'
import { SESSION_STORAGE_KEY } from '@/shared/auth/session.constants'
import type { PersistMode } from '@/shared/auth/session.types'

const getStorages = () => {
  if (typeof window === 'undefined') {
    return [] as Storage[]
  }

  return [window.localStorage, window.sessionStorage]
}

const getStorageByPersistMode = (persistMode: PersistMode) => {
  if (typeof window === 'undefined') {
    return null
  }

  return persistMode === 'local' ? window.localStorage : window.sessionStorage
}

const readStorage = (storage: Storage) => {
  const value = storage.getItem(SESSION_STORAGE_KEY)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as Session
  } catch {
    storage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

export const readSession = () => {
  for (const storage of getStorages()) {
    const session = readStorage(storage)

    if (session) {
      return session
    }
  }

  return null
}

export const writeSession = (session: Session, persistMode: PersistMode) => {
  clearSession()
  const storage = getStorageByPersistMode(persistMode)

  if (!storage) {
    return
  }

  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export const clearSession = () => {
  for (const storage of getStorages()) {
    storage.removeItem(SESSION_STORAGE_KEY)
  }
}
