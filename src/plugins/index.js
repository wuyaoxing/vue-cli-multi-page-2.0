import ellipsis from 'utils/ellipsis'
import formatDate from 'utils/formatDate'

export default {
    install(Vue) {
        Vue.filter('ellipsis', ellipsis)
        Vue.filter('formatDate', formatDate)
    }
}
