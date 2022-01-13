<template>
    <div>
        <el-main>
            <!-- Main content -->
            <h1 class="title">mJOA评分</h1>
            <div class="hr" />
            <div class="question">上肢运动功能：</div>
            <div>
                <el-radio v-model="form.limb" label="5">正常</el-radio>

                <el-radio v-model="form.limb" label="4"
                    >系衬衫纽扣有点困难</el-radio
                >
                <el-radio v-model="form.limb" label="3"
                    >系衬衫纽扣非常困难</el-radio
                >
                <el-radio v-model="form.limb" label="2"
                    >不能系衬衫纽扣但能用勺子吃饭</el-radio
                >
                <el-radio v-model="form.limb" label="1"
                    >不能用勺子吃饭但手能移动</el-radio
                >
                <el-radio v-model="form.limb" label="0">手无法移动</el-radio>
            </div>
            <div class="hr1" />

            <div class="question">下肢运动功能：</div>
            <div>
                <el-radio v-model="form.leg" label="7">正常</el-radio>

                <el-radio v-model="form.leg" label="6"
                    >缺乏稳定性(轻度)，但无需搀扶，可平稳走路</el-radio
                >
                <el-radio v-model="form.leg" label="5"
                    >缺乏稳定性(中度到重度)，但能不扶栏杆上下楼梯</el-radio
                >
                <el-radio v-model="form.leg" label="4"
                    >扶栏杆能上下楼梯</el-radio
                >
                <el-radio v-model="form.leg" label="3"
                    >能够使用助行器(即手杖或拐杖)在平地上行走</el-radio
                >
                <el-radio v-model="form.leg" label="2"
                    >能活动腿但不能走路</el-radio
                >
                <el-radio v-model="form.leg" label="1"
                    >感觉存在，但无法移动腿</el-radio
                >
                <el-radio v-model="form.leg" label="0"
                    >完全丧失运动和感觉功能</el-radio
                >
            </div>
            <div class="hr1" />
            <div class="question">感觉功能:</div>
            <div>
                <el-radio v-model="form.feel" label="3">正常</el-radio>

                <el-radio v-model="form.feel" label="2"
                    >缺乏稳定性(轻度)，但无需搀扶，可平稳走路</el-radio
                >
                <el-radio v-model="form.feel" label="1"
                    >缺乏稳定性(中度到重度)，但能不扶栏杆上下楼梯</el-radio
                >
                <el-radio v-model="form.feel" label="0"
                    >扶栏杆能上下楼梯</el-radio
                >
            </div>
            <div class="hr1" />
            <div class="question">括约肌功能:</div>
            <div>
                <el-radio v-model="form.sphinc" label="3">正常排尿</el-radio>

                <el-radio v-model="form.sphinc" label="2"
                    >排尿困难(轻度到中度)</el-radio
                >
                <el-radio v-model="form.sphinc" label="1"
                    >排尿困难(重度)</el-radio
                >
                <el-radio v-model="form.sphinc" label="0"
                    >无法自主排尿</el-radio
                >
                <div class="hr1" />
            </div> </el-main
        ><el-button type="primary" @click="onSubmit" round>提交</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                limb: "5",
                leg: "7",
                feel: "3",
                sphinc: "3",
                // score: "",
            },
        };
    },
    methods: {
        onSubmit() {
            console.log(this.score);
            // var a= parseInt(this.limb)+parseInt(this.leg)+parseInt(this.feel)+parseInt(this.sphinc)
            // console.log(a);
            //
            console.log("上传数据");
            this.$axios.post("/d-qs/" + this.$store.state.gId + "/mJOA", {
                limb: parseInt(this.form.limb),
                leg: parseInt(this.form.leg),
                feel: parseInt(this.form.feel),
                sphinc: parseInt(this.form.sphinc),
                mJOA_score: parseInt(this.score),
            });
            this.$store.commit("setTrue", 2);
            // debugger;
            if (this.$store.state.userType == 1) {
                this.$router.push({
                    path: "/record",
                });
            } else {
                this.$router.push({
                    path: "/record_normal",
                });
            }
        },
    },
    computed: {
        score() {
            return (
                parseInt(this.form.limb) +
                parseInt(this.form.leg) +
                parseInt(this.form.feel) +
                parseInt(this.form.sphinc)
            );
        },
    },
};
</script>

<style scoped>
.el-main {
    /* color: #333; */
    text-align: center;
    display: flex;
    flex-direction: column;
    /* margin-left: 10%;
    margin-right: 10%; */
}
.title {
    /* font-size: 55rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx; */
    font-weight: bold;
    letter-spacing: 3px;
    color: black;
    text-align: center;
}
.question {
    text-align: left;

    color: #989898;
    font-weight: bold;
}
.hr {
    width: 100%;
    height: 3px;
    background-color: #eeeeee;
}
.hr1 {
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
}
.el-radio {
    text-align: left;

    display: block;
    margin: 10px 0;
}
</style>
