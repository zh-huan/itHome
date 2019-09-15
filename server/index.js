const Koa =require("koa");
const app = new Koa();
const Config=require("./config/config.js");
const views = require("koa-views");
const router = require("./router");
const Result=require("./api/base/result.js");
const bodyparser=require("koa-bodyparser");
const history = require('./middleware/koa2-connect-history-api-fallback');
const static=require("koa-static");
const logger=require("./middleware/logger");
const ip=require("ip");
// 配置模版引擎中间件
// 适配vue history的中间件
app.use(history({
    verbose: true
}));


// 如果这样配置不修改html后缀g改成ejs
//app.use(views('views',{extension:'ejs'}));
//app.use(views('public',{map:{html:'ejs'}}));
app.use(static('../public'));
//app.use(static('./public'));
//app.use(static(__dirname + '../public'));

//爬取数据的url配置
app.context.config=Config;
//数据返回公用格式
app.context.Result=Result;

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {;
    await next();
});
//注册日志
app.use(logger({
    env: app.env,  // koa 提供的环境变量
    projectName: 'itHome',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }));
// router.get('/',async (ctx)=>{
//     await ctx.render('index',{});
// });

//接收post参数
app.use(bodyparser());
// 作用:启动路由
app.use(router.routes());
// 作用:这是官方文档的推荐用法,我们可以看到 router111.allowedMethords() 用在 router111.routes() 之后,
// 所有,在当所有的路由中间件最后使用.此时根据 ctx.status 设置 response 响应头
app.use(router.allowedMethods());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
