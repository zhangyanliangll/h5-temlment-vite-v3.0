import { RouteLocationRaw } from 'vue-router'

export interface UseNavigation {
  navigateBack: (callback?: () => void) => void
  navigateTo: (to: RouteLocationRaw, type?: 'push' | 'replace') => void
  navigateGo: (delta: number) => void
}
