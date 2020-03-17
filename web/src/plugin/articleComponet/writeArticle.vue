<template>
    <div class="article-main">
        <div class="article-title">
            <input
                v-model="aricle.title"
                type="text"
                placeholder="输入文章标题"
                class="article-title_input el-input__inner"
            />
            <button class="el-button button-save" @click="saveArticle">保存草稿</button>
            <button class="el-button button-public" @click="publicArticle">发布文章</button>
        </div>
        <div class="article-content">
            <mavon-editor
                v-model="aricle.content"
                @imgAdd="$imgAdd"
                ref="md"
                @change="change"
                style="min-height: 600px"
            />
        </div>
        <div class="article-publish_success"></div>
    </div>
</template>
<script>
// 导入组件 及 组件样式
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    components: {
        mavonEditor
    },
    props:{
        aricle:{
            type:Object,
            default:{}
        }
    },
    data() {
        return {
            // aricle: {
            //     title: "",
            //     content: ""
            // },
            content: "", // 输入的markdown
            html: "" // 及时转的html
        };
    },
    methods: {
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            // let formdata = new FormData();
            // this.$upload
            //     .post("/上传接口地址", formdata)
            //     .then(res => {
            //         console.log(res.data);
            //         this.$refs.md.$img2Url(pos, res.data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        },
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        saveArticle() {
            this.addArticle(this.aricle);
        },
        publicArticle() {
            this.aricle.state = 1;
            this.addArticle(this.aricle);
        },
        addArticle(aricle) {
            this.$ajax("/api/article/update", aricle, "POST")
                .then(result => {
                    if (result.type == 1 && result.datas > 0) {
                        this.$elms({
                        showClose: true,
                        type: "success",
                        message: "保存成功"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {}
};
</script>
<style lang="stylus" scoped>
.article-main
    .article-title
        height 45px
        .article-title_input
            width calc(100% - 233px)
            height 36px
            border-radius 4px
            font-size 16px
        .button-save
            margin-left 16px
            padding 8px 16px
            font-size 16px
            color #ca0c16
            border 1px solid #ca0c16
            border-radius 4px
            white-space nowrap
            background-color #fff
            &:hover
                background-color #fde3e4
        .button-public
            padding 8px 16px
            font-size 16px
            color #fff
            border 1px solid #ca0c16
            border-radius 4px
            white-space nowrap
            background-color #ca0c16
            &:hover
                background-color #b60b14
</style>