// 보그 PJ 메인 페이지 JS - main.js

//////////////////////////////// 로딩 구역 ///////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", ()=>{


    /********************************************************************
        [ 리턴함수 세팅 구역 ]
    *********************************************************************/
    // 1. 요소 선택 함수 - querySelectorAll() 함수
    const q = x => {
        // (1) 리턴할 요소를 담을 공간인 변수 만들기 - rv (return value)
        let rv = document.querySelectorAll(x);

        // (2) 요소 개수를 체크하기
        let cnt = rv.length;
        // cg(cnt + "개");

        // (3) 1개일 경우, 첫번째만 선택해서 리턴하기
        if(cnt===1) rv = rv[0];

        // (4) 결과 리턴하기
        return rv;

    }; ///////////////////// q함수 끝 ////////////////////////////



    // 2. 콘솔 출력 함수
    const cg = x => console.log(x);
    // : 이미 로딩된 상태라서 밑에 써도 상관없이 위에서 실행됨


    // 3. 등장액션 대상 위치값 리턴함수
    const retVal = 
    ele => ele.getBoundingClientRect().top;


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /***********************************************************************
        [⭐스크롤 등장 액션 기능 구현하기⭐]
    1.대상선정 : .scAct
    -대상선정해서 변수에 담기
    -등장액션 대상 위치값 리턴 함수 만들기
    -스크롤 이벤트 세팅하기
        -값 확인해보기
    -클래스 넣기 함수 만들기
    ***********************************************************************/
    // ⭐1.대상선정
    // 스크롤 등장 대상 - .scAct
    const scAct = q(".scAct");
    // 상단메뉴 대상 - #top
    const topA = q("#top");
    // 상단이동버튼 대상 - .tbtn
    const tbtn = q(".tbtn");
    // 화면높이값의 2/3구하기
    const hv = window.innerHeight/3*2;
    // console.log("2/3높이:",hv);
    // cg(tbtn);





    // ⭐2.클래스 넣기 함수 만들기 ///////
    const showIt = ele => { // ele - 등장요소
        // 대상요소의 현재스크롤 위치
        let xval = retVal(ele);

        // 구간적용여부 검사하기
        // 0보다 크고 화면의 2/3보다 작은 구간!
        if(xval < hv && xval > 0){
            // console.log("작동!~~~~");
            // 해당요소에 클래스 넣기!
            ele.classList.add("on");
        }
        // 만약 되돌리고 싶다면! else문으로 on을 제거하게 만들면 된다
        // else{
        //     ele.classList.remove("on");
        // }
    }; //////////// showIt //////////




    // ⭐4.현재 스크롤위치 담을 변수 만들기
    let scTop;


    // ⭐3.스크롤 이벤트 세팅하기
    window.addEventListener("scroll", ()=>{
        // 값 확인하기
        // cg("박스1: "+retVal(scAct[0]));

        // 현재 스크롤 위치 확인하기
        scTop = window.scrollY;
        // cg(stop);
        
        // ⭐5.상단영역 슬림메뉴 적용하기 (만약 scTop가 100보다 같거나 크다면, on클래스 추가하고, 그외에는 on클래스 제거해라)
        if(scTop >= 100) topA.classList.add("on");
        else topA.classList.remove("on");

        // ⭐6.상단 이동버튼 보이기/숨기기
        if(scTop >= 300) tbtn.classList.add("on");
        else tbtn.classList.remove("on");

        // 스크롤등장 요소 개수만큼 for문으로 돌리기
        for(let x of scAct) showIt(x);

    }); ////////////////////////////// scroll 이벤트 끝 ///////////////////////////////////















}); /////////////////////////// 로딩 구역 끝 /////////////////////////////////////////////