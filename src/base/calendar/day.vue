<template>
    <div :class="[dayClass, {'epm-calendar-day-empty': !day}]"
         @click="handleClick"
         :disabled="disabled">
        <div class="epm-calendar-day-bg"></div>
        <span class="epm-calendar-day-text">{{day}}</span>
    </div>
</template>
<script>
export default {
    props: {
        selected: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        day () {
            return this.date ? this.date.getDate() : ''
        },
        isNow () {
            const now = new Date()
            return this.date
                && this.date.getYear() === now.getYear()
                && this.date.getMonth() === now.getMonth()
                && this.date.getDate() === now.getDate()
        },
        dayClass () {
            return {
                selected: this.selected,
                'epm-calendar-day': true,
                disabled: this.disabled,
                now: this.isNow
            }
        }
    },
    methods: {
        handleClick (event) {
            this.$emit('click', event)
        }
    },
}
</script>
<style lang="less">
@import "~assets/less/variables";

.epm-calendar-day {
    margin: 0px;
    padding: 4px 0px;
    font-size: inherit;
    font-weight: 400;
    position: relative;
    border: 10px;
    width: 42px;
    &.disabled {
        opacity: .4;
    }
    &.now &-text {
        color: @gray-text-color;
    }
    &.selected &-bg {
        transform: scale(1);
        opacity: 1;
    }
    &.selected &-text {
        color: @white-text-color;
    }
    &-empty {
        pointer-events: none;
        cursor: not-allowed;
    }
    &-bg {
        position: absolute;
        top: 0;
        left: 4px;
        height: 34px;
        background-color: @accent-color;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        transition: all .45s @easeOutFunction;
        width: 34px;
    }

    &-text {
        font-weight: 400;
        position: relative;
        color: @primary-text-color;
    }
}
</style>
