/* JS로 구현한 자동페이지 휠 JS : js-autoScroll.js */

// 새로고침할 때 스크롤위치 캐싱 무시하고 맨 위로 이동
// scrollTo(가로, 세로); : 위치 이동 메서드
setTimeout(()=>{window.scrollTo(0, 0)}, 100);

// 로딩 함수 호출
window.addEventListener("DOMContentLoaded", loadFn);

function loadFn(){
    
    // 호출 확인
    console.log("로딩 완료");

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
    // 전체 페이지 변수
    let pgnum = 0; // 현재 페이지 번호(첫페이지니까 0임!)
    

    // 1.전체 휠 이벤트 설정하기
    window.addEventListener("wheel", wheelFn, {passive: false});

    // 2.휠 이벤트 함수 만들기
    function wheelFn(e){ // 여기서 e는 이벤트 전달 변수임
        // (0)기본 기능 멈추기
        // addEventListener 옵션에서 passive:false 필수다!
        e.preventDefault();
        
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
            pgnum++;
            if(pgnum>6) pgnum = 6;
        }
        // 스크롤 윗방향 : 페이지번호 감소
        else{
            pgnum--;
            if(pgnum<0) pgnum = 0;
        }
        // console.log("페이지번호: ", pgnum);

        // (4)페이지 이동하기
        // scrollTo(가로, 세로);
        window.scrollTo(0, window.innerHeight*pgnum);
        // 세로 이동 위치 : 윈도우 높이값 * 페이지 번호
    } //////////////////// wheelFn 함수 끝 /////////////////


} //////////////////// loadFn함수 끝 ////////////////////////

