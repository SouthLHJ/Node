/*      
    이번 주 목표 :
     - session 을 사용자 인증
     - multer middle 웨어를 이용한 파일 업로드 구현
     - fetch 를 이용한 비동기 데이터 통신 
*/
const express = require("express");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const session_secret = "P@ssw0rd";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(session({ secret: session_secret, resave: true, saveUninitialized: true }));


app.use("/account", require("./routers/accountRoute"));
app.use("/user", require("./routers/userRoute"));
app.use("/article", require("./routers/articleRoute"));
app.use("/api", require("./routers/apiRoute.js"));



app.use((err, req, resp, next) => {
    
    console.log(err.message);
    resp.status(500).send(err.message);
});


app.listen(8080, ()=>{
    console.log("[EXPRESS] START");
});