const dbHelper = require("../dbHelper/dbAdpter.js")();
class userModel {
    constructor() {
        this.tbName = "tb_user";
        this.email = "";
        this.userName = "";
        this.loginName = "";
        this.password = "";
        this.email = "";
        this.phone = "";
    }
    async add(user) {
        if (!user) {
            user = {
                userName: this.userName,
                loginName: this.loginName,
                password: this.password,
                email: this.email,
                phone: this.phone,
            }
        }
        let result = await dbHelper.insertOne(this.tbName, user);
        return result;
    }
    async getOne(searchObj) {
        let list = this.getList(searchObj);
        if (list && list.length) {
            return list[0];
        }
        return null;
    }
    async getList(searchObj) {
        let list = await dbHelper.find(this.tbName, searchObj);
        return list;
    }
}
module.exports = userModel;