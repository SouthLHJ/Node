const http = require("http");
const url = require("url");

/*
    사용자가 요청한 URL에 따라 다른 HTML 응답을 보내개 설계
    url이 /, /index 인 경우에는 WELCOME. 이정도 표현
    /learn 이면.. ul 태그로 아무거나 만들고

    그 외면 없는 서비스다.
*/


const server = http.createServer((req,res)=>{
    let userUrl = url.parse(req.url);

    res.setHeader("content-type", "text/html; charset=utf-8"); //text/html!!!!!!!해야지 <h1></h1>가능

    if(userUrl.pathname == "/" || userUrl.pathname == "/index"){
        res.write(`<h1>환영합니다.</h1>`);
    }else if (userUrl.pathname == "/learn"){
        res.write("<h1>없는 서비스입니다.</h1>")
        res.write("<ul>");
        ["a","b","c"].forEach(elm => res.write(`<li>${elm}</li>`));
        res.write("</ul>");
    }
    res.end();
}).listen(8080,()=>{
    console.log("Server Start")
});