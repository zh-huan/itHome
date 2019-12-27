<template>
    <div class="login-content">
        <div class="login-title">登录</div>
        <div class="login-icon"></div>
        <el-form :model="userInfo" ref="userInfo" label-width="100px" class="login-form">
            <el-form-item label="用户名" prop="userName">
                <el-input
                    type="input"
                    v-model="userInfo.userName"
                    autocomplete="off"
                    placeholder="登录用户名/邮箱"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    v-model="userInfo.password"
                    autocomplete="off"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login()">登录</el-button>
            </el-form-item>
            <el-form-item v-if="loginFail">
                <div>{{loginTips}}</div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                userName: "",
                password: ""
            },
            loginFail: false,
            loginTips: "用户名或密码错误"
        };
    },
    methods: {
        login() {
            this.$ajax(`/api/user/login`, this.userInfo, "POST")
                .then(result => {
                    if (result.type === 1 && result.datas) {
                        let datas = result.datas;
                        if (datas.token) {
                            storageUtil.setItem("token",datas.token);
                            this.loginFail = false;
                            this.$store.commit("setUser", datas.loginUser);
                            // this.$router.push({
                            //     path: "/",
                            // });
                        } else {
                            this.loginFail = true;
                            this.loginTips = "用户名或密码错误";
                        }
                    } else {
                        this.loginFail = true;
                        this.loginTips = result.message;
                    }
                })
                .catch(err => {
                    this.loginFail = true;
                    this.loginTips = err;
                });
        }
    }
};
</script>
<style lang="stylus" scoped>
.login-content
    width 400px
    margin 40px auto
    background-color #fff
    border 1px solid #ccc
    box-shadow 0 1px 1px 0 rgba(0, 0, 0, 0.1)
    padding 20px
.login-title
    padding 10px
    border-bottom 1px solid #efefef
.login-form
    padding-top 10px
</style>