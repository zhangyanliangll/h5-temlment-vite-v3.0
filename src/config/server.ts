// api域名
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// api 上传文件域名
export const API_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL

// api 公共前缀
export const API_PREFIX = ''

/** 接口请求公共参数*/
export const QUERY_INFO_CONFIG = {
  app_id: '',
}

/** 请求头*/
export const API_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  sourceType: 'web',
}

// api 版本
export const API_VERSION = '1.0.0'

// api 格式
export const API_CHARSET = 'utf8'

// MD5 密钥
export const MD5_KEY = ''

/** 请求超时时间 */
export const REQUEST_TIMEOUT = (import.meta.env.DEV ? 100 : 15) * 1000

/** 错误信息的显示时间 */
export const ERROR_MSG_DURATION = 3 * 1000

/** 默认的请求错误code */
export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT'

/** 默认的请求错误文本 */
export const DEFAULT_REQUEST_ERROR_MSG = '请求错误~'

/** 网络不可用的code */
export const NETWORK_ERROR_CODE = 'NETWORK_ERROR'

/** 网络不可用的错误文本 */
export const NETWORK_ERROR_MSG = '网络不可用~'

/** 请求不成功各种状态的错误 */
export const ERROR_STATUS = {
  400: '400: 请求出现语法错误~',
  401: '401: 用户未授权~',
  403: '403: 服务器拒绝访问~',
  404: '404: 请求的资源不存在~',
  405: '405: 请求方法未允许~',
  408: '408: 网络请求超时~',
  500: '500: 服务器内部错误~',
  501: '501: 服务器未实现请求功能~',
  502: '502: 错误网关~',
  503: '503: 服务不可用~',
  504: '504: 网关超时~',
  505: '505: http版本不支持该请求~',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
}

/** 不弹出错误信息的code */
export const NO_ERROR_MSG_CODE: (string | number)[] = []

/** 弹出确认错误信息的code */
export const CONFIRM_ERROR_MSG_CODE: (string | number)[] = [999, 1000]

/** token失效需要刷新token的code(这里的66666只是个例子，需要将后端表示token过期的code填进来) */
export const REFRESH_TOKEN_CODE: (string | number)[] = [666666]
