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
        let list = await article.getList(params,{title:1,userId:1,articleId:1,state:1});
        ctx.body = result.setDatas(list);
    } catch (e) {
        ctx.body = result.setError(e);
    }
})
router.post("/getOne", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        let token = ctx.request.header["auth-header-token"];
        let userInfo = await tokenUtil.verifyToken(token);
        params.userId = userInfo.userId;
        let article = new Article();
        let list = await article.getList(params);
        if(list&&list.length){
            ctx.body = result.setDatas(list[0]);
        }else{
            ctx.body = result.setError("查询失败");
        }
        
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
        params.author = userInfo.userName;
        let article = new Article();
        let rst = await article.add(params);
        ctx.body = result.setDatas(rst);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
router.post("/update", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        let token = ctx.request.header["auth-header-token"];
        let userInfo = await tokenUtil.verifyToken(token);
        let query={
            articleId:params.articleId,
            noteBookId:params.noteBookId,
            userId:userInfo.userId
        }
        let articleModel={
            title: params.title,
            content: params.content,
            state: params.state,
        }
        let article = new Article();
        let rst = await article.update(query,articleModel);
        ctx.body = result.setDatas(rst);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
module.exports = router;