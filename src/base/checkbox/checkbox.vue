<template>
    <label class="epm-checkbox">
        <span class="epm-checkbox-inner"
              :class="[{ 'is-checked': checked, 'is-disabled': disabled }, size ? `epm-checkbox-${size}` : '']"></span>
        <input class="epm-checkbox-original"
               :class="[size ? `epm-checkbox-${size}` : '']"
               type="checkbox"
               :disabled="disabled"
               v-model="model"
               @change="handleChange">
    </label>
</template>
<script>
export default {
    name: 'epm-checkbox',
    props: {
        disabled: Boolean,
        checked: Boolean,
        size: String, // small large
    },
    computed: {
        model: {
            get () {
                return this.checked
            },
            set (val) {
                this.$emit('update:checked', val)
            }
        },
    },
    methods: {
        handleChange (e) {
            this.$emit('change', e)
            console.log(e)
        }
    }
}
</script>
<style lang="less">
.epm-checkbox {
    display: inline-flex;
    position: relative; // vertical-align: top;
    &-inner {
        display: inline-block;
        position: relative;
        border: 2px solid #cbcbcb;
        border-radius: 4px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
        &.is-checked {
            background-color: #7d7d7d;
            border-color: #7d7d7d;
            &::after {
                transform: rotate(45deg) scaleY(1);
            }
        }
        &.is-disabled {
            background-color: #eee;
            border-color: #c8c8c8;
            cursor: not-allowed;
        }
        &.is-disabled.is-checked {
            background-color: #c8c8c8;
            border-color: #c8c8c8;
            cursor: not-allowed;
            &::after {
                transform: rotate(45deg) scaleY(1);
            }
        }
        &::after {
            box-sizing: content-box;
            content: "";
            border: 2px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 8px;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: rotate(45deg) scaleY(0);
            width: 4px;
            transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
            transform-origin: center;
            margin-top: -6px;
            margin-left: -3px;
        }
    }
    &-original {
        opacity: 0;
        outline: 0;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        z-index: 2;
    }
    &-small {
        width: 14px;
        height: 14px;
        &+input {}
    }
    &-large {
        width: 30px;
        height: 30px;
        &+input {
            margin-left: -15px;
            margin-top: -15px;
        }
    }
}
</style>
