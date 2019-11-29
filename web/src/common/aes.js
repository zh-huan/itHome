import CryptoJS from 'crypto-js';
import aeskey from './aeskey.js';
const aes = {};
/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @param iv 向量
 * @returns {string}
 */
aes.encryption = function (data, key, iv) {
    let aeskeys = getKeys(key, iv);
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
aes.decryption = function (data, key, iv) {
    if (!data) {
        return "";
    }
    let aeskeys = getKeys(key, iv);
    // 解密
    var decrypted = CryptoJS.AES.decrypt(data, aeskeys.key, {
        iv: aeskeys.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
}
function getKeys(key, iv) {
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

export default aes;