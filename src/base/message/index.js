/* eslint-disable */
import Vue from 'vue'
import getZIndex from 'utils/globalZIndex'

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

export function isVNode(node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions');
}

const MessageConstructor = Vue.extend(require('./message.vue'))

let instance
const instances = []
let seed = 1

const Message = option => {
    if (Vue.prototype.$isServer) return
    let options
    if (typeof option === 'string') {
        options = {
            message: option
        }
    }else {
        options = option
    }
    const id = `message_${seed += 1}`

    const userOnClose = () => {
        Message.close(id, userOnClose)
    }
    instance = new MessageConstructor({
        data: options
    })
    instance.id = id
    if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
    }
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instance.dom.style.zIndex = getZIndex()
    instances.push(instance)

    return instance.vm
}

Message.close = (id, userOnClose) => {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i])
            }
            instances.splice(i, 1)
            break
        }
    }
}

Message.closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close()
    }
}

export default Message
