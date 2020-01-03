const Router = require("koa-router");
const index = require("./api/indexContent/indexContent");
const search = require("./api/indexContent/search");
const blogIndex = require("./api/blog/index");
const csdnIndex = require("./api/csdn/index");
const userInfo = require("./api/user/userInfo");
const common = require("./api/indexContent/commonInfo")
const router = new Router();
router.use("/api/index", index.routes());
router.use("/api/search", search.routes());
router.use("/api/blog", blogIndex.routes());
router.use("/api/csdn", csdnIndex.routes());
router.use("/api/user", userInfo.routes());
router.use("/api", common.routes());
module.exports = router;