<template>
    <div>
search
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        mounted(){
            this.getSearchData();
        },
        methods:{
            getSearchData(){
                this.$ajax("/api/search/searchData",this.$route.query,"POST").then(result=>{
                    console.log(result);
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>