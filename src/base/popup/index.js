import Popup from './popup'

export default {
    name: 'epmPopup',
    extends: Popup,
    props: {
        appendToBody: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        if(this.appendToBody) document.body.appendChild(this.$el)
    },
    beforeDestroy() {
        if(this.appendToBody) this.$el.remove()
    }
}
