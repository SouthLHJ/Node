//class 이용해서 이벤트 발생 및 처리
const AI =  require("./ai.js");
const alpha = new AI ("알파고");

alpha.emit("sleep", 6);
alpha.emit("eat", "바나나");