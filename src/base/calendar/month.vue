<template>
    <div class="epm-calendar-monthday-content">
        <div class="epm-calendar-monthday-row"
             :key="i"
             v-for="week, i in weeksArray">
            <calendar-day @click="handleClick(date)"
                          v-for="date, j in week"
                          :disabled="isDisableDate(date)"
                          :key="'dayButton' + i + '' + j"
                          :selected="equalsDate(date)"
                          :date="date"></calendar-day>
        </div>
    </div>
</template>

<script>
import calendarDay from './day'
import * as dateUtils from './dateUtils'

export default {
    components: {
        calendarDay
    },
    props: {
        displayDate: {
            type: Date
        },
        firstDayOfWeek: {
            type: Number,
            default: 1
        },
        maxDate: {
            type: Date
        },
        minDate: {
            type: Date
        },
        selectedDate: {
            type: Date
        },
        shouldDisableDate: {
            type: Function
        }
    },
    data () {
        return {
            weeksArray: dateUtils.getWeekArray(this.displayDate || new Date(), this.firstDayOfWeek)
        }
    },
    watch: {
        displayDate (val) {
            return dateUtils.getWeekArray(val || new Date(), this.firstDayOfWeek)
        }
    },
    methods: {
        equalsDate (date) {
            return dateUtils.isEqualDate(date, this.selectedDate)
        },
        isDisableDate (day) {
            if (day === null) return false
            let disabled = false
            if (this.maxDate && this.minDate) {
                disabled = !dateUtils.isBetweenDates(day, this.minDate, this.maxDate)
            }
            if (!disabled && this.shouldDisableDate) disabled = this.shouldDisableDate(day)
            return disabled
        },
        handleClick (date) {
            if (date) this.$emit('selected', date)
        }
    },
}
</script>

<style lang="less">
@import "~assets/less/variables";

.epm-calendar-monthday {
    &-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-weight: 400;
        max-height: 228px;
        line-height: 2;
        position: relative;
        text-align: center;
    }
    &-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 34px;
        margin-bottom: 2px;
    }
}
</style>
