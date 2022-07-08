const ejs = require("ejs");
const path = require("path");
const url = require("url");
const http = require("http");



http.createServer(async(req,res)=>{
    const pathname = url.parse(req.url,true).pathname;   
    
    if(pathname === "/output"){
        let data = await ejs.renderFile(path.join(__dirname,`view${req.url}.ejs`));
        res.end(data);
    }
    else if(pathname === "/input"){
        res.writeHead(302,{
            location : "/output"
        });
        return res.end();
    }
    else if(pathname === "/inputHidden"){
        let inUser; 
        let inUsed;
        req.on("data", (data)=>{
            params = new url.URLSearchParams(data.toString());
            inUser = params.get("user");
            inUsed = params.get("used");
            ejs.renderFile(path.join(__dirname,"view","fee.ejs"),{
                user : inUser,
                used : inUsed,
                fee  : calcPrice(inUsed),
                what : `${typeof(this.used)}`,
            }).then(data =>{
                res.writeHead(200, {
                    "content-type" : "text-html,charset=utf-8"
                    
                })
                res.end(data);
            })
        })
    }
    else{
        ejs.renderFile(path.join(__dirname,"view","404.ejs"),{
            
        }).then(data =>{
            // res.statusCode = 404;
            // res.setHeader("content-type", "text-html,charset=utf-8")
            res.writeHead(404,{
                "content-type" : "text/html;charset=utf-8"
            })
            res.end(data);
        })
        
    }
}).listen(8080, _ =>{
    console.log("Start");
})
//함수 정리
function calcPrice(time){
    let fee = 0;
    let extra = time;
    fee += 1000;
    extra -= 30;
    if(extra >0){
        while(extra >0){
            fee += 400;
            extra -= 10;
            
        }
        
    }
    return fee;
}
