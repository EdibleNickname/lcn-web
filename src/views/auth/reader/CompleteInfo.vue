<template>
    <div class="completeInfo" style="display: flex">
        <div class="container">
            <personal-info :userNameEditable="true" :defaultUrl="defaultHeaderPortraitUrl"/>
        </div>
    </div>
</template>

<script>
    import PersonalInfo from '@/components/PersonalInfo';
    export default {
        name: "CompleteInfo",
        data() {
            return {
                defaultHeaderPortraitUrl: "https://s1.ax1x.com/2018/07/17/Pl4n81.png"
            }
        },
        components: {
            personalInfo: PersonalInfo,
        }
    }
</script>

<style scoped lang="scss">
    .completeInfo{
        .container {
            width: 80%;
            margin: 0 auto;
        }
    }
</style>