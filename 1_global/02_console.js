/*
    node의 console 객체는 다양한 기능을 제공함. (브라우저랑 다름)

    time, timeEnd : 타이머 관리 기능
*/

for(let i =0; i<10 ; i++){
    console.time(`process${i}`);
    //실행은 순서대로 백그라운드에 등록되었지만 동시에 10개를 비동기적으로 작업시켜서
    //출력을 내보내었다. (백그라운드는 멀티스레드)
    setTimeout(() => {
        console.timeEnd(`process${i}`);
        
    }, 1000);
}
// console.timeEnd("process");// process라는 라벨을 등록시키고. 그 process
    // 시작부터 끝까지 걸린 작업시간이 출력된다.

/*
    assert : 조건결과에 따라 출력
*/
let val = 3;
//에러체크할 때 쓰긴한다. 실패가 되었을 때 뒤의 값 출력.
console.assert(val !==3, "invalid value");

/*
    dir : 상세보기 console.log랑 별차이 없는데 옵션이 있다.
*/
let obj = {name : "감혜빈", age : 27, flag : false, hobbies : ["공부하기", "운동하기"]};
console.dir(obj,{colors : true, depth : 0, showHidden : true});

/*
    trace() : 사용되게 된 과정을 추적해서 출력함.
    디버깅용 해당 함수가 어디서 실행되었는지 싹 나온다.
*/
sum(1,2)
function sum(a,b){
    console.trace("function sum");
    return a + b;
}
/*
    console.log , .info , .warn , .error , .clear
*/
    console.clear(); // 출력창 깨끗.


//배열을 하나 만들어서 console.table 로 출력
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']); 
// ['a'] -> a 만 출력하게 한다.
