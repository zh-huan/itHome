const router = require("koa-router")();
const cheerioHelp = require("../base/cheerioHelp.js")
router.post("/index", async (ctx) => {
    let result = new ctx.Result();
    try {
        let params = ctx.request.body;
        if (params) {
            let config = ctx.config;
            let url = config[params.type]["index"][params.subType];
            if(params.pageIndex&&params.pageIndex>0){
                let pageIndex=params.pageIndex;
                url="https://www.cnblogs.com/sitehome/p/"+pageIndex;
            }
            let headers={
                'Accept':'*/*',
                'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
                'Accept-Language':'zh-CN,zh;q=0.8',
                'Connection':'keep-alive',
            }
            let $ = await cheerioHelp.getCheerio(url,headers);
            let bolgIndex = getBlogIndex($);
            ctx.body = result.setDatas(bolgIndex);
        } else {
            ctx.body = result.setWarn("没有参数");
        }
    } catch (e) {
        ctx.body = result.setError(e);
    }
});
function getBlogIndex($) {
    let $postList = $("#post_list");
    let $postItems = $postList.find(".post_item");
    let postList = [];
    for (let index = 0; index < $postItems.length; index++) {
        let $item = $postItems.eq(index);
        let postItem = {};
        let $body = $item.find(".post_item_body");
        let $h3 = $body.find("h3").find("a");
        postItem.url = $h3.attr("href");
        postItem.title = $h3.text();
        let $summary = $body.find(".post_item_summary");
        postItem.summary = $summary.text();
        let imgUrl = $summary.find("img").attr("src");
        //postItem.img = imgUrl && imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
        postItem.img = imgUrl;
        let $foot = $body.find(".post_item_foot");
        postItem.author = $foot.find(".lightblue").text();
        postItem.authorUrl = $foot.find(".lightblue").attr("src");
        postItem.comment=$foot.find(".article_comment").text().replace(/评论|\(|\)/g,"");
        postItem.view=$foot.find(".article_view").text().replace(/阅读|\(|\)/g,"");
        postItem.commentUrl=postItem.url+"#commentform";
        postItem.viewUrl=postItem.url;
        $foot.find(".lightblue").remove();
        $foot.find(".article_comment").remove();
        $foot.find(".article_view").remove();
        postItem.time = $foot.text().replace("发布于", "");
        
       // cheerioHelp.saveImage(imgUrl);
        postList.push(postItem);
    }
    let pager = {total: 0};
    let $pager = $("#pager_bottom");
    let $pagera = $pager.find("a");
    if ($pagera && $pagera.length) {
        let index = $pagera.length - 2;
        pager.total = $pagera.eq(index).text();
    }
    return {
        postList,
        pager
    }
}

module.exports = router