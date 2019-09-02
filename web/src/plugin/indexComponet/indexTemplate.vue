<template>
    <div class="content clearfix">
        <nav class="content-type clearfix">
            <ul class="content-subtype">
                <li class="content-subtype_item"
                    v-for="subItem in subTypes"
                    :class="{'selected': subTypeSelected==subItem.name}"
                    @click="changeSubType(subItem)">{{subItem.name}}</li>
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
                                <img  v-if="postItem.img" :src="postItem.img">
                                <span class="text">{{postItem.author}}</span></a>
                            <div class="interval"></div>
                            <span class="post-publish_info text" >{{postItem.time}}</span>
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
        </main>
        <aside class="content-aside clearfix">
        </aside>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                subTypes:[],
                subTypeSelected:"",
                postList:[]
            }
        },
        computed:{
        },
        mounted(){
            this.getSubType();
        },
        methods:{
            getSubType(){

                // 并且响应成功以后会执行then方法中的回调函数
                let type=this.$route.params.type;
                this.$ajax("/index/getsubType",{type:type},"POST").then((result)=> {
                    this.subTypes=result.datas;
                    if(this.subTypes&&this.subTypes.length){
                        this.changeSubType(this.subTypes[0]);
                    }
                });
            },
            changeSubType(subType){
                this.$parent.loading=true;
                this.subTypeSelected=subType.name;
                let type=this.$route.params.type;
                this.$ajax(`/${type}/index`,{type:type,subType:subType.router},"post").then((result)=> {
                    if(result.datas){
                        this.postList=result.datas.postList;
                        this.$parent.loading=false;
                    }
                }).catch((e)=>{
                    console.log(e);
                });
            }
        },
        watch:{
            "$route":function(to,from){
                this.getSubType();
            }
        }
    }
</script>