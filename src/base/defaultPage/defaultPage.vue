<template>
    <div class="epm-default"
         :class="size">
        <!--<div class="epm-default-img" :style="{ backgroundImage: defaultImg }"></div>-->
        <img class="epm-default-img"
             :src="defaultImg">
        <div class="epm-default-text"
             v-if="defaultText">{{defaultText}}</div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'epm-default-page',
    props: {
        text: {
            type: String
        },
        img: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'sm'    // sm、md、lg
        }
    },
    computed: {
        defaultText () {
            return this.text ? this.$t(`defaultPage.${this.text}`) : ''
        },
        defaultImg () {
            // return `url(${require(`images/defaults/${this.img}.png`)})`
            return require(`images/${this.img}.png`)
        }
    }
}
</script>
<style lang="less">
@import "~assets/less/variables";
@import "~assets/less/mixins";

.epm-default {
    position: absolute;
    top: 50%;
    left: 50%;
    color: @light-text-color;
    text-align: center;
    transform: translate(-50%, -50%);
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // width: 100%;
    // height: 100%;

    &.lg {
        .epm-default- {
            &img {
                width: 360px;
            }
            &text {
                font-size: 20px;
            }
        }
    }

    &.md {
        .epm-default- {
            &img {
                width: 280px;
            }
            &text {
                font-size: 18px;
            }
        }
    }

    &.sm {
        .epm-default- {
            &img {
                width: 200px;
            }
            &text {
                font-size: 16px;
            }
        }
    }

    &-text {
        margin-top: 30px;
    }
}
</style>
