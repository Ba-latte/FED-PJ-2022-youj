// 패럴렉스 PJ (JS버전) -main.js

// 로드 이벤트 설정
window.addEventListener("DOMContentLoaded", loadFn);

// 로드함수 /////////////////////////
function loadFn(){
    console.log("로딩완료!");

    // 1.부드러운 스크롤 적용하기
    startSS();

    // 2.공통 선택자함수
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);

    // 3.등장 위치 리턴함수
    const retVal = x => x.getBoundingClientRect().top;
    // getBoundingClientRect().top -> 화면에 등장 후 위로 올라가면 마이너스값이 됨

    // 4.화면 높이값 = 등장할 요소의 시작값 읽어오기
    const winH = window.innerHeight;
    console.log("winH: ", winH);

    // 5.패럴렉스 수치 범위 : 움직일 값 설정 (움직일 범위 값을 정해주는 것임)
    const setH1 = 100;
    const setH2 = 200;

    // 6.패럴렉스 대상 선정하기
    // (1)글자박스
    const tg1 = qsa(".txt");
    // (2)아이콘박스
    const tg2 = qsa(".icon");

    // 7.패럴렉스 이동함수 ///////////////
    const moveEl = (elpos, ele, setH)=>{
        // 전달값 : elpos - 위치값 / ele - 요소 / setH - 정한범위수


        // 패럴렉스 범위 : 윈도우 높이값 ~ 0까지
        // 화면에서 완전히 사라질때 범위는 0이 아니고 요소의 높이값 만큼 마이너스된다!
        if(elpos < winH && elpos > 0){
            // 대상 요소의 transform Y축 이동 : 트랜스폼이 없을 때엔 랠러티브를 줘서 이동했지만 지금은 트랜스폼으로 이동하는 게 대세!
            // 🌈🌈위치 이동의 계산 원리🌈🌈
            // ->윈도우 화면 : 위치값 = 정해둔 범위 : 실제 이동값
            // ->>윈도우가 1000px이면 1000부터 0으로 갈 것임. 중간에 위치값이 바뀌면서 500px 이렇게 바뀔 것이란 말임. 중간에 내가 정해둔 범위를 200px이라 하면 실제 이동값을 구할 수있음
            // ->>윈도우 1000px : 500px = 200px : x?
            // ->>>실제 이동값 = 정한범위-((위치값*정한범위) / 윈도우화면)
            // 👉x = setH2 - ((elpos * setH2) / winH)
            // ->>이동 수치는 0부터 서서히 증가해야하므로 정한 범위 수에서 빼준다!
            
            // 1.위치 이동값 계산
            let x = setH - (elpos * setH) / winH;
            console.log("x: ", -x);

            // 2.해당 요소에 위치 이동 CSS 반영시키기
            ele.style.cssText = `
                transform:translateY(${-x}px);
            `;
            // cssText 속성은 style속성값을 직접 넣어주므로 css문법 그대로 넣으면 됨! ->> 여러개 쓸 때엔 이게 편함
        } /////////////////// if: 윈도우 높이값 ~ 0까지 //////////////////////////


    }; ////////////////////// moveEl 함수 ///////////////////////



    // 8.스크롤 이벤트 함수 만들기
    window.addEventListener("scroll", ()=>{
        // 요소 변수에 담기
        let elpos = retVal(tg1[2]);

        // 테스트 - 3번째 텍스트 위치값
        console.log(elpos);



    }); /////////////////// scroll 이벤트 //////////////////////



} //////////////////////// loadFn 함수 /////////////////////////////////
