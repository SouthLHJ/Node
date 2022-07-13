
const express = require("express");

const game = express.Router();

game.get("/",(req,res,next)=>{
    res.location = "/start";
    next();
})

game.get("/start",(req,res)=>{
    if(!req.session.nick){
        res.redirect("../account");
    }else{

    }
})




module.exports = game;