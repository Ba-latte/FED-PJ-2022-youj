/* 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js */

// 로딩구역 없이 함수로 구현함! /////////////////////

/********************************************************
    대상 변수 할당하기
********************************************************/
// 전체 페이지 번호
let pno = 0;
// 페이지 요소
const pg = $(".page");
// 전체 페이지 개수
const pgcnt = pg.length;
// console.log("페이지 개수: ", pgcnt, pg);
// 광클(광휠? 광실행;;)금지변수 - 변수를 배열에 담으면! 여러 금지 변수들 한번에 관리 가능함!
let prot = [];
// 광스크롤 금지
prot[0] = 0;

// GNB메뉴 li
const gnb = $(".gnb li");
// 인디케이터 메뉴 li
const indic = $(".indic li");

// 각 페이지별 등장요소
const minfo = $(".minfo");



/********************************************************
    이벤트 등록하기
********************************************************/
// 윈도우 휠 이벤트 발생시
$(window).on("wheel", wheelFn);
// GNB 메뉴 클릭시
// 대상 : .gnb a
$(".gnb a").click(chgMenu);
// 인디케이터 메뉴 클릭시
// 대상 : .indic a
$(".indic a").click(chgMenu);



// 새로고침시 스크롤위치를 계속 잡아두고 있기 때문에 세팅은 1번으로 바뀌는데 위치는 그대로임;; -> 바꿔야함
// 새로고침시 스크롤 위치 캐싱 변경하기 : 맨위로!
$("html,body").animate({scrollTop:"0px"});



/*******************************************************
    함수명 : wheelFn
    기능 : 마우스휠 이벤트 발생시 호출됨
    ->한 페이지씩 자동 스크롤 기능
*******************************************************/
function wheelFn(){
    // console.log("휠~~~");
    
    // 광휠금지 - 1이면 리턴 / 0이면 1을 주고 일정 시간(0.8초) 지난 후 0으로 다시 만들기
    if(prot[0]) return;
    chkCrazy(0);


    // 1.휠 방향 알아내기
    let delta = event.wheelDelta;
    console.log(delta);
    
    // 2.방향에 따른 페이지번호 증감
    if(delta < 0) {
        pno++;
        if(pno === pgcnt) pno = pgcnt-1;
        // 마지막 페이지 번호에 고정시키기! (더이상 증가 못하도록)
    }
    else{
        pno--;
        if(pno === -1) pno = 0;
        // 첫 페이지 번호에 고정시키기! (더이상 감소 못하도록)
    }
    // console.log(pno);
    
    // 3.스크롤 이동하기 + 메뉴에 클래스 "on" 넣기 (자신제외 형제들에게는 on빼기)
    movePg();

    
} ////////////////////////// wheelFn 함수 /////////////////////////////////




// 광클 초기값 (chgMenu에서의 광클금지)
prot[1] = 0;
/******************************************
    함수명 : chgMenu
    기능 : 메뉴 클릭시 메뉴 변경과 페이지 이동
******************************************/
function chgMenu(){
    console.log("나 클릭!", this);

    

    // 0.광클금지
    if(prot[1]) return;
    chkCrazy(1);

    
    // 1.클릭된 a요소의 부모 li순번을 구함 === pno
    let idx = $(this).parent().index();
    console.log(idx);
    // 2.전역 페이지 번호에 순번 업데이트
    pno = idx;

    // 3.페이지 이동 + 메뉴에 클래스 "on" 넣기 (자신제외 형제들에게는 on빼기)
    movePg();

} ///////////////// chgMenu 함수 ///////////////////////////




/*******************************************************
    함수명 : chkCrazy
    기능 : 광적 동작 체크하여 제어, 리턴
*******************************************************/
function chkCrazy(seq){ //// seq : 관리 변수 순번
    prot[seq] = 1;
    // 일정 시간 후 풀어주기
    setTimeout(()=>{prot[seq]=0}, 800);
} ////////////////// chkCrazy 함수 ///////////////////////




/*******************************************************
    함수명 : movePg
    기능 : 페이지 이동
*******************************************************/
function movePg(){
    // ⭐대상 : html, body -> 2개를 모두 잡아야 공통적으로 적용됨!!(모든 브라우저에서 적용되게 하려면~)⭐
    $("html, body").animate({
        scrollTop: ($(window).height()*pno) + "px"
    }, 800, "easeInOutBack", showEle);
    // 이동 후 콜백함수 (요소 등장 함수) 호출하기

    // 대상 : GNB메뉴, 인디케이터 메뉴
    gnb.eq(pno).addClass("on").siblings().removeClass("on");
    indic.eq(pno).addClass("on").siblings().removeClass("on");

} ///////////////// movePg 함수 ///////////////////////




// 등장할 요소 초기화
minfo.css({
    opacity: 0,
    transform: "translate(-50%, 50%)",
    transition: ".6s ease-out"
}); //////////// css //////////////////


/*******************************************************
    함수명 : showEle
    기능 : 페이지 이동 후 요소 등장하기
*******************************************************/
function showEle(){
    // .minfo 페이지별 등장하기
    pg.eq(pno).find(".minfo").css({
        opacity: 1,
        transform: "translate(-50%, -50%)",
    }) /////////// css ////////////////
    .parents(".page").siblings().find(".minfo").css({
        opacity: 0,
        transform: "translate(-50%, 50%)",
        transition: ".6s ease-out"
    });;
} //////////////////// showEle 함수 ///////////////////////

// 최초 호출하기
setTimeout(showEle, 1000);