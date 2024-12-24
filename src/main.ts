import { createApp } from 'vue'
import { createPinia } from 'pinia'
import cachePinia from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { isTest } from '@/config'

// 引入组件样式
import 'vant/lib/index.css'

// 重置样式
import '@/assets/scss/reset.scss'

// 重置 UI 样式
import '@/assets/scss/reset-ui.scss'

// 注册 全局公共 方法
import '@/utils/inject'

import { useComponents } from './import-components'

// 打印日志 工具 ---
if (isTest) {
  Promise.all([import('vconsole')]).then((res) => {
    if (res.length === 1) {
      const VConsole = res[0].default
      new VConsole()
    }
  })
}

const app = createApp(App)
const pinia = createPinia()

// 使用持久化插件
pinia.use(cachePinia)

app.use(useComponents).use(pinia).use(router).mount('#app')
