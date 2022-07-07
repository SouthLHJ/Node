// console.log(require("events"));
const EventEmitter = require("events"); // class 혹은 생성자 함수가 저장된다.
const { emit } = require("process");
console.time("run");
// node 특징 중에 이벤트 기반이라는 말을 했는데, 
// 노드에서 사용되는 객체들은 EventEmitter 라는 것을 상속받아(혹은 prototype) 설계된 것과 연관이 있다.
const emitter =  new EventEmitter();

emitter.on("evt", ()=>{
    console.log("EVT 발생");
})

emitter.emit("evt")
emitter.emit("evt")
emitter.emit("evt")
emitter.emit("evt")

console.log(process instanceof EventEmitter)

process.on("exit", ()=>{
    console.timeEnd("run");
})

/*
    같은 이벤트로 여러 개 등록해도 된다는 성질이 있음. DOM 제어에 사용했던 addListener랑 같음.
    addListener도 있음. on이랑 같이 작동함.

    on 말고 once라는게 있는데 1회성 함수라고 생각하면 된다.
*/
emitter.once("close", (a)=>{
    console.log("cloes event occur!",a);
})
emitter.emit("close",Date.now());
emitter.emit("close",Date.now());