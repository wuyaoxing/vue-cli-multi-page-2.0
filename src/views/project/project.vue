<template>
    <div class="epm-project">
        这里是项目{{projectId}}
        <div @click="showPanel(i)"
             v-for="i in 10">
            <span>点击这里跳转到panel{{i}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'epm-project',
    computed: {
        projectId () {
            return this.$route.params.projectId
        },
    },
    methods: {
        showPanel (panelId) {
            this.$router.push({
                query: {
                    show: `/test/${panelId}`
                }
            })
        },
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';
.epm-project {
    div {
        padding: 10px;
    }
}
</style>

