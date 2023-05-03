/* 파일럿 PJ 서브페이지 JS - sub.js */

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
// 신상정보 가져오기
import sinsang from "./gdsData/sinsang.js";


let swiper;


// #### 상단영역 메뉴 뷰 템플릿 세팅하기 ####
// Vue.component(내가지은요소명, {옵션});
Vue.component("top-comp", {
    template: comData.tareaSub,
}); ////////////////////////// 상단영역 Vue component /////////////////////////////

// #### 하단영역 메뉴 뷰 템플릿 세팅하기 ####
Vue.component("foot-comp", {
    template: comData.barea,
}); ////////////////////////// 하단영역 Vue component /////////////////////////////

// #### 상단영역 뷰 인스턴스 생성하기 ####
// new Vue({옵션});
new Vue({
    el: "#top",
    data: {},
    // mounted 실행구역 : DOM 연결 후
    mounted: function () {
        // 제이쿼리 코드함수 호출
        console.log("mounted구역!");

        // 메뉴기능 함수 호출
        menuFn();

        // 스와이퍼 생성함수 호출
        makeSwiper();

        // 부드러운 스크롤 실행함수 호출
        startSS();

        // 신상품 기능함수 호출
        sinsangFn();
        
    },
    // created 실행구역 : DOM 연결 전
    created: function () {
        // DOM 연결 전에 데이터 가공 작업하는 구역
        console.log("created구역!");
    },
}); /////////////////////// 상단영역 뷰 인스턴스 ////////////////////////////

// #### 하단영역 뷰 인스턴스 생성하기 ####
new Vue({
    el: "#info",
}); ///////////////////// 하단영역 뷰 인스턴스 /////////////////////////////








// 스와이퍼 플러그인 인스턴스 생성하기 //////////////////////////////////////
// 변수로 만든 이유 -> 외부에서 저 인스턴스 내부의 변수나 메서드에 접근 가능하게 하기 위함(?)

// 스와이퍼 생성함수
function makeSwiper(){
    swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 인터렉션 비활성화? false(아니) -> 인터렉션 활성화!(가만히 두면 다시 자동 넘김)
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, // 불릿 클릭 이동 여부
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
} /////////////////////// makeSwiper 함수 ///////////////////////////



////////////////////// 신상품 기능구현 함수 //////////////////////////
function sinsangFn(){

    /************************************************************************************
        함수명 : moveList
        기능 : 신상품 리스트 박스를 연속하여 왼쪽방향으로 흘러가도록 함
        -재귀호출 상태값을 만들어서 그걸로 재귀호출함
    ************************************************************************************/
    // 대상선정 : .flist
    const flist = $(".flist");
    // 위치값 변수
    let lpos = 0;
    // 재귀호출 상태값 변수 (1-호출가능 / 0-호출불가)
    let call_sts = 0;
    // 스크롤시 상태값 변수 (1-호출가능 / 0-호출불가)
    let sc_sts = 0;
    // 재귀호출 타임아웃용 변수
    let callT;

    function moveList(){
        // 1.이동위치값(left) 감소하기
        lpos--;

        // console.log("위치값: ", lpos);

        // 2.한계값 초기화하기 + 첫번째 요소 맨 뒤로 이동하기
        if(lpos < -300){
            // 위치값 초기화
            lpos = 0;

            // 첫번째 li 맨 뒤로 보내기
            flist.append(flist.find("li").first());
        }

        // 3.이동하기
        flist.css({
            left: lpos + "px"
        });

        // 타임아웃 비우기 : 타임아웃 쌓이지 않게 지우기
        clearTimeout(callT);

        // 재귀호출하기(비동기호출 setTimeout으로 호출!)
        // 조건 : 재귀호출 상태값이 1일때만 호출하기!
        if(call_sts) callT = setTimeout(moveList, 30);
    } //////////////////////// moveList 함수 //////////////////////////

    // 신상품 이동함수 최초호출
    // 특정 위치에 와야 이동 시작하도록 하기 - 왜?) 첨부터 움직이면 맨처음 상품은 이미 지나가서 확인 불가하므로~
    // moveList();

    
    // 신상품 리스트에 마우스오버시 멈춤
    // 신상품 리스트에 마우스아웃시 이동
    // hover(함수1, 함수2)
    flist.hover(
        // over시
        function(){
            call_sts = 0;
            // 재귀호출 상태값을 0으로 만들어서 중단시키기
        }, 
        // out시
        function(){
            call_sts = 1;
            // 재귀호출 상태값 1로 만들기
            // 함수 재호출해서 1로 만들어서 다시 호출 허용한 상태값을 집어넣기
            moveList();
        }
    ); ///////////////// hover //////////////////////////

    /************************************************************************************
        신상품 리스트 li에 마우스 오버시 정보 보이기
        1.대상 : .flist li
        2.정보 구분법 : li의 클래스명으로 신상품 정보와 매칭하여 상품정보 박스를 동적으로 생성하여 애니메이션을 주어 보이게 함
    ************************************************************************************/
    flist.find("li").hover(
        // over시
        function(){
            // 1.클래스 정보 알아내기
            let clsnm = $(this).attr("class");
            // 2.클래스 이름으로 셋팅된 신상정보 객체 데이터 가져오기
            let gd_info = sinsang[clsnm];

            // console.log(clsnm, gd_info);

            // 3.상품정보 박스 만들고 보이게하기
            // : 마우스오버된 li자신 = this 에 넣어주면 됨
            $(this).append(`<div class="ibox"></div>`);
            // .ibox에 상품정보 넣기
            // ^는 특수문자이므로 정규식에 넣을 때 역슬레시 \와 함께 써야함
            // -> \^를 슬레시 사이에 넣고, g는 전부다 찾으라는 뜻임
            // $(".ibox").html(gd_info.replace(/\^/g, "<br>"))
            // ->아니면 replaceAll()써도 됨
            $(".ibox", this).html(gd_info.replaceAll("^", "<br>"))
            .animate({
                top: "110%",
                opacity: 1
            },300, "easeOutCirc");

        }, 
        // out시
        function(){
            // ibox 나갈 때 지우기 (태그 자체를 지우기)
            $(".ibox", this).remove();

        }
    ); //////////////////////////////// hover ////////////////////////////////////

    
    /**************************************************************************
        스크롤 위치가 신상품 박스가 보일 때만 움직이기
    **************************************************************************/
    // JS의 getBoundClientRect()의 값과 같은 것은?
    // = 적용 박스의 offset().top위치값 - scroll바 위치값
    // 1.대상요소 위치값
    let tgPos = flist.offset().top;
    console.log("대상요소 위치값: ", tgPos);

    // 2.스크롤 위치 변수
    let scTop = 0;

    // 3.화면 높이값
    let winH = $(window).height();
    console.log("화면 높이값: ", winH);

    // 4.스크롤 이벤트 함수
    $(window).scroll(function(){
        // 스크롤 위치값
        scTop = $(this).scrollTop();

        // gBCR(getBoundClientRect)값 구하기
        let gBCR = tgPos - scTop;
        // console.log("getBoundClientRect(): ", gBCR);

        // 신상품 리스트 이동/멈춤 분기하기
        // (1)이동 기준 : gBCR값이 화면 높이값보다 작고 0보다 클 때 이동하기
        if(gBCR < winH && gBCR > -300 && sc_sts === 0){
            sc_sts = 1;
            // 한번만 실행

            call_sts = 1;
            // 재귀호출 상태값 1로 만들기 (한번만 실행되도록 하기)

            moveList();
            // 함수 재호출해서 1로 만들어서 다시 호출 허용한 상태값을 집어넣기

            console.log("범위1");

        } ////////////// if //////////////
        // (2)기타 경우 멈춤(조건: 윈도우 높이보다 크거나 0보다 작고 sc_sts === 1 일때)
        if((gBCR > winH || gBCR < -300) && sc_sts === 1){
            sc_sts = 0;
            // 한번만 실행

            call_sts = 0;
            // 재귀호출 상태값을 0으로 만들어서 중단시키기

            console.log("범위2");

        } ////////////// else ///////////////
        

        /**************************************************************
            서브 배너 스와이퍼 api를 이용한 작동 멈춤 세팅하기
        기준 : 화면 높이값보다 스크롤 위치가 크면 멈춤, 작으면 자동 넘김
        **************************************************************/
        // 스크롤 위치가 크면 멈춤
        // 스와이퍼 API : swiper.autoplay.stop()
        // 스크롤 위치가 작으면 자동넘김
        // 스와이퍼 API : swiper.autoplay.start()
        if(scTop > winH){
            swiper.autoplay.stop();
        } //////////// if //////////////
        else{
            swiper.autoplay.start();
        } ///////////// else ///////////////
    }); //////////////////////// scroll ///////////////////////////////




} ///////////////////////// sinsangFn 함수 //////////////////////////

