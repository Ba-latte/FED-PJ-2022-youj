/* 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js */

// 로딩구역 없이 함수로 구현함! /////////////////////

/********************************************************
    대상 변수 할당하기
********************************************************/
// 전체 페이지 번호
// let cnt_sc = 0;

// 1.🙂페이지 번호 대신 이동하는 스크롤 횟수
let cnt_sc = 0;

// 2.🙂스크롤 할 이동 단위를 써보자!!🙂
const unit_sc = 200;
// : 200px만큼 이동하겠다!

// 3.🙂스크롤 횟수 한계값 : 화면 가로폭 * 페이지수
let limit_sc = $(window).width()*7;
console.log("limit_sc", limit_sc);

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

// 키보드 이벤트발생시 업데이트
// 1. Page Up(33) / Up Arrow (38) 
// 2. Page Down(34) / Down Arrow (40) 
$(document).keydown((e)=>{
    // 이전페이지이동
    if(e.keyCode===33 || e.keyCode===38){
        cnt_sc--;
        if (cnt_sc === -1) cnt_sc = 0;
        movePg();
    }
    // 다음페이지이동
    else if(e.keyCode===34 || e.keyCode===40){
        cnt_sc++;
        if (cnt_sc === pgcnt) cnt_sc = pgcnt - 1;
        movePg();
    }
}); ///////////// keydown ////////////////




// 새로고침시 스크롤위치를 계속 잡아두고 있기 때문에 세팅은 1번으로 바뀌는데 위치는 그대로임;; -> 바꿔야함
// 새로고침시 스크롤 위치 캐싱 변경하기 : 맨위로!
$("html,body").animate({scrollLeft:"0px"});



/*******************************************************
    함수명 : wheelFn
    기능 : 마우스휠 이벤트 발생시 호출됨
    ->한 페이지씩 자동 스크롤 기능
*******************************************************/
function wheelFn(){
    // console.log("휠~~~");
    
    // 광휠금지 - 1이면 리턴 / 0이면 1을 주고 일정 시간(0.8초) 지난 후 0으로 다시 만들기
    // if(prot[0]) return;
    // chkCrazy(0);


    // 1.휠 방향 알아내기
    let delta = event.wheelDelta;
    console.log(delta);
    
    // 2.방향에 따른 페이지번호 증감
    if(delta < 0) {

        // 스크롤 횟수*단위 이동값 크기가 전체 크기보다 작을 때만 ++처리함!
        if(cnt_sc*unit_sc < limit_sc){
            cnt_sc++;
        }
        
    }
    else{
        // 스크롤 횟수*단위 이동값 크기가 0보다 클때만 --처리함!
        if(cnt_sc*unit_sc > 0){
            cnt_sc--;
        }
    }
    console.log(cnt_sc);
    
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

    
    // 1.클릭된 a요소의 부모 li순번을 구함 === cnt_sc
    let idx = $(this).parent().index();
    console.log(idx);
    // 2.전역 페이지 번호에 순번 업데이트
    cnt_sc = idx;

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
    // 🙂이동할 위치 -> 이동단위 * 스크롤 횟수
    let mpos = unit_sc * cnt_sc;

    // ⭐대상 : html, body -> 2개를 모두 잡아야 공통적으로 적용됨!!(모든 브라우저에서 적용되게 하려면~)⭐
    $("html, body").stop().animate({
        // stop()를 추가해주면 중간에 중복되는 것들은 지워지고 맨 마지막만 살려서 적용시킴(이러지 않으면 광클처럼 호출한 게 메모리에 쌓이게 됨)
        scrollLeft: mpos + "px"
        // -->> 가로스크롤 이동이므로 scrollLeft를 적용함!!
        // -->> 가로스크롤 이동 기준은 윈도우width임
    }, 2000, "easeOutBack",
    // 🙂showEle ->이동 후 콜백함수 지금은 안쓸거니까 주석처리하기
    );

    // 🙂대상 : GNB메뉴, 인디케이터 메뉴 ->> 지금은 안바꿀꺼니까 주석 처리하기
    // gnb.eq(cnt_sc).addClass("on").siblings().removeClass("on");
    // indic.eq(cnt_sc).addClass("on").siblings().removeClass("on");

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
    pg.eq(cnt_sc).find(".minfo").css({
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
// 🙂setTimeout(showEle, 1000); ->> 안쓸꺼니까 주석처리~