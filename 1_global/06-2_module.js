/*
    모듈 : 독립된 기능을 갖는 것(함수,파일)들의 모임(객체)

    node에 글로벌로 설정된 module이란 객체는
    다른 파일에 정의된 function 등을 연결시켜주는 객체
*/
// console.dir(module);
// const boxs = require("./custom/box.js");
const boxs = require("./custom/box");
boxs.radius = 2;
console.log(boxs.getArea());
