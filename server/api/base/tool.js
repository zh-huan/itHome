const http = require("http");
const ip = require("ip");
const iconv = require("iconv-lite");
const {
    addressApiLink
} = require("../../config/server.config.js");

function repalceKey(key, content) {
    let regWords = new RegExp(key, "gi");
    let words = content.match(regWords);
    if (!words)
        return content;
    words = [...new Set(words)]
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let regkey = new RegExp(word, "g");
        content = content.replace(regkey, "<em>" + word + "</em>");
    }
    return content;
}

function getAddress(req) {
    return new Promise(function (resolve, reject) {
        let clientip = req.ip; //req.ip;
        if (clientip) {
            http.get(addressApiLink.url + "?ip=" + clientip, function (res) {
                var chunks = [];
                res.on('data', function (chunk) {
                    chunks.push(chunk);
                });
                res.on('end', function () {
                    let decodedBody = iconv.decode(Buffer.concat(chunks), "utf-8");
                    let body = null;
                    if (decodedBody) {
                        body = JSON.parse(decodedBody)
                    }
                    resolve(body);
                });
            })
        } else {
            reject({});
        }
    });

}

module.exports = {
    repalceKey,
    getAddress
}