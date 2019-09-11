<template>
    <div>
        <loading :state="loading"></loading>
        <div class="header">
            <ul class="header_type">
                <li class="header_type-item" v-for="typeItem in types"
                    :class="{'selected': typeSelected==typeItem.name}" @click="typeClick(typeItem)">{{typeItem.name}}
                </li>
            </ul>
            
            <div class="login-wrap">
                <a class="login-item" href=""><i class="login-icon icon-blog"></i><span>写博客</span></a>
                <a class="login-item" ><i class="login-icon icon-msg"></i><span>消息</span></a>
                <a class="login-item"><span>登录</span></a>
                <a class="login-item"><span>注册</span></a>
            </div>
            <div class="search">
                <input type="text" v-model="searchKey" placeholder="搜索"/>
                <a class="search-link" @click="searchDatas()">
                    <i class="search-icon" ></i>
                </a>
            </div>
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
                types: [],
                typeSelected: "",
                loading: false,
                searchKey:null
            }
        },
        mounted() {
            // 并且响应成功以后会执行then方法中的回调函数
            this.$ajax("/api/index/getType", {}, "post").then((result) => {
                this.types = result.datas;
                if (this.types && this.types.length) {
                    this.getSelected(this.types);
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            getSelected(types) {
                let type = this.$route.params.type;
                if (!type&&this.$route.name=="index") {
                    this.typeClick(types[0]);
                    return;
                }
                else {
                    for (let typeItem of types) {
                        if (typeItem.router == type) {
                            this.typeSelected = typeItem.name;
                            return;
                        }
                    }
                }
            },
            typeClick(typeItem) {
                this.typeSelected = typeItem.name;
                this.$router.push({
                    path: `/index/${typeItem.router}`,
                })
            },
            searchDatas(){
                this.$router.push({
                    path: `/search`,
                    query:{
                        k:this.searchKey
                    }
                })
            }
        }
    }
</script>