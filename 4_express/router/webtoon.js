//파일명을 webtoon 경로를 만들어낼 router라고 선언한다. (국룰)
/*
    webtoon url router configuration
*/
const express = require("express");


const router = express.Router(); 

router.use((req,res,next)=>{
    console.log("log by anonymous middleware")
    next();
})

router.get("/",(req,res)=>{
    res.send("이 응답은" + req.path + "에서 만들어짐"+ req.baseUrl);
})

router.route("/mode")
    .get((req,res)=>{
        res.send("이 응답은" + req.path + "에서 만들어짐(GET)" + req.baseUrl);
    })
    .post((req,res)=>{
        res.send("이 응답은" + req.path + "에서 만들어짐(POST)"+ req.baseUrl);
    })

//외부에서 파일을 require를 했을 때 나올 객체를 선언해놓는다.
module.exports = router;