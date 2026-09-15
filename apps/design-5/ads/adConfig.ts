export const ADS = {
  socialBarSrc:
    'https://pl31353138.profitableratecpmnetwork.com/25/ac/6b/25ac6bddd773cf854aac8634303ff49d.js',
  popunderSrc:
    'https://pl31353136.profitableratecpmnetwork.com/ff/60/b7/ff60b7b1304f4a9be9ad4a4906105b64.js',
  nativeBanner: {
    src: 'https://pl31353137.profitableratecpmnetwork.com/a74e85f2a6de5e2392790bc9f24158fb/invoke.js',
    containerId: 'container-a74e85f2a6de5e2392790bc9f24158fb',
  },
  smartlink:
    'https://www.profitableratecpmnetwork.com/gj62smgis7?key=ec83603a29c5796b09eac88aa9260f72',
  invokeBase: 'https://www.highrevenueformat.com',
  banners: {
    '468x60': { key: 'e2e8f5b4c1fdc3aa6c601cd69657f60f', w: 468, h: 60 },
    '300x250': { key: '6784d7e7f00742824ffe6013395e5513', w: 300, h: 250 },
    '160x300': { key: '4a21b4bce7ac0d8f3d7b16daa6113c8d', w: 160, h: 300 },
    '160x600': { key: 'cd642d537a80bc6c0a7238aed4f7c253', w: 160, h: 600 },
    '320x50': { key: 'fdef96f7ecbec4f6918d0aa371d18c9c', w: 320, h: 50 },
    '728x90': { key: 'e4fca4f30d4e3650d2343b58195a0343', w: 728, h: 90 },
  },
} as const

export type BannerSize = keyof typeof ADS.banners
