/*

*/
// console.log(globalThis);
// console.log(global);
console.log(global === globalThis); //기본 객체
//global 객체가 가진 요소들은 global을 생략 할 수 있음.
global.console.log("global object");
global.setTimeout(() => {
   console.log("비동기 작업") ;
}, 1000);

console.log(__dirname);     // 디렉터리 이름
console.log(__filename);    // 실제 실행 파일 이름
