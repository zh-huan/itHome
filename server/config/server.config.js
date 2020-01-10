//加解密密钥向量
const aeskey = {
    key: "MDSESABMDSESABCC",
    iv: "MDSESABMDSESABCC"
}
//数据连接配置
const dbInfo = {
    host: "127.0.0.1",
    port: "27017",
    userName: "dtauser",
    password: "dtauser",
    dbName: "itHome"
}
//生成token的配置
const tokenConfig = {
    secret: "itHome-dev",
    expiresIn: "4h"
}
//通过ip获取地市的api接口
const addressApiLink = {
    url: "http://ip.taobao.com/service/getIpInfo.php"
}

module.exports = {
    aeskey,
    dbInfo,
    tokenConfig,
    addressApiLink
}