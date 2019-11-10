<template>
    <div class="login-content">
        <div class="login-title"></div>
        <div class="login-icon"></div>
        <el-form :model="userInfo" ref="userInfo" label-width="100px" class="login-form">
            <el-form-item label prop="unserName">
                <el-input
                    type="input"
                    v-model="userInfo.unserName"
                    autocomplete="off"
                    placeholder="登录用户名 / 邮箱"
                ></el-input>
            </el-form-item>
            <el-form-item label prop="pwd">
                <el-input
                    type="password"
                    v-model="userInfo.pwd"
                    autocomplete="off"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('userInfo')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo:{
                userInfo:'',
                pwd:''
            }
        };
    },
    methods:{
        login(){

        }
    }
};
</script>