/*
    쿠키를 이용해서 사용자별 저장소(세션)을 운용해보자.
*/
const http = require("http");
const uuid = require("uuid");
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
http.createServer((req,res)=>{
    if(req.url ==="/favicon.ico"){
        res.statusCode=404;
        return res.end();
    }
    // console.log(uuid.v4()) //unique ID 생성하는 가장 편한방법 uuid.v4()
                        // 이걸 가지고 세션키 값으로 사용해보자.

    const recvCookie = cookieParser(req.headers.cookie);
    if(!recvCookie.sessionId){ // 쿠키 없다.
        console.log("세션아이디가 없는 사용자 들어옴...")
        const uk = uuid.v4();
        sessions[uk]={ }; // 추가설명 0711 //프로퍼티명 uk 인 저장소 하나 생성

        res.setHeader("set-cookie","sessionId="+uk); // 서버가 쿠키에 sessionId를 uk값으로 할당
        console.log("이 사용자에게 부여된 저장소 ID 값 : "+uk);
    }else{
        console.log("이미 부여받은 ID가 있는 사용자 들어옴");
        console.log("이 사용자가 쓰던 저장소 ID 값 : "+recvCookie.sessionId)
        let usedSession = sessions[recvCookie.sessionId];
        // res.writeHead(404,{"content-type" : "text/html",      
        // }); 이거는 아래의 202에 씹혔다.
    }
    //res.writeHead를 이용해서 text / html 이라고 설정해서 heading tag 보내보자.
    res.writeHead(202,{"content-type" : "text/html",      
    });
    res.end("<h2>????</h2>"); //이렇게 setHeader 이후에 writeHead를 하면 안씹힐 수도 있다.
}).listen(8080,()=>{
    console.log("Start server")
})