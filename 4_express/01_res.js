const express = require("express");
const path = require("path");

// console.log(express)
const app = express(); //express 영역 활성화 app에. (서버공간을 만드는 것과 비슷)

//.set  =>이후의 라우팅에서 render를 사용한 것들의 기본설정값을 셋팅
app.set("view engine","ejs"); //(확장자 설정, );
app.set("views", path.join(__dirname,"view"));//.set(파일들의 기본 경로를 설정.)

// 첨부 파일 express staitc
app.use(express.static(path.join(__dirname,"public"))) //()안에는 첨부파일을 관리할 폴더를 지정한다.

//미들 웨어 : 아래 경로를 가기전에 중간에 거쳐가게 하는 영역
app.use((req,res, next)=>{ //경로없이 콜백함수만 있다. next : 이거 다하면 그다음에 실행할거. (promise의 .then같은..)
    console.log("use custom middleware-1");
    // res.send("이 메세지는 미들웨어에서 전송함"); //미들웨어랑 아래 경로에서 res.send를 둘 다 쓰면 
                                        //이미 미들웨어에서 headers 설정해서 서버가 충돌이 생긴다.
    next(); //next()를 적어야지 다음 경로를 찾으러 나간다.
});

app.use((req,res, next)=>{ //미들웨어가 두 개일 경우 위에서부터 처리하고 다음 미들웨어가 처리된다.
                        //+++ 만약 미들웨어 두 개가 연결되어 작동해야할 때는 해당되는 미들웨어를 맨 위에 올리자.
    console.log("use custom middleware-2");
    // res.send("이 메세지는 미들웨어에서 전송함");
    next();
});

//===========================라우팅. 즉 경로 생성 (routing)
app.get("/", (req,res)=>{   //서버에서 GET 방식으로 요청 받아온다.
    res.write("Hello World"); 
    res.end();
});
app.get("/notice",(req,res)=>{ // 응답을 보내는걸로 .send()
    res.send("<h2>공지사항</h2>"); //res.write() res.end() 와 다르게 따로 text/html; charset=utf-8을 안해도 된다.
    //send 전송은 기본이 text/html; charset=utf-8이다. 이외에도 headers를 몇 개 설정하는 기능이 내포되어있다.
    //근데 res.write()와 다르게 <h2></h2>가 먹히지않는다.
}); 

// 이미 만들어진 HTML을 전송하려면?
app.get("/help",(req,res)=>{
    res.sendFile(path.join(__dirname,"view","help.html"));
});

//app.set() render 사용하는 방법 / ejs.renderFile과 차이점은 res.end()가 필요 없다.
app.get("/inform",(req,res)=>{
    res.render("inform",{
        array : ["월","화","수","목","금"]
    })
})

//redirect ->writeHead(HTML Status Code, {location : "/"})과 같은 기능
    // Status Code는 .status(202).send() 이렇게도 가능하다. 
app.get("/private",(req,res)=>{
    res.redirect("/");
})

// createServer :  res.statusCode() === Express : res.sendStatus()
app.get("/code",(req,res)=>{
    // res.sendStatus(401); //단독 사용 가능
    res.status(401).send("당신에게는 권한이 없습니다.") //or .end() ...;    
})

//============================ 서버 포트 설정
app.listen(8080,()=>{
    console.log("Log / Express Server Start")
})
