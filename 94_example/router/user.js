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

router.get("/exit",(req,res)=>{
    req.session.destroy(); // session에 있는 저장된 내용 모두 삭제.
    res.redirect("/account/signin");
})




module.exports = router;