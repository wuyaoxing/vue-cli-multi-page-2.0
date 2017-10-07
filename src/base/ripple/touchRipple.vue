<template>
    <div @mousedown="handleMouseDown"
         @mouseup="end()"
         @mouseleave="end()"
         @touchstart="handleTouchStart"
         @touchend="end()"
         @touchcancel="end()">
        <div class="mu-ripple-wrapper"
             :class="rippleWrapperClass"
             ref="holder">
            <circle-ripple :key="ripple.key"
                           :color="ripple.color"
                           :opacity="ripple.opacity"
                           :merge-style="ripple.style"
                           v-for="ripple in ripples"></circle-ripple>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import circleRipple from './circleRipple'

export default {
    name: 'epm-touch-ripple',
    props: {
        centerRipple: {
            type: Boolean,
            default: true
        },
        rippleWrapperClass: {
        },
        color: {
            type: String,
            default: ''
        },
        opacity: {
            type: Number
        }
    },
    data () {
        return {
            nextKey: 0,
            ripples: []
        }
    },
    mounted () {
        this.ignoreNextMouseDown = false
    },
    methods: {
        start (event, isRippleTouchGenerated) {
            if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
                this.ignoreNextMouseDown = false
                return
            }
            this.ripples.push({
                key: this.nextKey += 1,
                color: this.color,
                opacity: this.opacity,
                style: this.centerRipple ? {} : this.getRippleStyle(event)
            })
            this.ignoreNextMouseDown = isRippleTouchGenerated
        },
        end () {
            if (this.ripples.length === 0) return
            this.ripples.splice(0, 1)
            this.stopListeningForScrollAbort()
        },
        stopListeningForScrollAbort () {
            if (!this.handleMove) this.handleMove = this.handleTouchMove.bind(this)
            document.body.removeEventListener('touchmove', this.handleMove, false)
        },
        startListeningForScrollAbort (event) {
            this.firstTouchY = event.touches[0].clientY
            this.firstTouchX = event.touches[0].clientX
            document.body.addEventListener('touchmove', this.handleMove, false)
        },
        handleMouseDown (event) {
            if (event.button === 0) {
                this.start(event, false)
            }
        },
        handleTouchStart (event) {
            if (event.touches) {
                this.startListeningForScrollAbort(event)
                this.startTime = Date.now()
            }
            this.start(event.touches[0], true)
        },
        handleTouchMove (event) {
            const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY)
            const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX)
            // 判断滚动 6px
            if (deltaY > 6 || deltaX > 6) this.end()
            // const timeSinceStart = Math.abs(Date.now() - this.startTime)
            // if (timeSinceStart > 300) {
            //   this.stopListeningForScrollAbort()
            //   return
            // }
        },
        getRippleStyle (event) {
            const el = this.$refs.holder
            const elHeight = el.offsetHeight
            const elWidth = el.offsetWidth
            const offset = this.getOffset(el)
            const isTouchEvent = event.touches && event.touches.length
            const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX
            const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY
            const pointerX = pageX - offset.left
            const pointerY = pageY - offset.top
            const topLeftDiag = this.calcDiag(pointerX, pointerY)
            const topRightDiag = this.calcDiag(elWidth - pointerX, pointerY)
            const botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY)
            const botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY)
            const rippleRadius = Math.max(
                topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
            )
            const rippleSize = rippleRadius * 2
            const left = pointerX - rippleRadius
            const top = pointerY - rippleRadius
            return {
                directionInvariant: true,
                height: `${rippleSize}px`,
                width: `${rippleSize}px`,
                top: `${top}px`,
                left: `${left}px`
            }
        },
        calcDiag (a, b) {
            return Math.sqrt((a * a) + (b * b))
        },
        // 456
        getOffset (el) {
            const box = el.getBoundingClientRect()
            const body = document.body
            const clientTop = el.clientTop || body.clientTop || 0
            const clientLeft = el.clientLeft || body.clientLeft || 0
            const scrollTop = window.pageYOffset || el.scrollTop
            const scrollLeft = window.pageXOffset || el.scrollLeft
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            }
        }
    },
    components: {
        'circle-ripple': circleRipple
    }
}
</script>

<style lang="less">
@import '~assets/less/variables';

.mu-ripple-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}


@easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);
.flex-shrink(@fs) {
  -webkit-box-flex: @fs;
  -webkit-flex-shrink: @fs;
  -ms-flex: 0 @fs auto;
  flex-shrink: @fs;
}
// Shadow
.depth(@level:1) {
  & when (@level = 1) {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  }
  & when (@level = 2) {
    box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;
  }
  & when (@level = 3) {
    box-shadow: rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px;
  }
  & when (@level = 4) {
    box-shadow: rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px;
  }
  & when (@level = 5) {
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 19px 60px, rgba(0, 0, 0, 0.219608) 0px 15px 20px;
  }
}
.mu-raised-button {
    display: inline-block;
    overflow: hidden;
    position: relative;
    border-radius: 2px;
    height: 36px;
    line-height: 36px;
    min-width: 88px;
    transition-duration: 300ms;
    transition-timing-function: @easeOutFunction;
    transform: translate3d(0, 0, 0);
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    appearance: none;
    background-color: @white-background-color;
    color: rgba(0, 0, 0, 0.87);
    .flex-shrink(0);
    margin: 0;
    outline: 0;
    padding: 0;
    cursor: pointer;
    &.focus {
        .depth(2);
    }
    &.hover {
        .mu-raised-button-wrapper {
            background-color: fade(rgba(0, 0, 0, 0.87), 10%);
        }
    }
    &.disabled {
        color: fade(rgba(0, 0, 0, 0.87), 30%);
        cursor: not-allowed;
        background-color: darken(@white-background-color, 10%);
        box-shadow: none;
        &.hover,
        &:active,
        &:hover {
            box-shadow: none;
            .mu-raised-button-wrapper {
                background-color: transparent;
            }
        }
    }
    .mu-icon {
        vertical-align: middle;
        margin-left: 12px;
        margin-right: 0;
        +.mu-raised-button-label {
            padding-left: 8px;
        }
    }
    &.no-label {
        .mu-icon {
            margin: 0;
        }
    }
    &.label-before {
        .mu-raised-button-wrapper {
            padding-right: 8px;
        }
        .mu-icon {
            margin-right: 4px;
            margin-left: 0;
        }
        .mu-raised-button-label {
            padding-right: 8px;
        }
    }
    .depth(1);
    &:active {
        .depth(2);
    }
}

.mu-raised-button-wrapper {
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.mu-raised-button-primary {
    background-color: #7e57c2;
}

.mu-raised-button-secondary {
    background-color: #ff4081;
}

.mu-raised-button-full {
    width: 100%;
}

.mu-raised-button.mu-raised-button-inverse {
    color: @white-background-color;
    .mu-circle-ripple {
        opacity: 0.3;
    }
    &.hover {
        .mu-raised-button-wrapper {
            background-color: fade(@white-background-color, 30%);
        }
    }
}

.mu-raised-button-label {
    vertical-align: middle;
    padding-right: 16px;
    padding-left: 16px;
}
</style>
