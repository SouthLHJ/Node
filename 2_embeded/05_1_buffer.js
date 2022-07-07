/*
    Buffer : 파일데이터(byte)가 담긴 (숫자)배열
*/
const fs = require("fs");
const path = require("path");
let target = "hxd.zip";

fs.promises.readFile(path.join(__dirname,"document",target))
    .then((data)=>{
        console.log(target,data.length,"byte"); //<msg1 : 15byte(utf-8) / msg2 : 10byte(utf16le)
        console.log(data, data.toString("utf-8"))//.toString()일 때 <msg1 : 안녕하세요 / msg2 : 깨진문자.
    })                                           //                   .toString("utf-8")  ㄴ .toString("utf16le") : 정상
    .catch(err => console.log(err.message));