const dbHelper = require("../../dbHelper/dbAdpter.js")();
const TB_NAME = "tb_article";
const UUID = require("uuid");

class articleModel {
    constructor() {
        this.noteBookId="";
        this.articleId = "";
        this.userId = "";
        this.author = "";
        this.title = "";
        this.content = "";
        this.time = "";
        this.lastEditTime = "";
        this.state = 0; //0:保存，1：发布
        this.delete = 0;
        this.deleteTime = "";
        this.view = 0;
        this.comment = 0;
        this.summary  = "";
    }

    async getList(searchObj,keys=null) {
        let list = await dbHelper.find(TB_NAME, searchObj,keys);
        return list;
    }
    async getListPage(searchObj) {
        let list = await dbHelper.find(TB_NAME, searchObj);
        return list;
    }
    async add(article) {
        if (!article) {
            article = {
                title: this.title,
                content: this.content,
                time: this.time,
                state: this.state,
                userId: this.userId
            }
        }
        article.articleId = UUID.v1();
        article.time = new Date();
        article.delete = 0;
        article.view = 0;
        article.comment = 0;
        article.summary = article.content&&article.content.length>100?article.content.substring(0,100):article.content;
        await dbHelper.insertOne(TB_NAME, article);
        return article;
    }

    async update(query, article) {
        article.lastEditTime = new Date();
        article.summary = article.content&&article.content.length>100?article.content.substring(0,100):article.content;
        let result = await dbHelper.update(TB_NAME, query, article);
        return result;
    }
}
module.exports = articleModel;