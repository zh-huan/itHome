<template>
    <div style="width:100%;height:100%">
        <div class="header clearfix">
            <div class="title">
                <span class="text">XXX</span>
            </div>
            <div class="search">
                <input type="text" placeholder="搜索文章" />
                <span>
                    <svg class="icon" aria-hidden="true" style="font-size:18px">
                        <use xlink:href="#icon-sousuo" />
                    </svg>
                </span>
            </div>
            <div class="login">
                <span>XXX</span>
            </div>
            <div class="menu" @click="showMenuList">
                <span class="menu-icon">
                    <svg class="icon" aria-hidden="true" style="font-size:18px">
                        <use xlink:href="#icon-liebiao1" />
                    </svg>
                </span>
            </div>
        </div>
        <div class="content clearfix">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <!-- <mt-tabbar v-model="selected">
            <mt-tab-item id="外卖">外卖</mt-tab-item>
            <mt-tab-item id="订单">手长</mt-tab-item>
            <mt-tab-item id="分享">分享</mt-tab-item>
            <mt-tab-item id="我的">我的</mt-tab-item>
        </mt-tabbar>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            types: [],
            typeSelected: "",
            //   loading: false,
            searchKey: null,
            hasLogin: false,
            //   headerImg: "/img/header.jpg",
            showUserList: false
        };
    },
    mounted() {
        //获取基础信息（登录用户信息等）
        this.getCommonInfo();
        //获取类型信息
        this.getType();
    },
    methods: {
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
        },
        showMenuList() {}
    }
};
</script>
<style lang="stylus" scoped>
.header
    font-size 12px
    color #333
    line-height 18px
    background #fff
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.05)
    padding 11px 13px 11px 7px
    height 52px
    width 100%
    -moz-box-sizing border-box
    -webkit-box-sizing border-box
    display flex
    left 0
    z-index 999
    div
        display inline
</style>