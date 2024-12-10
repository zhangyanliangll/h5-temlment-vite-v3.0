declare global {
  interface Object {
    /**
     * 简单深拷贝 SON.parse(JSON.stringify(value))
     */
    deepCopy(): Record<string, any>
  }
  interface Array {
    /**
     * 移除非对象数组中的某个元素
     * @param val 要移除的元素
     */
    remove(val: string | number): Array<string | number>
    /**
     * 数组插入指定位，返回一个新数组
     * @param val 插入的元素
     * @param i 插入的位置
     */
    insert(val: string | number, i?: number): Array<any>
  }
  interface String {
    /**
     * 去除字符串空格
     * @param isGlobal 是否全局去除空格
     */
    Trim(isGlobal?: boolean): string
    /**
     * 数字格式化, 保留两位小数点 12..300 ===>  12.30
     * @param isNegative 是否允许输入负数
     * @param howmMany 保留多少位小数
     * @param maxValue 最大值
     */
    floatFormater(
      isNegative?: boolean,
      howmMany?: number,
      maxValue?: number,
    ): string
    /**
     * 数字格式化, 保留整正数
     */
    floatFormaterJust(): string
  }
  interface Date {
    /**
     * 支持美式时间格式
     * @param format
     */
    format(
      format?:
        | 'YYYY-MM-DD HH:mm:ss'
        | 'YYYY-MM-DD HH:mm:'
        | 'YYYY-MM-DD'
        | 'YYYY-MM'
        | 'YYYY年MM月DD日'
        | 'YYYY年MM月'
        | 'MM月DD日'
        | 'YYYY',
    ): string
    /**
     * 格式化时间 'YYYY-MM-DD HH:mm'
     */
    datetime(): string
    /**
     * 格式化时间 'YYYY-MM-DD HH:mm:ss'
     */
    dateTime(): string
  }
}

// 注意: 修改"全局声明"必须在模块内部, 所以至少要有 export{}字样
// 不然会报错❌: 全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中
export {}
