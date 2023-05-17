// 전체 리스트 페이지 JS - glist.js

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 전체 리스트 태그 데이터 가져오기
import comData from "./tempData/data-glist.js";
// 전체 리스트용 뷰엑스 스토어 JS 가져오기
import store from "./glist-store.js";
// 전체 리스트용 뷰 라우터 JS 가져오기
import router from "./glist-router.js";


// 1.뷰 템플릿 만들기

//###### 상단영역 메뉴 뷰 템플릿 셋팅하기 #######
// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp", {
    template: comData.tarea,
    methods: {},
}); ////////// 상단영역 Vue component //////////

//###### 하단영역 메뉴 뷰 템플릿 셋팅하기 #######
Vue.component("foot-comp", {
    template: comData.barea,
}); ////////// 하단영역 Vue component //////////



// 2.뷰 인스턴스 만들기

new Vue({
    el:".wrap",
    store, // ⭐스토어 등록하기
    router, // ⭐라우터 등록하기
    // 맨처음에 라우터가 실행됐으면 좋겠음 -> 라우터 강제 실행 시키기
    mounted(){
        // 첫번째 라우터 강제 실행!
        this.$router.push('/glist');
        // push(실행할 뷰 라우터 경로) : 괄호()안에 들어간 경로를 강제 실행시키는 메서드

        // $router - 전체 라우터 객체임
        // 비교) $route - 개별경로 정보 객체

        // 최초 체크박스 체크 메서드 실행해야 리스트가 나옴!!!
        store.commit('resCheck');


        // 메뉴 기능 실행 함수 호출
        menuFn();
        // 로고 클릭시 인덱스페이지로 이동하기
        $("#logo").click(() => (location.href = "index.html"));
    }, /////////// mounted구역 /////////////
})



