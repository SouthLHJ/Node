/*

*/
console.time("timeout");
setTimeout(() => {
    console.log("setTimeout");
}, 0);
console.timeEnd("timeout");

console.time("immediate");
setImmediate(()=>{
    console.log("setImmediate");
})
console.timeEnd("immediate");

console.time("nextTick");
process.nextTick(()=>{          //process.nextTick은 마이크로 테스크 큐를 이용한다.
    console.log("nextTick");    //우선순위가 가장 높은 처리 출력대기공간.
})                              //먼저 처리된 테스크 큐를 재끼고 .
console.timeEnd("nextTick");    //마이크로 테스크 큐에 있는걸 먼저 출력