import loading from './loading/loading'
import defaultPage from './defaultPage/defaultPage'
import popup from './popup'
import checkbox from './checkbox/checkbox'
import button from './button/button'
import dialog from './dialog'
import border from './border/border'
import collapse from './collapse/collapse'
import chip from './chip/chip'
import divider from './divider/divider'
import ripple from './ripple/circleRipple'
import touchRipple from './ripple/touchRipple'
import Message from './message'

const base = {
    loading,
    defaultPage,
    popup,
    checkbox,
    button,
    dialog,
    border,
    collapse,
    chip,
    divider,
    ripple,
    touchRipple
}

export default {
    install(Vue) {
        Object.keys(base).forEach(key => {
            Vue.component(base[key].name, base[key])
        })
        Vue.prototype.$Message = Message
    }
}
