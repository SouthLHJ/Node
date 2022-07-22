const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const articles = require("../datas/articles");

const router = express.Router();

router.use((req, resp, next) => {
    if (!req.session.auth) {
        return resp.redirect("/account/signin");
    }
    next();
});

router.get("/home", async (req, resp) => {
    // let items = await articles.getAll();
    // items = items ?? [];

    // items = items.filter(elm => {
    //     if (elm.writerId == req.session.user.id) {
    //         return true;
    //     } else if (elm.writeId !== req.session.user.id && elm.type === "public") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    let items = await articles.getVisibleSome(req.session.user.id);
    
    resp.render("article/home", { items , user : req.session.user });
});


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const base = new Date().toISOString().slice(0, 10);
            const uploadPath = path.join(__dirname, "..", "static", "article", base);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            req.uploadbaseURL = "/article/" + base;
            callback(null, uploadPath);
        }
    })
});

router.post("/upload", upload.array("attach"), async (req, resp) => {
    const attaches = [];
    if (req.files && req.files[0]) {
        req.files.forEach((elm) => {
            attaches.push(req.uploadbaseURL + "/" + elm.filename);
        });
    } 
    const item = {
        writerId: req.session.user.id,
        writerName: req.session.user.name,
        writerImage: req.session.user.image,
        type: req.body.type ?? "public",
        message: req.body.message,
        createdAt: new Date(),
        attaches: attaches,      // 이건 수정 필요
        comments: []
    };
    let result = await articles.add(item);
    console.log(result);
    resp.redirect("/article/home");
});

router.get("/view", async (req, resp) => {
    let found = await articles.getById(req.query.articleId);
    console.log(found);
    resp.render( "article/view" , { elm : found}); 
})


router.post("/addComment", async (req, resp) => {
    let targetId = req.body.targetId;   // 원글의 아이디값
    let id = uuid.v4().split("-")[0];
    let comment = {
        _id : id, 
        commenterId : req.session.user.id,
        commenterName : req.session.user.name,
        commenterImage : req.session.user.image,
        message : req.body.message,
        createdAt : new Date()
    }; 
    
    let result = await articles.addComment(targetId, comment);
    resp.redirect("/article/view?articleId="+targetId);
})






module.exports = router;