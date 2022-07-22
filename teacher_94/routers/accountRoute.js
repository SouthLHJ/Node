const express = require("express");
const router = express.Router();

const accountsDB = require("../datas/accounts");

router.route("/signup")
    .get((req, resp) => {
        resp.render("account/signup", {err : ""});
    })
    .post(async (req, resp) => {
        let got = await accountsDB.getById(req.body.id);
        if(got) {
            resp.render("account/signup", {err : "이미 사용 중인 아이디입니다."});
        } else { 
            const obj = {
                id : req.body.id, 
                pass : req.body.pass,
                name : req.body.name,
                contact : req.body.contact,
                birth : {
                    year : req.body.year,
                    month : req.body.month,
                    day : req.body.day,
                }
            };
            await accountsDB.add(obj);
            resp.redirect("/account/signin");
        }
    });

router.route("/signin")
    .get((req, resp) => {
        resp.render("account/signin");
    })
    .post(async (req, resp) => {
        let got = await accountsDB.getById(req.body.loginid);
        if(got && got.pass == req.body.loginpass) {
            req.session.auth = true;
            req.session.user = got;
            resp.redirect("/article/home")
        } else {
            resp.status(401).render("account/signinError");
        }
    });

module.exports = router;
