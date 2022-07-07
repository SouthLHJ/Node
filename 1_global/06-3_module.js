
/*
    CJS 방식이 아니라 (module.exports,       require)
    ESM 방식으로도 모듈을 사용할 수 있다. (export,      import)
    키워드가 다르다.
*/
/*
    ESM 방식의 모듈은 require 이 아니라 import
    ESM 방식으로 모듈처리를 하려면 둘 다 파일 확장자를 .mjs로 설정하거나
    실행환경 설정을 바꿔야한다.
        ㄴ ctrl+`에서 npm init 하고 폴더에 생긴 package.json에서 "type" : "module"으로 설정을 바꿔준다. 
        ㄴ ESM 방식으로 작동할 수 있게 만든다.
*/
//설정이 ESM 으로 바꿨을 경우 정상 작동될 명령어
import {add,multifly} from "./custom/calcModule.js"
import * as calc from "./custom/calcModule.js"

add(3,5);
calc.multifly(3,4,5,6);
