<template>
    <epm-border class="epm-collapse"
                :border="border"
                :radius="radius">
        <header class="epm-collapse-header"
                @click="switchCollapse">
            <i class="epm-icon-arrow-down"
               :class="{'epm-collapse-icon-rotate':!isCollapse}"
               v-if="icon"></i>
            <slot name="header"></slot>
        </header>
        <section class="epm-collapse-body"
                 v-show="isCollapse">
            <slot></slot>
        </section>
        <footer class="epm-collapse-footer">
            <slot name="footer"></slot>
        </footer>
    </epm-border>
</template>
<script>
export default {
    name: 'epm-collapse',
    props: {
        border: Array,
        radius: {
            type: Boolean,
            default: true
        },
        icon: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
            isCollapse: true,
        }
    },
    methods: {
        switchCollapse () {
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>
<style lang="less">
@import "~assets/less/variables";

.epm-collapse {
    overflow: hidden; // margin-bottom: 10px;
    font-size: @font-size-base; // box-shadow: @box-shadow-card;
    &-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: @font-size-base;
        padding: 8px;
        height: 45px;
        i {
            padding: 15px;
        }
        &>i {
            transition: 0.3s; // transform: rotate(0deg);
        }
    }
    &-icon-rotate {
        transform: rotate(-90deg);
    }
    &-body {}
    &-footer {}
}
</style>
