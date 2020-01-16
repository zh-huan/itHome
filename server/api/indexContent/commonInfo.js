const Router = require('koa-router');
const router = new Router();
const tokenUtil = require('../../utils/tokenUtil.js')
const {
    verifyToken
} = require('../../middleware/verifyToken.js');

router.use(verifyToken)
router.post("/getCommonInfo", async (ctx) => {
    let result = new ctx.Result();
    try {
        let token = ctx.request.header["auth-header-token"];
        let userInfo = await tokenUtil.verifyToken(token);
        let commonInfo = {
            userInfo
        };
        ctx.body = result.setDatas(commonInfo);
    } catch (e) {
        ctx.body = result.setError(e);
    }
})

module.exports = router;