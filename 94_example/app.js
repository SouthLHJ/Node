const express = require("express");
const path = require("path");

const accounts = require("./collection/accounts");
const session = require("express-session");

const accountRouter = require("./router/account");
const userRouter = require("./router/user");
const articleRouter = require("./router/article");
const app = express();

//셋팅
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"view"));

//미들웨어
app.use(session({
    secret : "accounts",
    resave : false,
    saveUninitialized : false, // 로그인하면 생성되도록하기.
}));
    /* session 선언하는 부분이 미들웨어이기때문에 라우터 보다 위쪽에 둬서
     거치고나서 라우터로 가게 하자.. 안그러면 선언안됬다고 뜸. */

app.use(express.urlencoded({"extended":true}));
app.use("/account",accountRouter);
app.use("/user",userRouter);
app.use("/article",articleRouter);


app.use("/user",(req,res,next)=>{
    //로그인 상태가 맞는지 확인.
    if(req.session.cookie){ //쿠키생성되있으면.
        next();
    }
})

//라우터
app.get("/",(req,res)=>{
    res.render("index")
})


app.listen(8080);