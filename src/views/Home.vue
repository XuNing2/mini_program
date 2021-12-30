<template>
    <div class="home">
        <div>
            <!--pages/home/home.wxml-->
            <div class="container">
                <!-- <div class="title">颈椎病手部功能</div>
          <div class="title">评估工具</div> -->
                <h1 class="title">颈椎病手部功能</h1>
                <h1 class="title">评估工具</h1>

                <div class="avatar">
                    <img class="circleImg" src="../assets/scut.jpg" />
                    <div class="txt-avatar">×</div>
                    <img class="circleImg" src="../assets/gdph.jpg" />
                </div>

                <div class="container-begin">
                    <el-button
                        round
                        type="primary"
                        @click="onBeginNormal"
                        class="btn-txt"
                        icon="el-icon-star-off"
                    >
                        我不是住院病人
                    </el-button>
                    <p></p>
                    <el-button
                        round
                        type="success"
                        @click="onBegin"
                        class="btn-txt"
                        icon="el-icon-user"
                    >
                        我是住院病人
                    </el-button>
                </div>

                <label>
                    <input type="checkbox" v-model="checked" />
                    我已阅读
                    <!-- <el-button type="text" @click="open">用户须知</el-button> -->

                    <el-button type="text" @click="dialogVisible = true"
                        >用户须知</el-button
                    >

                    <el-dialog
                        title="用户须知"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose"
                        center
                    >
                        <el-scrollbar>
                            <span
                                >使用本小程序前，请认真阅读(未成年人应当在监护人陪同下阅读)、充分理解本《用户须知》中各条款。勾选“已阅读并同意用户须知”后使用本小程序，将代表您同意本用户须知的内容。除非您阅读并同意本用户须知的内容，否则您无权使用本小程序。
                                <br />
                                1.
                                本小程序由华南理工大学及广东省人民医院联合研发。本程序的一切版权等知识产权，以及与小程序相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均为华南理工大学及广东省人民医院联合所有，受著作权法和国际著作权条约以及其他知识产权法律法规的保护。
                                <br />2.
                                本小程序仅供粗略评估手部功能所用，并以此粗略判断测试者患颈椎病的风险，评估所得的结果仅供参考，不可用于诊断依据，不得作为临床诊疗的依据。用户应进一步到医院就诊进行咨询。
                                <br />3.
                                通过本小程序上传的影像及分析数据仅供疾病筛查及临床研究用途，不作其他用途使用。华南理工大学及广东省人民医院尊重并保护所有使用者的个人隐私权，不会主动泄露给任何第三方。
                                <br />4.
                                用户不得利用本小程序发表、传送、传播、储存违反国家法律、危害国家安全、祖国统一、社会稳定的内容，或任何不当的、侮辱诽谤的、淫秽的、暴力的及任何违反国家法律法规政策的内容。不得利用本小程序发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容。不得利用本小程序误导、欺骗他人。
                                <br />5.
                                使用本小程序后果由用户自己承担风险，华南理工大学及广东省人民医院对使用本小程序产生的后果不作任何类型的担保，包括但不限于由于诊断评估结果、病情评估结果、手部活动评估结果等及其产生的任何影响。
                                <br />6.
                                本《用户须知》的一切解释权与修改权归华南理工大学及广东省人民医院联合所有。
                            </span>
                        </el-scrollbar>
                        <span slot="footer" class="dialog-footer">
                            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                            <el-button
                                type="primary"
                                @click="
                                    dialogVisible = false;
                                    checked = true;
                                "
                                >确 定</el-button
                            >
                        </span>
                    </el-dialog>
                </label>
            </div>

            <div class="version-txt">v1.4.0</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {},
    data() {
        return {
            tips: "使用本小程序前，请认真阅读(未成年人应当在监护人陪同下阅读)、充分理解本《用户须知》中各条款。勾选“已阅读并同意用户须知”后使用本小程序，将代表您同意本用户须知的内容。除非您阅读并同意本用户须知的内容，否则您无权使用本小程序。<br>1. 本小程序由华南理工大学及广东省人民医院联合研发。本程序的一切版权等知识产权，以及与小程序相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均为华南理工大学及广东省人民医院联合所有，受著作权法和国际著作权条约以及其他知识产权法律法规的保护。<br>2.	本小程序仅供粗略评估手部功能所用，并以此粗略判断测试者患颈椎病的风险，评估所得的结果仅供参考，不可用于诊断依据，不得作为临床诊疗的依据。用户应进一步到医院就诊进行咨询。<br>3.	通过本小程序上传的影像及分析数据仅供疾病筛查及临床研究用途，不作其他用途使用。华南理工大学及广东省人民医院尊重并保护所有使用者的个人隐私权，不会主动泄露给任何第三方。<br>4. 用户不得利用本小程序发表、传送、传播、储存违反国家法律、危害国家安全、祖国统一、社会稳定的内容，或任何不当的、侮辱诽谤的、淫秽的、暴力的及任何违反国家法律法规政策的内容。不得利用本小程序发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容。不得利用本小程序误导、欺骗他人。<br>5. 使用本小程序后果由用户自己承担风险，华南理工大学及广东省人民医院对使用本小程序产生的后果不作任何类型的担保，包括但不限于由于诊断评估结果、病情评估结果、手部活动评估结果等及其产生的任何影响。<br>6. 本《用户须知》的一切解释权与修改权归华南理工大学及广东省人民医院联合所有。",
            checked: false,
            dialogVisible: false,
        };
    },
    methods: {
        onBeginNormal(event) {
            // app.globalData.userType = 2;

            if (!this.checked) {
                // 弹出框说 请阅读
                this.$notify.error({
                    title: "错误",
                    message: "请先阅读用户须知",
                });
            } else {
                // uni.redirectTo({
                //     url: '/pages/infos-normal/infos-normal'
                // });
                console.log("kkkk");
                this.$store.commit("setUserType", 1);
                this.$router.push({
                    path: "/infos_normal",
                });
                // 跳转
            }
        },
        onBegin(event) {
            // app.globalData.userType = 1;
            this.$store.commit("setUserType", 2);
            if (!this.checked) {
                // 弹出框说 请阅读
                this.$notify.error({
                    title: "错误",
                    message: "请先阅读用户须知",
                });
            } else {
                // uni.redirectTo({
                //     url: '/pages/infos-normal/infos-normal'
                // });

                // 跳转
                this.$router.push({
                    path: "/infos",
                });
            }
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    margin-top: 20px;
    /* font-size: 75px; */
    font-weight: bold;
    letter-spacing: 5px;
    margin-bottom: 0px;
}

.circleImg {
    border-radius: 60px;
    width: 120px;
    height: 120px;
}

.avatar {
    margin-top: 30px;
    display: flex;
    /* flex-direction: row; */
    align-items: center;
}

.txt-avatar {
    font-size: 40px;
    margin-left: 20px;
    margin-right: 20px;
}

.container-begin {
    margin-top: 30px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bt-begin {
    /* border-radius:50%; */
    margin-top: 20px;
    letter-spacing: 5px;
    margin-bottom: 30px;
}

.btn-txt {
    /* font-size: 45px; */
    color: white;
    font-weight: bold;
}

.agreement {
    color: #0000ff;
}

.l-content {
    height: 60vh;
}

.agreeContent {
    font-size: 32px;
    line-height: 50px;
}

.scroll_display {
    height: 100%;
    vertical-align: middle;
}

.version-txt {
    /* position: absolute; */
    color: grey;
    left: 85.5vw;
    top: 96vh;
    font-weight: bold;
}
</style>
