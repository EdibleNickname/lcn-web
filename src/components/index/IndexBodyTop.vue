<template>
    <div class="body-top">

        <div class="left">

        </div>

        <div class="right">

        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexBodyTop"
    }
</script>

<style scoped lang="scss">
    .body-top {
        height: 1rem;
        background: green;
        display: flex;
        justify-content: center;
        .left {
            // 宽 ：高 = 3 ： 1
            width: 64%;
            background: #409EFF;
            height: 100%;
            margin-right: 6%;
        }
        .right {
            width: 30%;
            background: gold;
            height: 100%
        }
    }
</style>