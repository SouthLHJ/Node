const express = require("express");
const path = require("path")

const app = express();

//셋팅
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

//미들웨어

//post방식의 /x-www-form-urlencoded형태의 값을 parsting 해주는 미들웨어
app.use(express.urlencoded({extended:true}));
//express의 post방식의 /json형태 값을 parsing 해주는 미들웨어
app.use(express.json());

//라우팅

//////////////////////////////////////////////////////////////////
//=========== Fetch를 get로 받는 방법!!!!!!
app.get("/g",(req,res)=>{
    // res.render("ajax")
    res.render("send");
})

app.all("/api/dest",(req,res)=>{
    console.log("get /api/test", req.xhr);
    // res.send("<h2>okay</h2>")
    let obj = {
        "result" : "success",
        "count" : 27,
        colors : ["red","blue"]
    };

    let str = JSON.stringify(obj)
    console.log("JSON.stringify",str);
    //str 은 문자열이 되었다. .result는 없는 프로퍼티이므로 값이 안나온다.
    console.log(str.result)

    //다만 JSON으로 문자열이 된 str은 .parse를 통해 원복이 가능하다.
    let recover  = JSON.parse(str);
    // 원복된 recover는 객체가 되고, result가 프로퍼티가 있으므로 값이 나온다.
    console.log(recover.result);


    res.json(obj);
        //send()/render() 말고 .json()을 쓰면 객체 전송이 가능하다.  
            //: res가 가진 함수 .json()는 객체를 문자열로 전환해서 보낸다.
})

app.get("/api/check",(req,res)=>{
    //값 들어온게 5글자이하면 success true.
    let value = req.query.value;
    if(value.length<=5){
        res.json({"success" : true,})
    }else{
        res.json({"success" : false,})
    }
})

app.get("/api/add",(req,res)=>{
    let o = Number.parseInt(req.query.one);
    let o2 = Number.parseInt(req.query.other);
    console.log("number?",o,o2);
    let result = {
        "success" : true,
        "answer" : o+o2,
    }
    res.json(result);
})

/////////////////////////////////////////////////////////

//=========== Fetch를 post로 받는 방법!!!!!!
app.get("/p",(req,res)=>{
    res.render("postFetch");
})

app.post("/api/post",(req,res)=>{
    console.log("req.body", req.body);

    const result = {"success" : true};

    res.json(result);
})


app.listen(8080,_=>{
    console.log("server open")
})