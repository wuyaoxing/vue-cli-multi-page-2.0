const mixins = {}

export default {
    install(Vue) {
        Object.keys(mixins).forEach(key => {
            Vue.mixin(mixins[key])
        })
    }
}
