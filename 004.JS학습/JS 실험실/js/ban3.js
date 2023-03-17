// JS실험실: 03.배너스타일 JS -  ban3.js

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:
        -> left 이동의 기준값이 -220% 인것이 포인트!
        (이유: 2장의 슬라이드가 앞에 나가있음. 잘라내는 것이
            숨겨져야하므로 셋팅한것임!)

        (1) 오른쪽 버튼 클릭시

            ※ 변경된부분!!!
            {   트랜지션 중앙 커지기를 적용한 경우이므로
                왼쪽버튼과 같이 잘라내기를 먼저하여
                슬라이드 주인공 순서를 일치 시킨다!!!! }

            -> 슬라이드 이동전!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 -110%으로 변경한다!
        
            다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -220%로 변경시킨다.
            

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -330%로 변경한다.
            그 후 left값을 -220%으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

// ⭐⭐⭐goSlide함수가 원래는 지역변수에 담긴 함수라서, 다른 곳에서 호출 불가능했음!⭐⭐⭐⭐⭐
// 그래서 전역화 해주기!
// const goSlide; ->> const하면 할당도 안 하고 선언한다고 에러생김 ㅠㅠ 그래서 let으로 해주면 됨!!
let goSlide;
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐


/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
    console.log("로딩완료!");

    // 1. 대상선정 //////////////////////////
    // 1-1. 이벤트 대상: .abtn
    const abtn = document.querySelectorAll(".abtn");

    // 1-2. 변경 대상: #slide
    const slide = document.querySelector("#slide");

    // 1-3. 블릿 대상: .indic li
    const indic = document.querySelectorAll(".indic li");
    // console.log(indic);

    // 1-4. 슬라이드 li리스트
    let slist = document.querySelectorAll("#slide>li");

    // [ 🎃드래그 대상(#slide)에 드래그 적용 함수 호출하기🎃 ]
    goDrag(slide);

    // [ 초기화1 - 순번붙이기 ] ///////////////////
    // 잘라내기로 li순번이 뒤섞이므로 블릿변경 매칭을 위한
    // 고유순번을 사용자정의 속성(data-)으로 만들어준다!
    slist.forEach((ele, idx) => {
        // data-seq 라는 사용자정의 속성 넣기
        ele.setAttribute("data-seq", idx);
    }); ////// forEach /////////////////

    // [ 초기화2 - 맨뒤요소 맨앞으로 이동 2번하기! ]
    // 맨뒤 맨앞이동 함수만들기
    const chgSeq = () => {
        // 현재 슬라이드 li 새로읽기(2번반복시 li의 순서가 달라지기때문)
        slist = document.querySelectorAll("#slide>li");
        // 맨뒤 맨앞이동하기 -> 변경대상: #slide -> slide변수
        slide.insertBefore(slist[slist.length - 1], slist[0]);
        // slide.insertBefore(넣을놈,넣을놈전놈)
        // slide.insertBefore(마지막요소,첫요소)
        // slide.insertBefore(slist[개수-1],slist[0]);
    }; ////////// chgSeq함수 ///////////

    // 2번 맨뒤 맨앞이동 함수 호출하기!!!
    for (let i = 0; i < 2; i++) chgSeq();

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;

    // 2. 슬라이드 변경함수 만들기
    // 호출시 seq에 들어오는 값중 1은 오른쪽, 0은 왼쪽
    goSlide = (seq) => {
        //  console.log("슬고우!", seq);

        //  console.log("못들어갔어!!!!");

        // 광클금지 설정하기 //////
        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 400); /// 0.4초후 해제! ///

        //  console.log("나,들어왔어!!!");

        // 0. 현재의 슬라이드 li수집하기
        let clist = slide.querySelectorAll("li");
        // clist -> current list 현재 리스트

        // 1. 방향에 따른 분기
        // 1-1. 오른쪽버튼 클릭시 ////////////////
        if (seq) {
            //  console.log("오른!");

            // 1. 슬라이드 이동전 먼저 잘라낸다!
            // 이유: 슬라이드 순서를 왼쪽이동과 동일하게 함!
            // 중앙확대 트랜지션 적용시 동작이 달라지므로!

            // (1-1) 바깥에 나가있는 첫번째 슬라이드
            //       li를 잘라서 맨뒤로 보낸다!
            slide.appendChild(clist[0]);
            // (1-2) 동시에 left값을 -110%으로 변경한다!
            slide.style.left = "-110%";
            // (1-3) 트랜지션 없애기!
            slide.style.transition = "none";

            // (2) 오른쪽 버튼 클릭시 다음 슬라이드가
            //     나타나도록 슬라이드 박스의 left값을
            //     -220%로 변경시킨다.

            // [코드분리하기!] //////////////////////////
            // -> 같은속성변경을 같은 메모리공간에서 수행하면
            // 변경효과가 없음!!!
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-out";
                // : ease-in-out가 걸려있으면, 좀 부자연스러움!
                // = 드래그 끌다가 손 놓았을 때의 그 속도를 받아서 똑같은 속도로 넘어가야하는데
                // in이 들어가있으면 속도가 줄어버리므로, 조금 부자연스러워짐!
                // 그래서 in을 빼고 ease-out만 줌!
            }, 1); //// 타임아웃 //////
            // : 시간에 0을 쓰면 인터발 호출시 트랜지션이 안먹히느 에러가 있음! 1만 써도 괜찮음

            // -> 타이밍함수는 기존 함수인 스택(Stack)메모리 공간이 아닌
            // 대기실행 공간인 큐(Queue)메모리공간에서 실행하므로
            // 코드가 동시에 바뀌는 것을 막아주고 의도한 대로
            // 시차실행을 가능하게 해준다!
        } //////////// if : 오른쪽클릭시 //////

        // 1-2. 왼쪽버튼 클릭시 //////////////
        else {
            //  console.log("왼쪽!");

            // (1) 왼쪽버튼 클릭시 이전 슬라이드가
            // 나타나도록 하기위해 우선 맨뒤 li를
            // 맨앞으로 이동한다.
            // slide.insertBefore(넣을놈,넣을놈전놈)
            // slide.insertBefore(맨끝li,맨앞li)
            slide.insertBefore(clist[clist.length - 1], clist[0]);

            // (2) 동시에 left값을 -330%로 변경한다.
            slide.style.left = "-330%";
            // 이때 트랜지션을 없앤다(한번실행후 부터 생기므로!)
            slide.style.transition = "none";

            // (3) 그 후 left값을 -220%으로 애니메이션하여
            // 슬라이드가 왼쪽에서 들어온다.
            // 동일 속성인 left가 같은 코딩처리 공간에 동시에
            // 있으므로 이것을 분리해야 효과가 있다!
            // setTimeout을 사용한다!
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-in-out";
            }, 0); ////// 타임아웃 /////////
        } //////////// else : 왼쪽클릭시 //////

        // 2. 현재 슬라이드 순번과 같은 블릿표시하기
        // 대상: .indic li -> indic변수
        // 2-1. 현재 배너리스트 업데이트하기
        clist = slide.querySelectorAll("li");
        // !!!!! 오른쪽이든 왼쪽이든 먼저 잘라내기 때문에
        // 순번은 3번째로 일치함!!!!!!
        // console.log("다시수집:",clist);

        // 2-2.방향별 읽어올 슬라이드 순번으로 "data-seq"값 읽어오기
        // 세번째 슬라이드가 주인공이니까 0,1,2 즉 2번을 쓰면됨!!!
        let cseq = clist[2].getAttribute("data-seq");
        //  console.log("현재순번:", cseq);

        // 2-3. 블릿초기화
        for (let x of indic) x.classList.remove("on");

        // 2-4. 읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on");
    }; ////////// goSlide함수 ///////////

    // 3. 이동버튼대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 1. 인터발지우기함수 호출!
            // clearAuto();
            // 2. 슬라이드 함수 호출!
            goSlide(idx);
        }; ///// click함수 //////
    }); /////// forEach //////////

    ////////////////////////////
    // 자동넘김 설정하기 ////////

    // 일정시간간격 넘어가기
    // -> setInterval(함수,시간)

    // [인터발함수의 함수전달값 사용예
    // (타임아웃함수도 동일함)]
    // 1. 함수에 전달값이 없으면 함수명만 사용가능
    // setInterval(goSlide,3000);
    // 2. 전달값이 있다면 익명함수구역에 코딩
    // setInterval(function(){goSlide(1)},3000);
    // 3. 화살표함수사용가능
    // setInterval(()=>{goSlide(1)},3000);
    // 4. 화살표함수에서 중괄호 생략가능
    // setInterval(()=>goSlide(1),3000);

    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;

    /************************************ 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ************************************/
    function autoSlide() {
        console.log("인터발시작!");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(() => goSlide(1), 3000);
    } ////////////// autoSlide함수 //////////

    // 자동넘김 최초호출!
    // autoSlide();

    /************************************ 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시셋팅
   ************************************/
    function clearAuto() {
        console.log("인터발멈춤!");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면
        // 쌓여서 타임아웃 쓰나미실행이 발생한다!
        clearTimeout(autoT);

        // 3. 잠시후 다시 작동하도록 타임아웃으로
        // 인터발함수를 호출한다!
        // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    } ///////// clearAuto 함수 /////////////


} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////

/***************************************************************************************
    [ 슬라이드에 드래그 기능을 적용할 때의 체크사항 ]

1.드래그 적용시 한쪽 방향만 적용시킨다!
(가로 슬라이드인 경우 x축만 적용 활성화 한다)

2.드래그 대상 슬라이드의 "모든 하위 요소"는 선택이 안 되도록 아래와 같이 CSS 속성을 세팅한다!
->>  user-select: none;
    -webkit-user-drag: none;
    (보통 위에것만 써도 되긴 하는데, 완벽히? 하려면 둘 다 쓰면 됨)
->> 이렇게 하면 끌고다녀지지 않는다!
    ex) #slide *{선택/드래그 금지 속성 세팅하기;}

3.마지막 위치포인트값(lx)을 초기값과 같은 값으로 세팅한다
-#slide에는 left:-220% 가 초기값으로 적용되어 있다

4.이동함수를 호출할 수 있게 전역화하기! (const는 할당 안하고 선언하면 에러생기므로 let으로 선언해준다!)
->> 함수 바깥쪽에서 선언해주면 됨

5.드래그시 이동할 때 적용된 트랜지션을 지워준다!
-안 그러면 기능이 잘 작동 안하거나 버벅이게 되므로!
->> transition: none; 을 쓰면 됨
->> 적용할 곳은 드래그 시작할 때임! 즉, 드래그 함수 내 mousemove 이벤트함수 구역에 설정하면 됨!!

그전에 만든 드래그기능에는 마지막위치값을 업데이트 해줬음!
왜? 마지막 위치에서 드래그시작하니까!
하지만 슬라이드 배너는 마지막 위치값이 항상 동일하므로!
마지막 위치 업데이트하는 함수는 주석처리 해줘야 한다!

6.드래그 마지막(mouseup)처리시 마지막위치 업데이트는 할 필요가 없다
->> lastPoint() 함수 호출 주석 처리해주기

7.슬라이드 이동시 트랜지션에 이징 설정이 'ease-in...'이 들어가면 드래그가 끝나고 이동할 때 느리게 시작하므로 어색하다!
따라서 이징은 ease-out으로 주는 것이 좀 더 자연스럽다!

8.화면사이즈가 바뀌면 기능이 이상하게 된다
왜? 리사이즈될 때 lx값을 바꿔주지 않았기 때문에!
->> 그래서 화면 크기 변경시 lx값 업데이트해주기
->> 화면크기 변경 감지하는 이벤트 : resize 이벤트
->> lx = -obj.parentElement.clientWidth * 2.2;
->> 이때 마이너스(-)를 까먹지 말고 꼭!! 붙여줘야 한다!!

***************************************************************************************/



/*****************************************************
    [ 드래그 다중 적용 함수 만들기 ]
-함수명 : goDrag
-기능 : 다중 드래그 기능 적용
*****************************************************/

function goDrag(obj) {
    // obj : 드래그 대상(슬라이드 요소)

    // 🎶변수 만들기 //////////////////
    // (1) 드래그 상태 변수 -> true: 드래그 중 / false: 드래그 아님
    let drag = false;
    // (2) 첫번째 위치 포인트 first x, first y
    let fx, fy;
    // (3) 마지막 위치 포인트 last x, last y ->> 맨처음에는 마지막위치포인트가 없으니까, 0을 할당해둬야함
    
    //////// ⭐⭐⭐⭐슬라이드 처음 left값 세팅하기⭐⭐⭐⭐ ///////////////
    let lx = obj.offsetLeft,
    // offsetLeft는 요소(슬라이드)의 left값임
    ly = 0;
    //////// ⭐⭐⭐⭐슬라이드 처음 left값 세팅하기⭐⭐⭐⭐ ///////////////
    // console.log(lx);

    // (4) 움직일 때 위치 포인트 move x, move y
    let mvx, mvy;
    // (5) 위치이동 차이값 저장할 변수 result x, result y
    let rx, ry;

    // 🎶함수 만들기 : 할당형 익명함수 //////////////////
    // (1) 드래그상태 true 인 변수
    const dTrue = () => (drag = true);
    // (2) 드래그상태 false 인 변수
    const dFalse = () => (drag = false);
    // (3) 드래그 움직일 때 작동 함수
    const dMove = () => {
        // console.log("드래그 상태: ", drag);

        // 드래그 상태일때만 실행
        if (drag) {

            // ⭐⭐⭐⭐⭐⭐⭐⭐⭐트랜지션 없애기⭐⭐⭐⭐⭐⭐⭐⭐⭐
            obj.style.transition = "none";
            // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐


            // 1.드래그 상태에서 움직일 때의 위치값 : mvx, mvy
            mvx = event.pageX;
            mvy = event.pageY;

            // 2.움직일 때의 위치값 - 처음 위치값 -> rx, ry에 담을 예정임
            // x축 값 = left값, y축 값 = top값이 됨!
            rx = mvx - fx;
            ry = mvy - fy;

            // 3.x,y 움직인 위치값을 타겟요소에 적용하기
            obj.style.left = rx + lx + "px";
            // ⭐⭐⭐⭐⭐⭐⭐⭐⭐x축만 적용되게 하기 위해서 y축 적용 안함!!⭐⭐⭐⭐⭐⭐⭐⭐⭐
            // obj.style.top = ry + ly + "px";
            // ⭐⭐⭐⭐⭐⭐⭐⭐⭐x축만 적용되게 하기 위해서 y축 적용 안함!!⭐⭐⭐⭐⭐⭐⭐⭐⭐

            // ->> 그런데, 한번 드래그 후 다시 하려면 원래위치로 돌아가버려서 고장남 ㅠㅠ
            // ->>즉! 한번 드래그 후 다시 드래그할 때! 움직인 위치값이 필요! -> 따로 저장해야 함!
            // ->>마지막 위치값 저장할 변수 : lx, ly
            // ->>항상 최종 위치에서 움직인 만큼의 위치값을 더한다!

            // console.log(`fx:${fx} | fy:${fy}`);
            // console.log(`mvx:${mvx} | mvy:${mvy}`);
            // console.log(`rx:${rx} | ry:${ry}`);
            // console.log(`lx:${lx} | ly:${ly}`);
        } //////////// if : 드래그 /////////////
    }; /////////// dMove ////////////

    // (4) 첫번째 위치 포인트 세팅 함수 : 처음 찍었을 때 작동하는 것
    const firstPoint = () => {
        fx = event.pageX;
        fy = event.pageY;
    };

    // (4) 마지막 위치 포인트 세팅 함수 : 클릭버튼에서 손 뗄 때 작동하는 것
    const lastPoint = () => {
        lx += rx;
        ly += ry;
    };
    // 최종 이동 결과값인 rx,ry를 항상 "대입연산"하여 값을 업데이트 해야함!

    // 🎶이벤트 등록하기 ////////////
    // (1) 마우스 내려갈 때 : 드래그ture + 첫번째 위치값 업데이트
    obj.addEventListener("mousedown", () => {
        dTrue();
        firstPoint();
    });
    // (2) 마우스 올라올 때 : 드래그false + 마지막 위치값 업데이트
    obj.addEventListener("mouseup", () => {

        dFalse();

        // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
        // 슬라이드를 드래그할 때에는 마지막 위치를 업데이트할 필요가 없기 때문에 주석처리 해주기!!
        // 왜? 슬라이드의 마지막 위치는 항상 일정하니까!
        // lastPoint();
        // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐


        // ⭐⭐⭐⭐⭐⭐이동 방향 판별하는 함수 호출!!⭐⭐⭐⭐⭐⭐⭐⭐
        goWhere(obj);
        // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    });
    // (3) 마우스 움직일 때
    obj.addEventListener("mousemove", dMove);
    // (4) 마우스 벗어날 때
    obj.addEventListener("mouseleave", dFalse);





    
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    // 화면 크기를 변경할 경우 발생하는 이벤트 : resize
    // 이 이벤트를 이용하여 필요한 경우 코드를 실행한다!
    // 대상 : window
    window.addEventListener("resize", ()=>{
        // 화면 크기 변경시 lx값 업데이트하기
        lx = -obj.parentElement.clientWidth * 2.2;

        // 마지막 위치값이 슬라이드 부모박스의 220%이므로 이것을 업데이트해준다!
        // 이때 앞에 마이너스(-)를 붙여야함! 중요! (왼쪽으로 나가 있으니까~)
        // console.log("업데이트 lx:", lx);

    }); //////////////////// resize 이벤트 ////////////////////////////
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    


} ///////////////// goDrag() 함수 //////////////////////



/************************************************************
    함수명 : goWhere
    기능 : 드래그시 왼쪽으로 갈 것인지, 오른쪽으로 갈 것인지 이동 방향을 판별해준다
    호출 : 드래그시 mouseup 이벤트 함수에서 호출한다
************************************************************/
function goWhere(obj){ // obj : 드래그 대상(슬라이드 요소임)
    // 1.현재 드래그 대상의 left 위치값
    let tgLeft = obj.offsetLeft;
    // console.log("현재 left는: ", tgLeft);

    // 2.지금 내가 만들어놓은 것은 값들이 화면 크기에 따라 유동적으로 변하므로! left위치값이 고정적이지 않고 변화한다ㅠ
    // 2.부모박스를 기준으로 한 -220% left 위치값 구하기
    let tgPoint = obj.parentElement.clientWidth * 2.2;
    // : 수치의 2.2 곱하면 220퍼센트가 된다
    // lx값과 이번에 새로 구해본 tgPoint의 값이 동일하게 나오는지 확인해보기!
    // ->> 동일하게 나온 다는 게 중요!! (왜? tgPoint는 유동적일 때의 값을 구한 것이기 때문에~ )
    // console.log("기준 left : ", tgPoint);

    // 3.방향 판별하기 : 특정값(여기서는 50)을 더하고 뺌
    // 3-1.왼쪽 방향 이동 (오른쪽 버튼 클릭 기능과 동일)
    if(tgLeft < -tgPoint - 50){ // 계산해보면 값이 작아진다
        console.log("왼쪽으로!");
        // 이동함수 호출하기 (전달값1)
        goSlide(1);
    }
    // 3-2.오른쪽 방향 이동 (왼쪽 버튼 클릭 기능과 동일)
    else if(tgLeft > -tgPoint + 50){ // 계산해보면 값이 커진다
        console.log("오른쪽으로!");
        // 이동함수 호출하기 (전달값0)
        goSlide(0);
    }
    // 3-3.제자리로 돌아가기
    else{
        console.log("제자리로!");
        obj.style.left = -tgPoint + "px";
        // : 현재 드래그 대상이 드래그되어서 움직인 left 위치값을 'tgPoint'변수에 담아두었기 때문에, 그것만큼 마이너스 붙여서 되돌아가면 됨
    }



} ///////////////////////// goWhere 함수 /////////////////////////////

