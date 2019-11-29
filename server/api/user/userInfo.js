const router = require("koa-router")();
const UserModel = require("../../model/userModel.js");
router.post('/regist', async (ctx) => {
    let result = new ctx.Result();
    try {
        let user = new userModel();
        let userInfo = ctx.request.body;
        let ret = await user.add(userInfo);
        ctx.body = result.setDatas(ret);
    } catch (e) {
        ctx.body = result.setError(e);
    }
})
module.exports = router;