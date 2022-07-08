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
    if(pathname.startsWith("/static")){ //이미지를 src=으로 선언해준 파일은 자동으로 불러올 수가 없다. 그래서 이미지를 불러오기위해
                                //들어온 url에서 pathname을 통해 /static 폴더에 넣어둔 이미지를 자동으로 불러올 수 있게 한다.
                                //이러한 src를 통해서 선언된것들은 static 폴더에 넣어두고 하는게 룰이다.
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