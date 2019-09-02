const Router=require("koa-router");
const index=require("./api/indexContent/indexContent");
const blogIndex=require("./api/blog/index");
const csdnIndex=require("./api/csdn/index");
const router = new Router();
router.use("/index",index.routes());
router.use("/blog",blogIndex.routes());
router.use("/csdn",csdnIndex.routes());
module.exports=router;