// console.clear();
// console.log(process);
// 사용 환경을 알아낼 수 있음.
if(process.argv[2] !== "-a"){ // 비밀번호 설정같은거 가능
    process.exit(-1);
};

console.log(process.argv); //이프로그램을 실행시킬 때 어떤 ??? 했는지 나옴
                //[0]은 실행파일 위치
                //[1]은 실행시킨 파일명
                //[2~] 실행하면서 전달받은 인자들이 나온다. 

console.log(process.env.OS);

console.log(process.memoryUsage());      //메모리 사용량.
for(let cnt = 1; cnt <= 10; cnt++) {
    new Array(10000);
    console.log(process.memoryUsage.rss());  //실제 사용량. (byte)
}


if(Math.random()>0.5){
    process.exit(7); //프로그램 종료시키는거. 0.5초과일때 아래 출력이 없음.
        //변수는 code =7이라는 이유로 종료되었다라는 의미를 넣어줄 수 있다.
        //0이 정상종료
}