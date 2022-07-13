const express = require("express");
const app = express();

/*
    라우팅을 route 함수를 이용해서 해보려고 한다.
*/

//game이라는 url에 get,post를 따로 라우팅해보면?
/* 이렇게 풀어서 써도 되지만, route를 쓰면 같이 묶어 쓸 수 있다. 
app.get("/game",(req,res)=>{
})
app.post("/game",(req,res)=>{
})
*/
app.route("/game")
    .get((req,res)=>{
        res.send("GET /game")
    })
    .post((req,res)=>{
        res.send("POST /game")
    })


app.listen(8080,_=>{
    console.log("start")
})