const ejs = require("ejs");
const path = require("path");
const url = require("url");
const http = require("http");
const fs = require("fs");

const movies = [
    {id : "mv01", name : "토르 - 러브 앤 썬더", img :"/static/thor.jpg"},
    {id : "mv02", name : "탑건 메버릭", img :"/static/topgun.jpg"},
    {id : "mv03", name : "헤어질 결심", img :"/static/bye.jpg"},
    {id : "mv04", name : "범죄도시2", img :"/static/crimecity2.jpg"},

]
/*
    list.ejs 랜더링 할 때 이 배열을 넘겨주고 난 후
토르 - 러브 앤 썬더

    for(let i = 0; i<movies.length; i++){
        <laber><%= movies[i].name %></label>
        <a href = "/seat?code=<%=movies[i].name%>">
            <img src = "<%=movies[i].img%>">
    }
*/
http.createServer((req,res)=>{
    res.setHeader("content-type", "text/html; charset=utf-8"); 
    const pathname = url.parse(req.url).pathname;
    const query = url.parse(req.url,true).query;
    if(pathname.startsWith("/static")){ 
        fs.createReadStream(path.join(__dirname,pathname)).pipe(res);
    }
    if(pathname === "/list"){
        ejs.renderFile(path.join(__dirname,"ejs","list.ejs"),{
            movie : movies,
        }).then(data =>{
            res.writeHead(200, { // 상태코드 설정하는거
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    }else if (pathname === "/seat"){
        console.log(pathname)
        console.log(query)
        ejs.renderFile(path.join(__dirname,"ejs","seat.ejs"),{
            movie : movies.filter((elm)=>{
                if(elm.id === query.code){
                    return true;
                }
            }),
        }).then(data =>{
            res.writeHead(200, { // 상태코드 설정하는거
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    }else if (pathname === "/reserve"){
        let movie;
        let seat = [];
        let userID;
        req.on("data", (data)=>{
            params = new url.URLSearchParams(data.toString());
            movie = params.get("code");
            seat = params.getAll("seat");
            userID = params.get("userID");
            console.log (params, movie, seat, userID)
            ejs.renderFile(path.join(__dirname,"ejs","reserve.ejs"),{
                movie : movies.filter((elm)=>{
                    if(elm.id === movie){
                        return true;
                    }
                }),
                rsvSeat : seat,
                userid : userID,
            }).then(data =>{
                res.writeHead(200, {
                    "content-type" : "text-html,charset=utf-8"
                    
                })
                res.end(data);
            })
        })
    }

}).listen(8080,()=>{
    console.log("Start Server");
})