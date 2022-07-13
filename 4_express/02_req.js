const express = require("express");
const path = require("path")

const app = express();

//Post의 사용자 요청을 req.body을 하고 싶을땐 미들웨어에서 기능 활성화 해야한다.
app.use(express.urlencoded({"extended":true}));
    //ㄴ app.use(express.urlencoded()); 요래 해도 추천방법이 뜨긴하지만 작동은 한다.

app.get("/req/1",(req,res)=>{
    // console.log(req);

    // 요청자의 ip 값을 추출 
    console.log(req.ip); //<::ffff:~~~~ 인것은 IPv4 의 값. IPv6 는 안나온다.

    //url.parse(req.url,true).query랑 같은 결과가 나온다. (객체로)
    //query name의 value가 한 개일 경우 string, 두 개일 경우 배열로 나온다.     
    console.log(req.query);
    
    //express에서 req.cookies 사용할려면 npm cookie-parser 설치필요.(외부 미들웨어가 필요함.)
    console.log(req.cookies);

    //사용된 요청 방법 형식 알기 : < GET / POST
    console.log(req.method);


    res.sendFile(path.join(__dirname,"view","form.html")); //이거를 통해서 아래꺼 /req/2 작동하게 할꺼임

});

//POST 방식에서 요청값을 .body(변수)라는 곳에 저장해주는 기능 (객체{name : "value"}로)
//createServer -> req.on("data",()=>{~~~~~}); req.on("end",()=>{}) 과 같은 기능
app.post("/req/2",(req,res)=>{
    console.log("post",req.body);
    res.send("오케이"+req.body.visitor+"님 쌩큐");
});
//참고. GET 방식에서는 안되고. GET은 req.query를 써야한다.
app.get("/req/2",(req,res)=>{
    console.log("get <- body",req.body);
    console.log("get <- query",req.query);
    res.send("오케이");
});


app.listen(8080);