const router = require("koa-router")();
router.post("/searchData", async (ctx) => {
    let result = new ctx.Result();
    try {
        let types = ctx.config.types;
        let params = ctx.request.body;
        let searchDatas = [];
        for (let item of types) {
            let searchUrls = ctx.config[item.router].search;
            let getSearchDatas = require("../" + item.router + "/search.js");
            let datas = await getSearchDatas(searchUrls, params.k)
            searchDatas = searchDatas.concat(datas);
        }
        ctx.body = result.setDatas(searchDatas);
    } catch (e) {
        ctx.body = result.setError(e.message);
    }
})
module.exports = router;