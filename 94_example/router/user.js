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

router.use(async(req,res,next)=>{
    if(!req.session.loggedIn){
        return res.redirect("/account/signin");
    }else{
        user =  await accounts.findById(req.session.userid);
    }
    next();
})

//라우팅
router.get("/mypage",async(req,res)=>{
    let post = await accounts.findByIdArticle(req.session.userid);
    console.log(post)
    res.render("mypage",{
        user : user,
        post : post,
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
        //프로필 원래 사진 없애고
        if(user.image){
            let way = path.join(__dirname,"..","static",user.id,user.image);
            fs.unlink(way,()=>{
                console.log("삭제 완료")
            });
        }
        //프로필 사진 업로드
        let url = `/user/static/${user.id}/${req.file.filename}`
        accounts.updateUserImage(user.id,url).then(()=>{
            console.log("사진 업데이트완료")
        })

        accounts.updateById(user.id,{
            "id" : req.body.id,
            "pw" : req.body.pw,
            "email" : req.body.email,
            "name" : req.body.name,
            "contact" : req.body.contact,
            "birth" : req.body.birth,
            "log" : new Date()
        })

        accounts.findById(req.session.userid).then(obj=>{
            user = obj;
        }).finally(()=>{
            res.redirect("/user/mypage")
        })
    })


router.post("/articleDelete",async(req,res)=>{
    let artUniqeId = req.body.artUniqeId;
    let article = await accounts.findByIdArticle(user.id,artUniqeId);
    let attaches = article[0].attaches
    console.log(attaches, typeof attaches);
    //해당 아티클에 저장된 이미지들 삭제.
    attaches.forEach(img => {
        let way = path.join(__dirname,"..","static",user.id,"article") + `/${img.split("/")[5]}` 
        console.log(way);
        fs.unlink(way,()=>{
            console.log("삭제 완료")
        });
    });
    //해당 아티클 콜렉션에서 삭제
    
    accounts.deleteByIdArticle(artUniqeId).then((rst)=>{
        console.log(rst)
    }).finally(()=>{
        res.redirect("/user/mypage")
    })



})


module.exports = router;