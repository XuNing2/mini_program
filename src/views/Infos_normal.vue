<template>
    <div class="infos_normal">
        <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            class="container"
            label-position="left"
            label-width="80px"
        >
            <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
                <el-input
                    type="number"
                    v-model.number="ruleForm.age"
                    placeholder="请输入年龄"
                ></el-input>
            </el-form-item>

            <el-form-item label="电话：" prop="number">
                <el-input
                    v-model="ruleForm.number"
                    placeholder="请输入联系电话(选填)"
                ></el-input>
            </el-form-item>

            <hr class="hr" />
            <div>
                <div class="bold">注:</div>
                以上信息对颈椎病手部功能的准确评估非常重要，请务必准确填写。
            </div>
            <hr class="hr" />
            <el-row>
                <el-button
                    v-if="!infoCheck"
                    type="primary"
                    round
                    @click="submitForm('ruleForm')"
                    :loading="isLoading"
                    >提交</el-button
                >
                <el-button
                    v-if="!infoCheck"
                    round
                    @click="resetForm('ruleForm')"
                    >重置</el-button
                >
                <el-button
                    v-if="infoCheck"
                    type="primary"
                    round
                    @click="confirmTutorial"
                    icon="el-icon-video-camera"
                    >开始录制视频</el-button
                >
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Infos_normal",
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("年龄不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error("请输入数字值"));
                } else {
                    if (value > 99) {
                        callback(new Error("不超过99岁"));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback();
            }
            setTimeout(() => {
                if (!Number.isInteger(Number(value))) {
                    callback(new Error("请输入正确的电话号码"));
                } else {
                    callback();
                }
            }, 1000);
        };

        return {
            infoCheck: false,
            isLoading: false,
            ruleForm: {
                name: "",
                tmp: "",
                sex: "",
                age: "",
                number: "",
                patient: "",
                other: "无",
            },
            rules: {
                // name: [
                //   { required: true, message: '请输入活动名称', trigger: 'blur' },
                //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change",
                    },
                ],
                age: [
                    {
                        required: true,
                        message: "请输入您的年龄",
                        trigger: "change",
                    },
                    // { type:'number', message: '您输入的年龄不太对吧' },
                    { validator: checkAge, trigger: "blur" },
                ],
                patient: [{ required: true, message: "请输入您的住院号" }],
                number: [
                    // { type:'number', message: '您输入的电话不太对吧' },
                    { min: 8, max: 11, message: "长度在 8 到 11 个字符" },
                    { validator: checkNumber, trigger: "blur" },
                ],

                // other: [
                //     {
                //         required: true,
                //         message: "请选择病人类型",
                //         trigger: "change",
                //     },
                // ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm("确认信息准确无误吗？", "", {
                        confirmButtonText: "确定",
                        cancelButtonText: "我再看看",
                        center: true,
                    })
                        .then(() => {
                            this.isLoading = true;
                            this.$axios
                                .post("/d-info/add", {
                                    name: "normal",
                                    age: this.ruleForm.age,
                                    sex: this.ruleForm.sex,
                                    tel: this.ruleForm.number,
                                    patient: "",
                                })
                                .then(
                                    function (res) {
                                        this.infoCheck = true;
                                        this.$store.commit(
                                            "setgId",
                                            res.data.id
                                        );
                                        // this.$store.state.gId = res.data.id;
                                        console.log(res);
                                    }.bind(this)
                                )
                                .catch(function (error) {
                                    console.log(error);
                                });
                        })
                        .catch(() => {});
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.isLoading = false;
            this.$refs[formName].resetFields();
        },
        confirmTutorial() {
            this.$router.push({
                path: "/tutorial",
            });
        },
    },
    mounted() {
        this.$store.commit("setDefault");
    },
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.hr {
    width: 90%;
    height: 1px;
    background-color: #eeeeee;
}
.bold {
    font-weight: bold;
    display: inline-block;
}
</style>
