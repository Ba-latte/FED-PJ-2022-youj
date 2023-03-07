/* JS로 구현한 자동페이지 휠 JS : js-autoScroll.js */

// 새로고침할 때 스크롤위치 캐싱 무시하고 맨 위로 이동
// scrollTo(가로, 세로); : 위치 이동 메서드
setTimeout(()=>{window.scrollTo(0, 0)}, 100);

// 로딩 함수 호출
window.addEventListener("DOMContentLoaded", loadFn);


/******************************************************************
    함수명 : loadFn
    기능 : 페이지 로딩시 기능 수행
******************************************************************/
function loadFn(){
    
    // 호출 확인
    console.log("로딩 완료");

    // [ 🌈이벤트 연결 대상 선정하기 ] //////////////////////////////////
    // (1)GNB메뉴
    const gnb = document.querySelectorAll(".gnb a");
    // (2)인디케이터 메뉴
    const indic = document.querySelectorAll(".indic a");
    // console.log(indic);

    // [ 🌈이벤트 연결 함수 등록하기 ] //////////////////////////////////
    // (1)GNB메뉴 이벤트 연결 : 여러개니까 forEach로 하면 됨
    gnb.forEach((ele, idx, obj)=>{
        // ele는 요소 idx는 순번 obj는 전체 객체!! 자기 자신 즉 gnb를 말함!!!!
        
        ele.addEventListener("click", ()=>movePg(idx, obj));
        // : movePg가 idx를 가지고 들어가기를 원한다면!! 함수() 이렇게 쓰면 안된다! 바로 실행되는 놈임!!
        // 그러니까 익명함수로 한번 감싸서 보내야함!!!!
        // ->이렇게 감싸서 보내면 이걸 '간접함수'라고 한다 (반대로 그냥 함수명만 쓰면 직접함수임)
        // 🌷전체 객체(obj)를 함수에 전달하는 이유는?
        // : 인디케이터도 gnb와 같은 기능을 수행하기 때문에, 호출시 자기자신 전체를 보내야 각각에 맞게 기능을 수행할 수 있다!
        // (obj전달 안 하면, for문도 2번 돌려야 하기 때문에..코드 낭비!)

    }); ////////////////////// forEach() 끝 /////////////////////////////

    // (2)인디케이터 메뉴 이벤트 연결
    indic.forEach((ele, idx, obj)=>{
        // ele는 요소 idx는 순번 obj는 전체 객체

        ele.addEventListener("click", ()=>movePg(idx, obj));

    }); ////////////////////// forEach() 끝 /////////////////////////////


    /***********************************************************
        [ 휠 이벤트를 이용한 페이지 이동 컨트롤하기 ]
    -휠 이벤트 명 : wheel (최신 이벤트임)
    (예전엔 mousewheel 이벤트가 사용됨 -> 지금은 공식적으로 폐기됨)
    1.사용법 :
        (1)이벤트속성에 함수를 할당
            요소.onwheel = ()=>{}; (함수 할당)
        (2)브라우저 이벤트에 등록하기
            요소.addEventListener("wheel", 함수, {옵션});
    2.포인트 :
        (1)기존의 휠 이동 기능을 정지시켜놔야 함
        -> event.preventDefault();
        (2)휠 방향을 알아내어 기능과 매칭해야 함
        -> event.wheelDelta (휠 방향 속성을 나타냄)
        (3)페이지 번호를 전역적으로 사용함
        ->let pgnum = 0; 
    3.휠 이벤트 대상 :
        (1)전체 스크롤바인 경우 : window
        (2)개별 박스인 경우 : 선택요소
    4.scroll 이벤트와 wheel 이벤트 비교
        (1)공통점 : 스크롤되는 페이지의 위치 이동
        (2)차이점 : 마우스 휠의 동작에만 반응하는 이벤트는 wheel이벤트임
        ->스크롤바의 이동에 반응하는 이벤트는 scroll이벤트임!

    __________________________________________________________
        [ addEventListener 메서드의 옵션에 관하여 ]
    기존 addEventListener의 3번째 파라미터로 캡쳐링/버블링 여부를 
    제어할 수 있는 부분이 EventListenerOptions이라는 객체형태의 
    추가 옵션을 받을수 있음

    EventListenerOptions 사용 전
    document.addEventListener('touchstart', handler, false);

    EventListenerOptions 사용 후
    document.addEventListener("touchstart", handler, {
        capture: false,
        once: false,
        passive: false
    });

    ※ 현재 크롬에서 지원하는 EventListenerOptions 옵션은 다음과 같다.

    (1) capture: 이벤트 캡쳐링 적용 여부. 크롬 49부터 지원
    (2) once: 이벤트를 한번만 호출하고 해제되는 옵션. 크롬 55부터 지원
    (3) passive: 스크롤 성능 향상을 위한 옵션으로 true일 경우, 
        스크롤을 위해 블록되는 것을 방지함. 이 경우, 
        preventDefault를 사용할 수 없음. 크롬 51부터 지원
        이 중, passive 속성은 성능향상을 위해, 
        브라우저의 기능을 프로그래밍으로 제어할수 있음
        ->최근 업데이트된 브라우저는 passive 기본값이 true로 세팅되므로
        window, document, body 이 3가지 객체에 대해 스크롤 막기 기능을 비활성화 하였다
        ->>따라서 기본기능을 막고자 하면 passive: false 로 만들어서, 기능을 활성화 해야 한다
    ***********************************************************/
    // 0.변수 설정하기
    // (1)전체 페이지 변수
    let pgnum = 0; // 현재 페이지 번호(첫페이지니까 0임!)
    // (2)전체 페이지의 수를 변수에 담아두기
    const pgcnt = document.querySelectorAll(".page").length;
    // console.log("전체 페이지 수: ", pgcnt);
    // (3)광스크롤 금지 변수 (0이면 허용, 1이면 불허용하도록 만들 예정)
    let prot_sc = 0;


    // 1.전체 휠 이벤트 설정하기
    window.addEventListener("wheel", wheelFn, {passive: false});

    // 2.휠 이벤트 함수 만들기
    function wheelFn(e){ // 여기서 e는 이벤트 전달 변수임
        // (0)기본 기능 멈추기
        // addEventListener 옵션에서 passive:false 필수다!
        e.preventDefault();

        // 🍓광스크롤 막기!
        // : 만약 prot_sc의 값이 1이라면 return시키고, 아니라면 허용해주고 prot_sc의 값을 1로 바꾸기 (신호 1개만 허용됨)
        if(prot_sc) return;
        prot_sc = 1;
        setTimeout(()=>{prot_sc=0}, 800);
        // : 0.8초의 시간 후에 다시 허용 상태로 전환해주기

        
        // (1)호출 확인
        // console.log("휠~~~~");

        // (2)휠 방향 알아내기
        // 이벤트객체,wheelDelta
        let dir = e.wheelDelta;
        // console.log("방향: ", dir);
        // 휠을 내리면 마이너스 / 올리면 플러스임
        
        // (3)방향에 따른 페이지번호 증감시키기
        // 스크롤 아랫방향 : 페이지번호 증가
        if(dir<0){
            // 페이지 번호 1씩 증가시키기
            pgnum++;
            // 한계수 설정 : 페이지 끝 번호(페이지수-1)보다 커지면 페이지 끝 번호보다 많아지지 않게 계속 고정시키기
            if(pgnum>(pgcnt-1)) pgnum = pgcnt-1;
        } /////////////// if문 끝 /////////////////////
        // 스크롤 윗방향 : 페이지번호 감소
        else{
            // 페이지 번호 1씩 감소시키기
            pgnum--;
            // 한계수 설정 : 페이지 첫 번호인 0보다 더 작아지면, 0보다 더 작아지지 않게 계속 0으로 만들어서 고정시키기
            if(pgnum<0) pgnum = 0;
        } //////////////// else문 끝 /////////////////////

        // console.log("페이지번호: ", pgnum);

        // (4)페이지 이동하기 + 메뉴 변경 -> updatePg함수를 호출하기
        updatePg(gnb);
        updatePg(indic);

    } //////////////////// wheelFn 함수 끝 /////////////////




    /******************************************************
        함수명 : movePg
        기능 : 메뉴 클릭시 해당 위치로 이동하기
    ******************************************************/
    function movePg(seq, obj){ // seq는 순번을 받아온 것임 / obj는 요소전체!를 받아온 것임
        // 1.기본 기능 막기
        event.preventDefault();
        // : passive는 window, document, body 이 세 객체만!!! 기본기능막기가 안되는 것임~ a는 해당 안됨~

        // 2.호출확인
        // console.log("이동!", seq, obj);

        // 3.페이지번호(pgnum) 업데이트 하기
        pgnum = seq;
        // : 받은 값(seq)으로 이동할 것이기 때문에 페이지번호에 다시 담아서 업데이트 해주는 것임

        // console.log("메뉴 클릭 페이지 번호: ", pgnum);

        // 4.업데이트 페이지 호출하기 : 페이지 이동, 메뉴 변경하는 기능을 하는 함수임
        updatePg(gnb);
        updatePg(indic);
        // updatePg(obj);
        // ->>개별 객체를 업데이트 할 때에는 obj가 필요했으나, GNB메뉴와 인디케이터가 모두 업데이트 되어야 하므로,
        // 개별 obj가 필요없게 되었다!

    
    } ///////////////////////////////// movePg 함수 끝 ///////////////////////////////////


    // 📢함수의 고도화 ㅎㅎㅎㅎ 특정 기능만 하는 함수를 만들기
    /*********************************************************
        함수명 : updatePg
        기능 : 페이지 이동시 설정값 업데이트하기
    *********************************************************/
    function updatePg(obj){ // obj : 변경할 메뉴 전체 객체 / 
        // 1.함수호출 확인
        // console.log("업데이트!");

        // 2.페이지 이동하기
        // scrollTo(가로, 세로);
        window.scrollTo(0, window.innerHeight*pgnum);
        // 세로 이동 위치 : 윈도우 높이값 * 페이지 번호
        // ->즉 높이값 만큼 이동하는 것임

        // 3.메뉴 초기화하기 (클래스 .on 빼기) -> 넘어온 obj(요소 전체)를 가지고 처리하는 것임~
        for(let x of obj){
            x.parentElement.classList.remove("on");
        }

        // 4.해당메뉴에 클래스 넣기
        obj[pgnum].parentElement.classList.add("on");

        // 5.페이지 이동 후 해당 페이지 액션 주기! (업데이트함수는 모든 곳에서 호출되니까, 그냥 여기안에 넣으면~ 알아서 얘도 모든 곳에서 호출될거아니야~)
        // pageAction 함수 호출!
        setTimeout(()=>pageAction(pgnum), 1000);
        // : 페이지 이동 후 시차를 1초로 설정하고, 
        // 페이지번호(pgnum)를 가지고 들어가야하기 때문에 익명함수로 한번 감싸줌!

    } /////////////////// updatePg 함수 끝 //////////////////////////


    /*****************************************************************
        함수명 : initCSS
        기능 : 등장할 요소들의 초기값 세팅하기
    *****************************************************************/
    // 1.대상선정 : .minfo
    const minfo = document.querySelectorAll(".minfo");
    // console.log(minfo);

    // 2.이벤트 설정
    minfo.forEach((ele, idx)=>{initCSS(ele, idx)});

    // 3.함수 만들기
    function initCSS(ele, seq){ // ele는 요소, seq는 순번!
        // (1)함수 호출 확인
        // console.log("초기화!", seq);

        // (2)해당요소 스타일속성 선택하기
        let sty = ele.style;

        // (3)각 요소별 초기화하기
        // 트랜지션 공통 초기화
        sty.transition = "none";
        // 페이지별
        if(seq === 0){ // 1번 페이지
            // 오른쪽에 나가있기!
            sty.left = "130%";
        } ////////////// if ////////////////////
        else if(seq === 1){ // 2번 페이지
            // 투명하게!
            sty.opacity = 0;
        } /////////////// else if //////////////////
        else if(seq === 2){ // 3번 페이지
            // 위에서 올라가 있기!
            sty.top = "-50%";
        } /////////////// else if //////////////////
        else if(seq === 3){ // 4번 페이지
            // 중앙 스케일 0!
            sty.transform= "translate(-50%, -50%) scale(0)";
        } /////////////// else if //////////////////
        else if(seq === 4){ // 5번 페이지
            // y축 회전
            sty.transform= "translate(-50%, -50%) rotateY(180deg)";
            // 투명하게!
            sty.opacity = 0;
        } /////////////// else if //////////////////
        else if(seq === 5){ // 6번 페이지
            // 스케일0, 평면회전
            sty.transform= "translate(-50%, -50%) scale(0) rotate(720deg)";
            // 투명하게!
            sty.opacity = 0;
        } /////////////// else if //////////////////
        else if(seq === 6){ // 7번 페이지
            // x축 확대
            sty.transform= "translate(-50%, -50%) scaleX(10)";
            // 투명하게!
            sty.opacity = 0;
        } /////////////// else if //////////////////
    } /////////////////// initCSS 함수 끝 ///////////////////////////


    /**********************************************************
        함수명 : pageAction
        기능 : 페이지별 액션 주기
    **********************************************************/
    function pageAction(seq){ // seq는 변경 순번
        // 1.호출 확인
        // console.log("액션!: ", seq);

        // 2.변경대상 스타일 속성 선택하기
        let sty = minfo[seq].style;

        // 3.전체 초기화시키기!
        minfo.forEach((ele, idx)=>{initCSS(ele, idx)});

        // 4.해당페이지 액션 주기
        if(seq === 0){ // 1번 페이지
            // 오른쪽에 나가있기!
            sty.left = "50%";
            // 트랜지션 주기!
            sty.transition = ".8s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s";
        } ////////////// if ////////////////////
        else if(seq === 1){ // 2번 페이지
            // 투명도 복원하여 나타나게 만들기!
            sty.opacity = 1;

            // 트랜지션 주기
            sty.transition = "1.5s ease-in";
        } /////////////// else if //////////////////
        else if(seq === 2){ // 3번 페이지
            // 위에서 올라가 있기!
            sty.top = "50%";
            // 트렌지션 주기!
            sty.transition = "1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s";
        } /////////////// else if //////////////////
        else if(seq === 3){ // 4번 페이지
            // 중앙 스케일 복구!
            sty.transform= "translate(-50%, -50%) scale(1)";
            // 트렌지션 주기!
            sty.transition = ".8s ease-in-out";
        } /////////////// else if //////////////////
        else if(seq === 4){ // 5번 페이지
            // y축 회전 원상복귀
            sty.transform= "translate(-50%, -50%) rotateY(0deg)";
            // 나타나게하기!
            sty.opacity = 1;
            // 트렌지션 주기!
            sty.transition = ".7s ease-out";
        } /////////////// else if //////////////////
        else if(seq === 5){ // 6번 페이지
            // 스케일0, 평면회전
            sty.transform= "translate(-50%, -50%) scale(1) rotate(0deg)";
            // 투명하게!
            sty.opacity = 1;
            // 트렌지션 주기!
            sty.transition = ".5s ease-in-out";
        } /////////////// else if //////////////////
        else if(seq === 6){ // 7번 페이지
            // x축 확대
            sty.transform= "translate(-50%, -50%) scaleX(1)";
            // 투명하게!
            sty.opacity = 1;
            // 트렌지션 주기!
            sty.transition = "1s ease-in-out";
        } /////////////// else if //////////////////
    } //////////////////// pageAction 함수 끝 //////////////////////

    // 첫페이지 페이지액션 함수 적용 위해서 최초 호출하기
    setTimeout(()=>pageAction(0),1000);

} //////////////////// loadFn함수 끝 ////////////////////////

