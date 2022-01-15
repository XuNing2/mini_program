<template>
    <div class="container">
        <div class="note">
            <div class="note-txt">请按顺序完成以下步骤</div>
            <div class="note-txt">然后点击开始检测按钮</div>
            <div class="note-txt">检测时间约为1-2分钟</div>
            <div class="note-txt">请耐心等候</div>
        </div>

        <el-button
            v-if="!checkLeft"
            type="warning"
            icon="el-icon-camera"
            round
            @click="onRecordLeft"
            >录制左手</el-button
        >
        <el-button v-else type="success" icon="el-icon-success" round
            >录制左手</el-button
        >

        <i class="el-icon-arrow-down"></i>

        <el-button
            v-if="!checkRight"
            type="warning"
            icon="el-icon-camera"
            round
            @click="onRecordRight"
            >录制右手</el-button
        >
        <el-button v-else type="success" icon="el-icon-success" round
            >录制右手</el-button
        >
        <i class="el-icon-arrow-down"></i>

        <el-button
            v-if="!checkQS"
            type="warning"
            icon="el-icon-document"
            round
            @click="onQs"
            >补充信息</el-button
        >
        <el-button v-else type="success" icon="el-icon-success" round
            >补充信息</el-button
        >

        <i class="el-icon-arrow-down"></i>
        <el-button
            v-if="!(checkBoth && checkQS) && !cLoading"
            type="danger"
            icon="el-icon-error"
            round
            @click="onCheckFail"
            >开始检测</el-button
        >
        <!-- v-if="!cFailed && checkBoth && checkQs && !cLoading" -->

        <el-button
            v-if="!cFailed && checkBoth && checkQS && !cLoading"
            type="primary"
            round
            icon="el-icon-success"
            @click="onSubmit"
            >开始检测</el-button
        >

        <el-button
            v-if="!cFailed && cLoading && !cFinish"
            type="primary"
            icon="el-icon-warning"
            :loading="true"
            :disabled="true"
            round
            >正在检测</el-button
        >
    </div>
</template>

<script>
import thanks from "./Thanks.vue";
export default {
    data() {
        return {
            cFailed: this.$store.state.cFailed,
            cLoading: this.$store.state.cLoading,
            cFinish: this.$store.state.cFinish,
            checkLeft: this.$store.state.gCheckLeft,
            checkRight: this.$store.state.gCheckRight,
            checkQS: this.$store.state.gCheckQS,
        };
    },
    computed: {
        checkBoth() {
            return this.checkLeft && this.checkRight;
        },
        // cFailed() {
        //     return this.$store.state.cFailed;
        // },
    },
    components: {
        thanks,
    },
    methods: {
        onRecordLeft() {
            // this.$router.push({ name: "Record_camera" ,params:{
            //   handId:'0'
            // }});
            this.$store.commit("setHand", 0);
            this.$router.push({
                // path: "/record_camera",
                // query: {
                //   handId: "0",
                // },
                path: "/test",
                // query: {
                //     handId: "0",
                // },
            });
        },
        onRecordRight() {
            console.log("录制右手");
            this.$store.commit("setHand", 1);
            this.$router.push({
                path: "/test",
                // query: {
                //     handId: "1",
                // },
            });
        },
        onQs() {
            console.log("补充信息");
            this.$router.push({
                path: "/mJOA",
            });
        },
        onCheckFail() {
            this.$message({
                showClose: true,
                message: "请先完成所有步骤",
                type: "error",
            });
        },
        beginCount() {
            const url = "/d-count/" + this.$store.state.gId + "/start";
            this.$store.state.cLoading = true;
            // const url = "/count/" + this.$store.state.gId + "/startandpush";
            // this.$axios.post(url);
            this.$axios
                .get(url)
                .then((result) => {
                    this.$store.state.cLoading = false;
                    console.result.data;
                    this.$store.state.cFinish = true;
                    this.$store.state.cFailed = false;
                    this.cFinish = true;
                    this.cFailed = false;
                    // this.$router.push({ path: "/result" });
                })
                .catch((err) => {
                    console.log(err.data);
                    this.$store.state.cLoading = false;
                    this.$store.state.cFinish = false;
                    this.$store.state.cFailed = true;
                    this.cFinish = false;
                    this.cFailed = true;
                    // this.$router.push({ path: "/result" });
                });
        },
        onSubmit() {
            const that = this;
            this.$store.state.cLoading = true;
            this.cLoading = true;
            this.beginCount();
            this.$router.push({ path: "/thanks" });
        },
    },
    mounted() {},
};
</script>

<style>
.container {
    /* margin-top: 10%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.note-red-txt {
    color: red;
    margin-bottom: 10px;
    font-weight: bold;
}
.note-txt {
    font-size: 20px;
    margin-bottom: 10px;
}
</style>
