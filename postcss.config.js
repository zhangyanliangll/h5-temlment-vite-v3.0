import autoprefixer from 'autoprefixer'
import viewport from 'postcss-mobile-forever'

export default {
  plugins: [
    autoprefixer(),
    viewport({
      appSelector: '#app',
      unitPrecision: 3,
      maxDisplayWidth: 750,
      propList: ['*'],
      valueBlackList: ['1px solid'],
      mobileUnit: 'vw',
      rootContainingBlockSelectorList: ['van-popup--bottom'],
      // 默认视口宽度
      viewportWidth: (file) => {
        if (file && typeof file === 'string') {
          return file.includes('vant') ? 375 : 750
        }
        return 750
      },
    }),
  ],
}
