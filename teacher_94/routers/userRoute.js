const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const accountsDB = require("../datas/accounts");


const router = express.Router();

router.use((req, resp, next)=>{
    if(!req.session.auth) {
        return resp.redirect("/account/signin");
    }
    next();
});

router.get("/myinfo", (req, resp)=>{
    resp.render("user/myinfo", {user : req.session.user});
});
//=================================================================
// multer conifg
const profileuUpload = multer({
    storage : multer.diskStorage({
        destination : (req, file, callback)=>{
            const uploadPath = path.join(__dirname, "..", "static", "profile", req.session.user.id);
            if(!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename : (req, file, callback)=> {
            let newName = Date.now() + path.parse(file.originalname).ext;    
            // let newName = Date.now() + "." + file.originalname.split(".")[1];
            // let newName = "image_" + Date.now();
            callback(null, newName);
        }
    })
});

router.route("/profile")
    .get( (req, resp) =>{
        resp.render("user/profile", {user : req.session.user});
    })
    .post( profileuUpload.single("profile") , async (req, resp)=>{
        // console.log(req.file);
        const url =`/profile/${req.session.user.id}/${req.file.filename}`;
        let result = await accountsDB.updateUserImage(req.session.user.id, url);

        req.session.user = await accountsDB.getById(req.session.user.id);
        //
        resp.sendStatus(200);
    });







router.get("/exit", (req, resp)=>{
    req.session.auth = null;
    req.session.user = null;
    // req.session.destroy();
    resp.redirect("/account/signin");
});


module.exports = router;