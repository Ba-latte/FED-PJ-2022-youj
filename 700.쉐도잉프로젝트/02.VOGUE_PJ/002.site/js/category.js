// 보그 PJ 카테고리 페이지 JS - category.js //////

// 🌷1.넘어온 url 받기 : 넘어온 url은 로딩구역 밖에서 받아도 된다!
let pm = location.href;
// : location.href이 이퀄(=)의 오른쪽에 있으면 url주소를 읽어온다!
// : 여기서 "pm"은 parameter의 줄임말로 쓰셨음~ (전달값 변수 의미!)

// 2.문자열 잘라서 값으로 읽어오기
// : 위에 let pm에 할당할때 href의 바로 뒤에서... split()을 써서 잘라서 쓸 수는 없음!
// : 물음표로 잘라서 두번째 값, 이퀄로 잘라서 두번째 값을 가져오는 것임
pm = pm.split("?")[1].split("=")[1];

// 3.pm값 특수문자 복원하기 : 디코딩하기!
pm = decodeURIComponent(pm);

// 4.호출확인
console.log(pm);


////////////////////////////////////// 로딩 구역 ////////////////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

////////////////////////// 로드 함수 //////////////////////////////
function loadFn(){

    console.log("로딩완료!");

    // 🌈1. 변경 대상 선정
    // (1) 서브 타이틀
    const stit = document.querySelector(".stit");
    // (2) 서브 메뉴
    const lnb = document.querySelector(".lnb");
    // (3) 컨텐츠 상위 박스(카테고리 클래스 넣기)
    const cont = document.querySelector(".cont");
    // (4) title요소 (타이틀 내용에 카테고리명을 앞에다가 넣기)
    const titag = document.querySelector("title");

    // console.log(stit, lnb, cont, titag);

    // 2. 메뉴 데이터 (sinfo 변수)객체에서 카테고리값 선택하기
    const mdata = sinfo[pm];

    console.log(mdata);

    // 3. 대상에 변경 적용하기
    // (1) 카테고리 페이지 타이틀 넣기
    // 대상 : .stit -> stit 변수
    stit.innerText = mdata["제목"];
    // 위의 모양은 다른 데 들어가 있을 떄에는 별루~
    // stit.innerText = mdata["제목"];

    // (2) lnb 메뉴 넣기

    // (3) 컨텐츠 박스에 pm과 같은 이름의 class 넣기
    cont.classList.add(pm.replace(" & ", "-"));
    // replace(바뀔 값, 바꿀 값);


} //////////////////////// loadFn 함수 끝 ///////////////////////