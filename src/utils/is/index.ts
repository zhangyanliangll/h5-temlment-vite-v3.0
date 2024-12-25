// 是否是 IOS
export function isIOS(): boolean {
  const userAgent = navigator.userAgent || ''
  return /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)
}

// 是否是 文件
export function isFile(data: unknown): boolean {
  return (
    Object.prototype.toString.call(data) === '[object File]' ||
    Object.prototype.toString.call(data) === '[object Blob]'
  )
}

// 是否是 数组
export function isArray(data: unknown): boolean {
  return Object.prototype.toString.call(data) === '[object Array]'
}

// 是否是 时间
export function isDate(data: unknown): boolean {
  return Object.prototype.toString.call(data) === '[object Date]'
}

// 是否是 数字
export function isNumber(data: unknown): boolean {
  return typeof data === 'number' && !isNaN(data)
}

// 是否是 URL
export function isUrl(data: string): boolean {
  try {
    new URL(data)
    return true
  } catch (e) {
    return false
  }
}

// 是否 为空
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }
  if (value instanceof Set || value instanceof Map) {
    return value.size === 0
  }
  if (typeof value === 'function') {
    return false
  }
  return false
}
