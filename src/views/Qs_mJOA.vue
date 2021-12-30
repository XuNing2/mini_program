<template>
    <div>
        <h1 class="title">mJOA评分</h1>
        <hr class="hr" />

        <el-form ref="form" :model="form" label-position="top">
            <el-form-item label="上肢运动功能：">
                <el-select v-model="form.limb">
                    <el-option label="正常" value="5"></el-option>
                    <el-option label="系衬衫纽扣有点困难" value="4"></el-option>
                    <el-option label="系衬衫纽扣非常困难" value="3"></el-option>
                    <el-option
                        label="不能系衬衫纽扣但能用勺子吃饭"
                        value="2"
                    ></el-option>
                    <el-option
                        label="不能用勺子吃饭但手能移动"
                        value="1"
                    ></el-option>
                    <el-option label="手无法移动" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="下肢运动功能：">
                <el-select v-model="form.leg" placeholder="请点击选择您的状况">
                    <el-option label="正常" value="7"></el-option>
                    <el-option
                        label="缺乏稳定性(轻度)，但无需搀扶，可平稳走路"
                        value="6"
                    ></el-option>
                    <el-option
                        label="缺乏稳定性(中度到重度)，但能不扶栏杆上下楼梯"
                        value="5"
                    ></el-option>
                    <el-option label="扶栏杆能上下楼梯" value="4"></el-option>
                    <el-option
                        label="能够使用助行器(即手杖或拐杖)在平地上行走"
                        value="3"
                    ></el-option>
                    <el-option label="能活动腿但不能走路" value="2"></el-option>
                    <el-option
                        label="感觉存在，但无法移动腿"
                        value="1"
                    ></el-option>
                    <el-option
                        label="完全丧失运动和感觉功能"
                        value="0"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="感觉功能：">
                <el-select v-model="form.feel" placeholder="请点击选择您的状况">
                    <el-option label="无感觉缺失" value="3"></el-option>
                    <el-option label="轻度感觉缺失" value="2"></el-option>
                    <el-option label="严重感觉缺失或疼痛" value="1"></el-option>
                    <el-option label="完全丧失手部感觉" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="括约肌功能:">
                <el-select
                    v-model="form.sphinc"
                    placeholder="请点击选择您的状况"
                >
                    <el-option label="正常排尿" value="3"></el-option>
                    <el-option
                        label="排尿困难(轻度到中度)"
                        value="2"
                    ></el-option>
                    <el-option label="排尿困难(重度)" value="1"></el-option>
                    <el-option label="无法自主排尿" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" round
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                limb: "",
                leg: "",
                feel: "",
                sphinc: "",
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

<style>
/* .container{
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.title {
    /* font-size: 55rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx; */
    font-weight: bold;
    letter-spacing: 3px;
    color: black;
}
.hr {
    width: 100%;
    height: 3px;
    background-color: #eeeeee;
}
</style>
