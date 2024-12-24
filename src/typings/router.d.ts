import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 是否 缓存页面 */
    keepAlive?: boolean
    /** 是否隐藏 顶部导航返回 */
    isHideBack?: boolean
    /** 是否隐藏 顶部导航 */
    isHideNavBar?: boolean
  }
}
