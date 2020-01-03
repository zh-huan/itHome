<template>
    <div class="regist-content">
        <div v-if="!success">
            <div class="regist-title">新用户注册</div>
            <div>
                <el-form
                    :model="userInfo"
                    status-icon
                    ref="userInfo"
                    label-width="100px"
                    class="regist-form"
                >
                    <el-form-item
                        label="注册邮箱"
                        prop="email"
                        :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-input type="email" v-model="userInfo.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="手机号码"
                        prop="phone"
                        :rules="[
                            { required: true, message: '请输入手机号码', trigger: 'blur' },
                            { type: 'phone', message: '请输入正确的手机号码', trigger: 'blur,change' }
                        ]"
                    >
                        <el-col :span="4">
                            <el-input
                                type="prePhone"
                                v-model="userInfo.prePhone"
                                autocomplete="off"
                            ></el-input>
                        </el-col>
                        <el-col :span="20">
                            <el-input type="phone" v-model="userInfo.phone" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        label="登陆名称"
                        prop="loginName"
                        :rules="[
                            { required: true, message: '请输入登陆名称', trigger: 'blur' },
                            { validator:loginNameValidate, trigger: 'blur'}
                        ]"
                    >
                        <el-input type="loginName" v-model="userInfo.loginName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="显示昵称"
                        prop="userName"
                        :rules="[
                            { required: true, message: '请输入显示昵称', trigger: 'blur' },
                            { validator:userNameValidate, trigger: 'blur'}
                        ]"
                    >
                        <el-input type="userName" v-model="userInfo.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="密    码"
                        prop="password"
                        :rules="[
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            {  validator: this.validatePass, trigger: 'blur' }
                        ]"
                    >
                        <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="确认密码"
                        prop="confirmpwd"
                        :rules="[
                            { required: true, message: '请输入确认密码', trigger: 'blur' },
                            {  validator: this.validatePass2, trigger: 'blur' }
                        ]"
                    >
                        <el-input type="password" v-model="userInfo.confirmpwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox type="checkbox" v-model="checked">
                            是否同意并愿意遵守
                            <span class="regist-agree">用户协议</span> 。
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    </el-form-item>
                </el-form>
                <div class="regist"></div>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <span>请先查阅“用户协议”，并同意用户协议</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="regist-success" v-if="success">
            <div>
                账号注册成功，点击
                <a class="goto-login" href="/login">登录</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            validatePass: this.validatePassfunc,
            validatePass2: this.validatePass2func,
            loginNameValidate: this.loginNameValidatefunc,
            userNameValidate: this.userNameValidatefunc,
            dialogVisible: false,
            checked: false,
            userInfo: {
                userName: "",
                loginName: "",
                password: "",
                confirmpwd: "",
                email: "",
                phone: "",
                prePhone: "+86"
            },
            success: false
        };
    },
    mounted() {},
    methods: {
        submitForm() {
            if (!this.checked) {
                this.dialogVisible = true;
                return;
            }
            this.$ajax(`/api/user/regist`, { userInfo: this.userInfo }, "POST")
                .then(result => {
                    if (result.type === 1 && result.datas > 0) {
                        this.success = true;
                    }
                })
                .catch(err => {});
        },
        validatePassfunc(rule, value, callback) {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.userInfo.confirmpwd !== "") {
                    this.$refs.userInfo.validateField("confirmpwd");
                }
                callback();
            }
        },
        validatePass2func(rule, value, callback) {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.userInfo.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        },
        loginNameValidatefunc(rule, value, callback) {
            this.validateName(
                value,
                callback,
                "loginName",
                "登录名称不能重复，请重新输入"
            );
        },
        userNameValidatefunc(rule, value, callback) {
            this.validateName(
                value,
                callback,
                "userName",
                "昵称名称不能重复，请重新输入"
            );
        },
        validateName(value, callback, keyName, tips) {
            let param = {};
            param[keyName] = value;
            this.$ajax("/api/user/getUser", { userInfo: param }, "POST")
                .then(result => {
                    if (result.type === 1) {
                        if (result.datas && result.datas.length > 0) {
                            callback(new Error(tips));
                        } else {
                            callback();
                        }
                    }
                })
                .catch(err => {
                    callback(new Error(err));
                });
        }
    }
};
</script>
<style lang="stylus" scoped>
.regist-content
    max-width 856px
    margin 0 auto
.regist-title
    font-size 21px
    color #212529
    padding 20px 0 10px 15px
    border-bottom 1px solid rgba(0, 0, 0, 0.1)
.regist-form
    display inline-block
    width 60%
    padding 13px
</style>