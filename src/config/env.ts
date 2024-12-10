// dev 开发环境
export const isDev = import.meta.env.VITE_DEV === 'true'

export const notDev = !isDev

// 测试 环境
export const isTest = import.meta.env.VITE_TEST === 'true'

export const notTest = !isTest

// 预发 环境
export const isPro = import.meta.env.VITE_PROD === 'true'

export const notPro = !isPro

// 是否是 本地启动
export const isNative = import.meta.env.VITE_NATIVE === 'true'
