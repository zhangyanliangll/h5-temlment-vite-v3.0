import { getPermissionsApi } from '@/apis/common'
import { isNative } from '@/config'

// 定义默认权限数组
const defaultPermissions = [
  // 铺位拆合
  'TEST_ADD',
  'TEST_EDIT',
] as const

type PermissionKeys = (typeof defaultPermissions)[number]

export const usePermissionsStore = defineStore('permissions', () => {
  const btn = ref<Record<PermissionKeys, boolean>>(
    defaultPermissions.reduce(
      (acc, key) => {
        acc[key] = false // 设置默认权限为 false
        return acc
      },
      {} as Record<PermissionKeys, boolean>,
    ),
  )

  const getAuth = async () => {
    try {
      const data = await getPermissionsApi({
        keys: Object.keys(btn.value),
      })

      Object.keys(defaultPermissions).forEach((key) => {
        const typedKey = key as PermissionKeys
        btn.value[typedKey] = !!data[typedKey] || isNative
      })
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
    }
  }

  return {
    btn,
    getAuth,
  }
})
