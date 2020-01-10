const TB_NAME = "tb_article";
const UUID = require("uuid");

class articleModel {
    constructor() {
        this.articleId = "";
        this.userId = "";
        this.userName = "";
        this.title = "";
        this.content = "";
        this.createTime = "";
        this.lastEditTime = "";
        this.state = 0; //0:保存，1：发布
    }

    async getList(searchObj) {
        let list = await dbHelper.find(TbName, searchObj);
        return list;
    }

    async add(article) {
        if (!article) {
            article = {
                title: this.title,
                content: this.content,
                createTime: this.createTime,
                state: this.state,
                userId: this.userId
            }
        }
        article.articleId = UUID.v1;
        article.createTime = new Date();
        let result = await dbHelper.insertOne(TbName, article);
        return result;
    }

    async update(query, article) {
        article.lastEditTime = new Date();
        let result = await dbHelper.insertOne(TbName, query, article);
        return result;
    }
}