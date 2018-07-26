<template>
    <div>
        <h1 v-if="getUserInfo != null">
            {{getUserInfo.userName}}
            <h1 v-if="getUserInfo.headerUrl != null">
                <img :src="getUserInfo.headerUrl"  style="width: 100px; height: 100px; border-radius: 50px;"/>
            </h1>
        </h1>
        <h1 v-else>还未登录</h1>

        <router-link tag="span" to="/login">登录</router-link>
        <div></div>
        <router-link tag="span" to="/register">注册</router-link>
        <div></div>
        <router-link tag="span" to="/completeInfo">个人信息完善页面(注册成功，才点哦)</router-link>
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
                'getUserInfo'
            ])
        }
    }
</script>

<style scoped lang="scss" type="text/css">

</style>