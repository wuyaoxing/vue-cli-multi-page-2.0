<template>
    <div @touchstart="onTouchstart"
         @click="handleClick"
         @touchend="onTouchend"
         @touchcancel="onTouchend"
         :class="[classNames, {close: close}]"
         class="epm-chip epm-chip-extends"
         :style="style">
        <slot></slot>
        <div class="epm-chip-delete"
             :class="deleteIconClass"
             v-if="close && !disabled"
             @click.stop="handleDelete">
            <i class="epm-icon-close"></i>
        </div>
    </div>
</template>
<script>
import chip from './chip'

export default {
    name: 'epm-chip-extends',
    extends: chip
}
</script>
<style lang="less">

// @easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);
// .epm-chip {
//     &-extends {
//         border-radius: 16px;
//     }
//     .mu-avatar:first-child {
//         margin-left: -12px;
//         margin-right: 4px;
//     }
//     &-delete {
//         display: flex;
//         align-items: center;
//         padding: 0 8px;
//         height: 100%;
//         border-radius: 0 4px 4px 0;
//         transition: all 450ms @easeOutFunction;
//         &:active {
//             color: #2fb791;
//             background-color: transparent;
//         }
//     }
// }
</style>
