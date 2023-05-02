/* 파일럿 PJ 서브페이지 JS - sub.js */

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";

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
    var swiper = new Swiper(".mySwiper", {
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
