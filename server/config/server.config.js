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
const tokenConfig={
    secret:"itHome-dev",
    expiresIn:"1h"
}

module.exports = {
    aeskey,
    dbInfo,
    tokenConfig

}