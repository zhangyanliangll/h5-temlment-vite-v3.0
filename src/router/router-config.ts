import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

import { useCacheStore } from '@/stores/cache'

export const beforeRouter = (router: Router): void => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const cacheStore = useCacheStore()

      NProgress.start()

      if (to.meta.keepAlive) {
        cacheStore.addView(to.name as string)
      } else {
        cacheStore.removeView(to.name as string)
      }

      next()

      NProgress.done()
    },
  )
}

export default beforeRouter
