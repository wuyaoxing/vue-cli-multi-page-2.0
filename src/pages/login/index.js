import Vue from 'vue'
import login from './login.vue'
import VueI18n from 'vue-i18n'

const lang = navigator.language.toLowerCase()
const local = lang === 'zh-cn' ? 'cn' : 'en'

Vue.use(VueI18n)

const messages = {
    en: {
        message: {
        }
    },
    cn: {
        message: {
            title: '登录EasyPM账号',
            userName: '账号',
            password: '密码',
            action: '登录'
        }
    }
}

const i18n = new VueI18n({
    locale: local,
    messages
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    render: h => h(login)
})
