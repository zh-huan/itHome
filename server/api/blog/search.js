const cheerioHelp = require("../base/cheerioHelp.js")

async function getSearchDatas(searchUrls, key) {
    let searchList = [];
    for(let url of searchUrls){
        url=url.replace("{searchSt}",key);
       // let url = "https://zzk.cnblogs.com/s/blogpost?w=123";
        var timespan=parseInt((new Date().getTime())/1000);
        let headers = {
        //     ':authority': 'zzk.cnblogs.com',
        //     ':method': 'GET',
        //    ':path': '/s/blogpost?w=123',
        //    ':scheme': 'https',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cookie': '_ga=GA1.2.296309048.1567348825; __gads=ID=0256f028fb8c0fa1:T='+timespan+':S=ALNI_MYUVYJ4G9Yz2g2UFztPU3rx8rc2Ig; __utmc=59123430; __utmz=59123430.1567928608.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); .AspNetCore.Session=CfDJ8DeHXSeUWr9KtnvAGu7%2FdX8BgInITOuCjMgpwA%2BNZujiJ3%2Fq1mFoN05ZVAiR7FYkZizWKqqpQwVt%2BITC9WbOgouhcp6qChN6X7vRc%2BZSM9vOcClxwlEEY44GN%2BjMGufXnrk7CQEf3IbQnQAwUx%2B8euDEWQ2NBDQ2inWeyQfgUBsM; SBNoRobotCookie=CfDJ8DeHXSeUWr9KtnvAGu7_dX8sJY-evDBk_KlywYnB0EmGjEvQ6S7eNI8lGTNLlPsOzrUurARIKZGnaCPPEQpjatWNXh-PsToxqAlj9K_PamYqjt1TY9w1lmIXqGJsAZSU8A; DetectCookieSupport=OK; __utma=59123430.296309048.1567348825.1567931099.1567933929.3; __utmt=1; __utmb=59123430.1.10.1567933929',
            'referer': url,
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': 1,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
        };
        let $ = await cheerioHelp.getCheerio(url,headers);
        getDatas($, searchList,key)
    }
    
    return searchList;
}

function getDatas($, searchList,key) {
    if (!$("#searchResult")||!$("#searchResult").length) {
        return;
    }
    let $searchList = $("#searchResult").find(".searchItem");
    if (!$searchList.length) {
        return;
    }
    for (let i=0;i<  $searchList.length;i++) {
        let $searchItem=$searchList.eq(i);
        let $title = $searchItem.find(".searchItemTitle");
        let title = $title.text();
        title=repalceKey(key,title);
        let url = $title.find("a").attr("href");
        let con = $searchItem.find(".searchCon").text();
        con=repalceKey(key,con);
        let $info = $searchItem.find(".searchItemInfo").eq(0);
        let author = $info.find(".searchItemInfo-userName").text();
        let authorUrl = $info.find(".searchItemInfo-userName").find("a").attr("href");
        let pushTime = $info.find(".searchItemInfo-publishDate").text();
        let good = $info.find(".searchItemInfo-good").text().replace(/推荐|\(|\)/g, "");
        let comments = $info.find(".searchItemInfo-comments").text().replace(/评论|\(|\)/g, "");
        let views = $info.find(".searchItemInfo-views").text().replace(/浏览|\(|\)/g, "");
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
function repalceKey(key,content){
    let regWords=new RegExp(key,"gi");
    let words=content.match(regWords);
    if(!words)
       return content;
    words=[...new Set(words )]
    for(let i=0;i<words.length;i++){
        let word=words[i];
        let regkey=new RegExp(word,"g");
        content=content.replace(regkey,"<em>"+word+"</em>");
    }
    return content;
}

module.exports = getSearchDatas;