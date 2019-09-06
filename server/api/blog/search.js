const cheerioHelp = require("../base/cheerioHelp.js")

async function getSearchDatas(searchUrls, key) {
    let searchList = [];
    // for(let url of searchUrls){
    //     url=url.replace("{searchSt}",key);
    //     url="https://zzk.cnblogs.com/s/blogpost?w=123";
    //     let $= await cheerioHelp.getCheerio(url);
    //     getDatas($,searchList)
    // }
    let url = "https://zzk.cnblogs.com/s/blogpost?w=123";
    let headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': '_ga=GA1.2.205635984.1567237357; __gads=ID=6bc0f119aaabe547:T=1567237357:S=ALNI_MbKJEwT0nvH0MQKUNkIAjLTPX_7yQ; DetectCookieSupport=OK; __utma=59123430.205635984.1567237357.1567760487.1567760487.1; __utmc=59123430; __utmz=59123430.1567760487.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); .AspNetCore.Session=CfDJ8BQYbW6Qx5RFuF4UTI7QvU3ZQHOWs2vPLrQ%2BRfDbGJAdBFhE6XKJViXl92IRD8JOsPrthtkk7kLWFExlU%2FBlID8UCWPKL1jqpMAE7SeDozVFkluPZST2VAEePPTRRkYwduee1A2Jgj%2F3f%2F7DDUMFHcKHe%2Bpps%2BrC1RJPYEATt8no; SBNoRobotCookie=CfDJ8BQYbW6Qx5RFuF4UTI7QvU2vDFaaa6d3cHDRM1cIgqECjZRWYCBbN3mjJR4110DbTrkGlQOum-7QMwLTQW70RPr_xRwHqs4ZmK3W9t9P5J2F5mRCUG8-y9Itp73kVRSoqQ; __utmb=59123430.3.10.1567760487',
        'referer': url,
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
    };
    let $ = await cheerioHelp.getCheerio(url,headers);
    getDatas($, searchList)
    return searchList;
}

function getDatas($, searchList) {
    if (!$("#searchResult")||!$("#searchResult").length) {
        return;
    }
    let $searchList = $("#searchResult").find(".searchItem");
    if (!$searchList.length) {
        return;
    }
    for (let $searchItem of $searchList) {
        let $title = $searchItem.find(".searchItemTitle");
        let title = $title.text();
        let url = $title.find("a").attr("src");
        let con = $searchItem.find(".searchCon").text();
        let $info = $searchItem.find(".searchItemInfo").eq(0);
        let author = $info.find(".searchItemInfo-userName").text();
        let authorUrl = $info.find(".searchItemInfo-userName").find("a").attr("src");
        let pushTime = $info.find(".searchItemInfo-publishDate").text();
        let good = $info.find(".searchItemInfo-good").replace(/推荐|\(|\)/g, "");
        let comments = $info.find(".searchItemInfo-comments").replace(/评论|\(|\)/g, "");
        let views = $info.find(".searchItemInfo-views").replace(/浏览|\(|\)/g, "");
        let searchItem = {
            title,
            url,
            con,
            author,
            authorUrl,
            pushTime,
            good,
            comments,
            views
        };
        searchList.push(searchItem);
    }
}

module.exports = getSearchDatas;