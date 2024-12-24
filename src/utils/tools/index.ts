import dayjs from 'dayjs'

/**
 * @description: 节流函数
 * @param {Function} fn 回调
 * @param {Number} wait 延迟
 * @returns {Function} 节流后的函数
 */
export function throttle(
  fn: (...args: any[]) => void,
  wait = 1000,
): (...args: any[]) => void {
  let lastTime = 0

  return function (this: any, ...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * @description: 防抖函数
 * @param {Function} func 回调函数
 * @param {Number} delay 延迟时间
 * @returns {Function} 防抖后的函数
 */
export function debounce(
  func: (...args: any[]) => void,
  delay = 500,
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @description: 清空cookie
 * @return {void}
 */
export const cleanCookie = (): void => {
  const date = new Date()
  date.setTime(date.getTime() - 10000) // 设置过去的时间，使得 cookie 过期
  const keys = document.cookie.match(/[^ =;]+(?==)/g) // 匹配所有 cookie 的键名，去掉不必要的转义字符

  if (keys) {
    keys.forEach((key) => {
      document.cookie = `${key}=0; expire=${date.toUTCString()}; path=/;`
    })
  }
}

/**
 * @description: 设置cookie
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {number} [expiresDays=365] cookie过期天数
 * @param {boolean} [secure=false] 是否仅在 HTTPS 下传输 cookie
 * @param {string} [sameSite='Lax'] SameSite 属性
 * @return {void}
 */
export const setCookie = (
  name: string,
  value: string,
  expiresDays: number = 365,
  secure: boolean = false,
  sameSite: 'Lax' | 'Strict' | 'None' = 'Lax',
): void => {
  const date = new Date()
  date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000) // 设置过期时间
  const cookieValue = `${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=${sameSite}${secure ? '; Secure' : ''}`
  document.cookie = `${name}=${cookieValue}`
}

/**
 * @description: 获取季度区间
 * @param {string} date
 * @return {[beginDate, endDate]}
 */
export const getQuarter = (date: any) => {
  if (!date) {
    return []
  }
  const year = dayjs(date).format('YYYY')
  const quarter = (dayjs(date) as ObjectType).quarter()
  const beginDate = dayjs(year)
    .add(quarter - 1, 'quarter' as any)
    .format('YYYY-MM-DD')
  const endDate = dayjs(year)
    .add(quarter, 'quarter' as any)
    .subtract(1, 'day')
    .format('YYYY-MM-DD')
  if (beginDate === 'Invalid Date') {
    return []
  }
  return [beginDate, endDate]
}

/**
 *
 * @param {String} el  打印区域class/id
 * @param {Number} zoom 缩放比例
 * @param {String} initStyle 样式
 * @param {Function} cb 回调
 */
export function partPrint(el: any, zoom = 1, initStyle = '', cb?: () => void) {
  el = document.querySelector(el as string)
  const tmpHtml = el.outerHTML
  const styles = document.querySelectorAll('style,link')
  const styleArr = Array.from(styles)
  const styleStr = styleArr.map((style) => style.outerHTML).join('') + initStyle
  const tmpFrame = document.createElement('iframe')
  tmpFrame.setAttribute(
    'style',
    'position:absolute;width:0;top:-9999px;left:-9999px;margin:0;padding:0',
  )
  const f: any = document.body.appendChild(tmpFrame)
  const w: any = f.contentWindow
  const doc: any = f.contentDocument
  doc.open()
  const docStr = `
      <html>
        <head>
          <title></title>
          ${styleStr}
          <style>
            body {
              zoom:${zoom}
            }
          </style>
        </head>
        <body>
          ${tmpHtml}
        </body>
      </html>
  `
  doc.write(docStr)
  doc.close()
  tmpFrame.onload = function () {
    w.focus()
    w.print()
    w.close()
    setTimeout(function () {
      document.body.removeChild(tmpFrame)
      cb && cb()
    }, 100)
  }
}
