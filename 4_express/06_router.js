const express = require("express");
//webtoon router 호출 (제일 자주 쓰이는 라우터 방법이다.)
const webtoonRouter = require("./router/webtoon");

const app = express();

/*
    가장 많이 쓰이는 형태의 라우팅 처리는 Router 라는 클래스를 활용하는 방법이다.
    Router / 이식 가능한 형태의 라우팅 핸들러들
*/
/* 하나의 js에서 router사용하는 방법.
const router = express.Router(); //마운트가 가능한 작은 서버를 할당. (app이랑 엇비슷)
//.use를 사용할 수 잇다.
router.use((req,res,next)=>{
    console.log("log by anonymous middleware")
    next();
})
//.get를 사용할 수 잇다.
router.get("/",(req,res)=>{
    res.send("이 응답은" + req.path + "에서 만들어짐"+ req.baseUrl);
})
// .route도 사용할 수 있다.
router.route("/mode")
    .get((req,res)=>{
        res.send("이 응답은" + req.path + "에서 만들어짐(GET)" + req.baseUrl);
    })
    .post((req,res)=>{
        res.send("이 응답은" + req.path + "에서 만들어짐(POST)"+ req.baseUrl);
    })


// app.use로 url,router를 미들웨어 시키면. /node + router의 url 의 더해져서 router가 작동한다.
            // router에다가 기능1, routes에다가 기능2 해놓고 두 개를 구분해서 하고싶을 때 app.use(url,~) 쓰면 될듯?
// app.use("/node",router);
// app.use("/express",router);
// router에서 req.baseUrl하면 그 상위의 Url인 /node or /express가 나온다.
*/
//=============== 가장 자주 씀. router 파일을 따로 만들어서 호출하여 router를 사용하는 방법
app.use("/webtoon",webtoonRouter);

app.listen(8080,_=>{
    console.log("start")
})