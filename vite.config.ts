import type { ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Commonjs from 'vite-plugin-commonjs'
import viteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

import createDevServerConfig from './dev-server-config'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  // 环境变量
  const {
    VITE_ICON_LOCAL_PREFIX,
    VITE_ICON_PREFIX,
    VITE_PORT,
    VITE_STATIC_URL,
  } = loadEnv(mode, root)

  const srcPath = fileURLToPath(new URL('./src', import.meta.url))

  const localIconPath = `${srcPath}/assets/svg-icon`

  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(
    `${VITE_ICON_PREFIX}-`,
    '',
  )

  return {
    base: VITE_STATIC_URL,
    css: {
      preprocessorOptions: {
        // 导入scss预编译程序
        scss: {
          additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixin.scss" as *;
            @use "@/assets/scss/common.scss" as *;
          `,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      Icons({
        compiler: 'vue3',
        customCollections: {
          [collectionName]: FileSystemIconLoader(localIconPath, (svg: string) =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
          ),
        },
        scale: 1,
        defaultClass: 'inline-block',
      }),
      createSvgIconsPlugin({
        iconDirs: [localIconPath],
        symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
        inject: 'body-last',
        customDomId: '__SVG_ICON_LOCAL__',
      }),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/typings/auto-import.d.ts',
        resolvers: [VantResolver()],
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'src/typings/components.d.ts',
        resolvers: [
          VantResolver(),
          IconsResolver({
            customCollections: [collectionName],
            prefix: VITE_ICON_PREFIX,
          }),
        ],
      }),
      Commonjs(),
      viteCompression(),
      vueDevTools({
        launchEditor: 'webstorm',
      }),
    ],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    resolve: {
      alias: {
        '@': srcPath,
      },
    },
    server: {
      open: true,
      port: Number(VITE_PORT), // 修改默认启动端口
      host: true,
      proxy: {
        ...createDevServerConfig(),
        // 配置代理服务 --- 测试环境
        '/api/test': {
          target: 'http://test.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/test/, ''),
        },
        '/api': {
          target: 'http://test.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    optimizeDeps: {
      include: ['dayjs', 'axios'],
      exclude: [],
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: (chunkInfo) => {
            const fileName = chunkInfo.name.replace('script', '')
            return `assets/${fileName}-[hash].js`
          },
        },
      },
      terserOptions: {
        compress: {
          //关闭打印信息
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
