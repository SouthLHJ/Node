//route 기본 개념

const express = require("express");

const app = express();

function filter(req,res,next){
    console.log(`filtering at ${req.path}`);
    next();
}

//함수 호출이 가능하다.
app.get("/gets",filter,(req,res)=>{
    res.send("/gets에서 요청한거 잘 받음.")
})

//미들웨어가 중간에 껴있는다음에 콜백을 호출해도 정상동작한다.
//중간에 filter를 껴놓을 때는 console.log("middleware")가 filter 함수 호출 끝난다음에 작동한다. 그다음 콜백함수 작동한다.
//[함수1,함수2,...,함수n]이렇게 묶어서 app.get("",[함수~~]) 이렇게 호출도 가능하다. (일일히 호출해도된다.)
app.get("/get",(req,res,next)=>{
    console.log("middleware");
    next
},(req,res)=>{
    res.send("요청 정상적으로 받았음. 앞에 미들웨어 끼어있음.")
})

app.all("/all", (req,res)=>{
    res.send("모든 요청방식(매서드) GET...POST...를 처리함.")
})


app.listen(8080,()=>{
    console.log("Express Start")
})