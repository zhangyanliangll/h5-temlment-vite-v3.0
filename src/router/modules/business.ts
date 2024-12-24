import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
      isHideBack: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "About" */ '@/views/about/index.vue'),
    meta: {
      title: 'about',
    },
  },
]

export default routes
