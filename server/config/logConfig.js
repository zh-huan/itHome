function loginConfig(options){
    let  { env, appLogLevel, dir, serverIp, projectName } =options;
    const appenders = {}
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    }
    //环境变量为dev local development 认为是开发环境
    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }
    let commonInfo={ projectName, serverIp }

    return {
        config,
        commonInfo
    };
}

module.exports = loginConfig;
  