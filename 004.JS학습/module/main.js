// 모듈 연습 메인 JS - main.js

// 로딩구역 없이 = 스크립트 태그에 difer 속성 사용하거나 type="module" 사용할 경우, 로딩구역 없어도 요소 등을 가져올 수 있음

// 모듈화 JS파일 import하기!
// import { mTitle, sTitle } from "./textData.js";

// 별칭 사용하기 (별칭을 쓸수도 있고 안쓸수도 있다)
import {
    mTitle as mTit,
    sTitle as sTit,
    personInfo as pInfo,
    mvData as mv
} from "./textData.js";

// 메세지를 받아오기 : 메세지 내용 구성함수 임포트하기!
import {message as msg} from "./msgFormat.js";
/********************************************************************************

    [ import 형식 ]
-import 전달변수 from 파일경로;
->반드시 가져올 모듈js에서 export해줘야 함!!!!!!!!!!!
-from 뒤에 경로는 반드시 상대경로 써야함
->같은 위치일지라도  ./표시를 꼭 해야함!! (없으면 안나옴!!)
// (/, ./, ../ 표시 필수)
-모듈 구성은 반드시 서버 형식으로 열어야 작동한다!!
: http:// .... -> 우리는 라이브 서버(live Server)에서 열기 때문에 볼 수 있음!!
-로컬 파일로 열면 작동 안됨!!
______________________________________________________________

[   import 시 변수명 변경하기 : 별칭 사용하기 ]
-import (전달변수 as 별칭) from 파일경로;
ex) import(mymymy as m) from 파일경로;
->별칭 사용 이유 : 단순 변경 요구, 같은 이름 변수 피하기


_________________________________________________________________
    [ 모듈화를 위한 구성 ]
1.데이터 처리하기 위한 js
->textData.js
2.구체적인 데이터 구성처리를 위한 js
->msgFormat.js

********************************************************************************/


// 1. 출력 박스
// (1) 타이틀 출력 박스
const tpart = document.querySelector(".tpart");

// (2) 내용 출력 박스
const demo = document.querySelector("#demo");

// (3) 영화정보 출력 박스
const mvpart = document.querySelector(".mvpart");

console.log(tpart, demo, mvpart);


// 2. 제목 넣기
tpart.innerHTML=`
    <h2>${mTit}</h2>
    <h3>${sTit}</h3>
`;


// 3. 내용 넣기

demo.innerHTML = msg("공유", 43);
demo.innerHTML += msg("톰행크스", 55);
demo.innerHTML += msg("졸리", 48);



pInfo.forEach(val=>{
    // val[0] : 이름, val[1] : 나이
    demo.innerHTML += msg(val[0], val[1]);
});


// 5. 영화정보 뿌리기
// : ol>li형식으로 .mvpart 박스에 영화정보로 JS클래스를 생성하여 화면에 뿌려준다!


