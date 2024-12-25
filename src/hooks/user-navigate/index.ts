import type { RouteLocationRaw } from 'vue-router'
import type { UseNavigation } from './user-navigate'

export default (): UseNavigation => {
  const router = useRouter()

  const navigateBack = (callback?: () => void) => {
    if (typeof callback == 'function') {
      callback()
    }
    router.go(-1)
  }

  const navigateTo = (
    to: RouteLocationRaw,
    type: 'push' | 'replace' = 'push',
  ) => {
    router[type](to).catch((err) => {
      console.log(err)
    })
  }

  const navigateGo = (delta: number) => {
    router.go(delta)
  }

  return {
    navigateBack,
    navigateTo,
    navigateGo,
  }
}
