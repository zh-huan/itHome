const mongodb=require("./mongodb/mongodbHelper.js")
function getDbHelper(){
    let dbAdpter=null;
    dbAdpter=new mongodb();
    return dbAdpter;
}
module.exports=getDbHelper