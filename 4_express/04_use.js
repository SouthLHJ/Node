const express = require("express");

const app = express();

//미들웨어가 /products로 시작하는거에만 미들웨어가 작동한다.
app.use("/products",(req,res,next)=>{
    console.log("어플리케이션에 설정된 미들웨어")
    next();
})

//미들웨어를 실수로 .(get,post,put,delete..etc)으로 사용해버렸을 경우에.....
//실제 /delete에서 요청한게 씹혀버림.next()가 없으니까!
app.use("/product",(req,res)=>{
    // console.log("어플리케이션에 설정된 미들웨어")
    // next();
    res.send("<h2>/product Middleware</h2>");
})

app.get("/products",(req,res)=>{
    res.send("<h1>/products</h1>");
})

app.get("/product/delete",(req,res)=>{
    res.send("<h1>/delete</h1>");
})

app.get("/product/record",(req,res)=>{
    res.send("<h1>/record</h1>");
})

app.listen(8080)