<template>
    <div style="width:100%;height:100%">
        <loading :state="loading"></loading>
        <div class="header" >
            <ul class="header_type">
                <li
                    class="header_type-item"
                    v-for="typeItem in types"
                    :key="typeItem.name"
                    :class="{'selected': typeSelected==typeItem.name}"
                    @click="typeClick(typeItem)"
                >{{typeItem.name}}</li>
            </ul>

            <div class="login-wrap">
                <a class="login-item" @click="writeArticle">
                    <em class="login-icon icon-blog"></em>
                    <span>写博客</span>
                </a>
                <a class="login-item">
                    <em class="login-icon icon-msg"></em>
                    <span>消息</span>
                </a>
                <a class="login-item" href="/login" v-if="!hasLogin">
                    <span>登录</span>
                </a>
                <a class="login-item" href="/login/regist" v-if="!hasLogin">
                    <span>注册</span>
                </a>
                <a
                    class="login-item login-header"
                    @click="showUserList=!showUserList"
                    v-if="hasLogin"
                >
                    <img :src="headerImg" :alt="headerImg" style="width:26px;" />
                </a>
                <ul class="user-list" v-show="showUserList">
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wode" />
                        </svg>
                        <span>我的主页</span>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_biaoji-" />
                        </svg>
                        <span>我的关注</span>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_huabanfuben4" />
                        </svg>
                        <span>我的收藏</span>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_huabanfuben" />
                        </svg>
                        <span>账号设置</span>
                    </li>
                    <li @click="logOut">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_tuichu-" />
                        </svg>
                        <span>退出账号</span>
                    </li>
                </ul>
            </div>
            <div class="search">
                <input type="text" v-model="searchKey" placeholder="搜索" />
                <a class="search-link" @click="searchDatas()">
                    <em class="search-icon"></em>
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
import "./src/assets/css/base.styl";
import "./src/assets/css/index.styl";
import { on, closest, goToLogin } from "@/common/util.js";
export default {
    data() {
        return {
            types: [],
            typeSelected: "",
            loading: false,
            searchKey: null,
            hasLogin: false,
            headerImg: "/img/header.jpg",
            showUserList: false,
        };
    },
    mounted() {
        //获取基础信息（登录用户信息等）
        this.getCommonInfo();
        //获取类型信息
        this.getType();
        this.addListener();
    },
    methods: {
        addListener() {
            on(document, "mouseover", this.bodyMouseOver.bind(this));
        },
        bodyMouseOver(e) {
            let cur = e.target;
            if (
                closest(cur, ".login-header") == null &&
                closest(cur, ".user-list") == null
            ) {
                this.showUserList = false;
            } else {
                this.showUserList = true;
            }
        },
        getCommonInfo() {
            this.$ajax("/api/getCommonInfo", null, "post")
                .then(result => {
                    let commonInfo = result.datas;
                    if (commonInfo) {
                        this.hasLogin = true;
                        this.$store.commit("setUser", commonInfo.userInfo);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        getType() {
            this.$ajax("/api/index/getType", null, "post")
                .then(result => {
                    this.types = result.datas;
                    if (this.types && this.types.length) {
                        this.getSelected(this.types);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        getSelected(types) {
            let type = this.$route.params.type;
            if (!type && (!this.$route.name || this.$route.name == "index")) {
                this.typeClick(types[0]);
                return;
            } else {
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
                path: `/index/${typeItem.router}`
            });
        },
        searchDatas() {
            this.$router.push({
                path: `/search`,
                query: {
                    k: this.searchKey
                }
            });
        },
        logOut() {
            if (!this.$store.getters.getCurrentUser) {
                goToLogin();
                return;
            }
            let user = this.$store.getters.getCurrentUser;
            this.$ajax("/api/user/logOut", { userInfo: user }, "post")
                .then(result => {
                    if (result.type == "1") {
                        storageUtil.removeItem("token");
                        this.$store.commit("removeUser");
                        window.location.href = "/login";
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        writeArticle() {
            if (!this.$store.getters.getCurrentUser) {
                goToLogin("/write");
                return;
            }
            this.$router.push("/write");
        }
    }
};
</script>
<style lang="stylus" scoped>
.user-list
    position absolute
    top 40px
    right 22px
    background-color #ffffff
    padding 10px 0
    border-color transparent
    box-shadow 0 2px 8px rgba(0, 0, 0, 0.1)
    svg
        font-size 18px
    li
        padding 5px 15px
        cursor pointer
        &:hover
            background-color #F5F5F5
    span
        padding-left 10px
</style>W