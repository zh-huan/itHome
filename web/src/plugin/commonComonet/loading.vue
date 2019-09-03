<template>
    <div class="loading" ref="loading">
        <div class="loading-bar" v-if="show" :style="{width:width+'px'}"></div>
    </div>
</template>
<script>
export default {
    props:{
        state:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            widthChange:null,
            width:0,
            show:false
        }
    },
    mounted(){
    },
    watch:{
        state:function (to, from) {
            let parentWidth=this.$refs["loading"].offsetWidth;
            if(to){
                this.show=to;
                this.widthChange= setInterval(()=>{
                    if(this.width+100<=parentWidth){
                        this.width+=20
                    }else{
                        clearInterval(this.widthChange);
                        this.widthChange=null;
                    }
                },50);
            }else{
                this.width=parentWidth;
                if(this.widthChange){
                    clearInterval(this.widthChange);
                    this.widthChange=null;
                }
                setTimeout(()=>{
                    this.width=0;
                    this.show=to;
                },300);
            }
        }
    }
}
</script>
<style scoped lang="stylus">
.loading
    position :absolute;
    top:0;
    left :0;
    right :0;
    height :2px;
.loading-bar
    position :absolute;
    top:0;
    left :0;
    right :auto;
    height :2px;
    background-color :#ca0c16;
    box-shadow:0px 2px 3px rgba(202,12,22,0.1)
    z-index :1000
</style>