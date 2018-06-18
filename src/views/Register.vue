<template>
    <div class="register">
        <h1 class="test">123</h1>
        <a href="www.baidu.com">连接</a>
    </div>
</template>

<script>
    import { required,minLength,between,email } from 'vuelidate/lib/validators';
    export default {
        name: "register",
    }
</script>

<style scoped lang="scss" type="text/css">
    .register {
        background: bisque;
    }

    .test {
        font-size: 1rem;
    }

    input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #FDD;
    }

    .error:focus {
        outline-color: #F99;
    }
</style>