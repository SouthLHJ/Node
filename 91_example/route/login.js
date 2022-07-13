
const express = require("express");

const login = express.Router();

let saveNick = [];
!function(){
    saveNick.push("");
}();

//미들웨어

//셋팅

//라우팅

login.get("/login",(req,res,next)=>{
    console.log("login 진입완료")
    res.status(200).render("login",{
        msg : "",
    })
})
login.get("/session",(req,res)=>{
    console.log("session 진입완료")
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
            res.redirect("../game/start");
        }
    }
})


module.exports = login;

/*
let query = req.query;
    req.session.nick ?? "" ; 
    if(!req.session.nick){
        req.session.nick = query.name;
        saveNick.push(query.name);
        res.redirect("../game/start");
    }else{
        if(saveNick.includes()){
            res.status(200).render("login",{
                msg : "이미 사용중인 이름입니다.",
            })
        }else{
            saveNick.push(query.name);
            res.redirect("../game/start");
        }
    }
*/