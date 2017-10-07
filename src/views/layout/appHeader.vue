<template>
    <div class="epm-app-header">
        <div class="epm-app-back"
             @click="backClick">
            <i class="epm-icon-arrow-down"></i>
        </div>
        <div class="epm-app-title">
            <slot></slot>
        </div>
        <div class="epm-app-menu"
             @click="menuClick">
            <i class="epm-icon-menu"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        backClick: Function,
        menuClick: Function,
    }
}
</script>
<style lang="less">
@import "~assets/less/variables";

.epm-app- {
    &header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        color: @white-text-color;
        background: @primary-color;
    }
    &back,
    &menu {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
            background: @primary-dark-color;
        }
    }
    &back {
        i {
            transform: rotate(90deg)
        }
    }
}
</style>

