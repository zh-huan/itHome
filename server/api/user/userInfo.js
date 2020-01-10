const router = require("koa-router")();
const UserModel = require("../../model/userModels/userInfoModel.js");
const UserLoginModel = require("../../model/userModels/userLoginModel.js");
const Aes = require("../base/aes.js");
const {
    getAddress
} = require("../base/tool.js");
const {
    signToken
} = require("../../utils/tokenUtil.js");

router.post('/regist', async (ctx) => {
    let result = new ctx.Result();
    try {
        let user = new UserModel();
        let userInfo = ctx.request.body.userInfo;
        let ret = await user.add(userInfo);
        ctx.body = result.setDatas(ret);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
router.post('/login', async (ctx) => {
    let result = new ctx.Result();
    try {
        let userModel = new UserModel();
        let param = ctx.request.body.userInfo;
        let password = Aes.encryption(param.password);
        delete param.password;
        let loginUser = await userModel.getOne(param);
        let token = "";
        if (loginUser && loginUser.userName && loginUser.password === password) {
            delete loginUser.password;
            token = signToken(loginUser)
            let updateUser = {
                loginState: 1,
                loginTime: new Date()
            };
            try {
                let address = await getAddress(ctx.request);
                let userLoginModel = new UserLoginModel();
                await userLoginModel.add({
                    userId: loginUser.userId,
                    loginIp: address && address.data ? address.data.ip : "",
                    province: address && address.data ? address.data.region : "",
                    city: address && address.data ? address.data.city : "",
                    operators: address && address.data ? address.data.isp : ""
                })
            } catch (e) {
                console.log(e);
            }
            userModel.update(loginUser, updateUser)
            let rt = {
                loginUser,
                token
            }
            ctx.body = result.setDatas(rt);
        } else if (loginUser && loginUser.userName) {
            ctx.body = result.setError("用户名账号输入错误");
        } else {
            ctx.body = result.setError("不存在此账号，请先注册账号使用");
        }
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})

router.post('/logOut', async (ctx) => {
    let result = new ctx.Result();
    try {
        let userModel = new UserModel();
        let param = ctx.request.body.userInfo;
        let query = {
            userId: param.userId,
            userName: param.userName
        }
        let updateUser = {
            loginState: 0
        };
        let rs = userModel.update(query, updateUser)
        ctx.body = result.setDatas(rs);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
router.post('/getUser', async (ctx) => {
    let result = new ctx.Result();
    try {
        let user = new UserModel();
        let userInfo = ctx.request.body.userInfo;
        let ret = await user.getList(userInfo);
        ctx.body = result.setDatas(ret);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
module.exports = router;