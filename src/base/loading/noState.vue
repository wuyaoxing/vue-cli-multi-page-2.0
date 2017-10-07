<template>
    <div>
        <div class="epm-loading-child epm-loading-bounce1"></div>
        <div class="epm-loading-child epm-loading-bounce2"></div>
        <div class="epm-loading-child epm-loading-bounce3"></div>
    </div>
</template>
<style lang="less">
@import "~assets/less/variables";

.epm-loading- {
    &box {
        position: relative;
        display: inline-flex;
        margin: auto;
        width: auto;
        vertical-align: middle;
        text-align: center;
    }

    &child {
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background-color: @accent-color;
        animation: sk-threeBounceDelay 1.4s infinite ease-in-out both;
    }

    &bounce1 {
        animation-delay: -0.32s;
    }

    &bounce2 {
        animation-delay: -0.16s;
    }

    &smallest &child {
        width: 8px;
        height: 8px;
    }

    &smaller &child {
        width: 12px;
        height: 12px;
    }

    &small &child {
        width: 14px;
        height: 14px;
    }

    &medium &child {
        width: 18px;
        height: 18px;
    }

    &large &child {
        width: 20px;
        height: 20px;
    }
}


@-moz-keyframes sk-threeBounceDelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
@-webkit-keyframes sk-threeBounceDelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
@-o-keyframes sk-threeBounceDelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
@keyframes sk-threeBounceDelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

</style>
