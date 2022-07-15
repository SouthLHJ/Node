
const guestbook = require("./collectoins/guestbook");

!function(){
    // async function으로 이루어진 findAll()의 return 값은 Promise가 온다. 그래서 .then(data)를 해야한다.
                                                // guestbook.js 에서 return 을 해놨다.

    guestbook.deleteById("62d0f81454dd3d35ce5babcf").then(rst=>{
        console.log(rst);  //{ acknowledged: true, deletedCount: 1 } 삭제 됬으면 Count로 확인해야한다. 
                                //ㄴ 이건 정상 처리되면 true가 되서. 삭제 내용이 없었어도 true가 떠버린다. (Count : 0)
    })

    /* 데이터 수정
    let data = {
        "name" : "김현선",
        "password" : "0218",
        "comment" : "엄마",
        "create" : Date(Date.now())
    }
    guestbook.updateById("62d0b7b93d717d95f7447c0b",data).then(rst =>{
        console.log(rst);
    })
    */

    /* 데이터 추가
    let save = {
        "name" : "이원형",
        "password" : "0701",
        "comment" : "나는 아빠",
        "create" : Date(Date.now())
    }
    guestbook.insertOne(save).then(rst =>{
        console.log(rst);
    })
     */
    /* 전체 찾기  
    guestbook.findAll().then(array=>{
        console.log(array);
    }) 
    */
    /* id로 찾기
    guestbook.findById("62d01d737490cd544dbaa60f").then(rst=>{
        console.log(rst);
    })
    
    */
}();