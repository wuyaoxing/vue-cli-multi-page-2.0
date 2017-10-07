<template>
    <epm-popup :open="open"
               position="right"
               popupClass="epm-app-nav"
               :appendToBody="false"
               @popup-close="popupClose">
        <div class="epm-nav-top">
            <img class="epm-nav-avatar"
                 src=""
                 alt="">
            <div class="epm-nav-org">
                <span>test</span>
                <i class="epm-icon-arrow-down"></i>
            </div>
        </div>
        <ul class="epm-nav-list">
            <li class="epm-nav-item-highlight"
                :style="activeStyle"></li>
            <li v-for="(menuItem, index) in menus"
                class="epm-nav-item"
                :key="index">
                <router-link class="epm-nav-link"
                             :to="{ name: menuItem.defaultName || menuItem.name }">
                    <i :class="menuItem.icon"></i>
                    <span>{{menuItem.title}}</span>
                </router-link>
            </li>
        </ul>
    </epm-popup>
</template>
<script>
import { navRoutes } from 'pages/easypm/router'

export default {
    props: {
        open: Boolean,
        popupClose: Function
    },
    data () {
        return {
            menuIndex: 0,
            topBtnLen: 2,
            orgList: true
        }
    },
    computed: {
        menus () {
            return navRoutes.reduce((acc, route) => {
                route.title = this.getTitle(route.path)
                acc.push(route)
                return acc
            }, [])
        },
        activeStyle () {
            return { top: `${(50 * this.menuIndex) + 60}px` }
        },
    },
    watch: {
        $route ({ name, path }) {
            // this.menuIndex = this.menus.findIndex(item => (item.path
            //         ? path.startsWith(item.path) : item.name === name))
            this.menuIndex = this.menus.findIndex(item => (path.startsWith(item.path)
                || item.alias === path))
            this.updateTitle(path)
            this.popupClose()
        },
    },
    methods: {
        getTitle (path) {
            const match = path.match(/^\/(\w+)/)
            const title = match ? match[1] : 'projects'
            return this.$t(`appNav.${title}`)
        },
        updateTitle (path) {
            console.log(path)
            // const title = this.getTitle(path)
            // document.title = `${this.currentOrg.name} · ${title}`
        }
    }
}
</script>
<style lang="less">
@import "~assets/less/variables";

.epm-app-nav {
    width: 70%;
    height: 100%;
    background: @primary-nav-color;
}

.epm-nav- {
    &top {
        display: flex;
        height: 50px;
        background: @primary-nav-color;
        border-bottom: 1px solid @primary-color;
        position: relative;
        z-index: 4;
    }
    &org {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        padding: 0 15px;
        color: @primary-nav-text-color;
        font-size: @font-size-base;
    }
    &avatar {
        width: 50px;
        height: 50px;
    }
    &list {
        padding: 10px 0;
    }
    &item {
        position: relative;
        z-index: 2;
        &-highlight {
            position: absolute;
            left: 0;
            width: 100%;
            background: @primary-nav-active-color;
            transition: 0.3s ease-in-out;
            will-change: top;
            z-index: 1;
            height: 50px;
        }
        &>a {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0 20px;
            font-weight: 600;
            color: @primary-nav-text-color;
            height: 50px;
            &:active {
                background: @primary-nav-active-color;
            }
            i {
                font-size: @font-size-large;
                margin-right: 15px;
            }
        }
    }
}

.org-list {
    height: 200px;
    width: 100%;
    background: @white-background-color;
    position: absolute;
    top: -150px;
    z-index: 3;
    overflow: auto;
    p {
        line-height: 35px;
        padding-left: 10px;
        color: @gray-text-color;
        border-bottom: 1px solid @primary-border-color;
    }
    li {
        padding-left: 10px;
        margin-top: 5px;
        height: 35px;
        line-height: 35px;
        display: block;
        &.epm-icon-org:before {
            display: inline-block;
            margin-right: 10px;
        }
    }
    .select-org{
        background-color: rgba(47, 123, 193, .14);
    }
}

.miss {
    display: none;
}

.appear {
    display: block;
    top: 50px;
}
</style>

