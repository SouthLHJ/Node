/*
    응답 전송 시 res에 직접 writing을 하고 있지만, 이 상태로는 복잡한 HTML을 전송하기 힘듬
    그래서 pipe 혹은 readFile(fs module)를 사용해서  처리해보자.

    npx nodemon .파일경로.파일명
*/
const path = require("path");
const fs = require("fs");
const url = require("url");
const http = require("http");
//
http.createServer((req,res)=>{
    const pathname = url.parse(req.url).pathname;
    res.setHeader("content-type", "text/html; charset=utf-8"); 
    // if(pathname.startsWith("/static")){
    //     fs.createReadStream(path.join("..","HTML",pathname)).pipe(res);
    // }
    if(pathname.startsWith("/static")){
        fs.createReadStream(path.join("..","Javascript","game-avoid",pathname)).pipe(res);
    }
    if(pathname === "/" || pathname==="/index"){
        fs.promises.readFile(path.join(__dirname,"HTML","index.html"))
            .then(data =>{
                res.write(data);
            })
            .catch(err=>{
                res.write(err.message);
            })
    }else if(pathname === "/recipe"){
        fs.createReadStream(path.join("..","HTML","recipe.html")).pipe(res); //
    }else if(pathname === "/game"){
        
        fs.createReadStream(path.join("..","Javascript","game-avoid","game.html")).pipe(res);
    }   

    // res.end(); //응답을 다 보냈다. (종료어)

}).listen(8080, ()=>{
    console.log("Listen Start")
})