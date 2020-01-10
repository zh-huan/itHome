/***
 * 验证token中间件
 */

const jwt = require('jsonwebtoken');
const {
    tokenConfig
} = require("../config/server.config.js")
async function verifyToken(ctx, next) {
    let result = new ctx.Result();
    //传递的参数是否有token参数
    const token = ctx.request.body.token;
    try {
        if (token) {
            let playload = await jwt.verify(token, tokenConfig.secret);
            let exp = playload.exp;
            let now = (new Date().getTime());
            if (exp * 1000 <= now) { //超时
                result.setWarn("登录超时，请重新登录");
                ctx.status = 200;
                ctx.body = result;
            } else {
                ctx.status = 200 //这里非常重要，只有设置了status，koa-router才识别请求正确继续进入路由
                await next();
            }
        } else {
            result.setWarn("还未登录");
            ctx.status = 200;
            ctx.body = result;
        }
    } catch (error) {
        result.setError(error);
        ctx.status = 200
        ctx.body = result;
    }
}
module.exports = {
    verifyToken
}