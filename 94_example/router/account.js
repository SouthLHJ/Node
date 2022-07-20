const express = require("express");

const router = express.Router();

const accounts = require("../collection/accounts");
//미들웨어
router.use(express.urlencoded({"extended":true}));

//라우팅
    //변수
    //회원가입
router.route("/signup")
    .get((req,res)=>{
        res.render("signup",{
            msg : "",
            idmsg : "",
        })
    })
    .post((req,res)=>{
        accounts.findAll().then(array=>{
            let rst = array.some((elm)=>{ //id값이 하나라도 겹치는게 있는지 확인
                elm.id == req.body.id;
            });
            if(rst){ //true => 겹침.
                res.render("signup",{
                    msg : "",
                    idmsg : "이미 사용 중인 아이디입니다."
                })
            }
        });

        let submitchk = (req.body.id !== undefined && req.body.pw !== undefined && req.body.name !== undefined
                     && req.body.email !== undefined && req.body.contact !== undefined&& req.body.birth !== undefined);
        if(!submitchk){
            res.render("signup",{
                msg : "모두 작성해주시길 바랍니다.",
                idmsg : undefined
            })
        }else{
            let save = {
                id : req.body.id,
                pw : req.body.pw,
                email : req.body.email,
                name : req.body.name,
                contact : req.body.contact,
                birth : req.body.birth,
                log : new Date()
            }
            accounts.insertOne(save).then(rst =>{
                console.log(rst)
            }).finally(()=>{
                res.redirect("/account/signin")
            })
        }
    })

/* router.post("/session",(req,res)=>{
    accounts.findAll().then(array=>{
        let rst = array.some((elm)=>{ //id값이 하나라도 겹치는게 있는지 확인
            elm.id == req.body.id;
        });
        if(rst){ //true => 겹침.
            res.render("signup",{
                msg : "",
                idmsg : "이미 사용 중인 아이디입니다."
            })
        }else{
            chkid = true;
            res.send(`<input type="hidden" name="${chkid}"/>`)
            res.render("signup",{
                msg : "",
                idmsg : "사용가능한 아이디입니다."
            })
        }
    });
 }) */

    //로그인
router.route("/signin")
    .get((req,res)=>{
        res.render("signin",{
            msg : "",
        })
    })
    .post((req,res)=>{
        accounts.findById(req.body.id).then(elm=>{
            //id체크
            if(elm == undefined){ // 찾아봤는데 elm이 없을경우.
                res.status(401).render("signin",{
                    msg : "사용하고 있지않은 아이디입니다.",
                })
            }else{
                //해당id랑 pw가 동일한 _id에있는지 체크
                let rstpw = elm.pw == req.body.pw;
                if(rstpw){
                    req.session.loggedIn = true;
                    req.session.userid = elm.id;
                    res.redirect("/user/mypage");
                }else{
                    res.status(401).render("signin",{
                        msg : "잘못된 비밀번호입니다.",
                    })
                }
            }
        });
    })

module.exports = router;
