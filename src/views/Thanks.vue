<template>
    <div>
        <div class="note">
            <h1 class="thanks">感谢您的提交</h1>
            <div class="note-txt">检测时间约为1-2分钟</div>
            <div class="note-txt">具体时间受网络状况影响</div>
            <div class="note-txt">请耐心等候</div>
        </div>

        <el-button
            v-if="false"
            class="btn-txt"
            type="primary"
            round
            icon="el-icon-s-home"
            @click="backToHome"
            >现在返回首页</el-button
        >
        <el-button
            class="btn-txt"
            type="info"
            round
            icon="el-icon-info"
            :loading="cLoading"
            @click="toResult"
            >查看结果</el-button
        >
    </div>
</template>

<script>
export default {
    name: "Thanks",
    computed: {
        cLoading() {
            return this.$store.state.cLoading;
        },
    },
    methods: {
        backToHome() {
            this.$store.commit("setDefault");
            this.$router.push({ path: "/" });
        },
        toResult() {
            this.$store.commit("setDefault");
            this.$router.push({ path: "/result" });
        },
    },
};
</script>

<style>
.container {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.note {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    margin-bottom: 70px;
}

.note-txt {
    font-size: 20px;
    margin-bottom: 15px;
}

.thanks {
    font-size: 40px;
    letter-spacing: 2px;
    margin-bottom: 50px;
    font-weight: bold;
}

.btn-txt {
    font-size: 20px;
    color: white;
    font-weight: bold;
}
</style>
