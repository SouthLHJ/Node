/*
    URL에 따라 다른 서비스를 제공해보았고,
    이번에는 해당 URL로 요청을 보낼 때 보내준 query를 이용해서 응답을 보내보자.

    url은 /weekdayList 만 처리하면 된다.
        이 URL로 접근할 때 쿼리(query)가 날라오는데 week이라는 이름으로 요일 정보가 (sum ~ sat)가 넘어오고
                                                rank 라는 이름으로 숫자 데이터가 넘어온다고 가정한다.
    이 정보를 추출해서 응답을 보내달라.
    weekdayList?week=wed&rank=1
    <너의 요청 처리 결과 : (수요웹툰 1위)
    weekdayList?week=sat&rank=7
    <너의 요청 처리 결과 : (토요웹툰 7위)
    dayList?rank=8
    <너의 요청 처리 결괄 : 알 수 없음.
*/
const url = require("url")
const http = require("http")

!function(){
    let rst = url.parse("https://comic.naver.com/webtoon/list?titleId=748105&weekday=thu",true);
    console.log(rst.query, typeof rst.query);
    console.log(rst.query.weekday);
}();

const server = http.createServer((req,res)=>{
    const userUrl = url.parse(req.url,true);
    res.setHeader("content-type", "text/html; charset=utf-8"); //text/html!!!!!!!해야지 <h1></h1>가능
    let urlWeek = userUrl.query.week;
    let urlRank = userUrl.query.rank;
    const kor = ["일","월","화","수","목","금","토"];
    const eng = ["sun","mom","tue","wed","thu","fri","sat"];
    if(eng.indexOf(urlWeek)){
        kor[eng.indexOf(urlWeek)];
    };
    res.write("<h1>너의 요청 처리 결과</h1>");
    if(urlWeek !== undefined && urlRank !== undefined){
        res.write(`${urlWeek} <b>웹툰</b> ${urlRank} <b>위</b>`);
    }else{
        res.write(`너의 요청 처리 결과 : 알 수 없음`)
    };  
    res.end();

}).listen(8080,()=>{
    console.log("Server Start");
});