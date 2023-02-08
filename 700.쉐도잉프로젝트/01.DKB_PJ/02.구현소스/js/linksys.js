// 도꺠비 PJ 링크 시스템 JS. - linksys.js

////////////////////////////////////// 로 딩 구 역 ///////////////////////////////////////////
window.addEventListener("DOMContentLoaded", ()=>{
    // 1. 호출확인
    console.log("로딩 완료!");

    // [ 링크 시스템 : 메뉴의 a요소 링크를 셋업한다! ]
    // 2. 대상선정: .top a (=상단 영역의 모든 a요소)
    const link = document.querySelectorAll(".top a");
    // (1)호출확인
    console.log(link);

    // 3. 클릭이벤트 함수 세팅하기 - for of문 사용
    for(let x of link){ ////// x는 각 a요소 하나씩을 의미함
        x.onclick = ()=>{
            // 1) a요소의 글자 데이터
            let atxt = x.innerText;

            // 1-1) 만약 글자 데이터가 있는 게 아니라, 이미지가 있다면! img요소의 alt를 읽어와서 atxt에 재할당하게 만들기 - if문
            // if(true){
            // if(null){
            // if(undefined){
            // -> 📢📢데이터가 null인 경우는 if문에서 false와 같이 취급된다!!!
            // -> 📢📢데이터가 undefined인 경우는 if문에서 false와 같이 취급된다!!!
            // 만약 요소가 없으면 null이 리턴된다
            // undefined는 변수의 값이나 함수가 생성되지 않은 경우 리턴되는 기본 할당값이다 (=기본값이란 말임)

            // 클릭된 a요소 하위의 img요소를 가져옴
            let chk = x.querySelector("img");


            if(chk){ // 있으면 if문 안으로 들어감 (chk가 null값이 아니라면 여기에 들어오고, null이라면 false라 해석하고 if문에 들어가지 않고 통과함)
                console.log("재할당!");

                // atxt변수에 img의 alt 속성값 넣기
                atxt = chk.alt;
                console.log("재할당! alt 속성값을 atxt에 넣으면? : ", atxt);

            } /////////////////// if문 //////////////////


            console.log(atxt);
            // : 콘스트로 해도 되지만, 얘는 좀 중요도가 높은 애들에게 주로 씀

            // 주소 할당 변수
            let url;


            // 2) 링크 분기하기 -switch문 사용
            switch(atxt){
                case "인물관계도": url="cat"; break;
                case "로그인": url="login"; break;
                case "회원가입": url="member"; break;
                case "tvN로고": url="index"; break;
                case "페이스북 바로가기": url="https://www.facebook.com/tvNdokebi/"; break;
                case "트위터 바로가기": url="https://twitter.com/chtvn"; break;
                case "인스타그램 바로가기": url="https://www.instagram.com/tvn_joy/"; break;
                
                default: url="esc";
            } //////////////////// switch case문 끝 //////////////////////


            // 3) 내용에 따른 처리하기 - if문 사용
            if(url === "esc"){
                alert(`
                    공사중입니다😄
                `);
            } /////////// if ///////////
            // sns일 경우 여기서 걸러주도록 처리함 (처리분기문)
            else if(
                atxt === "트위터 바로가기" || atxt === "인스타그램 바로가기" || atxt === "페이스북 바로가기"
                ){
                window.open().location.href = url;
                // : 새창 열기

            } ////////////// else if /////////////
            // 기타 내부 시스템에서 페이지 이동할 경우 여기서 처리함
            else{
                /* 
                [ 페이지 이동하는 방법 ]
                1.현재창으로 열기
                window.location.href = 이동할주소
                -> window는 주로 생략함
                location.href = 이동할주소

                2.새창으로 열기
                window.open().location.href = 이동할주소
                -원래 window.open()은 팝업창 띄울 때 사용하는 것임
                -이 기능을 활용해서 새창으로 띄우는 것임
                */
                
                location.href = url + ".html";
            } ////////////// else ////////////////

            // a요소의 기본기능인 이동 기능을 막는다!
            return false;
            // : 이 함수를 호출한 곳으로 돌아갈 때 'false'를 가지고 돌아가라는 뜻임
            // -> false는 빛이 없음, 즉 신호가 없다는 뜻임 (= 자기가 가지고 있는 기능을 죽인 것임)
            // ->> 브라우저는 이를 기본 기능을 없애라는 것으로 해석한다

            // (확인) 각 a요소의 href = '#' 으로 인한 상단 이동이 안 됨!
            // 그리고 tvn 로고 클릭시 이동하는 기능이 안 됨!

            // 그리고, 이동이 되게 하고 싶은 애는 switch문의 case로 추가하면 됨

        }; ///////////////////// click 이벤트 함수 끝 ////////////////////////
    } ///////////////// for of문 끝 /////////////////

}); //////////////////////////////// 로드 구역 끝 ///////////////////////////////////////////

