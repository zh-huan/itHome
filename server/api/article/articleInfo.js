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
        let token = params.token;
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
        let token = params.token;
        let userInfo = await tokenUtil.verifyToken(token);
        params.userId = userInfo.userId;
        let article = new Article();
        let result = article.add(params);
        ctx.body = result.setDatas(result);
    } catch (e) {
        ctx.body = result.setError(e);
    }
})
module.exports = router;