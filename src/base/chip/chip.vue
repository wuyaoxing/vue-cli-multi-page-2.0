<template>
    <div @touchstart="onTouchstart"
         @click="handleClick"
         @touchend="onTouchend"
         @touchcancel="onTouchend"
         :class="[classNames, {close: close}, {ellipse: borderRadius}, {normal: !borderRadius}]"
         class="epm-chip"
         :style="style">
        <slot></slot>
        <div class="epm-chip-delete"
             :class="deleteIconClass"
             v-if="close && !disabled"
             @click.stop="handleDelete">
            <i class="epm-icon-close"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'epm-chip',
    props: {
        close: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        deleteIconClass: {
            type: [Array, String, Object]
        },
        backgroundColor: {
            type: String
        },
        color: {
            type: String
        },
        borderRadius: {
            type: Boolean
        }
    },
    data () {
        return {
            focus: false,
        }
    },
    computed: {
        classNames () {
            if (this.disabled || this.borderRadius) return null
            return this.focus ? ['active'] : null
        },
        style () {
            return {
                backgroundColor: this.backgroundColor,
                color: this.color,
                borderRadius: this.borderRadius
            }
        }
    },
    methods: {
        onTouchstart () {
            this.focus = true
        },
        onTouchend () {
            this.focus = false
        },
        handleDelete () {
            this.$emit('close')
        },
        handleClick (e) {
            if (!this.disabled) this.$emit('click', e)
        }
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';

@alternateTextColor: #303030;
@easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);
@fullBlack: rgba(0, 0, 0, 1);
@textColor: rgba(255, 255, 255, 1);
.epm-chip {
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    height: 30px;
    border-radius: 4px;
    font-size: 12px;
    color: #696f7a;
    white-space: nowrap; // background-color: darken(@alternateTextColor, 12%);
    // color: fade(@textColor, 87%);
    &.close {
        padding-right: 0;
    }
    &.active {
        // background-color: #2fb791!important;
        // background-color: rgb(206, 206, 206);
        box-shadow: 0 1px 6px fade(@fullBlack, 12%), 0 1px 4px fade(@fullBlack, 12%);
        // color: fade(fade(@textColor, 26%), 40%);
    }
    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    &-delete {
        display: flex;
        align-items: center;
        padding: 0 8px;
        height: 100%;
        border-radius: 0 4px 4px 0;
        transition: all 450ms @easeOutFunction;
        &:active {
            color: #2fb791;
            background-color: transparent;
            box-shadow: 0 1px 6px fade(@fullBlack, 12%), 0 1px 4px fade(@fullBlack, 12%);
        }
    }
    &.normal {
        background-color: #e3e3e3;
    }
    &.ellipse {
        border-radius: 12px;
        overflow: hidden;
        height: 24px;
        .epm-chip-delete {
            &:active {
                box-shadow: none;
            }
        }
    }
}
</style>
