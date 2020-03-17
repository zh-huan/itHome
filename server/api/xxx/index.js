const router = require("koa-router")();
const Article = require("../../model/articleModels/articleModel.js");
router.post("/index", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        if (params) {
            let type = params.type;
            let subtype = params.subType;
            let index = params.pageIndex;
            let article = new Article();
            let list = await article.getList({});
            let resultData={
                postList:list,
                pager:{total: 1}
            }
            ctx.body = result.setDatas(resultData);
        } else {
            ctx.body = result.setWarn("没有参数");
        }
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
});
module.exports = router;