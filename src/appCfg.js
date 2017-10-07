import uuid from 'utils/uuid'
// const PRELOAD_ID = 'preload'
// //-> 生产环境下预加载策略
// const el = document.getElementById(PRELOAD_ID)
// const config = JSON.parse(el.innerHTML)
// el.remove()

const {
    appcfg: SYS_CONF,
    preload: PRELOAD,
} = window.pfcfg || { appcfg: { baseUrl: 'http://192.168.1.10:8080', 'X-SID': '628fbf5568a949688e16bc36b852f38f_5f8c7697eee06fb464db0584783f209e', 'X-PHPSESSID': 'XH2C-HDKO-6I5H-DLKB-QOJ2-I0DP-SAWV-3GKJ', orgNumberLimit: 2 }, preload: { user: { language: 'zh-cn' } } }

const U_TAG = uuid()
const isDevMode = process.env.NODE_ENV !== 'production'

export {
    U_TAG,
    SYS_CONF,
    PRELOAD,
    isDevMode
}
