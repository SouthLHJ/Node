const express = require("express")

const study = express.Router();

study.get("/",(req,res)=>{
    req.session.count = (req.session.count ??0)+ 1;
    console.log(req.session);

    res.send(`Hello, ${req.session.nick}`)
})

study.get("/register",(req,res)=>{
    let nick = req.query.nick;
    req.session.nick = nick;
    res.sendStatus(200);
})


module.exports = study;