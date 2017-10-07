<template>
    <button class="epm-button"
            @click="handleClick"
            :class="type"
            :disabled="disabled">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'epm-button',
    props: {
        type: {
            type: String
        },
        disabled: Boolean
    },
    computed: {
    },
    methods: {
        handleClick (e) {
            this.$emit('click', e)
        },
    },
}
</script>
<style lang="less">
@import "~assets/less/variables";
.epm-button {
    display: inline-block;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    height: 36px;
    line-height: 36px;
    min-width: 88px;
    transition-duration: 300ms;
    transform: translate3d(0, 0, 0);
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    appearance: none;
    background: none;
    text-align: center;
    &:active {
        background: #ccc;
    }
    &.danger {
        background: @error-color ;
        color: #fff;
    }

    &.primary {
        background: @success-color ;
        color: #fff;
    }

    &.disabled {
        background: @gray-background-color;
        color: @gray-text-color;
        border: 1px solid @gray-border-color;
    }
}
</style>
