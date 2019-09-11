const cheerioHelp = require("../base/cheerioHelp.js")
const tool = require("../base/tool.js")
async function getSearchDatas(searchUrls, key) {
    let searchList = [];
    for(let url of searchUrls){
        url=url.replace("{searchSt}",key);
        var timespan=parseInt((new Date().getTime())/1000);

        let headers={
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Cookie':'TY_SESSION_ID=ad37218b-d0e8-4c92-98f6-56faeea1eb11; JSESSIONID=F1519A83D3DFE514B622814CDAE04297; uuid_tt_dd=10_19034404440-1542031117503-925779; dc_session_id=10_1542031117503.662143; _ga=GA1.2.1442838466.1542031121; acw_tc=2760825f15679344175893661ef2765b541370f91eeddf95b0a8d456c44939; c-login-auto=21; c_adb=1; dc_tos=pxo6dc; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1567932749,1567956165,1567958019,1568209723; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac='+timespan+'; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_19034404440-1542031117503-925779',
            'Host':'so.csdn.net',
            'Referer':'https://www.csdn.net/',
            'Upgrade-Insecure-Requests':1,
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0'
        }
        let $ = await cheerioHelp.getCheerio(url,headers);
        getDatas($, searchList,key)
    }
    return searchList;
}

function getDatas($, searchList,key) {
    if (!$(".search-list-con")||!$(".search-list-con").length) {
        return;
    }
    let $searchList = $(".search-list-con").find(".search-list");
    if (!$searchList.length) {
        return;
    }
    for (let i=0;i<  $searchList.length;i++) {
        let $searchItem=$searchList.eq(i);
        let $title = $searchItem.find(".limit_width");
        let title = $title.text();
        title=tool.repalceKey(key,title);
        let url = $title.find("a").eq(0).attr("href");
        let con = $searchItem.find(".search-detail").text();
        con=tool.repalceKey(key,con);
        let $info = $searchItem.find(".author-time");
        let $author=$info.find(".author");
        let author="",authorUrl="";
        if($author.length){
            author = $author.text();
            authorUrl = $author.find("a").attr("href");
        }
        let pushTime = $info.find(".date").text();
        pushTime&&(pushTime.replace("日期：",""));
        let good = "";
        let comments = "";
        let views = $info.find(".down fr").text().replace(/次阅读/g, "");
        let searchItem = {
            title,
            url,
            con,
            author,
            authorUrl,
            pushTime,
            good,
            comments,
            views,
            type:"CSDN"
        };
        searchList.push(searchItem);
    }
}


module.exports = getSearchDatas;