const express = require("express");

const router = express.Router();

const accounts = require("../collection/accounts");
//미들웨어
router.use(express.urlencoded({"extended":true}));

router.use((req,res,next)=>{
    if(!req.session.loggedIn){
        return res.redirect("/account/signin");
    }
    next();
})

//라우팅
router.get("/mypage",(req,res)=>{
    res.render("mypage",{
        name : req.session.name,
    })
})




module.exports = router;