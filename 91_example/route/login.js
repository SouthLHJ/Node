
const express = require("express");

const login = express.Router();
//미들웨어
let saveNick = [];
!function(){
    saveNick.push("");
}();

//셋팅
login.set("view engine","ejs"); //render의 확장자 지정

login.set("views", path.join(__dirname,"view"));


//라우팅
login.get("/",(req,res,next)=>{
    res.location = "/login";
    next();
})


login.get("/login",(req,res,next)=>{
    res.status(200).render("login",{
        msg : "",
    })
})


login.get("/session",(req,res)=>{
    let query = req.query;
    if(saveNick.includes(req.session.nick)){
        res.status(200).render("login",{
            msg : "이미 사용중인 이름입니다.",
        })
    }else{
        saveNick.push(req.session.nick);
    }
})


module.exports = login;