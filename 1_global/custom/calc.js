/*
    자바스크립트 자체는 다른 언어와 다르게 모듈화라는 개념이 없기에 
    노드에서 모듈화라는 개념을 만들기 위해서 도입한게 CommonJS라는 것이었다.
*/

function add(...a){
    return a.reduce((a,b)=>a+b,0);
}

function multifly(...a){
    return a.reduce((a,b)=>a*b,1);
}

// console.log(module.exports);

// module.exports.add =add;
// module.exports.multifly = multifly;
// module.exports랑 exports랑 매우 유사하게 사용할 수 있지만 살짝 다른 부분이있다.
exports.add =add;
exports.multifly = multifly;

console.log(exports === module.exports);