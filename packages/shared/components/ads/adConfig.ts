export const ADS = {
  socialBarSrc:
    'https://pl31105995.profitableratecpmnetwork.com/7b/6d/7c/7b6d7c4cde49ccd640834a893982b351.js',
  popunderSrc:
    'https://pl31105994.profitableratecpmnetwork.com/16/bd/f6/16bdf6fe4b51e99b8a8d70914d4329d4.js',
  nativeBanner: {
    src: 'https://pl31105996.profitableratecpmnetwork.com/11c1835b7d84058c74f38d7b445c5585/invoke.js',
    containerId: 'container-11c1835b7d84058c74f38d7b445c5585',
  },
  invokeBase: 'https://www.highrevenueformat.com',
  banners: {
    '468x60': { key: '00aac9a365ff84aeb5bec8d16329c23c', w: 468, h: 60 },
    '160x300': { key: '8c6dadf1ba6a7038fab5d367642ab6af', w: 160, h: 300 },
    '320x50': { key: '3d61a2774bfbed6b44c30976a4a24483', w: 320, h: 50 },
    '728x90': { key: '79df9adef0459a189d02423892f6b421', w: 728, h: 90 },
    '160x600': { key: 'c9d704fb4a57b8ac9962b05d1d3af4cc', w: 160, h: 600 },
    '300x250': { key: '9939224f9d0641f160cdd6dddaf478b8', w: 300, h: 250 },
  },
} as const

export type BannerSize = keyof typeof ADS.banners
