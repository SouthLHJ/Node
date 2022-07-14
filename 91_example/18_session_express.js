//03_server/18_session.js을 참고하되
//1. game쪽 router를 따로 설정
    //ㄴ /game/start
//2. account 쪽 router를 따로 설정
    //ㄴ /account/login     /account/session

const express = require("express");
const path = require("path")
const session = require("express-session");
// const filestore = require("session-file-store")(session);

const gameRouter = require("./route/game");
const loginRouter = require("./route/login");
const morgan = require("morgan");
const app = express();

//미들웨어
app.use(session({
    secret : "gameAvoid",
    nick : undefined,
    resave : true,
    saveUninitialized : true, //원래는 접속하면 바로 사용자용 개인저장소를 만들어내는데. false하면 사용자 이용이 session 이용할 때 그때 cookie며 생성된다.
                        // 필요할때만 생성하게 되므로 실용적이다. (defalut : true)
    cookie : {          //쿠키 설정. 
        maxAge : 60000     //쿠키 저장 기한 설정. 단위 : msec
    },
    // store : new filestore({path : path.join(__dirname,"sessions")}), // 세션 파일스토어 사용하기. (path : 파일 저장 위치 지정) 요거쓰면 메모리에 저장되지않고 파일에 저장됨.
                            // 요대로 쓰면 문제생김.. 좀 더 찾아보고 사용해보자
}));

//=====================      로그용 미들웨어.
app.use(morgan("combined")); //전부 다 기록에 남음 | combine (접속한 로그가 남는다.)
app.use(morgan("tiny"));     //기록을 요약해서 남음| 접속방법 path statusCode 요청온메모리사이즈 응답시간

app.use("/",gameRouter);
app.use("/game",gameRouter);
app.use("/account",loginRouter);


//셋팅
app.set("view engine","ejs"); //render의 확장자 지정
app.set("views", path.join(__dirname,"view"));

//라우팅


app.listen(8080,()=>{
    console.log("Server Open")
});
