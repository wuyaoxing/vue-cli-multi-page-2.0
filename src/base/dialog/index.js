import Dialog from './dialog'

export default {
    name: 'epmDialog',
    extends: Dialog,
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
