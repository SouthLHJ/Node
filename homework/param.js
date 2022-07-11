const url = require("url");

let data = "id=mv02&seat=1-2&seat=3-2";

//url.parse 방법
let query = url.parse("/?"+data, true).query;
console.log(query); // 1개일 때는 string 여러 개일때는 배열로.

//url.URLSearchParams 방법
let params = new url.URLSearchParams(data);
console.log(params.get("seat")); 
console.log(params.getAll("seat")); // 만약 getAll로 얻어낸다면, seat가 1개여도 배열로 저장한다.