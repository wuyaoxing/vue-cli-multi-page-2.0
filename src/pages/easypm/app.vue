<template>
    <div id="app"
         class="epm-app-layout">
        <div class="epm-app-layout-container"
             :class="{trans: open}">
            <app-header :backClick="backClick"
                        :menuClick="menuClick">
                test
            </app-header>
            <router-view class="epm-app-layout-content"></router-view>
        </div>
        <app-nav :open="open"
                 :popupClose="popupClose"></app-nav>
        <epm-panel></epm-panel>
    </div>
</template>
<script>
import appHeader from 'views/layout/appHeader'
import appNav from 'views/layout/appNav'
import epmPanel from 'components/panel/panel'

import bus from 'utils/bus'

export default {
    name: 'app',
    components: {
        appHeader,
        appNav,
        epmPanel
    },
    data () {
        return {
            open: false,
        }
    },
    methods: {
        backClick () {
            history.back()
        },
        menuClick () {
            this.open = true
        },
        popupClose () {
            this.open = false
        },
        messageLine (e) {
            this.$Message(this.$t(`message.${e.type}`))
        }
    },
    mounted () {
        bus.$on('message-error', this.messageError)
        window.addEventListener('online', this.messageLine)
        window.addEventListener('offline', this.messageLine)
    },
    destroyed () {
        bus.$off('message-error', this.messageError)
        window.removeEventListener('online', this.messageLine)
        window.removeEventListener('offline', this.messageLine)
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';

.trans {
    transform: translateX(-70%);
}

.epm-app-layout {
    width: 100%;
    height: 100%;
    background-color: @primary-background-color;
    &-container {
        position: relative;
        height: 100%;
        transition: transform .3s ease;
    }
    &-content {
        position: absolute;
        top: 50px;
        right: 0;
        bottom: 0;
        left: 0; // padding: 10px;
        // background-color: @gray-dark-background;
        background-size: cover;
        overflow-y: auto;
    }
}
</style>

