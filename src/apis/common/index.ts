import { get, post } from '@/server'
import { API_PREFIX } from '@/config'

// 获取 Token
export const getTokenApi = async (data?: ObjectType): Promise<ObjectType> => {
  return await get(`${API_PREFIX}/sso_web/sdk/getToken.htm`, data)
}

// 获取 按钮 权限
export const getPermissionsApi = async (
  data?: ObjectType,
): Promise<ObjectType> => {
  return await post(`${API_PREFIX}/sso_web/sdk/getTPermissions.htm`, data)
}

// 根据 项目查询下面的合同
export const getContNoAndCompanyContNoApi = async (
  params?: ObjectType,
): Promise<ObjectType[]> => {
  return await post(
    `${API_PREFIX}/netcomment_web/forecastReport/getContNoAndCompany.htm`,
    params || {},
  )
}
