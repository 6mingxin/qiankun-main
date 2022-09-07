import { createPinia } from 'pinia'

export function setupStore(app) {
  const store = createPinia()
  app.use(store)
}

export * from './app'
export * from './route'
export * from './tabs'
export * from './auth'
