/**
 * 文集
 */
const TB_NAME = "tb_notebook";
const dbHelper = require("../../dbHelper/dbAdpter.js")();
const UUID = require("uuid");

class noteBookModel {
    constructor() {
        this.userId = "";
        this.noteBookId = "";
        this.noteBookTitle = "";
        this.createTime = "";
        this.lastEditTime = "";
        this.delete = 0; //已删除：1，未删除：0
    }
    async getList(searchObj) {
        let list = await dbHelper.find(TB_NAME, searchObj);
        return list;
    }

    async add(noteBook) {
        if (!noteBook) {
            noteBook = {
                noteBookId: this.noteBookId,
                noteBookTitle: this.noteBookTitle,
                createTime: this.createTime,
                delete: this.delete,
                userId: this.userId
            }
        }
        noteBook.noteBookId = UUID.v1();
        noteBook.createTime = new Date();
        noteBook.delete = 0;
        let result = await dbHelper.insertOne(TB_NAME, noteBook);
        return result;
    }

    async update(query, noteBook) {
        noteBook.lastEditTime = new Date();
        let result = await dbHelper.update(TB_NAME, query, noteBook);
        return result;
    }
    async delete(query) {
        let noteBook = {};
        noteBook.delete = 1;
        noteBook.deleteTime = new Date();
        let result = await dbHelper.update(TB_NAME, query, noteBook);
        return result;
    }
}
module.exports = noteBookModel;