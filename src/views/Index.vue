<template>
    <div class="index">

        <index-header/>


        <router-link tag="span" to="/login">登录</router-link>
        <div></div>
        <router-link tag="span" to="/register">注册</router-link>
        <div></div>
        <router-link tag="span" to="/completeInfo">个人信息完善页面(注册成功，才点哦)</router-link>
    </div>
</template>

<script>

    import IndexHeader from '@/components/index/IndexHeader';

    export default {
        name: "index",
        date() {
            return {

            }
        },
        components: {
            indexHeader: IndexHeader,
        }
    }
</script>

<style scoped lang="scss">
    .index {

    }
</style>