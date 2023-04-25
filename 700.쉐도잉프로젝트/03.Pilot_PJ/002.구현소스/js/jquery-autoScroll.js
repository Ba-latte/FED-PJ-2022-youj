/* 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js */

// 로딩구역 없이 함수로 구현함! /////////////////////

// 전체를 함수로 묶어준다! /////////////
// 이유 : export 하기 위해!

function autoScroll(){
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
        기능 : 페이지 이동 애니메이션
    *******************************************************/
    function movePg(){
        // ⭐대상 : html, body -> 2개를 모두 잡아야 공통적으로 적용됨!!(모든 브라우저에서 적용되게 하려면~)⭐
        $("html, body").animate({
            scrollTop: ($(window).height()*pno) + "px"
        }, 800, "easeInOutBack", actPage
        // 이동 후 콜백함수 호출
        );

        // 대상: GNB메뉴 , 인디케이터 메뉴
        gnb.eq(pno).addClass("on").siblings().removeClass("on");
        indic.eq(pno).addClass("on").siblings().removeClass("on");
    
    } ///////////////// movePg 함수 ///////////////////////
    
    
    /**************************************************************
        [ 페이지 등장 액션 요소 적용하기 ]
    -이벤트 적용 시점 : 페이지 도착 후(애니 후 콜백)
    -이벤트 대상 : 각 페이지 동일
    (1).page .imgc : 이미지 파트
    (2).page .txtc h2 a : 타이틀 파트
    -변경 내용 : 스타일시트 아래 항목 변경
        (1)변경값
        transform: rotate(45deg);
        opacity: 0;
        transition: 1s 1s; ->> 타이틀만 지연시간을 주기
        (2)고정값
        transform-origin: left top;
        display: inline-block; ->> a요소만 주면 됨
    **************************************************************/
    
    /***************************************************************
        함수명 : initSet
        기능 : 등장요소 처음 상태 세팅
    ***************************************************************/
    function initSet(){
        
        // 1.초기화하기 //////////////////////
        // 대상선정 : .imgc
        $(".imgc").css({
            transform: "rotate(45deg)",
            transformOrigin: "-10% -10%",
            opacity: 0,
            transition: "1s ease-in-out",
        }); /////////////// css ////////////////
        // 대상선정 : .txtc a
        $(".txtc a").css({
            
            transform: "rotate(45deg)",
            transformOrigin: "-100% -100%",
            opacity: 0,
            transition: "1s ease-in-out .5s",
            display: "inline-block",
        }); //////////// css ///////////////
    } /////////////////////////// initSet 함수 ///////////////////////////////////

    // 초기화함수 최초 호출하기
    initSet();
    
    
    /********************************************************
        함수명 : actPage
        기능 : 페이지 도착 후 등장 애니메이션
    ********************************************************/
    function actPage(){ 
        // 이동후 확인
        console.log("액숀~!!",pno);

        // pno가 0 또는 4가 아니면 액션 작동!
        if(pno !== 0 || pno !== 4){
            // 대상선정 : 해당 순번의 .page 아래 .imgc 와 txtc a임
            $(`.page:eq(${pno}) .imgc, .page:eq(${pno}) .txtc a`)
            .css({
                transform: "rotate(0deg)",
                transformOrigin: "left top",
                opacity: 1,
            }); /////////////// css ////////////////
        } //////////////// if : 0 또는 4가 아닌 경우 /////////////////////

        // 첫페이지일 때 초기화 하기!
        if(pno === 0) initSet();
    
    } ///////////// actPage 함수 ////////////
    




    
} ///////////////////////// autoScroll ////////////////////////////////



// 전체 함수 내보내기
export default autoScroll;

