<template>
    <transition name="epm-message-notice">
        <div class="epm-message-notice"
             v-show="visible && message">
            <span>{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            message: '',
            duration: 3000,
            type: 'info',
            onClose: null,
            showClose: false,
            closed: false,
            timer: null
        }
    },
    watch: {
        closed (newVal) {
            if (newVal) {
                this.visible = false
                this.$el.parentNode.removeChild(this.$el)
            }
        }
    },
    methods: {
        close () {
            this.closed = true
            if (typeof this.onClose === 'function') {
                this.onClose(this)
            }
        },
        clearTimer () {
            clearTimeout(this.timer)
        },
        startTimer () {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close()
                    }
                }, this.duration)
            }
        }
    },
    mounted () {
        this.startTimer()
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';

.epm-message-notice {
    width: 60%;
    background: @gray-background-color;
    padding: 8px;
    position: fixed;
    top: 20px;
    right: 10px;
    border-radius: 2px;
    box-shadow: @box-shadow-2;
    color: @primary-text-color;
    &.info {
        color: @primary-text-color;
    }
    &.error {
        color: @error-color;
    }
    &.warning {
        color: @warning-color;
    }
    &.success {
        color: @success-color;
    }
}

.epm-message-notice-enter-active {
    animation: epm-message-notice-in .3s
}

.epm-message-notice-leave-active {
    animation: epm-message-notice-out .3s
}

@keyframes epm-message-notice-in {
    0% {
        transform: translate3d(0, -40px, 0);
        opacity: 0
    }

    to {
        transform: translateZ(0);
        opacity: 1
    }
}

@keyframes epm-message-notice-out {
    0% {
        transform: translateZ(0);
        opacity: 1
    }

    to {
        transform: translate3d(0, -40px, 0);
        opacity: 0
    }
}
</style>
