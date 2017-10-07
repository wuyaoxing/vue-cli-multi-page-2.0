<template>
    <epm-popup :open="Boolean(query)"
               position="left"
               popupClass="epm-panel-container"
               @popup-close="clearQuery(param)">
        <div class="epm-panel-close">
            <i class="epm-icon-close"
               @click="clearQuery(param)"></i>
        </div>
        <component class="epm-panel-body"
                   :is="query && query.type"
                   :query="query"></component>
    </epm-popup>
</template>
<script>
import pathToRegexp from 'path-to-regexp'
import _ from 'lodash'

import test from './panelTest/panelTest'

export default {
    props: {
        path: {
            type: String,
            default: '/'
        },
        open: Boolean,
        popupClose: Function
    },
    components: {
        test,
    },
    data () {
        return {
            param: 'show',
            match: ['/:type(test)/:id'],
            query: null
        }
    },
    watch: {
        $route (newVal, oldVal) {
            // 判断param后调用matchQuery
            // console.log(newVal, oldVal)
            this.matchQuery()
        }
    },
    methods: {
        matchQuery () {
            const matchQuery = this._matchQuery({
                path: this.path,
                param: this.param,
                match: this.match
            })
            this.query = matchQuery ? matchQuery.query : matchQuery
        },
        _matchQuery ({ path = '/', param, match = '*' }) {
            const route = this.$route

            if (!route.path.startsWith(path)
                || !route.query
                || !route.query[param]) return null

            const queryPath = route.query[param]
            let keys = []
            let regExp = null
            if (Array.isArray(match)) {
                let i = 0
                while (!regExp && i < match.length) {
                    keys = []
                    regExp = pathToRegexp(match[i], keys).exec(queryPath)
                    i += 1
                }
            } else {
                regExp = pathToRegexp(match, keys).exec(queryPath)
            }

            if (!regExp) return null

            const querys = {}
            let j = 0
            while (j < keys.length) {
                const name = keys[j].name
                querys[name] = regExp[j + 1]
                j += 1
            }

            return {
                path: regExp[0],
                param,
                query: querys
            }
        },
        clearQuery (param) {
            if (history.length > 1) {
                history.back()
                return
            }
            const query = _.omit(this.$route.query, [param])
            this.$router.replace({
                query
            })
        }
    },
    created () {
        if (!this.param || !this.match) {
            return
        }
        this.matchQuery()
    },
}
</script>
<style lang="less">
@import '~assets/less/variables';

.epm-panel- {
    &container {
        // display: flex;
        // flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 560px;
        color: @primary-text-color;
        background: @gray-background-color;
    }
    &close {
        position: absolute;
        top: 0;
        right: 0;
        i {
            padding: 15px;
            &:active {
                color: @white-text-color;
                background: @primary-dark-color;
            }
        }
    }
}
</style>
