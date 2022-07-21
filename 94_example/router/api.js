const express = require("express");
const path = require("path");

const router = express.Router();
const accounts = require("../collection/accounts");

let user;
//미들웨어 
    //AJAX 의 post로 받은 요청 처리 미들웨어
router.use(express.json());
router.use(async(req,res,next)=>{
    if(!req.session.loggedIn){
        return res.redirect("/account/signin");
    }else{
        user =  await accounts.findById(req.session.userid);
    }
    next();
});

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

router.post("/comment",async(req,res)=>{
    console.log("코멘트api 진입완료")
    let comment  = {
        cmtId : user.id,
        cmtName : user.name, 
        cmtImage : user.image,
        comment : req.body.comment, 
        createdAt : Date.now()
    };
    let postId = req.body.postId;
    let writerId = req.body.writerId;

    //먼저 post의 article에 저장된 코멘트 배열 추출하기.
    let comments = await accounts.findByIdArticle(writerId,postId).comments ?? [];
    console.log(comments);
    //뽑아온 배열에 새로운 코멘트 집어넣고
    comments.push(comment);
    //다시 코멘트s 저장하기
    let rst = await accounts.insertArticleComment(postId,comments);
    if(rst){
        res.json(comment);
    }
})



module.exports = router;