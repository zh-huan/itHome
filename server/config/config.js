 const config = {
     "types": [{
             name: "XXX",
             router: "xxx"
         },
         {
             name: "博客园",
             router: "blog"
         },
         {
             name: "CSDN",
             router: "csdn"
         }
     ],
     "subTypes": {
         "xxx": [{
                 name: "首页",
                 router: "index"
             },
             {
                 name: "博客",
                 router: "blog"
             },
         ],
         "blog": [{
                 name: "首页",
                 router: "index",
                 children: [{
                         name: ".Net技术",
                         router: "net"
                     },
                     {
                         name: "编程语言",
                         router: "lang"
                     },
                     {
                         name: "软件技术",
                         router: "soft"
                     },
                 ]
             },
             {
                 name: "精华",
                 router: "pick"
             },
             {
                 name: "候选",
                 router: "candidate"
             },
             {
                 name: "新闻",
                 router: "news"
             },
         ],
         "csdn": [{
                 name: "首页",
                 router: "index"
             },
             {
                 name: "博客",
                 router: "blog"
             },
         ],
     },
     "csdn": {
         index: {
             "index": "https://www.csdn.net/",
             "blog": "https://blog.csdn.net/",
         },
         search: ["https://so.csdn.net/so/search/s.do?q={searchSt}&t=blog&o=&s=&l="]
     },
     "blog": {
         index: {
             "index": "https://www.cnblogs.com/",
             "pick": "https://www.cnblogs.com/pick/",
             "candidate": "https://www.cnblogs.com/candidate/",
             "news": "https://www.cnblogs.com/news/",
             "net": "https://www.cnblogs.com/cate/108698/",
             "lang": "https://www.cnblogs.com/cate/2/",
             "soft": "https://www.cnblogs.com/cate/108701/"
         },
         search: [
             "https://zzk.cnblogs.com/s/news?w={searchSt}"
             //  "https://zzk.cnblogs.com/s/blogpost?w={searchSt}"
         ]

     }
 }
 module.exports = config;