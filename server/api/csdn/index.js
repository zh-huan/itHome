const router = require("koa-router")();
const cheerioHelp = require("../base/cheerioHelp.js")
router.post("/index", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        if (params) {
            let config = ctx.config;
            let url = config[params.type]["index"][params.subType];
            var host=url.replace("https://","").replace("/","");
            var timespan=parseInt((new Date().getTime())/1000);
            let header={
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Content-Type': 'text/html; charset=utf-8',
                'Accept-Language':'zh-CN,zh;q=0.8',
                'Connection':'keep-alive',
                'Cookie':'uuid_tt_dd=10_19034404440-1542031117503-925779; dc_session_id=10_1542031117503.662143; _ga=GA1.2.1442838466.1542031121; acw_tc=2760820815673489690325844e9fbe62f93e258ccc41b61f3b564ac14d1542; c-login-auto=17; TY_SESSION_ID=7cd92076-ed2e-4fd4-8ba0-da87b8cd3018; dc_tos=pxi7q5; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1567354989,1567355643,1567355717,1567931550; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac='+timespan+'; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_19034404440-1542031117503-925779; c_adb=1',
                'Host':host,
                'Referer':'https://www.csdn.net/',
                'Upgrade-Insecure-Requests':'1',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0'
            }
            let $ = await cheerioHelp.getCheerio(url,header);
            let bolgIndex = getCsdnIndex($,ctx);
            ctx.body = result.setDatas(bolgIndex);
        } else {
            ctx.body = result.setWarn("没有参数");
            ctx.logger.console.warn("没有参数");
        }
    } catch (e) {
        ctx.body = result.setError(e.message);
        ctx.logger.error("获取CSDN首页数据失败：",e.message);
    }
});

function getCsdnIndex($,ctx) {
    let $postList = $("#feedlist_id");
    let $postItems = $postList.find("li");
    let postList = [];
    try{
        for (let index = 0; index < $postItems.length; index++) {
            let $item = $postItems.eq(index);
            if($item.hasClass("tip_box")||$item.find(".title").length==0){
                continue;
            }
            
            let postItem = {};
            let $title = $item.find(".title");
            let $h3 = $title.find("h2").find("a");
            postItem.url = $h3.attr("href");
            postItem.title = $h3.text();
            let $summary = $item.find(".summary");
            postItem.summary = $summary.text();
            let $user=$item.find(".list_userbar");
            let imgUrl = $user.find(".user_img").find("img").attr("src");
            postItem.img = imgUrl;
            postItem.author = $user.find(".name").find("a").text();
            postItem.authorUrl = $user.find(".name").find("a").attr("href");
            postItem.comment=$user.find(".common_num").find(".num").text();
            postItem.view=$user.find(".read_num").find(".num").text();
            postItem.commentUrl=postItem.url+"#commentBox";
            postItem.viewUrl=postItem.url;
            postItem.time = $user.find("time").text();
            postList.push(postItem);
        } 
    }
    catch(e){
        ctx.logger.error("CSDN首页数据解析错误",e.message);
    }
    return {
        postList
    }
}

module.exports = router