const Router = require('koa-router');
const router = new Router();
const tokenUtil = require('../../utils/tokenUtil.js');
const Article = require("../../model/articleModels/articleModel.js");
const {
    verifyToken
} = require('../../middleware/verifyToken.js');

router.use(verifyToken)
router.post("/getlist", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        let token = ctx.request.header["auth-header-token"];
        let userInfo = await tokenUtil.verifyToken(token);
        params.userId = userInfo.userId;
        let article = new Article();
        let list = article.getList(params);
        ctx.body = result.setDatas(list);
    } catch (e) {
        ctx.body = result.setError(e);
    }
})
router.post("/add", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        let token = ctx.request.header["auth-header-token"];
        let userInfo = await tokenUtil.verifyToken(token);
        params.userId = userInfo.userId;
        let article = new Article();
        let rst = await article.add(params);
        ctx.body = result.setDatas(rst);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
module.exports = router;