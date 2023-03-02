// 보그 PJ 링크 시스템 JS - linksys.js //////
// : 메뉴 클릭하면 거기로 가게 만들기

////////////////////////////////////// 로딩 구역 ////////////////////////////////////////
window.addEventListener("DOMContentLoaded", linkFn);

////////////////////////// 링크시스템 로드 함수 //////////////////////////////
function linkFn(){

    console.log("링크 로딩완료!");

    // 1.링크 대상 선정
    // (1) GNB : .gnb a
    const gnb = document.querySelectorAll(".gnb a");
    // console.log(gnb);
    // (2) 로고 : .logo a
    const logo = document.querySelector(".logo a");

    
    // 2.클릭 이벤트 설정하기
    // (1) GNB 클릭 설정
    for(let x of gnb){
        x.onclick = (e)=>{
            // (0) 클릭 이동기능 막기
            e.preventDefault();

            // (1) 클릭된 a요소의 텍스트를 읽어오기 + 소문자로 텍스트 바꾸기
            let atxt = x.innerText.toLowerCase().trim();
            // toLowerCase() : 소문자로 바꾸기
            // toUpperCase() : 대문자로 바꾸기
            // trim() : 앞/뒤 공백 제거하기

            console.log(atxt);

            // (2) 서브 페이지 이동하기 : "search"가 아니면 서브페이지로 이동하라는 뜻!
            if(atxt !== "search") location.href = "category.html?cat=" + encodeURIComponent(atxt);
            // encodeURIComponent() : 2byte문자나 특수문자가 있을 경우, 인코딩해줘야함! -> 받아가는 곳에서도 디코딩 해줘야 정확히 나옴

            




        }; /////////////////// onclick 이벤트 끝 ///////////////////
    } //////////////////// for of문 끝 ////////////////////////

    // (2) 로고 클릭 설정
    logo.onclick = (e)=>{
        e.preventDefault();

        // 홈으로 이동하기
        location.href = "index.html";
    }; //////////////////// onclick 이벤트 끝 /////////////////////


} //////////////////////// linkFn 함수 끝 ///////////////////////