<template>
    <div class="container">
        <!-- <div class="title">颈椎病手部功能分析报告</div>
        <div class="hr"></div>
        <div>
            <span class="l-form-label">编号:</span>
            <span class="plain-txt">{{ info.id }}</span>
        </div>
        <div>
            <span class="l-form-label">性别:</span>
            <span class="plain-txt">{{ info.sex }}</span>
        </div>
        <div>
            <span class="l-form-label">年龄:</span>
            <span class="plain-txt">{{ info.age }}</span>
        </div>
        <div>
            <span class="l-form-label">十秒抓握次数:</span>
            <span class="plain-txt">左手{{ info.left_count }}次，</span>
            <span class="plain-txt">右手{{ info.right_count }}次</span>
        </div>
        <div>
            <span class="l-form-label">平均抓握时间:</span>
            <span class="plain-txt">左手{{ info.left_atime }}秒，</span>
            <span class="plain-txt">右手{{ info.right_atime }}秒</span>
        </div> -->
        <el-container>
            <!-- <el-header> </el-header> -->
            <el-main>
                <div class="title">颈椎病手部功能分析报告</div>
                <div class="hr"></div>
                <div v-if="!errorResult">
                    <div class="l-form-label1">编号:</div>
                    <span class="plain-txt">{{ info.id }}</span>
                    <hr class="hr1" />
                </div>

                <div v-if="!errorResult">
                    <div class="l-form-label1">性别:</div>
                    <span class="plain-txt">{{ info.sex }}</span>
                    <hr class="hr1" />
                </div>

                <div v-if="!errorResult">
                    <div class="l-form-label1">年龄:</div>
                    <span class="plain-txt">{{ info.age }}</span>
                    <hr class="hr1" />
                </div>
                <div v-if="info.patient">
                    <!-- v-if = "isPatient" -->
                    <span class="l-form-label">住院号: </span>
                    <span class="plain-txt">{{ info.patient }}</span>

                    <hr class="hr1" />
                </div>

                <div v-if="!errorResult">
                    <div class="l-form-label">十秒抓握次数:</div>
                    <span class="plain-txt"
                        >左手<span class="number-txt">
                            {{ analyse.left_count }}
                        </span>
                        次，</span
                    >
                    <span class="plain-txt"
                        >右手<span class="number-txt">
                            {{ analyse.right_count }}
                        </span>
                        次</span
                    >
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">平均抓握时间:</div>
                    <!-- <div></div> -->
                    <span class="plain-txt"
                        >左手
                        <span class="number-txt">
                            {{ left_atime }}
                        </span>
                        秒，</span
                    >
                    <span class="plain-txt"
                        >右手<span class="number-txt"> {{ right_atime }} </span
                        >秒</span
                    >
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">最高抓握速度:</div>
                    <!-- <div></div> -->
                    <span class="plain-txt"
                        >左手<span class="number-txt">
                            {{ analyse.left_vmax }}
                        </span>
                        GPM，</span
                    >
                    <span class="plain-txt"
                        >右手<span class="number-txt">
                            {{ analyse.right_vmax }}</span
                        >
                        GPM</span
                    >
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">最低抓握速度:</div>
                    <!-- <div></div> -->
                    <span class="plain-txt"
                        >左手<span class="number-txt">
                            {{ analyse.left_vmin }}</span
                        >
                        GPM，</span
                    >
                    <span class="plain-txt"
                        >右手<span class="number-txt">
                            {{ analyse.right_vmin }} </span
                        >GPM</span
                    >
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">变异系数:</div>
                    <span class="plain-txt"
                        >左手<span class="number-txt">
                            {{ analyse.left_vCV }} </span
                        >%,</span
                    >
                    <span class="plain-txt"
                        >右手<span class="number-txt">
                            {{ analyse.right_vCV }} </span
                        >%</span
                    >
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">补充信息评分:</div>
                    <span class="plain-txt"
                        >mJOA评分为<span class="number-txt">
                            {{ info.mjoa_score }}
                        </span>
                    </span>
                    <hr class="hr1" />
                </div>
                <div v-if="!errorResult">
                    <div class="l-form-label">检测结论:</div>
                    <div class="result-txt">
                        根据十秒抓握实验结果，预测您的手部灵活性等级为<span
                            class="danger-txt"
                            >{{ info.result }}</span
                        >。根据以上结果，建议您{{ suggest }}。
                    </div>
                    <hr class="hr1" />
                    <div v-if="!errorResult" class="note-txt">
                        注：{{ note }}
                    </div>
                    <hr class="hr1" />
                    <div v-if="!errorResult" class="note2-txt">
                        请手机截图保存本页面，在就医时可以作为参考依据。
                    </div>
                </div>
                <div v-if="errorResult">
                    <span class="result-txt"
                        >您的检测过程出现问题，请保持网络通畅，放松手指，深呼吸，点击下方重新检测按钮再试一次。</span
                    >
                </div>
            </el-main>
            <el-footer>
                <el-button
                    icon="el-icon-document"
                    v-if="!errorResult"
                    round
                    class="bt-check"
                    type="primary"
                    size="default"
                    @click="onCopyResult"
                    ><span class="btn-txt">复制结果</span></el-button
                >
                <el-button
                    round
                    icon="el-icon-video-camera"
                    v-if="errorResult"
                    class="bt-check"
                    type="warning"
                    size="default"
                    @click="onBack"
                    ><span class="btn-txt">重新检测</span></el-button
                >
                <div></div>
                <el-button
                    icon="el-icon-success"
                    v-if="!errorResult"
                    round
                    class="bt-check"
                    type="success"
                    size="default"
                    @click="onBack"
                    ><span class="btn-txt">检测完成</span></el-button
                >
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // errorResult: false,
            isPatient: false,

            info: {
                id: "",
                name: "",
                sex: "",
                age: "",
                patient: "",

                // left_atime: "",
                // right_atime: "",
                mjoa_score: "",
                result: "",
                // left_check: false,
                // right_check: false,
            },

            analyse: {
                left_count: "",
                right_count: "",
                left_vmax: "",
                right_vmax: "",
                left_vmin: "",
                right_vmin: "",
                left_vCV: "",
                right_vCV: "",
            },

            note: "本结果仅供参考，不做正式诊断用途，有疑问请咨询脊柱外科医生，欢迎致电020-83827812-61010。十秒抓握试验分析结果参考Machino. Clin Neurol Neurosurg. 2019; Yukawa. J Orthop Sci. 2013",
            isSubmitValidate: false,
        };
    },
    computed: {
        left_atime() {
            return this.analyse.left_count == 0
                ? this.analyse.left_count
                : (10 / this.analyse.left_count).toFixed(2);
        },
        right_atime() {
            return this.analyse.right_count == 0
                ? this.analyse.right_count
                : (10 / this.analyse.right_count).toFixed(2);
        },
        errorResult() {
            // return !this.info.left_check && !this.info.right_check ;
            return this.analyse.left_count < 5 || this.analyse.right_count < 5;
        },
        suggest() {
            this.info.sex = this.info.sex == 0 ? "男" : "女";
            if (this.info.result == "较低" && this.info.mjoa_score < 18) {
                this.info.result = "中度";
            }
            // console.log(res.data.info)
            if (this.info.result == "较低") {
                this.info.result = "优秀";
            } else if (this.info.result == "中度") {
                this.info.result = "良好";
            } else if (this.info.result == "较高") {
                this.info.result = "中等";
            } else {
                this.info.result = "较差";
            }
            // if (this.info.result== "较低" || "暂无结果") {
            if (this.info.result == "优秀" || "暂无结果") {
                return "定期复查颈椎功能";
            } else {
                return "到广东省人民医院脊柱外科门诊就诊";
            }
        },
    },
    created() {
        this.get();
    },
    methods: {
        get() {
            this.$axios
                .get("d-info/" + this.$store.state.gId + "/get")
                .then(
                    function (response) {
                        console.log(response.data);
                        this.analyse = response.data.analyse;
                        this.info = response.data.info;

                        console.log(this.analyse);
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },
        onBack() {
            this.$store.commit("setDefault");
            this.$router.push({ path: "/" });
            // this.resetGlobalData();
        },
        resetGlobalData() {
            window.location.reload();
            console.log(this.$store.state);
        },
        onCopyResult() {
            this.copyToClipboard(this.genCopyData());
            this.$message({
                message: "你已成功复制",
                type: "success",
                center: true,
            });
        },

        genCopyData() {
            const info = this.info;
            const analyse = this.analyse;
            let ret = "";
            ret += "编号：" + info.id + "\n";
            if (this.$store.state.gId == 1) {
                ret += "姓名：" + info.name + "\n";
            }
            ret += "性别：" + info.sex + "\n";
            ret += "年龄：" + info.age + "\n";
            if (this.$store.state.gId == 1) {
                ret += "住院号：" + info.patient + "\n";
            }
            ret +=
                "十秒抓握次数：左手 " +
                analyse.left_count +
                " 次，右手 " +
                analyse.right_count +
                " 次\n";
            ret +=
                "平均抓握时间：左手 " +
                this.left_atime +
                " 秒，右手 " +
                this.right_atime +
                " 秒\n";
            ret +=
                "最高抓握速度：左手 " +
                analyse.left_vmax +
                " GPM，右手 " +
                analyse.right_vmax +
                " GPM\n";
            ret +=
                "最低抓握速度：左手 " +
                analyse.left_vmin +
                " GPM，右手 " +
                analyse.right_vmin +
                " GPM\n";
            ret +=
                "变异系数：左手 " +
                analyse.left_vCV +
                " %，右手 " +
                analyse.right_vCV +
                " %\n";
            if (true) {
                // ret += ('补充信息评分：mJOA评分为 ' + info.mJOA_score + ' 分，NDI评分为 ' + info.NDI_score + ' 分\n')
                ret += "补充信息评分：mJOA评分为 " + info.mjoa_score + " 分\n";
            }
            ret +=
                "检测结论：根据十秒抓握实验结果，预测您的手部灵活性等级为 " +
                info.result +
                "。根据以上结果，建议您 " +
                this.suggest +
                "。\n";
            return ret;
        },

        // 点击复制到剪贴板函数
        copyToClipboard(content) {
            if (window.clipboardData) {
                window.clipboardData.setData("text", content);
            } else {
                (function (content) {
                    document.oncopy = function (e) {
                        e.clipboardData.setData("text", content);
                        e.preventDefault();
                        document.oncopy = null;
                    };
                })(content);
                document.execCommand("Copy");
            }
        },
    },
};
</script>

<style>
.hr {
    width: 100%;
    height: 3px;
    background-color: #eeeeee;
}
.hr1 {
    opacity: 20%;
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
}
.el-container {
    margin-left: 10%;
    margin-right: 10%;
    /* display: flex;
    flex-direction: column; */
    /* align-items: center; */
}

.el-footer {
    /* background-color: #b3c0d1; */
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-main {
    /* background-color: #e9eef3; */
    color: #333;
    /* text-align: left; */
}
.bt-check {
    margin-top: 0px;
}

.btn-txt {
    font-size: 20px;
    color: white;
    font-weight: bold;
}

.l-form-label {
    text-align: left;
    /* float: left; */

    font-size: 25px;
    font-weight: bold;
    opacity: 80%;
}
.l-form-label1 {
    text-align: left;
    float: left;

    font-size: 25px;
    font-weight: bold;
    opacity: 80%;
}
.plain-txt {
    font-size: 25px;
    color: #08088a;

    text-align: center;
}
.l-long-label {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}

.title {
    font-size: 30px;
    margin-top: 20px;
    /* margin-bottom: 20px; */
    font-weight: bold;
    letter-spacing: 3px;
    color: black;
}

.number-txt {
    font-family: "Times New Roman", Times, serif;
    font-size: 25px;
    color: #298a08;
    font-weight: bold;
}

.danger-txt {
    font-size: 25px;
    color: red;
    font-weight: bold;
}

.result-txt {
    font-size: 25px;
    color: #08088a;
    line-height: 32px;
    text-align: left;
}

.l-note-label {
    font-size: 25px;
    font-weight: bold;
    /* margin-top: 20px; */
    margin-bottom: 0px;
}

.l-note-content {
    margin-top: 10px;
    margin-bottom: 10px;
}

.note-txt {
    font-size: 18px;
    text-align: left;
}

.note2-txt {
    font-size: 18px;
    font-weight: bold;
    color: red;
    text-align: left;
}
</style>
