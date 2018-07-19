<template>
    <div>
        <h1>{{getUserName}}</h1>
        <router-link tag="span" to="/login">登录</router-link>
        <div></div>
        <router-link tag="span" to="/register">注册</router-link>
        <div></div>
        <router-link tag="span" to="/completeInfo">个人信息完善页面</router-link>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "index",
        date() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getUserName'
            ])
        }
    }
</script>

<style scoped lang="scss" type="text/css">

</style>