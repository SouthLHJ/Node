/*
    require("fs");
    파일시스템을 제어하기 위한 모듈
*/
const fs = require("fs");
const path = require("path");
/*
    파일시스템의 핵심기능은 파일을 읽어들이고 파일로 출력하는 것이다.
    기본적으로 3가지 형태로 처리할 수 있게 되어있다.
    1. callback
    2. promise
    3. sync (-)  -> 추천하지않음.
*/
//1.
fs.readFile("./package.json",function(err,data){
    //읽기에 실패하면 err 변수에 데이터가 들어가고, 성공하면 data 변수에 들어간다.
    console.log(data instanceof Buffer,data);
});
//2.
fs.promises.readFile("./package.json")
    .then((data)=>{
        console.log(data instanceof Buffer,data);
    })
//3.
let data = fs.readFileSync("./package.json");
console.log(data instanceof Buffer,data);
//Buffer라는 곳에 저장됨. fs = > file system

//=======
fs.mkdir(path.join(__dirname,"photo"),function(err){
    console.log("mkdir",err);
});
//이 방식은 위랑 달리 try catch 로 에러를 잡아야한다.
try{
let result = fs.mkdirSync(path.join(__dirname,"music"));
console.log("mkdirSync", result);
}catch(e){
    console.log("mkdirSync", e.message);
}
fs.promises.mkdir(path.join(__dirname,"document"))
    .then((data)=>console.log("promises data",data))
    .catch((e)=> console.log("promises err",e.message));