const cheerio = require("cheerio");
const Router = require('koa-router');
const router = new Router();

//获取主类型
router.post("/getType", async (ctx) => {
    let result = new ctx.Result();
    try {
        let types = ctx.config.types;
        ctx.body = result.setDatas(types);
    } catch (e) {
        ctx.body = result.setError(e);
    }
});

//获取子类型
router.post("/getsubType", async (ctx) => {
    let result = new ctx.Result();
    try {
        let param = ctx.request.body;
        if (param && param.type) {
            let subTypes = ctx.config.subTypes[param.type];
            ctx.body = result.setDatas(subTypes);
        } else {
            ctx.body = result.setWarn("请输入类型参数");
        }
    } catch (e) {
        ctx.body = result.setError(e);
    }
});
module.exports = router;
