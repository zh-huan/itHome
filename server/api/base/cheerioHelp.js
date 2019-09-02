const cheerio = require("cheerio")
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const httpType = {
    http,
    https
}

function getCheerio(url, charset = "utf-8") {
    let type = url.substring(0,url.indexOf(":"));
    return new Promise(function (resolve, reject) {
        let httpT=httpType[type];
        if(!httpT)
            httpT=httpType["https"];
        httpT.get(url, function (res) {
            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                var decodedBody = iconv.decode(Buffer.concat(chunks), charset);
                let $ = cheerio.load(decodedBody);
                resolve($);
            });
        });
    })
}

function saveImage(url) {
    if (!url)
        return;
    let type = url.substring(0,url.indexOf(":"));
    let name = url.substring(url.lastIndexOf("/") + 1);
    url = url.replace("url(", "").replace(")", "");
    let file = '../public/img/' + name;
    try {
        let httpT=httpType[type];
        if(!httpT)
            httpT=httpType["https"];
        httpT.get(url, function (res) {
            var imgData = "";
            res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
            res.on("data", function (chunk) {
                imgData += chunk;
            });
            res.on("end", function () {
                fs.writeFile(file, imgData, "binary", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                    }
                });
            });
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    getCheerio,
    saveImage
};