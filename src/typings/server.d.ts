import type { AxiosRequestConfig } from 'axios'

// 请求方式
type RequestMethod = 'GET' | 'POST' | 'PUT'

/** 后端接口返回的数据结构配置 */
declare namespace FetchResponse {
  interface Request<T = Record<string, unknown>> {
    /** 表示请求路径字段 */
    url: string
    /** 表示请求方式字段 */
    method: RequestMethod
    /** 表示请求参数 */
    params?: T
  }

  interface Response<T = any> {
    /** 表示后端请求状态码的属性字段 */
    code: string
    /** 表示后端消息的属性字段 */
    message: string
    /** 表示后端请求数据的属性字段 */
    result: T
    /** 后端业务上定义的成功请求的状态 */
    status: string | number
  }

  type ContentType =
    | 'text/html'
    | 'text/plain'
    | 'multipart/form-data'
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'application/octet-stream'
    | 'string'

  interface AxiosConfig extends AxiosRequestConfig {
    /** 内容类型 */
    type?: ContentType
    /** 接口报错弹框标题 */
    errorTitle?: string
    /** 是否获取源数据 */
    isOriginalData?: boolean
  }
}
