//  IP
// -

export default () => {
  return {
    // 配置代理服务 --- 开发环境
    '/api/report_web': {
      target: 'http://10.216.35.183:8186',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  }
}
