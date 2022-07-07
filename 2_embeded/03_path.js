/*
    path 모듈은 파일시스템의 경로관련 기능들이 들어있는 모듈
*/
// console.log(require("path"));// 이것 자체가 객체다.
const path = require("path");

console.log(path.sep); //운영체제 경로 구분자

console.log(__filename);

console.log(path.basename(__filename)); //파일 명
console.log(path.dirname(__filename));  //디렉토리 명
console.log(path.extname(__filename));  //확장자 명

const parsed = path.parse(__filename);
console.log(parsed);
console.log(parsed.name);

const formated = path.format(parsed)
console.log(formated)

//=====
//join 이용해서 경로를 만들어내야할 떄 폴더명을 넣으면 구분자로 \를 자동으로 넣는다.
let result = path.join(".","NODE", "global","01_object.js");
console.log(result);
//윈도우 일때는 이렇게 해도 되는데. path.sep이게 \이므로
//다른 운영체제를 사용하게 된다면 구분자가 달라지므로
console.log("\\NODE\\global\\01_object.js");
//이렇게 적어야한다.
console.log("\\NODE"+ path.sep +"global"+ path.sep +"01_object.js");