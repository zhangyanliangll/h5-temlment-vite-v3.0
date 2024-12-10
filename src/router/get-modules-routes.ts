import type { RouteRecordRaw } from 'vue-router'

let modulesRoutes: RouteRecordRaw[] = []

function compileModulesFile(modulesFiles: any) {
  Object.keys(modulesFiles).forEach((key) => {
    const item = modulesFiles[key as any].default
    if (item) {
      modulesRoutes = modulesRoutes.concat(item)
    } else {
      window.console.error(`路由模块解析出错: key = ${key}`)
    }
  })
}

const modulesFiles = import.meta.glob('./modules/*.ts', {
  eager: true,
})

compileModulesFile(modulesFiles as Record<string, { default: any }>)

export default modulesRoutes
