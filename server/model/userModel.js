const dbHelper = require("../dbHelper/dbAdpter.js")();
const aes = require("../api/base/aes.js")
class userModel {
    constructor() {
        this.tbName = "tb_user";
        this.email = "";
        this.userName = "";
        this.loginName = "";
        this.password = "";
        this.email = "";
        this.phone = "";
        this.time = "";
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
        delete user.confirmpwd;
        user.password = aes.encryption(user.password);
        user.time = new Date();
        let result = await dbHelper.insertOne(this.tbName, user);
        return result;
    }
    async getOne(searchObj) {
        let list = await this.getList(searchObj);
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