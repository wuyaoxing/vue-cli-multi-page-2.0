<template>
    <div class="epm-calendar-year-container">
        <div class="epm-calendar-year"
             ref="container">
            <div class="epm-calendar-year-list">
                <button class="epm-calendar-year-button"
                        @click="handleClick(year)"
                        v-for="year in years"
                        :key="'yearButton' + year"
                        :year="year"
                        :class="{'selected': year === selectedDate.getFullYear()}">
                    <span class="epm-calendar-year-text">{{year}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        maxDate: {
            type: Date
        },
        minDate: {
            type: Date
        },
        selectedDate: {
            type: Date
        }
    },
    computed: {
        years () {
            const minYear = this.minDate.getFullYear()
            const maxYear = this.maxDate.getFullYear()
            const years = []
            for (let year = minYear; year <= maxYear; year++) {
                years.push(year)
            }
            return years
        }
    },
    methods: {
        handleClick (year) {
            this.$emit('change', year)
        },
        scrollToSelectedYear (yearButtonNode) {
            const container = this.$refs.container
            const containerHeight = container.clientHeight
            const yearButtonNodeHeight = yearButtonNode.clientHeight || 32
            const scrollYOffset = yearButtonNode.offsetTop
                + (yearButtonNodeHeight / 2)
                - (containerHeight / 2)
            container.scrollTop = scrollYOffset
        }
    }
}
</script>

<style lang="less">
@import "~assets/less/variables";

.epm-calendar-year {
    // background-color: @dialogBackgroundColor;
    height: inherit;
    line-height: 35px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    &-container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 10px;
        width: 310px;
        height: 272px;
        overflow: hidden;
    }
    &-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100%;
    }
    &-button {
        position: relative;
        display: block;
        background: none;
        outline: none;
        text-decoration: none;
        margin: 0px auto;
        padding: 0px;
        border: 10px;
        font-size: 14px;
        font-weight: inherit;
        text-align: center;
        line-height: inherit;
    }
    &-button.selected &-text {
        color: @primary-text-color;
        font-size: 26px;
        font-weight: 500;
    }
    &-text {
        align-self: center;
        color: @primary-text-color;
        font-size: 17px;
        font-weight: 400;
        position: relative;
        top: -1px;
    }
}
</style>
