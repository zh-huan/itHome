/**用户登录信息列表实例类
 * 
 */
const dbHelper = require("../../dbHelper/dbAdpter.js")();
const TB_NAME = "tb_user_logininfo";
class userLoginModel {
    constructor() {
        this.userId = "";
        this.loginIp = "";
        this.loginTime = "";
        this.province = "";
        this.city = "";
        this.operators = "";
    }
    async add(userLogin) {
        userLogin.loginTime = new Date();
        let result = await dbHelper.insertOne(TB_NAME, userLogin);
        return result;
    }
    async getList(searchObj) {
        let list = await dbHelper.find(TB_NAME, searchObj);
        return list;
    }
}
module.exports = userLoginModel;