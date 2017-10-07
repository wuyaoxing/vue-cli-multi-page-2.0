<template>
    <div class="epm-divider-container">
        <div class="epm-divider"></div>
        <div class="epm-divider-text" v-if="text">{{text}}</div>
        <div class="epm-divider"></div>
    </div>
</template>

<script>
export default {
    name: 'epm-divider',
    props: {
        text: String
    }
}
</script>

<style lang="less">
@import '~assets/less/variables';

.epm-divider {
    flex: 1 0 auto;
    height: 1px;
    width: 1px;
    background: #d4d6db;
    &-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
    &-text {
        flex: 0 0 auto;
        text-transform: uppercase;
        font-size: @font-size-base;
        font-weight: bold;
        color: #464c59;
        margin: 0 10px;
    }
}
</style>
