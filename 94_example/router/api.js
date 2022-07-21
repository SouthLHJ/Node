const express = require("express");
const path = require("path");

const router = express.Router();
const accounts = require("../collection/accounts");

//api /idcheck
router.get("/idcheck",(req,res)=>{
    accounts.findAll().then(array=>{
        let rst = array.some((elm)=>{ //id값이 하나라도 겹치는게 있는지 확인
            return elm.id == req.query.id;
        });
        console.log(rst)
        let result = {
            "msg" : rst==false ? "사용 가능한 아이디입니다.": "이미 사용 중인 아이디입니다." ,
            "success" : rst==false ? true:false
        }
        return result
    }).then((result)=>{
        res.json(result);
    });

})





module.exports = router;