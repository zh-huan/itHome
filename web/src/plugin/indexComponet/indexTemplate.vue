<template>
    <div class="content clearfix" ref="indexContent">
        <nav class="content-type clearfix">
            <ul class="content-subtype">
                <li class="content-subtype_item"
                    v-for="subItem in subTypes"
                    :class="{'selected': subTypeSelected.name==subItem.name}"
                    @click="changeSubType(subItem)">{{subItem.name}}
                </li>
            </ul>
        </nav>
        <main class="content-list clearfix">
            <ul class="post-list">
                <li class="post-list_item" v-for="postItem in postList">
                    <div class="post-title">
                        <h2><a :href="postItem.url" target="_blank">{{postItem.title}}</a></h2>
                    </div>
                    <div class="post-summary">
                        {{postItem.summary}}
                    </div>
                    <div class="post-footer clearfix">
                        <div class="post-author">
                            <a :href="postItem.authorUrl" target="_blank" class="post-author_info">
                                <img v-if="postItem.img" :src="postItem.img">
                                <span class="text">{{postItem.author}}</span></a>
                            <div class="interval"></div>
                            <span class="post-publish_info text">{{postItem.time}}</span>
                        </div>
                        <div class="post-reader">
                            <div class="reader-num">
                                <span class="text">阅读数 </span>
                                <a class="num" :href="postItem.viewUrl" target="_blank">{{postItem.view}}</a>
                            </div>
                            <div class="interval"></div>
                            <div class="common_num ">
                                <span class="text">评论数 </span>
                                <a class="num" :href="postItem.commentUrl" target="_blank">{{postItem.comment}}</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="post-list-loading">
                <div style="display: inline-block;">
                    <div class="loading"></div>
                    <div class="loading"></div>
                    <div class="loading"></div>
                    <div class="loading"></div>
                    <div class="loading"></div>
                </div>

            </div>
        </main>
        <aside class="content-aside clearfix">
        </aside>
    </div>
</template>
<script>
    import {on, off} from "../../common/util.js"

    export default {
        data() {
            return {
                subTypes: [],
                subTypeSelected: "",
                postList: [],
                pageCount: 200,
                currentPage: 1
            }
        },
        computed: {},
        mounted() {
            this.getSubType();
            on(document, "scroll", this.handleScroll);
        },
        methods: {
            getSubType() {
                // 并且响应成功以后会执行then方法中的回调函数
                let type = this.$route.params.type;
                this.$ajax("/index/getsubType", {type: type}, "POST").then((result) => {
                    this.subTypes = result.datas;
                    if (this.subTypes && this.subTypes.length) {
                        this.changeSubType(this.subTypes[0]);
                    }
                }).catch((err)=>{
                    console.error(err);
                });
            },
            changeSubType(subType) {
                this.$parent.loading = true;
                this.subTypeSelected = subType;
                let type = this.$route.params.type;
                let params = {
                    type: type,
                    subType: this.subTypeSelected.router
                };
                this.getPageDatas(params,true);
            },
            getPageDatas(params,needClear) {
                let type = this.$route.params.type;
                this.$ajax(`/${type}/index`, params, "POST").then((result) => {
                    if (result.datas) {
                        //切换类型的时候清空数据,滚动条跳到最顶
                        if(needClear){
                            this.postList=[];
                            document.documentElement.scrollTop=0;
                        }
                        this.postList = this.postList.concat(result.datas.postList);
                        this.$parent.loading = false;
                        if (result.datas.pager) {
                            this.pageCount = result.datas.pager.total * 1;
                        }
                    }
                }).catch((e) => {
                    console.error(e);
                });
            },
            handleScroll(e) {
                let height = document.documentElement.scrollHeight;
                let top = document.documentElement.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                if (top + clientHeight>=height&& this.currentPage < this.pageCount) {
                    this.currentPage++;
                    let type = this.$route.params.type;
                    let params = {
                        type: type,
                        subType: this.subTypeSelected.router,
                        pageIndex: this.currentPage
                    };
                    this.getPageDatas(params);
                }
            }
        },
        watch: {
            "$route": function (to, from) {
                this.getSubType();
            }
        },
        destroyed() {
            off(document, "scroll", this.handleScroll);
        },
    }
</script>
<style scoped lang="stylus">
/****内容样式*****/
.content
    width: 100%;
    padding: 50px 70px 10px 70px;

.content-type
    position: fixed;
    float: left;
    width: 96px;
    padding: 6px 0;
    background-color: #fff;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.04);

.content-subtype_item
    padding: 5px;
    text-align: center;
    color: #707070;
    font-size: 14px;
    cursor: pointer;
    border-bottom: 1px solid #fff;

.content-subtype_item.selected, .content-subtype_item:hover
    background-color: #f44444;
    color: #fff;

.content-list
    float: left;
    padding-left: 106px;

.content-aside
    float: left;
/***文章样式***/
.post-list .post-list_item
    padding: 10px 24px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.04);
.post-title a
    max-width: 98%;
    color: #3d3d3d;
    display: block;
    line-height: 24px;
    height: 24px;
    font-size:18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
.post-title  a:visited
    color: #b8b8b8;
.post-title  a:link
    color: #3d3d3d;
.post-title  a:hover
    color: #ca0c16
.post-summary
    margin-bottom: 4px;
    color: #8a8a8a;
    font-size: 14px;
    line-height: 24px;
.interval
    float: left;
    width: 1px;
    height: 12px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-top: 6px;
    margin-left: 8px;
    margin-right: 8px;
.post-author_info,.post-publish_info
    float: left;
.post-footer .text
    font-size: 14px;
    color: #8a8a8a;
    line-height: 24px;
    vertical-align: super;
.post-author_info img
    width: 24px;
    height: 24px;
    border-radius: 50%;

.post-reader
    float :right;
    font-size :12px
    .num
        color: #3399ea;
        vertical-align: super;

.reader-num,.common_num
    float :left
.post-list-loading
    background-color :#fff;
    text-align: center;
    padding: 10px;
    .icon
        width :18px;
        height :18px;
        background-image :url("../../assets/img/loading.gif");

.post-list-loading .loading {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: #68b2ce;
    float: left;
    margin: 0 3px;
    animation: loading linear 1s infinite;
    -webkit-animation: loading linear 1s infinite;
 }
.post-list-loading .loading:nth-child(1){
      animation-delay:0s;
 }
.post-list-loading .loading:nth-child(2){
       animation-delay:0.15s;
 }
.post-list-loading .loading:nth-child(3){
      animation-delay:0.3s;
 }
.post-list-loading .loading:nth-child(4){
      animation-delay:0.45s;
 }
.post-list-loading .loading:nth-child(5){
       animation-delay:0.6s;
 }
 @keyframes loading
 {
     0%,60%,100% {transform: scale(1);}
     30% {transform: scale(2.5);}
 }
 @-webkit-keyframes loading
 {
     0%,60%,100% {transform: scale(1);}
    30% {transform: scale(2.5);}
 }


</style>