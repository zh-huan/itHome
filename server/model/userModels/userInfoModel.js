const dbHelper = require("../../dbHelper/dbAdpter.js")();
const aes = require("../../api/base/aes.js");
const UUID = require("uuid");
const TB_NAME = "tb_user";
class userModel {
    constructor() {
        this.userId = "";
        this.email = "";
        this.userName = "";
        this.loginName = "";
        this.password = "";
        this.email = "";
        this.phone = "";
        this.createTime = "";
        this.loginState = 0; //登录状态，0：离线，1：登录
        this.loginTime = "";
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
        user.userId = UUID.v1();
        user.password = aes.encryption(user.password);
        user.createTime = new Date();
        user.loginState = 0;
        let result = await dbHelper.insertOne(TB_NAME, user);
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
        let list = await dbHelper.find(TB_NAME, searchObj);
        return list;
    }

    async update(searchObj, user) {
        let result = await dbHelper.update(TB_NAME, searchObj, user);
        return result;
    }
}
module.exports = userModel;