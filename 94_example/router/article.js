const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const accounts = require("../collection/accounts");

let user;
//셋팅

//미들웨어
    //post body
router.use(express.urlencoded({extended:true})); 
    //사진첨부
router.use("/static",express.static(path.join(__dirname,"..","static")))

router.use(async(req,res,next)=>{
    if(!req.session.loggedIn){
        return res.redirect("/account/signin");
    }else{
        user =  await accounts.findById(req.session.userid);
    }
    next();
});


//라우팅
    // /home
router.get("/home",async(req,res)=>{
    let post = await accounts.findAllArticle();
    res.render("home",{
        post : post
    })
})
    // /upload
//===미들웨어 (multer)
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        const uploadPath = path.join(__dirname,"..","static",user.id,"article");
        if(!fs.existsSync(uploadPath)){ 
            fs.mkdirSync(uploadPath,{recursive:true});  
        }
        callback(null,uploadPath);
    },

    filename : function(req,file,callback){
        let newName = "image_" + Date.now() + "attaches" + path.parse(file.originalname).ext ;
        // let newName = Date.now() + file.originalname.split(".")[1];
        callback(null,newName);
    }

})
const profileUpload = multer({storage: storage})
//===

router.post("/upload",profileUpload.array("attaches"),(req,res)=>{
    //첨부된 파일 url 로 벗기는 과정
    let attaches = [];
    if(req.files && req.files[0]){
        req.files.forEach(arr=>{
            let url = `/article/static/${user.id}/article/${arr.filename}`
                        // req.uploadbaseURL  + "/" + 을 사용하는 방법도 있다.
            attaches.push(url);
        })
    }
    
    //posting 과정
    let save = {
        "writerName" : user.name,
        "writerId" : user.id ,
        "writerImage" : user.image ,
        "post" : req.body.post,
        "public" : req.body.public,
        "attaches" : attaches,
        "comments" : [],
        "createdAt" : Date.now(),
    }
    accounts.insertArticle(save).then(()=>{
        res.redirect("/article/home")
    })
})

router.get("/view",async(req,res)=>{
    let post = await accounts.findByIdArticle(req.query.id,req.query.unique);
    console.log(post)
    res.render("view",{
        post : post,
    })
})







module.exports = router;