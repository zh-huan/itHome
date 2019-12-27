const CryptoJS = require('crypto-js');
const {aeskey} = require('../../config/server.config.js');
const aesutil = module.exports = {};

/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.encryption = function (data, key, iv) {
    let aeskeys = this.getKeys(key, iv);
    if (typeof data === "object") {
        data = JSON.stringify(data);
    }
    var encrypted = CryptoJS.AES.encrypt(data, aeskeys.key, {
        iv: aeskeys.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.decryption = function (data, key, iv) {
    if (!data) {
        return "";
    }
    let aeskeys = this.getKeys(key, iv);
    // 解密
    var decrypted = CryptoJS.AES.decrypt(data, aeskeys.key, {
        iv: aeskeys.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var result = CryptoJS.enc.Utf8.stringify(decrypted);
    return result;
}
aesutil.getKeys = function (key, iv) {
    iv = iv || "";
    if (!key) {
        key = aeskey.key;
        iv = aeskey.iv || "";
    }
    return {
        key: CryptoJS.enc.Utf8.parse(key),
        iv: CryptoJS.enc.Utf8.parse(iv)
    }
}