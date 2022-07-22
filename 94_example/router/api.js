const express = require("express");
const path = require("path");
const uuid = require("uuid");

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

// api insertComment
router.post("/comment",async(req,res)=>{
    console.log("코멘트api 진입완료")

    let postId = req.body.postId;
    // let writerId = req.body.writerId;
    // console.log(writerId,postId,"----")
    let comment  = {
        "cmt_id" : uuid.v4(),
        "cmtId" : user.id,
        "cmtName" : user.name, 
        "cmtImage" : user.image,
        "comment" : req.body.comment, 
        "createdAt" : Date.now()
    };
    /* insertArticleComment 가 $set일때는 요롷게 했다.
    //먼저 post의 article에 저장된 코멘트 배열 추출하기.
    // let article = await accounts.findByIdArticle(writerId,postId);
    // let comments = article[0].comments
    // //뽑아온 배열에 새로운 코멘트 집어넣고
    // comment._id = comments.length;
    // comments.push(comment);
    */
    //코멘트s 저장하기 : inserArticleComment가 $push이다.
    let rst = await accounts.insertArticleComment(postId,comment);
    if(rst){
        // console.log(rst)
        res.json(comment);
    }
})

//api deleteComment
router.post("/dltComment", (req,res)=>{
    let cmtIdx = req.body.cmtIdx;
    let postId = req.body.postId;

    console.log(cmtIdx,postId)
    // let writerId = req.body.writerId;

    /* 삭제 $pull 모를 때!
    let comments;
    accounts.findByIdArticle(writerId,postId)
    .then((article)=>{
        return article[0].comments;
    })
    .then((comment)=>{
        comments = comment.splice(cmtIdx,1);
    })
    // console.log(comments)
    .then(()=>{
        accounts.insertArticleComment(postId,comments)
        .then((rst)=>{
            if(rst.acknowledged = true){
                res.json({"success" : true});
            }else{
                res.json({"success" : false});
            }
        })
    })
    */

    accounts.deleteArticleComment(postId,cmtIdx)
    .then((rst)=>{
        // console.log(rst);
        if(rst.acknowledged = true){
            res.json({"success" : true,"cmtIdx" : cmtIdx});
        }else{
            res.json({"success" : false});
        }
    })
})



module.exports = router;