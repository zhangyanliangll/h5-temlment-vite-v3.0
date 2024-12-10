import '../date-format'

/**
 * 移除数组中某个元素
 */
Object.defineProperty(Array.prototype, 'remove', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function (val: string | number) {
    const index = this.indexOf(val)
    if (index > -1) {
      this.splice(index, 1)
    }
    return this
  },
})

/**
 * 数组插入指定位置
 */
Object.defineProperty(Array.prototype, 'insert', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function (val: any, index = 0) {
    if (Array.isArray(val)) {
      const left =
        this.filter((item: any, i: number) => {
          return i < index + 1
        }) || []
      const right =
        this.filter((item: any, i: number) => {
          return i > index
        }) || []
      return left.concat(val).concat(right)
    }
    return this.splice(1, 0, val)
  },
})

/**
 * 去除前后空格
 */
Object.defineProperty(String.prototype, 'Trim', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function (isGlobal = false) {
    if (isGlobal) {
      // 是否删除所有空格
      return this.replace(/\s/g, '')
    }
    return this.replace(/(^\s*)|(\s*$)/g, '')
  },
})

/**
 * 简单深拷贝 JSON.parse(JSON.stringify(value))
 */
Object.defineProperty(Object.prototype, 'deepCopy', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function () {
    return JSON.parse(JSON.stringify(this))
  },
})

/**
 * 数字格式化, 保留整正数
 */
Object.defineProperty(String.prototype, 'floatFormaterJust', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function () {
    return this.replace(/[^\d]/g, '')
  },
})

/**
 * 数字格式化, 保留两位小数点, 且大于0, 键盘事件输入控制
 */
Object.defineProperty(String.prototype, 'floatFormater', {
  writable: true,
  enumerable: false, // 不可枚举
  configurable: true,
  value: function (
    isNegative = false,
    howmMany = 2,
    maxValue = Number.MAX_SAFE_INTEGER,
  ) {
    let num = this.Trim()
    num = num.replace(/^\./g, '')
    if (isNegative) {
      num = num.replace(/[^-?(\d.)]/g, '') //清除数字和‘- .’以外的字符
      num = num.replace(/-{2,}/g, '-') //只保留第一个 -，清楚多余的
      num = num.replace('-', '$#$').replace(/-/g, '').replace('$#$', '-')
    } else {
      num = num.replace(/[^\d.]/g, '') //清除数字和‘.’以外的字符
    }
    num = num.replace(/\.{2,}/g, '.') //只保留第一个，清楚多余的
    num = num.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    if (howmMany == 3) {
      // eslint-disable-next-line no-useless-escape
      num = num.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3') //只能输入三个小数
    } else {
      // eslint-disable-next-line no-useless-escape
      num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
    }

    if (isNegative && num === '-') {
      return num
    }
    if (num.indexOf('.') < 0 && num != '') {
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      num = String(parseFloat(num))
    }

    if (Number(num) > Number(maxValue)) {
      return Number(maxValue)
    }

    return num
  },
})
