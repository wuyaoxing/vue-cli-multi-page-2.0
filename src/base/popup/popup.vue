<template>
    <div class="epm-popup-container">
        <transition :name="`popup-slide-${position}`"
                    @after-enter="show()"
                    @after-leave="hide()">
            <div class="epm-popup"
                 ref="popup"
                 v-if="open"
                 :class="[`epm-popup-${position}`, popupClass]"
                 :style="{'z-index': popupZIndex}">
                <slot></slot>
            </div>
        </transition>
        <transition name="overlay-fade">
            <div class="epm-overlay"
                 v-if="open"
                 @click="overlayClick"
                 @touchmove="prevent"
                 :style="overlayStyle"></div>
        </transition>
    </div>
</template>
<script>
import getZIndex from 'utils/globalZIndex'

export default {
    name: 'epm-popup',
    props: {
        open: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: '' // 弹出位置 left, right, top, bottom
        },
        popupClass: {
            type: String,
            default: ''
        },
        popupTransition: {
            type: String,
            default: ''
        },
        overlay: {
            type: Boolean,
            default: true
        },
        overlayColor: {
            type: String,
            default: '#000'
        },
        overlayOpacity: {
            type: Number,
            default: 0.3
        }
    },
    data () {
        return {
            popupContainerZIndex: getZIndex(),
            overlayStyle: {
                opacity: this.overlayOpacity,
                'background-color': this.overlayColor,
                'z-index': getZIndex()
            },
            popupZIndex: getZIndex()
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        show () {
            this.$emit('popup-show')
        },
        hide () {
            this.$emit('popup-hide')
        },
        overlayClick (e) {
            if (this.overlay) this.$emit('popup-close', 'overlay')
        },
        clickOutSide (e) {
            this.$emit('clickOutSide', e)
        },
        prevent (e) {
            e.preventDefault()
            e.stopPropagation()
        },
        handleClick () {
            if (this.onClick) {
                this.onClick()
            }
        }
    },
}
</script>
<style lang="less">
.epm-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    &-top {
        top: 0;
        right: auto;
        bottom: auto;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }
    &-right {
        top: 50%;
        right: 0;
        bottom: auto;
        left: auto;
        transform: translate3d(0, -50%, 0);
    }
    &-bottom {
        top: auto;
        right: auto;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }
    &-left {
        top: 50%;
        right: auto;
        bottom: auto;
        left: 0;
        transform: translate3d(0, -50%, 0);
    }
}
.popup-slide-top-enter-active,
.popup-slide-top-leave-active,
.popup-slide-right-enter-active,
.popup-slide-right-leave-active,
.popup-slide-bottom-enter-active,
.popup-slide-bottom-leave-active,
.popup-slide-left-enter-active,
.popup-slide-left-leave-active {
    transition: transform .3s ease;
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter,
.popup-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter-active,
.popup-fade-leave-active {
    transition: opacity .3s;
}

.popup-fade-enter,
.popup-fade-leave-active {
    opacity: 0;
}

.epm-overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: .4;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
}

.overlay-fade-enter,
.overlay-fade-leave-active {
    opacity: 0 !important;
}
</style>
