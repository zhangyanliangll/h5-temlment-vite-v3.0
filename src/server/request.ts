import instance from './instance'
import type { FetchResponse } from '@/typings/server'

/**
 * @param params - 请求参数
 * - url: 请求地址
 * - method: 请求方法(默认get)
 * - data: 请求的body的data
 * - axiosConfig: axios配置
 * @param axiosConfig
 */
export function request(
  params: ObjectType,
  axiosConfig?: FetchResponse.AxiosConfig,
): Promise<any> {
  const { type, responseType } = axiosConfig || {}

  const handleConfig: FetchResponse.AxiosConfig = Object.assign(
    params,
    axiosConfig || {},
  )

  // 处理 content-type 类型
  if (type) {
    handleConfig.headers = {
      ...handleConfig.headers,
      'Content-Type': type,
    }
    delete handleConfig.type
  }

  if (responseType) {
    handleConfig.responseType = responseType
  }

  return new Promise((resolve, reject) => {
    instance(handleConfig)
      .then((response: ObjectType) => {
        const {
          config: { responseType, isOriginalData },
          data,
        } = response

        if (responseType === 'blob') {
          return resolve(response)
        }

        if (isOriginalData) {
          return resolve(data)
        }

        //对接口错误码做处理
        resolve(data.data || data.record)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export default request
