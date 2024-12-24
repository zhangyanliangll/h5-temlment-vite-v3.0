// 金额千分位
export function moneyFormat(num: number): string {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
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

// 身份证隐藏
export function idCardFormat(card: string): string {
  const length = card.length
  if (length < 12) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += '*'
    }
    return str
  } else {
    const dif = length - 11
    let str = ''
    for (let i = 0; i < length; i++) {
      if ((i < dif && i < 4) || i > 14) {
        str += card[i]
      } else {
        str += '*'
      }
    }
    return str
  }
}

// 手机隐藏
export function phoneFormat(phone: string): string {
  const length = phone.length
  if (length < 5) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += '*'
    }
    return str
  } else {
    const dif = length - 4
    let str = ''
    for (let i = 0; i < length; i++) {
      if ((i < dif && i < 3) || i > 6) {
        str += phone[i]
      } else {
        str += '*'
      }
    }
    return str
  }
}

/**
 *  获取当前的日期：星期一，星期二，星期三 ....
 * @param {*} val | 时间
 * @returns
 */
export function dateDayFormat(val: Date): string {
  const weeks: ObjectType = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  const day = new Date(val).getDay()
  return weeks[day]
}

// 对象属性排序
export const objKeySort = (obj: Record<string, any>): Record<string, any> => {
  //排序的函数
  const newkey = Object.keys(obj).sort()
  //先用Object内置类的keys方法获取要排序对象的属性名，
  //再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newObj: any = {} //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    if (obj[newkey[i]]) {
      // 空值 除外
      newObj[newkey[i]] = obj[newkey[i]] //向新创建的对象中按照排好的顺序依次增加键值对
    }
  }
  return newObj //返回排好序的新对象
}
