/*
    파일을 다룰 때 자주 쓰는 기능 파일에 텍스트 쓰기 (Write, Output)
    파일에 적힌 텍스트 읽어오기 (Read, Input)
    readFile - Input
    writeFile - Output / appendFile
                ㄴ전체바꾸기   ㄴ 뒤에 붙여넣기
*/
const fs = require("fs");
const path = require("path");
let target = "log.txt";
let targetPath = path.join(__dirname,"document",target);

let buffer = Buffer.from("파일에 출력하기 버전2 "); //버퍼로 만들어줌
console.log("buffer",buffer);

fs.promises.appendFile(targetPath, buffer) //자체적으로 버퍼화를 해서 넣는다.
    .then(data =>{ //resovle 의 결과물이 없어서 매개변수를 작성하지 않아도 됨.
        console.log("writeFile success",data);
    })
    .catch(err=>{
        console.log(err.message) //접근할 수 없는 경로 혹은 권한 (invalid encoding)
    });
let ws =  fs.createWriteStream(targetPath);
ws.write("안녕하세요 ", (err)=>{
    if(err){
        console.log("write failed", err?.message);
    }
})
ws.write("반갑습니다. ");
ws.write("스트립은 한번 생성하면 close를 하기전 까지 연결이 되있기 때문에 ");
ws.write("이런시긍로 지속적인 writing이 가능하다. ");

ws.close();