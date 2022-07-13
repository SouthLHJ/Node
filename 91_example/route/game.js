
const express = require("express");

const game = express.Router();

//미들웨어

//셋팅

//라우팅
game.get("/",(req,res,next)=>{
    console.log("game 진입완료");
    res.redirect = "/game/start";
})

game.get("/start",(req,res)=>{
    console.log("game 진입완료");
    console.log(req.session)
    
    if(req.session.nick === undefined){
        res.redirect("../account/login");
    }else{
        res.render("game",{
            currentUserSession : req.session.nick,
        })
    }
})




module.exports = game;