const router = require("koa-router")();
const cheerioHelp = require("../base/cheerioHelp.js")
router.post("/index", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        if (params) {
            let config = ctx.config;
            let url = config[params.type]["index"][params.subType];
            let $ = await cheerioHelp.getCheerio(url);
            let bolgIndex = getCsdnIndex($);
            ctx.body = result.setDatas(bolgIndex);
        } else {
            ctx.body = result.setWarn("没有参数");
        }
    } catch (e) {
        ctx.body = result.setError(e);
    }
});

function getCsdnIndex($) {
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
        console.log(e);
    }
    return {
        postList
    }
}

module.exports = router