const mongodb = require("mongodb");
const urm =  "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority"
            //이거는 몽고db 사이트에서 connect 의 두 번째에서 얻어지는 url코드를 집어넣는다.
//*^*^*^ 몽고DB를 쓸경우 app 말고 route에서 해야지 정상작업이 된다.^*^*^*^
                                // 그렇지만 그렇게하면 지저분해지니까. 모듈로 깔꼼하게 가능! ->03

//== CREATE
const client = new mongodb.MongoClient(urm);
const students = client.db("study").collection("students"); //접속한 몽고 DB의 폴더 호출

let data = {
    name : "김기협",
    age : 26,
    hobby : ["게임","유튜브 시청"]
};
//try catch 를 다 묶을 필요없이 DB랑 작업을 할때 자체가 비동기이므로 then. catch로 해도 된다.
students.insertOne(data).then(result =>{
    console.log(result.acknowledged); //작업이 정상처리되었는지 체크
    
}).catch(err=>{
    console.log(err.message);
}).finally((_=>{
    client.close(); // 작업들을 진행 후 마지막으로 서버닫기.
}))



//== READ
{
const client = new mongodb.MongoClient(urm);
const database = client.db("study"); //접속한 몽고 DB의 폴더 호출

// console.log("ready",database);

const students = database.collection("students")//접속한 DB 폴더에서 콜렉션 호출
                                // ****find 할때는 .toArray 꼭 넣기!!!
// const result = students.find({조건!}).toArray(); 바로 얻어와지지않음.(무슨 findCuser로 들어와짐)
students.find().toArray().then(result=>{ // 찾은 결과를 배열로 바꾸고. 그다음!(then)~~
    console.log(result);
}).finally(()=>{
    client.close();
})

}
