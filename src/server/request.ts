import instance from './instance'
import type { AxiosResponse } from 'axios'
import type { FetchResponse } from '@/typings/server'

// 文件下载处理函数
const handleDownload = (response: AxiosResponse) => {
  const disposition = response.headers['content-disposition']
  const contentType = response.headers['content-type']

  // 判断是否为文件下载请求
  if (
    disposition ||
    (response.config as FetchResponse.AxiosConfig).isDownload
  ) {
    const blob = new Blob([response.data], { type: contentType })
    const fileName = disposition
      ? decodeURIComponent(disposition.match(/filename=(\S*)/)[1] || 'download')
      : 'download'

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
    return true
  }
  return false
}

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
      .then(
        (
          response: AxiosResponse<FetchResponse.Response> & {
            config: FetchResponse.AxiosConfig
          },
        ) => {
          const {
            config: { isOriginalData, isJson },
            data,
          } = response

          // 处理文件下载
          if (handleDownload(response)) {
            return response
          }

          if (isOriginalData) {
            return resolve(data)
          }

          if (isJson) {
            return resolve(JSON.parse(data as unknown as string))
          }

          //对接口错误码做处理
          resolve(
            (data as { data?: any })?.data ||
              (data as { record?: any })?.record,
          )
        },
      )
      .catch((err: any) => {
        reject(err)
      })
  })
}

export default request
