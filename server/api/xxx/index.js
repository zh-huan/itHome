const router = require("koa-router")();
router.post("/index", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        if (params) {
            let type = params.type;
            let subtype = params.subType;
            let index = params.pageIndex;
            ctx.body = result.setDatas();
        } else {
            ctx.body = result.setWarn("没有参数");
        }
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
});
module.exports = router;