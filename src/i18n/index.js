import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { PRELOAD } from 'appCfg'

const lang = PRELOAD.user.language.toLowerCase()
const local = lang === 'zh-cn' ? 'cn' : 'en'

Vue.use(VueI18n)

export default () => {
    const i18n = new VueI18n({
        locale: local,
        messages: {
            en: {},
            cn: {}
        },
        missing: (locale, key, vm) => {
            // console.log(locale, key, vm)
        },
    })

    if (local === 'cn') {
        require(['./cn'], module => i18n.setLocaleMessage(local, module.default))
    }

    if (local === 'en') {
        require(['./en'], module => i18n.setLocaleMessage(local, module.default))
    }

    // i18n.missing = (locale, key, vm) => {
    //     // handle translation missing
    // }

    return i18n
}
