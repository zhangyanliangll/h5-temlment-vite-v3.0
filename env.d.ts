/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_UPLOAD_URL: string
  readonly VITE_PROD: string
  readonly VITE_DEV: string
  readonly VITE_APP_CACHE_PREFIX: string
  readonly VITE_ICON_LOCAL_PREFIX: string
  readonly VITE_PORT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
