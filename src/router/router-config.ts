import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router'

import { useCacheStore } from '@/stores/cache'

export const beforeRouter = (router: Router): void => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const cacheStore = useCacheStore()

      if (to.meta.keepAlive) {
        cacheStore.addView(to.name as string)
      } else {
        cacheStore.removeView(to.name as string)
      }

      next()
    },
  )
}

export default beforeRouter
