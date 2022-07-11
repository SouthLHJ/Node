/*
    쿠키라는 건 사용자의 브라우저에서 관리되는 임시 파일이라고 보면 된다.

    이 쿠키라는 걸 이용해서 서버측에서는 사용자의 세션을 구분해서 관리하게 된다.
 */

const { read } = require("fs");
const http = require("http");

http.createServer((req,res)=>{
    /*
    
    */
   if(req.url==="/"){;
        //여기 왔을 때 사용자에게 welcome이라고 보내면서
        //쿠키를 몰래 보내

        res.writeHead(200,{
            "content-type" : "text/html",
            "set-cookie" : [
                "personkey=1234",    //서버에서 사용자한테 유니크id 생성해서 보내!
                "commonkey=abcde"   //1개일땐 그냥 string 2개이상일때는 배열로 해서 보내기.
            ]        
        })
        res.end("<h1>WELCOME TO APP</h1>")
   }else if(req.url === "/view"){
        let cookie = req.headers.cookie;    //서버에서 긁어온다.
        // 만약 쿠키가 없다면 undefined 있다면 string으로 나온다.
        // 쿠키의 정보는 [쿠키이름=쿠키값] 이런 형태로 추출된다.
        // 만약 사용자로부터 전달받은 쿠키가 여러 개라면 ;(세미콜론)이 붙은 형태로 추출이 된다.
        // 해당 string을 가지고 적절한 조치를 취해서 쿠키를 분리하고
        // 쿠키이름과 값 역시 분리해서 출력해보자.
        // console.log(cookie);
        /* ======================.map으로 하는 방법!
        // let arrCookie1 = cookie.split("; ");
        // console.log(arrCookie1)
        // let arrCookie2 = arrCookie1.map((elm)=>{
        //     return elm.split("=");
         })
        */
        /* ======================.foreach로 하는 방법!
        let arrCookie2 =[];
        arrCookie1.forEach((elm)=>{
            arrCookie2.push(elm.split("="));
        })
        */
        // =======================선생님 방법!!!
        const cookies={};
        if(cookie){ //쿠키가 공백이 아닐때
            let arrCookie1 = cookie.split("; ");
            arrCookie1.forEach(elm => {
                const [name,value]=elm.trim().split("=");
                console.log("쿠키이름 : " + name + " / 값 : " + value);
                cookies[name]= value;
            });
        }
        console.log(cookies)
        // arrCookie2 = arrCookie2.flat();
        // console.log(arrCookie2);
        res.write(JSON.stringify(cookies));
        res.end("okay...")
   }
   else{
        res.end("NOT FOUND")
   }
}).listen(8080,()=>{
    console.log("Start Server")
});