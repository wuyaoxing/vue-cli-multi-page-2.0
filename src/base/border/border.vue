<template>
    <div class="epm-border"
         :class="borderClass"
         @click="click">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'epm-border',
    props: {
        border: Array,
        radius: Boolean,
        bold: Boolean
    },
    data () {
        return {
            direcAll: ['bd-t', 'bd-r', 'bd-b', 'bd-l'],
            direcTwo: ['bd-t bd-b', 'bd-r bd-l'],
        }
    },
    computed: {
        borderClass () {
            const cls = [{
                'bd-radius': this.radius,
            }, this.bold ? 'bd-weight' : 'bd-light']
            const { border, direcTwo, direcAll } = this
            if (!border) {
                cls.push({ 'bd-all': true })
                return cls
            }
            const direc = border.length === 2 ? direcTwo : direcAll
            return cls.concat(border.map((item, i) => ({
                [direc[i]]: item === 1
            })))
        }
    },
    methods: {
        click () {
            this.$emit('click')
        }
    }
}
</script>
<style lang="less">
@import "~assets/less/variables";
@import "~assets/less/mixins";

@border-radius: 3px;

.bd() {
    border-width: 0;
    border-color: @primary-border-color;
    border-style: solid;
}

.epm-border(@dpr, @s: 1) {
    &::before {
        width: 100% * @dpr;
        height: 100% * @dpr;
        transform: scale(@s/@dpr);
    }
}

.epm-border {
    &.bd-t {
        .bd;
        border-top-width: 1px;
    }
    &.bd-r {
        .bd;
        border-right-width: 1px;
    }
    &.bd-b {
        .bd;
        border-bottom-width: 1px;
    }
    &.bd-l {
        .bd;
        border-left-width: 1px;
    }
    &.bd-all {
        .bd;
        border-width: 1px;
    }
    &.bd-radius {
        border-radius: @border-radius;
    }
}


@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .epm-border {
        position: relative;
        border: none!important;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            .bd;
            transform-origin: 0 0;
            pointer-events: none;
        }

        &.bd-light {
            .epm-border(2);
        }

        &.bd-weight {
            .epm-border(2, 1.5);
        }


        &.bd-t {
            &::before {
                border-top-width: 1px;
            }
        }

        &.bd-r {
            &::before {
                border-right-width: 1px;
            }
        }

        &.bd-b {
            &::before {
                border-bottom-width: 1px;
            }
        }

        &.bd-l {
            &::before {
                border-left-width: 1px;
            }
        }

        &.bd-all {
            &::before {
                border-width: 1px;
            }
        }

        &.bd-radius {
            &::before {
                border-radius: @border-radius * 2;
            }
        }
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .epm-border {
        &.bd-light {
            .epm-border(3);
        }

        &.bd-weight {
            .epm-border(3, 1.5);
        }

        &.bd-radius {
            &::before {
                border-radius: @border-radius * 3;
            }
        }
    }
}
</style>
