<template>
    <div>
        <div class="user-regiset_item">
            <label>注册邮箱</label>
            <input type="text" v-model="email" placeholder="需要通过邮箱激活账号"/>
        </div>
        <div class="user-regiset_item">
            <label>手机号码</label>
            <input type="text" v-model="prePhone"/>
            <input type="text" v-model="email" placeholder="需要通过邮箱激活账号"/>
        </div>
        <div class="user-regiset_item">
            <label>登陆名称</label>
            <input type="text" v-model="loginName" placeholder="登陆用户名，不少于4个字符"/>
        </div>
        <div class="user-regiset_item">
            <label>显示昵称</label>
            <input type="text" v-model="userName" placeholder="不少于2个字符"/>
        </div>
        <div class="user-regiset_item">
            <label>密&nbsp;&nbsp;码</label>
            <input type="password" v-model="password" placeholder="至少8位"/>
        </div>
        <div class="user-regiset_item">
            <label>确认密码</label>
            <input type="password" v-model="confirmpwd" placeholder="请输入确认密码"/>
        </div>
        <div class="user-regiset_item">
            <button>注册</button>
        </div>
        <div class="user-regiset_item">
            <p class="tips">﹡点击 “注册” 按钮，即表示您同意并愿意遵守<a>用户协议</a> 。</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userName: "",
                loginName: "",
                password: "",
                confirmpwd: "",
                email: "",
                phone: "",
                prePhone:"+86",
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>