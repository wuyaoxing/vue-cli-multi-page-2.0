<template>
    <div class="epm-date-display"
         :class="displayClass">
        <div class="epm-date-display-year"
             :class="{'disabled': disableYearSelection}"
             @click="handleSelectYear">
            <transition :name="'epm-date-display-' +  slideType"
                        v-for="displayDate, index in displayDates"
                        :key="index">
                <div class="epm-date-display-slideIn-wrapper"
                     :key="displayDate.getFullYear()">
                    <div class="epm-date-display-year-title">
                        {{displayDate.getFullYear()}}
                    </div>
                </div>
            </transition>
        </div>
        <div class="epm-date-display-monthday"
             @click="handleSelectMonth">
            <transition :name="'epm-date-display-' +  slideType"
                        v-for="displayDate, index in displayDates"
                        :key="index">
                <div class="epm-date-display-slideIn-wrapper"
                     :key="dateTimeFormat.formatDisplay(displayDate)">
                    <div class="epm-date-display-monthday-title">
                        {{dateTimeFormat.formatDisplay(displayDate)}}
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dateTimeFormat: {
            type: Object
        },
        disableYearSelection: {
            type: Boolean,
            default: false
        },
        monthDaySelected: {
            type: Boolean,
            default: true
        },
        selectedDate: {
            type: Date
        }
    },
    data () {
        return {
            displayDates: [this.selectedDate],
            slideType: 'next'
        }
    },
    computed: {
        selectedYear () {
            return !this.monthDaySelected
        },
        displayClass () {
            return {
                'selected-year': this.selectedYear
            }
        }
    },
    methods: {
        replaceSelected (date) {
            const oldDate = this.displayDates[0]
            this.slideType = date.getTime() > oldDate.getTime() ? 'next' : 'prev'
            this.displayDates.push(date)
            this.displayDates.splice(0, 1)
        },
        handleSelectYear () {
            if (!this.disableYearSelection) this.$emit('selectYear')
        },
        handleSelectMonth () {
            this.$emit('selectMonth')
        }
    },
    watch: {
        selectedDate (val) {
            this.replaceSelected(val)
        }
    }
}
</script>

<style lang="less">
@import "~assets/less/variables";

.epm-date-display {
    width: 100%;
    font-weight: 700;
    display: block;
    background-color: @primary-background-color;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 0;
    // color: @alternateTextColor;
    padding: 20px;
    .epm-calendar-landspace & {
        width: 165px;
        height: 330px;
        float: left;
        border-top-right-radius: 0;
        border-bottom-left-radius: 2px;
    }
}

.epm-date-display-year {
    position: relative;
    overflow: hidden;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    height: 16px;
    opacity: 0.7;
    transition: all .45s @easeOutFunction;
    margin-bottom: 10px;
    .epm-date-display.selected-year & {
        opacity: 1;
    }
}

.epm-date-display-year-title {
    cursor: pointer;
    .epm-date-display-year.disabled & {
        cursor: not-allowed;
    }
    .epm-date-display.selected-year {
        cursor: default;
    }
}

.epm-date-display-monthday {
    position: relative;
    display: block;
    overflow: hidden;
    font-size: 36px;
    line-height: 36px;
    height: 38px;
    transition: all .45s @easeOutFunction;
    width: 100%;
    font-weight: 500;
    .epm-date-display.selected-year & {
        opacity: 0.7;
    }
    .epm-calendar-landspace & {
        height: 100%;
    }
}

.epm-date-display-slideIn-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
}

.epm-date-display-monthday-title {
    cursor: default;
    width: 100%;
    display: block;
    .epm-date-display.selected-year & {
        cursor: pointer;
    }
}

.epm-date-display-next-enter-active,
.epm-date-display-next-leave-active,
.epm-date-display-prev-enter-active,
.epm-date-display-prev-leave-active {
    transition: transform 450ms @easeOutFunction, opacity 450ms @easeOutFunction;
    backface-visibility: hidden;
}

.epm-date-display-next-enter {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
}

.epm-date-display-next-leave-active {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
}

.epm-date-display-prev-enter {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
}

.epm-date-display-prev-leave-active {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
}
</style>
