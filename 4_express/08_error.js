/*
    에러 처리 미들웨어
*/
const express = require("express");
const app = express();
//돈 입력하면 얼마 환전됩니다 출력하는거  1,304.00 = 1$
app.get("/exchange",(req,res)=>{
    let won = req.query.won.toFixed(0); //err : query는 string 또는 배열로 들어와서 toFixed를 못쓴다.
    let dollar = (won/1304);
    res.send(`${won}으로 환전되는 달러는${dollar}$ 입니다.`);
})


//404 Not Found 를 처리하고 싶으면 맨 마지막에 미들웨어로 
app.use((req,res,next)=>{
    console.log("Not Found");
    res.send("당신이 요청하신 경로는 없는 경로입니다.");
})

//에러 처리용(로직적으로 문제가 발생한 오류만.) 미들웨어 매개변수 4개 - 맨 밑에 작성할 것.
//라우트 핸들러 작업 중에 발생하는 에러들을 처리함.
//404(없는 url)을 하는 것 자체는 에러가 아니기에 여기서 처리가 안된다.
app.use((error,req,res,next)=>{
    res.send("<h2>서버 측의 작업 오류로 당신의 요청을 처리하지 못했습니다.</h2>");
    console.log(error);
    console.log(error.message);
})





app.listen(8080); 