/*
    파일에 읽고 쓰기가 아니라
    시스템 자체를 제어하는 것도 filesystem 모듈에 구현되어있다.

    디렉토리 생성 (mkdir)
    파일삭제 unlink / 디렉터리 삭제 rmdirSync = rm
    이름변경 rename

    rmdir로 ㅣㅂ어있는 않은 디렉터리를 삭제하고 싶다면 옵션 설정을 해주면 된다.
    rm랑 차이는? 
    exists
*/
const fs = require("fs");
const path = require("path");
try{    
    fs.rmdirSync(path.join(__dirname, "photo")); //디렉터리 삭제 , 리턴 값이 없기때문에 try catch
    console.log("success", e.message)
}catch(e){
    console.log("failed", e.message)
}
/*
//콜백 방법
fs.rename(path.join(__dirname,"document","hxd.zip"),//document에 있는 hxd를
          path.join(__dirname, "music", "hxdd.zip"),//music 폴더의 hxdd로 이름을 바꾸면서 이동한다. (디렉터리도 바꿀 수 있다.)
          (err) =>{
            if(err){
                console.log("failed",err.message)
            }else{
                console.log("success");
            }
          });
*/

/*
fs.promises.unlink(path.join(__dirname, "document", "message2.txt")) //파일 삭제
    .then(rst =>{console.log("then",rst)})
    .catch(err =>{console.log("catch",err.message)});
*/