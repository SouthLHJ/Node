/*
    express 서버 하나 작동시키고 (8080)
    GET /upload 
        uploadForm.ejs 파일 렌더링 되게 라우터핸들러 처리.
*/
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs"); // multer diskStorage에서 파일 만드는용도

const app = express();

//셋팅
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

//미들웨어
    // post method : application/x-www-form-urlencoded 형태 일때만 처리되는 미들웨어
app.use(express.urlencoded({extended:true}));
    // post method : multipart/form-data를 처리하려면?
    // formidalbe, multer 같은 것들이 multipart 요청을 처리하는 대표적인 middleware이다.   
    // ㄴformidable은 기본 설정할게 많아서 복잡해진다. 
    // >npm i multer 하여 사용할꺼임.

//라우팅
app.get("/upload",(req,res)=>{
    res.render("uploadForm")
})

//===미들웨어(multer)
const upload = multer({dest : path.join(__dirname,"uploads")}); //선언한 위치에 파일업로드를 진행한다.
//===
app.post("/uploaded",upload.single("attach"),(req,res)=>{
                    //업로드파일 갯수에 따라 .함수()가 결정. post로 들어오는 정보가 ("")로 들어온다.
                    //uploads에 저장되는 파일은 확장자명 없이 파일정보자체가 저장된다.
    console.log(req.body.desc);
        //multer를 선언했더니. text가 들어온다. 글자가 body로 들어와진다.
    // console.log(req.body.attach);
    console.log(req.file); //파일의 정보는 req.file에 저장되어와진다.

    res.sendStatus(200);
})
/*
    upload.single() : 한 개
        => req.file
    upload.array() : 여러 개 (name 한개)
        => req.files (정보 배열로 저장됨)
    upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]) : 여러 이름으로 들어올 때.
        => req.files['avatar'][0] -> File , req.files['gallery'] -> Array

*/
    //multer를 사용할 때 셋팅을 변경해서 처리해보자.
    //예를 들어서, 업로드 되는 이름을 우리가 지정해본다거나.. etc
    //https://github.com/expressjs/multer/blob/master/doc/README-ko.md

//=== 미들웨어 (multer)
const storage = multer.diskStorage({
    //저장할 위치
    destination : function(req,file,callback){
        const dest =  path.join(__dirname,"upload",req.body.uploader);
                                // 자동 폴더가 생성안되서... upload폴더 없을땐 안됨.
        if(!fs.existsSync(dest)){   // 상위 upload의 req.body.uploader의 폴더를 만드는데
                                    // 만약에 존재하지않을 때만 
            fs.mkdirSync(dest,{recursive:true}); // fileSystem(fs)을 통해서 폴더를 만들고 저장해라.
        }
        //해결방법 : fs.mkdirSync(dest,{recursive:true}); 를 이용해서 없는 상위폴더 선언해도 만들면서 하위폴더 만든다.
        callback(null,dest);
    },

    //저장되는 파일들 저장될 이름 지정  
    filename : function(req,file,callback){
        //파일을 저장할 때 원본의 이름을 최대한 살리면서 겹치지 않게 시간 설정 값만
        //방법1 let newName = Date.now()+"_"+file.originalname;
        let arrname =  file.originalname.split(".");
        arrname[0] = Date.now()
        let newName = arrname.join(".");
        callback(null, newName);
    },

})
// 원하는 파일 형식 지정
const filefilter = function(req,file,callback){
    if(file.mimetype.startsWith("image")){
        callback(null,true);
    }else{
        callback(null,false);
    }
}

    
const testUpload = multer({storage : storage, fileFilter : filefilter});
//===
app.route("/test")
    .get((req,res)=>{
        res.render("test")
    })
    .post(testUpload.single("attach"),(req,res)=>{
        console.log(req.file);
        if(req.file){
            console.log("okay")
        }else{
            console.log("처리안함")
        }
        res.sendStatus(200);
    })












app.listen(8080)