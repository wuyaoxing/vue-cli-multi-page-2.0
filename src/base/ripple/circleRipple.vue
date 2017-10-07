<template>
    <transition name="mu-ripple">
        <div class="mu-circle-ripple"
             :style="styles"></div>
    </transition>
</template>

<script>
export default {
    name: 'epm-ripple',
    props: {
        mergeStyle: {
            type: Object,
            default () {
                return {}
            }
        },
        color: {
            type: String,
            default: ''
        },
        opacity: {
            type: Number
        }
    },
    computed: {
        styles () {
            return Object.assign({}, { color: this.color, opacity: this.opacity }, this.mergeStyle)
        }
    }
}
</script>

<style lang="less">
@easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);
.mu-circle-ripple {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    border-radius: 50%;
    background-color: currentColor;
    background-clip: padding-box;
    opacity: 0.1;
}

.mu-ripple-enter-active,
.mu-ripple-leave-active {
    transition: opacity 2s @easeOutFunction, transform .45s @easeOutFunction;
}

.mu-ripple-enter {
    transform: scale(0);
}

.mu-ripple-leave-active {
    opacity: 0 !important;
}
</style>
