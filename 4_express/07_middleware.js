const express = require("express");
const app = express();

app.use((req,res,next)=>{
    req.time = Date.now();
    next();
});



app.all("/",(req,res)=>{
    console.log(req.time);
    res.send("<h3>오키도키</h3>");
});

/*
    이 상태로 해보고 /chain url 출력결과를 한 번 살펴보고 < step1~3
    step1    next() 주석 처리하고 결과를 한 번 살펴보고 < step1
    step1    next() 살리고 step2의 next() 주석 처리하고 결과를 한 번 살펴보고 < step1~2
    step1   next("route") 설정해서 살펴보고 < step1 step3 : "route"가 있을 경우 그다음 체인은 스킵한다.
*/
//동일한 url에 두 개 이상이 걸릴 때
app.get("/chain",(req,res,next)=>{
    console.log("/chain - step1");
    next("route");
},(req,res,next)=>{
    console.log("/chain - step2");
    next();
})

app.get("/chain",(req,res,next)=>{
    console.log("/chain - step3");
    res.status(200).send("okay");
})



app.listen(8080); 