/*
    서버 프로그램 - 네트워크를 이용해서 원격 작동하는 프로그램
    원격지에 있는 사용자들을 대상으로 동하는 프로그램
    서버 프로그램을 사용하기 위해서 사용자들에게 클라이언트 프로그램을 제공해야되는 경우가 있다.

    http를 이용한 웹 서버를 만들 떄는 별도의 클라이언트 프로그램을 개발할 필요가 없다.
    (http : hyper text transfer protocol)
    http는 HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜입니다.
    HTTP는 웹에서 이루어지는 모든 데이터 교환 프로토콜이기도 합니다.
    클라이언트-서버 프로토콜이란 수신자 측에 의해 요청이 초기화 되는 프로토콜을 의미합니다.
*/

const http = require("http");
// console.log(http)

const server = http.createServer();// 접속을 받을 수 있는 공간을 만들어냄.

//포트
server.listen(8080,()=>{ // listen을 통해서 접속할 수 있는 경로를 열어준다. 포트 : 0~65535 (실제 80은 서버가 열릴때 사용하는 포트다.)
    console.time("run ");            //(1024아래쪽은 시스템적으로 사용하는 포트일 수 있어서 안건드는게 좋다.)(50000~ 안쓰는게 좋다.)
    console.log("SERVER start");
});

server.on("connect", ()=>{
    console.log("SERVER Connect EVT!");
})

let rst = server.on("request", (req,res)=>{
    console.log("SERVER Request EVT!");
    console.count("SERVER Request")
})
console.log(rst === server); // .on(function())의 리턴 값은 그 자체(this)가 돌아온다.
                            // 이벤트 등록을 chaining 할 수 있다. 

server.on("close", ()=>{
    console.log("SERVER Termianted");
    console.timeEnd("run ");
})