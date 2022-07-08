/*
    이제까지는 URL 별로 다른 요청 처리와 요청이 들어올 때 
    같이 전송된 쿼리를 이용한 처리를 해보았다.

    이번에는 요청이 들어올 때 어떤 방식(매서드)로 들어왔냐에 따라 다른 처리를 해보려고한다.
*/
const http = require("http");
const ejs = require("ejs");
const path = require("path");
const url = require("url")
const querystring = require("querystring");//쿼리형 데이터를 처리해주는 모듈

http.createServer(async(req,res)=>{ //async 함수 사용! promise도 사용해도 되지만. await의 답변이 올때까지 기다렸다가 처리하도록 코드단순하게 하려고
    const pathname = url.parse(req.url).pathname;
    if(pathname === "/example"){
        let data = await ejs.renderFile(path.join(__dirname,`view${req.url}.ejs`));
        res.end(data);
    }else if(pathname === "/solution"){ //나중에 들어오는건 /solution?~~~이렇게 들어오기때문에 pathname을 뽑아내서 비교해야함!!
        if(req.method === "GET"){
            let query = url.parse(req.url, true).query; //true하면 객체로 바꿔서 저장해줌.
            console.log("get : ", query);
        }else if (req.method === "POST" ){
            let recv;
            req.on("data",(chunk)=>{
                console.log("post :" , chunk); // => 값이 버퍼로 객체로 들어온다.
                console.log("post :" + chunk); // + 해버리면 객체를 자연스럽게 string으로 바꿔서 출력해줘버림. (text이니까 가능한거)
                recv = chunk;
            }); // 백엔드에서 데이터를 읽어오고 그게 요청사항이면 실행시켜준다.
            //원래라면 toString() 해서 문자열로 바꿔줘야한다.
            req.on("end",()=>{ //위쪽 req.on에서 처리해도 상관 없는듯.
                console.log(recv.toString());//방법 1
                const query = querystring.parse(recv.toString()); //방법2 (쓰면 안좋다. 모듈 안써도 가능한 객체가 생김)
                console.log("q",query);
                const params = new url.URLSearchParams(recv.toString()); //방법3 
                console.log("params",params.get("rank")); //params.get("rank")

            })
        }
    }
    else{
        console.log(req.method);    //방금 발생한 요청이 어떤 매서드인지 알아낼 수 있다.
        //대표적으로 요청방식에 GET,POST가 있는데
        //GET 요청은 요청 바디(Stream X)를 사용하지 않는 요청 방식 (주소창에 요청사항을 다 적어야함. 다 표출됨 query) 
            //GET요청은 서버사이드에서 query를 분석하면 되는데
        //POST 요청은 바디를 사용하는 요청 방식(숨겨져서 요청사항이 적힌다.)
            //POST 요청은 query를 사용하지 않고 스트림으로 전달을 받기 때문에 그에 적절한 처리를 해줘야한다.
        // 백엔드에서 데이터를 읽어오고 그게 요청사항이면 실행시켜준다.
        res.statusCode =404;
        res.end("NOT FOUND");
    }
    res.end();//promise는 비동기화라 쓱 지나가서 res.end();해버리면 응답가기전에 끝나버리는데. async await하면 동기화되서 수순을 기다리기때문에 상관없다.
}).listen(8080,()=>{
    console.log("Start Server");
})