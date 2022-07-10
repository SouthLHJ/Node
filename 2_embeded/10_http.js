const http = require("http");
const url = require("url");

/*
    URL 설계하는 방법
    - Legacy

    - Rest
*/

!function(){
    let data1 = "https://comic.naver.com/webtoon/list?titleId=748105&weekday=thu"
    let data2 = "https://comic.naver.com/webtoon/list?titleId=796218&weekday=wed" 
    console.log(url.parse(data1))
    console.table(url.parse(data2))
}();


const server = http.createServer((req,res)=>{
    //createServer 하면서 설정하는  콜백은 on "request"로 등록됨.
    /* 
        URL     : 서비스의 주소 / article
        METHOD  : 서비스를 받고자하는 목적 -> 웹용 서버 구축할 때 GET, POST 방식만 이용
    */
    
    console.log("Server Request Occured")
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.write(`path는 ${url.parse(req.url).pathname}`);
    res.write(`path로 요청하며 보낸 query는 ${url.parse(req.url).query}`)
    console.log(req.url, req.method); // <GET : 사용자가 요청한거. 검색: 192.168.4.35:8080/message/search
                                    // 사용자가 서버 측에 요청한 path와 query를 분리
    res.end();
}).listen(8081,()=>{
    console.log("Server Start")
});                            // .on은 리턴 값이 this가 나오므로 체이닝이 가능해서 .listen을 할 수 있다.


// server.on("request", (req,res)=>{

// }).listen(8080) // .on은 리턴 값이 this가 나오므로 체이닝이 가능해서 .listen을 할 수 있다.