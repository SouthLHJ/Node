/*
    setTimeout setInterval setImmidiate 함수를 사용하면
    이 타이머를 제어할 수 있는 TimerID 값이 나오게 되는데 이 값은
    clearTimeout, cleearInterval, clearImmidiate에 사용된다.
*/
const intervalId = setInterval(() => {
    console.log("...")
}, 500);

const timeoutId = setTimeout(() => {
   clearInterval(intervalId) ;
}, 5000);

const id = setImmediate(()=>{
    clearTimeout(timeoutId);
})
clearImmediate(id);