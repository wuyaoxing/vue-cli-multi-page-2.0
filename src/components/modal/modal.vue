<template>
    <div class="epm-modal">
        <epm-popup :open="open"
                   position="top"
                   popupClass="epm-modal-container"
                   @popup-close="modalClose">
            <div class="epm-modal-body">
                123456789
            </div>
        </epm-popup>
    </div>
</template>
<script>
export default {
    name: 'epm-modal',
    props: {
        open: Boolean,
        modalClose: Function
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';

.epm-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    &-container {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // color: @light-text-color;
        // transform: translate(-50%, -50%);
        border-radius: 2px;
        width: 70%;
        height: 70%;
        background: @primary-background-color;
    }
}
</style>
