import 'assets/less/index.less'
import Vue from 'vue'
import mixins from 'mixins'
import plugins from 'plugins'
import base from 'base'
import components from 'components'

import 'core/imgError'

Vue.use(mixins)
Vue.use(plugins)
Vue.use(base)
Vue.use(components)

Vue.config.productionTip = false

Vue.prototype.$isDevMode = process.env.NODE_ENV !== 'production'
