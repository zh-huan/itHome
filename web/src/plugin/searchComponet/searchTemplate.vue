<template>
    <div>
        <div class="search-list">
            <ul>
                <li v-for="searchItem in searchList" v-if="searchItem">
                    <div class="search-title" >
                        <h3><a :href="searchItem.url" target="_blank" v-html="searchItem.title"></a></h3>
                    </div>
                    <div class="search-content" v-html="searchItem.con"></div>
                    <div class="search-footer"></div>
                </li>
            </ul>
            <div class="pager"></div>
        </div>
        <contentLoading></contentLoading>
    </div>

</template>
<script>
    export default {
        data(){
            return{
                searchList:[]
            }
        },
        mounted(){
            this.getSearchData();
        },
        methods:{
            getSearchData(){
                this.$parent.loading = true;
                this.$ajax("/api/search/searchData",this.$route.query,"POST").then(result=>{
                    this.searchList=result.datas;
                    this.$parent.loading = false;
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        watch:{
            "$route.query":function(to,fromv){
                if(this.$route.name!="search")
                    return;
                this.getSearchData();
            }
        }
    }
</script>
<style scoped lang="stylus">

.search-title a
    max-width: 98%;
    color: #3d3d3d;
    display: block;
    line-height: 24px;
    height: 24px;
    font-size:18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
.search-title  a:visited
    color: #b8b8b8;
.search-title  a:link
    color: #3d3d3d;
.search-title  a:hover
    color: #ca0c16
.search-content
    font-size: 14px;
    color: rgb(153, 153, 153);
    margin-bottom: 5px;
    font-family: Arial, "Microsoft YaHei", "SF Pro Display", Roboto, Noto, Arial, "PingFang SC", "Hiragino Sans GB", sans-serif;
    line-height: 22px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
</style>