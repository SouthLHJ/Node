/*
    몽구스(mongoose) / ODM이라고 불린다. (Object Document Mapping)
    MongoDB를 Object Modeling 하는 Tool 이다. (npm으로 설치해야함)
    
    가장 큰 특징은 스키마를 정의하고 사용하는 것.
    몽구스의 모든 것은 스키마로 시작합니다.
    각 스키마는 MongoDB 컬렉션에 매핑되고 해당 컬렉션 내 문서의 모양을 정의합니다. (문서명,작성자,유형,작성날짜.. 요런 문서 저장의 형태)
     문서 저장의 형식이 갖춰져있지않으면 사람마다 이거저거 저장해서 찾아내기 힘드니까... 이런 형식을 정해서 안전하게 쓰는 느낌?
     요건 MongoDB와의 커넥션을 Open 해주고 끝나면 자동으로 Close를 해준다.
    
    ctrl+` => npm i mongoose 
*/

const mongoose = require("mongoose");

const uri = "mongodb+srv://bizpoll:0627204800@cluster0.9dbcz.mongodb.net/?retryWrites=true&w=majority";
//mongoose.connect(몽고DB랑 연결하는 uri, Option, 콜백함수)
mongoose.connect(uri,{dbName : "example"}); //DBname 이름 지정.

mongoose.connection.on("error",err=>{ //연결하는데, 에러일 경우 => 콜백함수
        //몽구스의 객체중에 connection이라는게 있
    console.log("MongoDB error : ",err.message);
});

mongoose.connection.on("open",()=>{ //연결하는데, 성공일 경우 => 콜백함수
    console.log("MongoDB connected.");
});

//========
//mongoose를 통해서 Data 제어를 하려면 Schema부터 설계를 해야된다.
const foodSchema = mongoose.Schema({
    //필드명 : {type : ~}
    name : {type : String, required : true}, //{type : ~~} 라고 적어야하지만
    calorie : Number, // type만 선언한다면 {type : Number}라고 적지않고 Number만 적어서 축약이 가능
    ammount : {
        unit : String,
        gram : Number,
    },
    category : {type : String, default : "-"}
});

//=====
//이 스키마라는 걸 이용해서 모델이라는 것을 만들어 사용하게된다.
const food = mongoose.model("food",foodSchema); //모델 이름, 스키마. food들의 모임이라 food's'라는 컬렉션으로 관리하게 된다. (자동생성된다.)

const f1 = new food({name : "쌀밥", calorie : 310});
// const f1 = new food({name: "???", calorie : "tre"}); 
//DB에 저장하는 방법1
f1.save();

