const components = {}

export default {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.component(components[key].name, components[key])
        })
    }
}
