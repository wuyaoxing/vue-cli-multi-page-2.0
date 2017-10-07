<template>
    <div class="epm-calendar-toolbar">
        <i class="epm-icon-arrow-right"
           :disabled="!prevMonth"
           @click.stop="prev">
        </i>
        <div class="epm-calendar-toolbar-title-wrapper">
            <transition :name="'epm-calendar-slide-' + slideType"
                        v-for="displayDate, index in displayDates"
                        :key="index">
                <div class="epm-calendar-toolbar-title"
                     :key="displayDate.getTime()">
                    {{dateTimeFormat.formatMonth(displayDate)}}
                </div>
            </transition>
        </div>
        <i class="epm-icon-arrow-right"
           :disabled="!nextMonth"
           @click.stop="next">
        </i>
    </div>
</template>

<script>
export default {
    props: {
        dateTimeFormat: {
            type: Object
        },
        displayDates: {
            type: Array
        },
        nextMonth: {
            type: Boolean,
            default: true
        },
        prevMonth: {
            type: Boolean,
            default: true
        },
        slideType: {
            type: String
        }
    },
    methods: {
        prev () {
            this.$emit('monthChange', -1)
        },
        next () {
            this.$emit('monthChange', 1)
        }
    }
}
</script>

<style lang="less">
@import "~assets/less/variables";

.epm-calendar-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    &>i {
        padding: 15px;
        border-radius: 2px;
        &:first-of-type {
            transform: rotate(180deg);
        }
        &:active {
            background: @dark-background-color;
        }
    }
    &-title {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        line-height: 48px;
        &-wrapper {
            position: relative;
            overflow: hidden;
            height: 100%;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            width: 100%;
        }
    }
}
</style>
