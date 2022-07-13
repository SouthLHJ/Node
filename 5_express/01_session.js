/*
    session 직접 만들어서 제어하는게 굉장히 불편한 작업이다.

    express로 서버 구축할 때는 cookie-session(휘발성) 이나 express-session (=>DB,메모리,?? 에 저장되게할수있다.) 중에 하나를 선택해서
    그 미들웨어 세션을 사용한다.
*/

const express = require("express")
// const session = require("cookie-session");
const session = require("express-session");

const app = express();

app.use(session({
    secret : "아무거나 적어" ,//세션 암호화 -> 쿠키를 설정할 때 이거를 통해서 암호화를 진행 후에 사용자쿠키에 넣어준다.
                            //Cookie : name : connect.sid 에 저장됨.
}));
/* cookie-session일때
app.use(session({
    name : "session",
    keys : ["abc","def"] // 세션 암호화 // Cookie : name : session.sig && name : session
}))

*/

const study = require("./router/study");

app.use("/study",study);


app.listen(8080);