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
module.exports={
    repalceKey
}