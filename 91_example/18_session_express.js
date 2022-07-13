//03_server/18_session.js을 참고하되
//1. game쪽 router를 따로 설정
    //ㄴ /game/start
//2. account 쪽 router를 따로 설정
    //ㄴ /account/login     /account/session

const express = require("express");
const path = require("path")
const session = require("express-session");

const gameRouter = require("./route/game");
const loginRouter = require("./route/login");
const app = express();

//미들웨어
app.use(session({
    secret : "gameAvoid",
    nick : undefined,
}));

app.use("/game",gameRouter);

app.use("/account",loginRouter);


//셋팅
app.set("view engine","ejs"); //render의 확장자 지정
app.set("views", path.join(__dirname,"view"));

//라우팅


app.listen(8080,()=>{
    console.log("Server Open")
});
