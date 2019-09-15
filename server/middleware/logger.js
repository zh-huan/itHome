const log4js = require('log4js');
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];
const configure = require("../config/logConfig.js");
function access(ctx, message, commonInfo){
    const {
        method,  // 请求方法 get post或其他
        url,		  // 请求链接
        host,	  // 发送请求的客户端的host
        headers	  // 请求中的headers
      } = ctx.request;
      const client = {
        method,
        url,
        host,
        message,
        referer: headers['referer'],  // 请求的源地址
        userAgent: headers['user-agent']  // 客户端信息 设备及浏览器信息
      }
      return JSON.stringify(Object.assign(commonInfo, client));
    
}
module.exports = (options) => {
  const contextLogger = {}
  let {config,commonInfo}=configure(options);
  log4js.configure(config); 
 
  const logger = log4js.getLogger('cheese');
  
  return async (ctx, next) => {
  	 // 记录请求开始的时间
    const start = Date.now()
	 // 循环methods将所有方法挂载到ctx 上
    methods.forEach((method, i) => {
	   contextLogger[method] = (message) => {
	     logger[method](message)
	   }
    })
    ctx.logger = contextLogger;
 
    await next()
    // 记录完成的时间 作差 计算响应时间
    const responseTime = Date.now() - start;
    //logger.info(`${ctx.method} ${ctx.url}响应时间为${responseTime/1000}s`);
    logger.info(access(ctx, {
        responseTime: `响应时间为${responseTime/1000}s`
      }, commonInfo))
  }
}
