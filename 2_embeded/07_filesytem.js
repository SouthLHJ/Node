/*
    readStream 읽어내는 용도의 스트림
*/
const fs = require("fs");
const path = require("path");
let target = "log.txt";
let targetPath = path.join(__dirname,"document",target);

let rst = Buffer.alloc(10);
let rs = fs.createReadStream(targetPath,{highWaterMark : 16}); // 16byte씩 끊어 읽는다.
//이벤트 기반으로 사용하는 스트림
console.log(rst)
rs.on("data", (chunk)=>{
    console.log(chunk); //데이터를 얻어옴.
})
/*
    readStream => WriteStram 쪽으로 연결을 시킬 수 있다. (.pipe(라이트스트림(위치))) (파일 복사기능으로 잘씀)
*/

let source = fs.createReadStream(".\\2_embeded\\document\\hxd.zip");

source.pipe(fs.createWriteStream(".\\2_embeded\\document\\hxd_copy.zip"));

source.on("end", function(){
    console.log("streaming Done");
})