
const express = require("express");

const login = express.Router();

let saveNick = [];
!function(){
    saveNick.push("");
}();

//미들웨어

//셋팅

//라우팅
login.get("/",(req,res,next)=>{
    // console.log("/ 진입완료");
    
    res.redirect("/account/login");
})


login.get("/login",(req,res,next)=>{
    // console.log("login 진입완료")
    //++ req.baseUrl < /account, req.path < /login , req.originalUrl < /account/login
    res.status(200).render("login",{
        msg : "",
    })
})
login.get("/session",(req,res)=>{
    // console.log("session 진입완료")
    let query = req.query??"";
    if(query === ""){
        res.redirect("/account/login");
    }else{
        if(saveNick.includes(query.name)){
            res.status(200).render("login",{
                msg : "이미 사용중인 이름입니다.",
            })
        }else{
            req.session.nick = query.name;
            saveNick.push(query.name);
            res.redirect("/game/start"); //../game/start 안해도된다. 
        }
    }
})


module.exports = login;