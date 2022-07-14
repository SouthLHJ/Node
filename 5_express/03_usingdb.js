const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb"); //{~~} = 분해할당?
    // ㄴ const MongoClient = require("mongodb").MongoClient;
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority"


const app = express();

//셋팅
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

//라우팅
app.get("/insert",async(req,res)=>{
    const one = {
        name : req.query.name,
        age : Number.parseInt(req.query.age),
        gender : !(!(req.query.gender)),
    };
    
    const client = new MongoClient(urm);
    const students = client.db("study").collection("students");

    let result = await students.insertOne(one);//비동기 처리를 async를 이용해서 동기화해버림
    if(result.acknowledged){
        res.send("데이터가 정상적으로 추가되었습니다.");
    }else{
        res.send("데이터가 등록 중 문제가 발생하였습니다.(code : -32)");
    }
    client.close();


});

app.get("/list",async(req,res)=>{

    let filter= {};
    if(req.query.name){
        filter.name = req.query.name;
    }

    const client = new MongoClient(urm);
    const students = client.db("study").collection("students");

    const array = await students.find(filter).toArray();
    
    res.render("list",{array});
    client.close();
});

app.listen(8080)