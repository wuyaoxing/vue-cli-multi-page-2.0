<template>
    <transition name="epm-dialog-slide"
                @after-enter="show()"
                @after-leave="hide()">
        <div class="epm-dialog-container"
             @click.self="handleClick"
             v-if="open"
             ref="dialog"
             :style="{'z-index': zIndex}">
            <div class="epm-dialog"
                 ref="dialog"
                 :class="dialogClass">
                <header class="epm-dialog-header"
                        v-if="title"
                        ref="title"
                        :class="headerClass">
                    <slot name="title">
                        {{title}}
                    </slot>
                </header>
                <section class="epm-dialog-body"
                         :class="bodyClass"
                         ref="elBody">
                    <slot></slot>
                </section>
                <footer class="epm-dialog-footer"
                        :class="footerClass">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import getZIndex from 'utils/globalZIndex'

export default {
    name: 'epm-dialog',
    props: {
        open: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        dialogClass: {
            type: String
        },
        headerClass: {
            type: String
        },
        bodyClass: {
            type: String
        },
        footerClass: {
            type: String
        },
        scrollable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            zIndex: getZIndex()
        }
    },
    methods: {
        handleClick (e) {
            this.$emit('dialog-close', 'overlay')
        },
        show () {
            this.$emit('show')
        },
        hide () {
            this.$emit('hide')
        }
    }
}
</script>

<style lang="less">
@import "~assets/less/variables";

@easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);
.epm-dialog {
    width: 75%;
    max-width: 768px;
    padding: 0;
    border-radius: 2px;
    background: #fff;
    font-size: @font-size-base;
    box-shadow: @box-shadow-3;
    &-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .4);
    }
    &-header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        font-size: 16px;
    }
    &-body {
    }
    &-footer {}
}


.epm-dialog-slide-enter-active,
.epm-dialog-slide-leave-active {
    transition: opacity .45s @easeOutFunction;
    .epm-dialog {
        backface-visibility: hidden;
        transition: transform .45s @easeOutFunction;
    }
}

.epm-dialog-slide-enter,
.epm-dialog-slide-leave-active {
    opacity: 0;
}

.epm-dialog-slide-enter .epm-dialog {
    transform: translate3d(0, -64px, 0);
}

.epm-dialog-slide-leave-active .epm-dialog {
    transform: translate3d(0, 64px, 0);
}
</style>
