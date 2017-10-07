import Vue from 'vue'
import router from './router'
// import store from './store'
import app from './app.vue'
import 'main'
import I18n from 'i18n'

const i18n = I18n()

// 生产环境不显示警告
// https://github.com/kazupon/vue-i18n/issues/96
Vue.config.missingHandler = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    // store,
    render: h => h(app)
})
