import dayjs from 'dayjs'

/**
 * @description: 节流函数
 * @param {Function} fn 回调
 * @param {Number} wait 延迟
 */
export function throttle(fn: (...args: any) => void, wait = 1000): any {
  let pre = Date.now()
  return function (this: any, ...rest: any) {
    const now = Date.now()
    if (now - pre >= wait) {
      fn.apply(this, rest)
      pre = Date.now()
    }
  }
}

/**
 * @description: 防抖函数
 * @param {*}
 * @return {*}
 */
export function debounce(
  func: (...args: any) => void,
  delay = 500,
): (...args: any) => void {
  let timeout: any = null
  return function (this: any, ...args: any) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @description: 清空cookie
 * @param {*} void
 * @return {*}
 */
export const cleanCookie = (): void => {
  const date = new Date()
  date.setTime(date.getTime() - 10000)
  // eslint-disable-next-line no-useless-escape
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  console.log('需要删除的cookie名字：' + keys)
  if (keys) {
    for (let i = keys.length; i--; )
      document.cookie =
        keys[i] + '=0; expire=' + date.toUTCString() + '; path=/'
  }
}

/**
 * @description: 设置cookie
 * @param {string} name
 * @param {string} value
 * @return {*}
 */
export const setCookie = (name: string, value: string): void => {
  document.cookie = name + '=' + escape(value)
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

// 转换成大写
export const toFormaterChies = (value: any) => {
  // 是否是合理数字
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
    return
  }
  let unit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  let str = ''
  value += '00'
  // 是否包含小数点
  const p = value.indexOf('.')
  if (p >= 0) {
    // 只取小数后两位
    value = value.substring(0, p) + value.substr(p + 1, 2)
  }
  // 截取单位
  unit = unit.substr(unit.length - value.length)
  for (let i = 0; i < value.length; i++) {
    // 拼接数字和单位
    str +=
      '零壹贰叁肆伍陆柒捌玖'.charAt(Number(value.charAt(i))) + unit.charAt(i)
  }
  if (str === '零元零角零分') {
    return '零元整'
  }
  return (
    str
      .replace(/零(仟|佰|拾|角)/g, '零')
      .replace(/(零)+/g, '零')
      .replace(/零(万|亿|元)/g, '$1')
      // .replace(/(亿)万|壹(拾)/g, '$1$2')
      .replace(/(亿)万/g, '$1')
      .replace(/^元零?|零分/g, '')
      .replace(/元$/g, '元整')
  )
}
