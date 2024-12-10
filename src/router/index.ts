import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { beforeRouter } from './router-config'

import modulesRoutes from './get-modules-routes'

const routes: Array<RouteRecordRaw> = [...modulesRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    savedPosition,
  ) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
      }
    }
  },
})

beforeRouter(router)

export default router
