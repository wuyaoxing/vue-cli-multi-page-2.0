<template>
    <div class="epm-loading">
        <div class="epm-loading-box" :class="sizeSource[size]">
            <component :is="loadingType"></component>
        </div>
        <div class="epm-loading-text" v-if="setText">{{setText}}</div>
        <slot></slot>
    </div>
</template>
<script>
import noState from './noState'

export default {
    name: 'epm-loading',
    components: {
        noState
    },
    props: {
        // 包含状态类和无状态类
        loadingType: {
            type: String,
            default: 'noState'
        },
        text: {
            type: String
        },
        size: {
            type: String,
            default: 'smallest'
        }
    },
    data() {
        return {
            sizeSource: {
                smallest: 'epm-loading-smallest',
                smaller: 'epm-loading-smaller',
                small: 'epm-loading-small',
                medium: 'epm-loading-medium',
                large: 'epm-loading-large',
            }
        }
    },
    computed: {
        setText() {
            return this.text ? this.$t(`loading.${this.text}`) : ''
        },
    }
}
</script>
<style lang="less">
.epm-loading {
    width: 100%;
    height: 100%;
    text-align: center;
}
</style>
