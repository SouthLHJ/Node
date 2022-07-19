const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const accounts = require("../collection/accounts");
let user;
//미들웨어
router.use(express.urlencoded({"extended":true}));
router.use("/static",express.static(path.join(__dirname,"..","static")));

router.use((req,res,next)=>{
    if(!req.session.loggedIn){
        return res.redirect("/account/signin");
    }
    next();
})

//라우팅
router.get("/mypage",async(req,res)=>{
    user =  await accounts.findById(req.session.userid)
    res.render("mypage",{
        user : user,
    })
})

router.get("/exit",(req,res)=>{
    req.session.destroy(); // session에 있는 저장된 내용 모두 삭제.
    res.redirect("/account/signin");
})

    //===미들웨어 (multer)
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        const uploadPath = path.join(__dirname,"..","static",user.id);
        if(!fs.existsSync(uploadPath)){ 
            fs.mkdirSync(uploadPath,{recursive:true});  
        }
        callback(null,uploadPath);
    },

    filename : function(req,file,callback){
        let newName = "image_" + Date.now() + "profile" + path.parse(file.originalname).ext ;
        // let newName = Date.now() + file.originalname.split(".")[1];
        callback(null,newName);
    }

})
const profileUpload = multer({storage: storage})
    //===

router.route("/profile")
    .get((req,res)=>{
        res.render("profile",{
            user : user,
        })
    })
    .post(profileUpload.single("profile"),(req,res)=>{
        let url = `/user/static/${user.id}/${req.file.filename}`
        accounts.updateUserImage(user.id,url).then(()=>{
            console.log("사진 업데이트완료")
        })
        accounts.findById(req.session.userid).then(obj=>{
            user = obj;
        }).finally(()=>{
            res.redirect("/user/mypage")
        })
    })



module.exports = router;