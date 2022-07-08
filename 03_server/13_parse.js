const url = require("url");
const querystring = require("querystring");

let data = "/fee?used=30"; // GET Method 형태일 때 발생하는 URL
console.dir(url.parse(data,true));

let data2= "used=30";
console.dir(url.parse("?" + data2,true))
console.dir(querystring.parse(data2)) //querystring을 이용하면 ?부분이 없어도 쿼리로 잘 parse처리한다.