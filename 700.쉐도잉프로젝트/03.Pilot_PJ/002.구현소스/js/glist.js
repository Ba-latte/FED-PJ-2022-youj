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


        // 페이지 로딩시 로컬스토리지 데이터 cart항목에 데이터가 있으면 카트 이미지버튼 보여주기
        if(localStorage.getItem("cart") != null){
            // : 카트 항목이 null이 아니면! (비어 있지 않고 1개라도 차 있다면!)
            // ->> lenght로 하지 않은 이유 : length는 일단 무언가 들어갔다는 전제 하에 쓰는 것이기 때문! 아예 비어있는 것을 따질 때엔 노노~

            // null이 아닌 경우에 length를 체크해서 0이 아니면 카트 버튼 출력해주기
            // 👉 이 경우엔 null인지 먼저 체크 하고 나서 length를 체크해야하기 때문에 맨 처음 if조건 안에 || 를 쓰는 형식으로는 안 됨!!
            // 👉 그렇게 하지 말고 if문 안에 또 if문을 만들어서 순차적으로 체크해줘야 함!!!!!!!
            // 👉👉👉👉👉 그런데 우리 다른 곳을 수정해서~^^ 이제 굳이 length체크 안 해줘도 돼~ 그래서 뺐음!!!!!!!
            

                let org = localStorage.getItem("cart");
                org = JSON.parse(org);
                console.log("변환객체:", org);
    
                // 카트 버튼 애니 메서드 호출
                store.commit('cartAni', {cnt:org.length, opt:0});
                // 애니메서드 파라미터 cnt, opt
                // cnt-카트 아이템 개수
                // opt-세팅 옵션 번호 (초기 CSS값 선택 옵션 번호임)
                // opt 값 중에서 0-오른쪽위 작은 것, 1-정중앙의 큰 것

        } ///////////// if : null인지 아닌지 체크 ////////////////////
    }, /////////// mounted구역 /////////////
})



