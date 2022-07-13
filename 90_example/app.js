const ejs = require("ejs");
const path = require("path");
const url = require("url");
const http = require("http");
const fs = require("fs");

const movies = [
    {id : "mv01", name : "토르 - 러브 앤 썬더", img :"/static/thor.jpg"},
    {id : "mv02", name : "탑건 메버릭", img :"/static/topgun.jpg"},
    {id : "mv03", name : "헤어질 결심", img :"/static/bye.jpg"},
    {id : "mv04", name : "범죄도시2", img :"/static/crimecity2.jpg"},

]
/*
    list.ejs 랜더링 할 때 이 배열을 넘겨주고 난 후
토르 - 러브 앤 썬더

    for(let i = 0; i<movies.length; i++){
        <laber><%= movies[i].name %></label>
        <a href = "/seat?code=<%=movies[i].name%>">
            <img src = "<%=movies[i].img%>">
    }
*/
http.createServer((req,res)=>{
    res.setHeader("content-type", "text/html; charset=utf-8"); 
    const pathname = url.parse(req.url).pathname;
    const query = url.parse(req.url,true).query; 
    //(사진 저장된 루트 찾아가기) 이미지파일 혹은 css 파일, js 파일 같은 경우는 바로 제공될 수 있게 특정한 경로에 모아두고
    //                          그 경로로 요청이 들어오면 바로 pipe()로 전송해주자.
    if(pathname.startsWith("/static")){ 
        //fs(file system)을 통해 createReadStream을 이용해서(읽기) 경로를 넣어주고 .pipe(res)로 바로 서버응답 전달.
        return fs.createReadStream(path.join(__dirname,pathname)).pipe(res);
    }
    if(pathname === "/list"){
        ejs.renderFile(path.join(__dirname,"ejs","list.ejs"),{
            movie : movies,
        }).then(data =>{
            res.writeHead(200, { // 상태코드 설정하는거
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    /* 이렇게 짜도 좋다
    if(["/list,"/in","/""].includes(pathname)){~~~~ 
        let html = await ejs.renderFile(path.join(__dirname,"ejs","list.ejs"),{movie : movies,})
        res.writeHead(200, { "content-type" : "text-html,charset=utf-8" })
        res.end(html);
    */
    }else if (pathname === "/seat"){
        // /list에서 [GET]방식 query로 영화 id값이 code라는 이름으로 전달되게 설계함
        // 해당 id의 영화정보를 찾아서 렌더링할 때 넘겨주는 것까지 백엔드
        // let target = movies.find((elm)=>{elm.id == query.id}); // 조건에 부합하는 첫 번째 요소를 반환한다. target은 {id: name: img:}객체가 저장됨.
        // if(!query.code || !target){ //없는 코드가 반환되면 원래 페이지로 반환되게 넣는 것도 센스!
        //     res.writeHead(302, {"Location":"/list"}); -> 302,{"Location" : "~~"} 리다이렉트라고 부른다.
        //     return res.end();
        // }
        ejs.renderFile(path.join(__dirname,"ejs","seat.ejs"),{
            movie : movies.filter((elm)=>{
                if(elm.id === query.code){
                    return true;
                }
            }),
        }).then(data =>{
            res.writeHead(200, { // 상태코드 설정하는거
                "content-type" : "text-html,charset=utf-8"
            })
            res.end(data);
        })
    }else if (pathname === "/reserve"){
        // 요청을 Post로 처리할꺼라 받은 데이터를 추출하는 과정이 추가된다.
        let movie;
        let seat = [];
        let userID;
        let recv = "";
        //데이터를 얻어오는것과 얻어오는것을 가지고 분해하는걸 분리해야한다.
        //        ㄴ "data"                     ㄴ "end"
        //용량이 커지면 on data가 자주 발생 시 컴퓨터가 뻑난다.
        req.on("data", (chunk)=>{
            recv += chunk;
        })
        req.on("end", ()=>{
            //data.toString() === recv .... 이 전에 내가 짰던건 data변수에 다 저장해서 그걸 toString했는데...선생님은 recv에 문자열로 저장하게 해놓음
            const params = new url.URLSearchParams(recv);
            movie = params.get("code");     // .get() => 맨 처음 일치되는 데이터 하나가 추출 (string)
            seat = params.getAll("seat");   // .getAll() => 일치되는 데이터 전부가 배열로 추출 (object)
            userID = params.get("userID");
            console.log (params, movie, seat, userID)
            ejs.renderFile(path.join(__dirname,"ejs","reserve.ejs"),{
                movie : movies.filter((elm)=>{
                    if(elm.id === movie){
                        return true;
                    }
                }),
                rsvSeat : seat,
                userid : userID,
            }).then(data =>{
                res.writeHead(200, {
                    "content-type" : "text-html,charset=utf-8"
                })
                res.end(data);
            })
        })
    }

}).listen(8080,()=>{
    console.log("Start Server");
})