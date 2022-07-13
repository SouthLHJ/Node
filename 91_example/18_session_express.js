//03_server/18_session.js을 참고하되
//1. game쪽 router를 따로 설정
    //ㄴ /game/start
//2. account 쪽 router를 따로 설정
    //ㄴ /account/login     /account/session

const express = require("express");
const session = require("express-session");

const gameRouter = require("./route/game");
const loginRouter = require("./route/login");
const app = express();

app.use(session({
    secret : "avoid",
}))

app.use("/game",gameRouter);

app.use("/account",loginRouter);

app.listen(8080);
