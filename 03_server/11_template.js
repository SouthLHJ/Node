/*
    file System을 이용하면 이미 만들어진 HTML을 응답으로 보내는 건 가능하다.
    하지만 요청처리 결과를 반영해서 HTML을 만들고자 하는건 불가능하다.

    위 상황을 해결하는 동적인 HTML을 만들어내려면 template engine을 사용해야 된다.

    template engine은 노드에서 제공하는 것은 아니고 모듈을 설치해야한다.


    ejs 모듈을 사용할 예정 (npm init (package.json 만드는 과정) => npm install ejs)
    (handelbars, pug, nunjucks)
*/
const ejs = require("ejs");
const path = require("path");
const url = require("url");
const http = require("http");

/*
    이 서버에 서비스를 하나 추가하자.

    /fee 라는 url에서 처리하면 되고
    이 url로 접근 시 사용자는 used이라는 이름으로 주차시간(이용시간)(단위는 분)을 query로 넘겨준다.
    /fee?used=180 이런 느낌으로...
    이 사용시간에 해당하는 요금을 계산해서 이걸 이쁘게 출력할 수 있게 ejs를 활용한다.
                            (랜더링에 최소한 전체 사용시간과, 사용 요금은 포함한다.)
    30분까지는 1000원... 10분단 400원 추가. 최대요금 10000

*/





http.createServer((req,res)=>{
    const query = url.parse(req.url,true).query;
    const pathname = url.parse(req.url,true).pathname;

    

    if(pathname === "/rank"){
        ejs.renderFile(path.join(__dirname,"view","rank.ejs"),{
            title : "First EJS",
            weekday : query.week,
            list : ["이솔","이혜주","야","너","임마","ㄱㄴㄷ","ㄻ"]

        }).then(data =>{
            res.writeHead(200, { // 상태코드 설정하는거
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    }else if(pathname === "/fee"){
        ejs.renderFile(path.join(__dirname,"view","fee.ejs"),{
            user : query.user,
            used : query.used,
            fee  : function(){
                let fee = 0;
                let extra = this.used;
                fee += 1000;
                extra -= 30;
                if(extra >0){
                    while(extra >0){
                        fee += 400;
                        extra -= 10;
                    }
                }
                return fee;
            },
        }).then(data =>{
            res.writeHead(200, {
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    }
    else{
        ejs.renderFile(path.join(__dirname,"view","404.ejs"),{
            
        }).then(data =>{
            // res.statusCode = 404;
            // res.setHeader("content-type", "text-html,charset=utf-8")
            res.writeHead(404,{
                "content-type" : "text/html;charset=utf-8"
            })
            res.end(data);
        })

    }
}).listen(8080, _ =>{
    console.log("Start");
})