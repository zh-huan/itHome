const dbHelper = require("../../dbHelper/dbAdpter.js")();
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
        this.delete = 0;
    }

    async getList(searchObj) {
        let list = await dbHelper.find(TB_NAME, searchObj);
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
        article.articleId = UUID.v1();
        article.createTime = new Date();
        let result = await dbHelper.insertOne(TB_NAME, article);
        return result;
    }

    async update(query, article) {
        article.lastEditTime = new Date();
        let result = await dbHelper.update(TB_NAME, query, article);
        return result;
    }
}
module.exports = articleModel;