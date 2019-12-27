const router = require("koa-router")();
const UserModel = require("../../model/userModel.js");
const {
    sign
} = require("jsonwebtoken");
const Aes = require("../base/aes.js");
const {
    tokenConfig
} = require("../../config/server.config.js")
router.post('/regist', async (ctx) => {
    let result = new ctx.Result();
    try {
        let user = new UserModel();
        let userInfo = ctx.request.body;
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
        let param = ctx.request.body;
        param.password = Aes.encryption(param.password);
        let loginUser = await userModel.getOne(param);
        let token = "";
        if (loginUser && loginUser.userName) {
            token = sign(loginUser, tokenConfig.secret, {
                expiresIn: tokenConfig.expiresIn
            })
            delete loginUser.password;
        }
        let rt = {
            loginUser,
            token
        }
        ctx.body = result.setDatas(rt);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
router.post('/getUser', async (ctx) => {
    let result = new ctx.Result();
    try {
        let user = new UserModel();
        let userInfo = ctx.request.body;
        let ret = await user.getList(userInfo);
        ctx.body = result.setDatas(ret);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
module.exports = router;