<template>
    <div class="epm-projects">
        <div @click="goProject(i)"
             v-for="i in 10">
            <span>点击这里跳转到项目{{i}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'epm-projects',
    methods: {
        goProject (projectId) {
            this.$router.push({
                name: 'project',
                params: {
                    projectId
                }
            })
        },
    }
}
</script>
<style lang="less">
@import '~assets/less/variables';

.epm-projects {
    div {
        padding: 10px;
    }
}
</style>

