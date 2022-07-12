const path = require("path");
const express = require("express");

const app = express();

const movies = [
    {id : "mv01", name : "토르 - 러브 앤 썬더", img :"/static/thor.jpg"},
    {id : "mv02", name : "탑건 메버릭", img :"/static/topgun.jpg"},
    {id : "mv03", name : "헤어질 결심", img :"/static/bye.jpg"},
    {id : "mv04", name : "범죄도시2", img :"/static/crimecity2.jpg"},

]
//미들웨어
app.use(express.urlencoded()); //POST 요청 받는 확장자 활성화

app.use(express.static(path.join(__dirname,"..","homework"))) //첨부 파일 경로 지정

//셋팅
app.set("view engine","ejs"); //render의 확장자 지정

app.set("views", path.join(__dirname,"..","homework","ejs"))

//라우팅
app.get("/static",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","homework",req.path));
})

app.get("/list",(req,res)=>{
    res.status(200).render("list",{
        movie : movies,
    })
    
})

let reserved = {};
app.get("/seat",(req,res)=>{
    let query = req.query;
    res.status(200).render("seat",{
        movie : movies.filter((elm)=>{
            if(elm.id === query.code){
                return true;
            }
        }),
    })
})

app.post("/reserve",(req,res)=>{
    let body = req.body;
    let chkreserved =false;
    for(let key in reserved){
        body.seat.forEach(elm=>{
            console.log(elm);
                if(reserved.key === elm){
                    chkreserved = true;
                }
        })
    }
    console.log(chkreserved);
    if(chkreserved === true){
        res.redirect("/seat");
        res.send("이미 예약된 좌석입니다.")
    }else{
        let save = reserved[body.code];
        body.seat.forEach(elm=>{
            save.push(elm)
        })
        reserved[body.code] = save;
        console.log(reserved);
        
        res.status(200).render("reserve",{
            movie : movies.filter((elm)=>{
                if(elm.id === body.code){
                    return true;
                }
            }),
            rsvSeat : body.seat,
            userid : body.userID,
        })
    }   
})

app.listen(8080)