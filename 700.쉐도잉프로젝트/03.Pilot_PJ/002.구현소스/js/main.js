/* 파일럿 PJ 메인페이지 JS - main.js */


/*******************************************************************
    [ 메인 페이지 주요 기능 ]
1.자동스크롤 기능 구현 (OK)
+ 페이지 도착후 등장액션 구현

2.햄버거버튼 전체메뉴 보이기/숨기기 (OK)
+ 전체메뉴 배경 동영상 보일 때만 재생하기(숨길때 멈춤)

3.배너 터치 기능 넘기기 (제이쿼리 UI 이용)
    +배너별 타이틀 등장하기
    +양쪽 이동버튼 플러그인 적용하기
4.
*******************************************************************/



// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

// 메인페이지

// 햄버거버튼 클릭시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거버튼 클래스 변경하기(토글)
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);


    // 햄버거 버튼에 클래스 on이 있으면 재생/없으면 정지
    let isOn = $(this).is(".on");
    // console.log(isOn);

    // 배경동영상 재생하기
    if(isOn) $(".bgm").get(0).play();
    else $(".bgm").get(0).pause();
    // audio, video 요소 선택시 get(순번)을 사용하는 것은 같은 이름의 클래스를 사용할 경우 순서대로 요소를 담는다

}); ///////////////// click //////////////////



/**********************************************************************************
    [ 터치 배너 기능 구현하기 ]
1.원리 : 제이쿼리 UI를 이용하여 X축으로만 드래그가 되도록 설정 후
위치값을 체크하여 드래그가 끝난 시점에 자동위치이동 애니메이션 처리해준다

2.대상 : .slide

3.기준
(1)왼쪽방향이동 : 기준값(-100%)보다 -10% 작은 경우 (= -110%)
(2)오른쪽방향이동 : 기준값(-100%)보다 10% 큰 경우 (= -90%)
(3)제자리이동 : 양쪽 기준값 사이일 경우 (= -110% ~ -90%)

4.구현시 주의사항
-%단위는 모두 px단위로 변환하여 구현한다!
-배너 크기가 윈도우 가로크기와 같다! 이것을 활용함

**********************************************************************************/
// 1.대상 선정
const slide = $(".slide");

// 2.드래그 설정
slide.draggable({
    // X축 고정하기
    axis:"x"
}); ////////////// draggable ///////////////

// 윈도우 크기 리턴 함수
const reWin = ()=> $(window).width();


// 리사이즈 업데이트
$(window).resize(()=>{
    winW=reWin();
    // console.log("winW: ", winW);
});


// 3.드래그가 끝난 후(dragstop이벤트 발생의미함) 기준위치 체크 후 이동 애니메이션


// 윈도우 가로크기 : left 기준 위치 px변환
let winW = reWin();
// console.log("winW*0.9: ", winW*0.9);
// console.log("winW: ", winW);
// console.log("winW*1.1: ", winW*1.1);

// 광드래그 방지 위해 커버 세팅하기 (show() / hide()로 작동하게 하기)
const cover = $(".cover");


// 드래그 끝난 후 이벤트 함수 만들기
slide.on("dragstop",function(){

    // 광드래그 방지 위해서 커버 보이기
    cover.show();

    // 슬라이드 left 위치값
    let sleft = $(this).offset().left;
    // console.log("허허~", sleft);

    // 1.왼쪽으로 이동 : -110% 미만일 때
    if(sleft < -winW*1.1){
        slide.animate({
            left: -winW*2 + "px"
        }, 600, "easeOutQuint", ()=>{
            // 이동후 맨앞 li 맨뒤 이동
            slide.append(slide.find("li").first())
            .css({left:"-100%"});

            // 커버 제거하기
            cover.hide();

            // 배너 타이틀 함수
            showTit();
            
        }); //////////////// animate ///////////////

        // 불릿 변경함수 호출하기
        addOn(2);
        // 왼쪽이동이므로 2번째 슬라이드로 가기

    } //////////////// if : 왼쪽 이동//////////////////////

    // 2.오른쪽으로 이동 : -90% 초과일 때
    else if(sleft > -winW*0.9){
        slide.animate({
            left: "0px"
        }, 600, "easeOutQuint", ()=>{
            // 이동후 맨뒤 li 맨앞으로 이동
            slide.prepend(slide.find("li").last())
            .css({left:"-100%"});

            // 커버 제거하기
            cover.hide();

            // 배너 타이틀 함수
            showTit();
        }); ////////////////// animate /////////////////////

        // 불릿 변경함수 호출하기
        addOn(0);
        // 오른쪽이동이므로 0번째 슬라이드로 가기
    } //////////////// else if : 오른쪽 이동//////////////////////

    // 3.제자리로 이동 : -110% ~ -90%사이
    else{
        slide.animate({
            left: -winW + "px"
        }, 200, "easeOutQuint", ()=>{
            // 커버 제거하기
            cover.hide();
        });
    } //////////////// else : 제자리 이동//////////////////////
}); ///////////////////////////////////// slide ///////////////////////////////////////////////////////



/*******************************************************************
    [ 터치 배너 이동시 불릿 변경하기 ]
-방법 : 잘라서 이동되는 li의 고유한 순번을 사용자 정의 속성으로 처음에 설정 한 후
슬라이드 이동하면 그 속성값을 읽어서 불릿 순번에 반영한다
*******************************************************************/
// 사용자 정의 순번 속성 대상 : .slide li
// 제이쿼리에서의 for문 순회 메서드 : each(순번, ele)
// 배너 li 변수
const blist = slide.find("li");
// 배너의 갯수 변수
const bcnt = blist.length;

blist.each((idx, ele)=>{
    // console.log(idx, bcnt);
    // 처음 것을 마지막 순번으로 넣기
    if(idx === 0) $(ele).attr("data-seq", bcnt-1);
    // 2번째부터 끝까지 0부터(1 작음)
    else $(ele).attr("data-seq", idx-1);
}); //////////////////// each //////////////////////

/*******************************************************************
    [ 불릿에 on 넣기 함수 ]
1.오른쪽으로 이동할 경우
-0번째 슬라이드의 data-seq값
2.왼쪽으로 이동할 경우
-2번째 슬라이드의data-seq값
3.위의 선택값으로 불릿의 li 순번에 on을 넣고 나머지는 뺀다!
*******************************************************************/
// 대상 선정 : .bindic li
const bindic = $(".bindic li");

function addOn(seq){
    // seq : 읽어오는 슬라이드의 순번
    // 방향을 어떻게 알지? -> 0은 오른쪽 이동, 2는 왼쪽이동임

    // 1.해당 슬라이드 data-seq 읽어오기
    let dseq = slide.find("li").eq(seq).attr("data-seq");
    // console.log(dseq);

    // 2.해당 슬라이드와 동일한 순번 불릿에 on넣기
    bindic.eq(dseq).addClass("on")
    .siblings().removeClass("on");

} //////////////// addOn 함수 ///////////////////////

///////////////////////////////////////
////// 각 배너 등장 타이틀 셋팅 /////////
///////////////////////////////////////
let bantxt = {
    "ban1": "Men's Season<br>Collection",
    "ban2": "2023 Special<br>Collection",
    "ban3": "GongYoo<br>Collection",
    "ban4": "T-Shirt<br>Collection",
    "ban5": "Shoes<br>Collection",
    "ban6": "Wind Jacket<br>Collection"
}; ///////////// bantxt객체 //////////////

/************************************************************
    함수명 : showTit
    기능 : 각 배너 타이틀 보이기
    호출 위치 : 배너 이동 후 콜백 함수에서 호출함!
************************************************************/
function showTit(){
    // 요구사항 : 배너 이동 후 호출하여 해당 배너의 순번에 맞는 타이틀을 동적으로 생성하여 애니메이션 한다!

    // 주인공 배너 변수
    const mainban = slide.find("li").eq(1);

    // 1. 항상 도착 후엔 두번째 슬라이드가 주인공이다!
    // 슬라이드 순번은 1번!
    // 슬라이드 클래스명 읽어오기(타이틀이 클래스명과 연관됨!)
    let clsnm = mainban.attr("class");

    // 2. 클래스 명에 해당하는 객체값 읽어오기
    let bantit = bantxt[clsnm];

    // 호출 확인
    // console.log("배너 타이틀!", bantit);

    // append()하기 전에 모든 추가 타이틀 지우기
    $(".btit").remove();

    // 3.타이틀을 넣을 요소를 배너에 추가한다!
    mainban.append(`<h2 class="btit"></h2>`);

    // 타이틀 left 위치 변수 처리하기
    // ban2, ban3만 오른쪽 위치하기
    let lval = "30%";
    if(clsnm==="ban2" || clsnm==="ban3") lval = "70%";
    
    // 4.해당 배너의 h2태그에 배너 타이틀 넣기
    mainban.find(".btit").html(bantit)
    .css({
        position: "absolute",
        top: "55%", // 약간 아래
        left: lval,
        transform: "translate(-50%, -50%)",
        font: "bold 4.5vmax Verdana",
        color: "#fff",
        textShadow: "1px 1px 3px #777",
        whiteSpace: "nowrap",
        opacity: 0 // 처음에 투명하게 만들기 -> 도착하면 1로 바뀜
    }) /////////////// css ///////////////
    .animate({
        top: "50%",
        opacity: 1
    }, 1000, "easeInOutQuart");

} //////////////////////// showTit 함수 ////////////////////////////

// 첫번째 배너의 타이틀 등장을 위한 타이틀 함수(showTit) 최초 호출
setTimeout(showTit, 1000);

// 타임아웃 변수
let banAgain;


// 자동넘김 지우기 함수
const clearAuto = ()=> {
    clearInterval(banAuto);
    clearTimeout(banAgain);

    banAgain = setTimeout(banAutoSlide,3000);
}; //////////////////// clearAuto 함수 /////////////////

// 배너 이동시 자동 넘김 지우기 세팅
slide.on("mousemove dragstart dragstop", clearAuto);

// 자동 넘김 인터발 세팅하기 //////////////////////
// 변수에 담아 정지하기 ///////
let banAuto;

const banAutoSlide = ()=>{

    banAuto = setInterval(() => {
        slide.animate({
            left: -winW*2 + "px"
        }, 600, "easeOutQuint", ()=>{
            // 이동후 맨앞 li 맨뒤 이동
            slide.append(slide.find("li").first())
            .css({left:"-100%"});
    
            // 커버 제거하기
            cover.hide();
    
            // 배너 타이틀 함수
            showTit();
            
        }); //////////////// animate ///////////////
    
        // 불릿 변경함수 호출하기
        addOn(2);
        // 왼쪽이동이므로 2번째 슬라이드로 가기
    }, 3000); ///////////////// banAuto 인터발 함수 ///////////////

}; ///////////////// banAutoSlide 함수 //////////////////

// 자동넘김 최초호출
banAutoSlide();
