/*

*/
const http = require("http");
const uuid = require("uuid");
const url = require("url");
const path = require("path");
const ejs = require("ejs");
// const cookieParser = require("");

function cookieParser(str){
    const cookies={};
    if(str){ //쿠키가 공백이 아닐때
        let cookieArray = str.split("; ");
        cookieArray.forEach(elm => {
            const [name,value]=elm.trim().split("=");
            cookies[name]= value;
        });
    }
    return cookies;
}

const sessions = {};
const namePool = [];
http.createServer(async(req,res)=>{
    if(req.url ==="/favicon.ico"){
        res.statusCode=404;
        return res.end();
    }
    const recvCookie = cookieParser(req.headers.cookie);
    let currentUserSession;
    if(!recvCookie.sessionId){ // 쿠키 없다.
        const uk = uuid.v4();
        sessions[uk]={};//프로퍼티명 uk 인 저장소 하나 생성
        res.setHeader("set-cookie","sessionId="+uk); // 서버가 쿠키에 sessionId를 uk값으로 할당
        currentUserSession = sessions[uk]; 
    }else{
        currentUserSession  = sessions[recvCookie.sessionId];
    }
    //===================
    if(req.url ==="/game"){
        if(!currentUserSession.playerName){
            res.writeHead(302, {"location" : "/login"}); 
            return res.end()
        }else{
            let html = await ejs.renderFile(path.join(__dirname,"view","game.ejs"), {currentUserSession});
            return res.end(html);
        }
    }else if(req.url === "/login"){
        let html = await ejs.renderFile(path.join(__dirname,"view","login.ejs"), {msg : ""});
        return res.end(html);
    }else if(req.url.startsWith("/session")){
        let query = url.parse(req.url,true).query;
        // form에서 전달 받을 때 input => name="name"으로 설정
        if(namePool.includes(query.name)){ //배열에서 이미 같은 이름이 있을 경우에는.. (방법2로 Set 객체 사용 가능)
            let html =await ejs.renderFile(path.join(__dirname,"view","login.ejs"), {msg : "이미 사용중인 이름입니다."});
            return res.end(html);
        }else{
            namePool.push(query.name);
            currentUserSession.playerName = query.name;
            res.writeHead(302, {"location" : "/game"}); 
            return res.end()
        };
    }
    res.end();
}).listen(8080,()=>{
    console.log("Start server")
})