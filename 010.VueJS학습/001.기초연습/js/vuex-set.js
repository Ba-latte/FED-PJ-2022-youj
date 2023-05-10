// 뷰엑스 스토어 구현 JS - vuex-set.js

// 😊스토어 JS 불러오기
import store from "./store.js";

/*****************************************************************************
    [ 뷰 라우터란? : Vue Router ]
1.단일페이지 어플리케이션을 구축하기 위한 뷰JS 확장 라이브러리

2.컴포넌트와 URL을 연결해주는 역할을 함
*뷰엑스스토어 : 컴포넌트와 거기에서 쓰이는 데이터를 연결
*SPA(Single Page Application) : 메인과 여러개의 서브 페이지로 구성된 사이트를 단 하나의 페이지에서 변경할 부분만 업데이트 가능하도록 구현구조를 만들어서 렌더링 속도가 매우 빠르도록 설계된 어플리케이션을 말함

3.설치방법
(1)CDN 방식 : 상단에 호출하기
<!-- 뷰JS 라우터 CDN -->
<script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
(2)Vue CLI방식 : npm 설치
npm install --save vue-router@3
-설치 후 import로 사용할 페이지에 패키지를 포함시키기
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
-use()로 뷰JS에서 라우터 사용 등록 필수임

4.버전 관리
-Vue 2.x 버전일 경우 Vue Router 3.x 버전을 사용함

5.내장 컴포넌트
(1)<router-view> : 라우트와 일치하는 컴포넌트를 랜더링함
(2)<router-link> : 라우트 링크를 생성함

6. 전용속성
(1) $router : VueRouter 인스턴스 자체
ex) this.$router
(2) $route : 매칭된 라우트 정보 객체
ex) this.$route
    -라우트 정보 객체의 정보종류
    1) fullPath : '/'로 시작하는 전체경로
    2) hash : URL의 '#' 뒤에 연결되는 문자열
    3) matched : 부모 라우트를 포함한 네스트된 모든 라우트 객체배열
    4) meta : 라우트 메타정보
    5) name : 라우트 이름
    6) params : 라우트 매개변수 객체
    7) path : 라우트 경로
    8) query : URL의 '?'에 이어지는 객체정보

7. 라우터 정의와 옵션
(1) 일반형
    const router = new VueRouter({
        routes: [
            {
                라우트 정의1
            },
            {
                라우트 정의2
            }
        ]
    })
(2) 라우터 이름 붙이기
    const router = new VueRouter({
        routes: [
            {
                name: '내꺼얌', -> 라우트 이름
                path: '/goods', -> 매칭 URL 
                component: Goods -> 연결 컴포넌트
            }
        ]
    })
(3) 뷰 인스턴스 객체 내부에 옵션으로 반드시 등록해주어야 사용할 수 있음
ex) new Vue({
    el:"#app",
    router, 👉이렇게 등록 필수
});
-참고로 router변수와 옵션인 routes 변수는 이름을 바꿀 수 없음 (이미 라이브러리에서 변수명을 제한하고 있기때문)

*****************************************************************************/


// 라우터 템플릿 만들기
let Trip = {
    template: `<div class="trip router">World Trip</div>`,
};
let Foods = {
    template: `<div class="foods router">World Foods</div>`,
};

// 라우터 옵션값 넣기
// let routes = [{},{}];
let routes = [
    // 첫번째 루트
    {
        path: '/trip',
        component: Trip
    },
    // 두번쨰 루트
    {
        path: '/foods',
        component: Foods
    },
];

const router = new VueRouter({
    routes
    // 위의 라우트 세팅 배열 변수
});


// 😊중요!!!!! 뷰 인스턴스에서 스토어를 사용할 수 있게 등록해줘야함
// 등록 방법 : new Vue({el:"", store, methods:{}, ...});
// ->>store변수를 그대로 써주면 됨

//////////////////// [1] 컴포넌트 세팅하기 /////////////////////////////

// 1.상단영역 컴포넌트 세팅 ////////////////////////////////
Vue.component("top-area", {
    template:`
    <header>
        <ul class="gnb">
            <li>
                <a href="#" v-on:click="chgData('서울')">서울</a>
            </li>
            <li>
                <a href="#" v-on:click="chgData('부산')">부산</a>
            </li>
            <li>
                <a href="#" v-on:click="chgData('제주')">제주</a>
            </li>
        </ul>
    </header>
    `,
    data(){
        return{}
    },
    methods:{
        // 스토어 변수 업데이트 메서드
        chgData(pm){
            console.log("업데이트!", pm);
            // 이자리에서 바로 스토어 변수를 업데이트한다!!
            // 1. 이미지 변수 : imgsrc
            store.state.imgsrc = store.state.cityData[pm].이미지;
            // 2. 도시설명 변수 : desc
            store.state.desc = store.state.cityData[pm].설명;
        }
    }
}); //////////////// 상단영역 컴포넌트 //////////////////



// 2.메인영역 컴포넌트 세팅 ////////////////////////////////
// 뷰 인스턴스 내부 속성에서 전역변수를 부를 떄 $를 붙인다!
// ex) 뷰엑스 스토어 전역변수는 $store라고 해서 쓰면 됨 (store로 내보내고 store로 받았으니까!)
// 스토어변수 내부 접근은 (변수)영역까지 모두 써준다
// ex) store.stae.imgsrc
Vue.component("main-area", {
    // 컴포넌트 영역은 뷰JS에서 해석되는 부분이므로 뷰엑스 스토어의 변수 sotre를 전역 표시 $store라고 표기해야 유효함 (즉, 에러가 없음)
    // 더 정확한 문법은 'this.$store'라고 써야 하지만 이 파일이 일반 js에서 실행되므로 변수할당된 뷰js 인스턴스 영역 안에서 실행되므로 인스턴스 자신을 가리키는 this를 쓰지 않아도 자동적으로 this가 붙은 것으로 처리해줌
    template:`
    <main>
        <img v-bind:src="$store.state.imgsrc" alt="지역 이미지">
        <p v-text="$store.state.desc"></p>
    </main>
    `,
    data(){
        return{}
    },
    methods:{

    }
}); //////////////// 메인영역 컴포넌트 //////////////////



// 3.하단영역 컴포넌트 세팅 ////////////////////////////////
Vue.component("info-area", {
    template:`
    <footer>
        <address>
            서울시 강남구 역삼동 119 뷰엑스B
        </address>
    </footer>
    `,
    data(){
        return{}
    },
    methods:{

    }
}); //////////////// 하단영역 컴포넌트 //////////////////




//////////////////// [2] 뷰 인스턴스 생성하기 /////////////////////////////
// 대상요소 : #app
new Vue({
    el:"#app",
    store, // ⭐중요!! 뷰엑스 스토어 등록하기!!⭐
    router, // ⭐중요!! 라우터 등록하기!!⭐
    data:{

    },
    methods:{

    },
    // 데이터 세팅은 언제 하면 좋을까?
    // created가 좋을까? 아니면 mounted가 좋을까?
    // 단순한 정보 세팅은 DOM에 직접 관여하는 데이터가 아니고! DOM과 상관 없기 때문에
    // 순수 데이터일 때는 맨 처음 뷰 인스턴스가 생성된 후인 created 메서드 구역에 세팅하자!
    created(){
        // 스토어에 있는 initSet 메서드는 어떻게 호출하지??
        // 스토어 호출 메서드가 따로 있음!
        // store.commit("메서드명", 파라미터값)
        // 1.메서드명은 반드시 문자형으로 입력하기
        // 2.파라미터는 단일값 또는 객체형식으로 보낼 수 있음 (=파라미터 값을 여러개 보내고 싶을 땐 객체로도 보낼 수 있음)
        // 인스턴스 내부 구역에 코딩시에는 store에 $를 붙이지 않음
        // store.commit("initSet", "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg"); // 👉 파라미터로 단일값 보낸 경우
        store.commit("initSet",
        {
            url:"https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg",
            txt:"도시 소개에 오신 것을 환영합니다."
        }
        );

        // actions 메서드 호출하기 : dispatch("메서드명", "전달값") 사용하기
        store.dispatch("myAct", "나야나");

    }, //////////////// created 구역 ///////////////////
    // 제이쿼리는 DOM에 직접 작용하므로 mounted에 구현함
    mounted(){
        // 링크 클릭시 a에 클래스 on 주기
        $(".gnb a").click(function(){
            $(this).addClass("on")
            .parent().siblings().find("a").removeClass("on");

            // 박스 애니
            showBx();
        }); /////////////// click ///////////////////

        // 이미지와 설명박스 순서대로 나타나기
        function showBx(){
            $("main img").css({opacity:0})
            .delay(500).stop()
            .fadeTo(400, 1);

            $("main p").css({opacity:0})
            .delay(1000).stop()
            .fadeTo(400, 1);
        } /////////////////// showBx //////////////////////


    }, //////////////// mounted 구역 ////////////////
}); //////////////// 뷰 인스턴스 ////////////////////




