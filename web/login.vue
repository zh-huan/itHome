<template>
    <div>
        <div class="header">
            <ul class="header_type">
                <li class="header_type-item"><a class="login-item" href="/" target="_blank"><span>首页</span></a></li>
                <li class="header_type-item"  :class="{'selected': selected=='登录'}"> <router-link to="/login" class="login-item"><span>登录</span></router-link></li>
                <li class="header_type-item" :class="{'selected': selected=='注册'}"><router-link to="/login/regist" class="login-item"><span>注册</span></router-link></li>
            </ul>

        </div>
        <div class="content clearfix">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>


    </div>
</template>
<script>
    import "./src/assets/css/base.styl"
    export default {
        data() {
            return {
                selected:"登录"
            }
        },
        mounted() {
            this.getSelected();
        },
        methods: {
            getSelected(){
                if(this.$route.name=="login"){
                    this.selected="登录";
                }else{
                    this.selected="注册";
                }
            }
        },
        watch:{
            "$route.name": function (to, from) {
                console.log(to, from);
                this.getSelected();
            }
        }
    }
</script>
<style scoped lang="stylus">
    .header
        text-align: right;
    .header_type-item:hover
        border-bottom: 2px solid #ca0c16

</style>