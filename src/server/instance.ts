import axios from 'axios'
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import { showFailToast } from 'vant'

import type { FetchResponse } from '@/typings/server'

import { transformRequestData } from './transform'

import {
  API_BASE_URL,
  REQUEST_TIMEOUT,
  API_HEADERS,
  NO_ERROR_MSG_CODE,
  ERROR_STATUS,
} from '@/config'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: API_HEADERS,
})

// request 拦截器
instance.interceptors.request.use(
  async (config) => {
    const handleConfig = {
      ...config,
    } as InternalAxiosRequestConfig<any>

    if (handleConfig.headers) {
      // 数据转换
      const contentType = handleConfig.headers['Content-Type'] as string

      handleConfig.data = await transformRequestData(
        handleConfig.data,
        contentType,
      )
      //  设置token
      handleConfig.headers.Authorization = 'Bearer ' + localStorage.getItem('')
    }

    return handleConfig
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// response 拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<FetchResponse.Response>) => {
    const { status, config } = response
    const { data } = response

    const code = Number(data.code)

    if (status === 200 || status < 300 || status === 304) {
      if (code === 200 || config.responseType === 'blob') {
        return response
      }

      if (!NO_ERROR_MSG_CODE.includes(code)) {
        showFailToast(data.message)
      }

      return Promise.reject(data.message)
    }
    return response
  },
  (error: AxiosError) => {
    const { code } = error as ObjectType
    let msg = '网络请求超时,请重试~'
    if (Object.prototype.hasOwnProperty.call(ERROR_STATUS, code)) {
      msg = (ERROR_STATUS as any)[code]
    }
    showFailToast(msg)
    return Promise.reject(error)
  },
)

export default instance
