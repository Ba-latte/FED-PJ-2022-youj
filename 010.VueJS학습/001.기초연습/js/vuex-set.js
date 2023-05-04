// 뷰엑스 스토어 구현 JS - vuex-set.js

// 😊스토어 JS 불러오기
import store from "./store.js";

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
                <a href="#">서울</a>
            </li>
            <li>
                <a href="#">부산</a>
            </li>
            <li>
                <a href="#">제주</a>
            </li>
        </ul>
    </header>
    `,
    data(){
        return{}
    },
    methods:{
        
    }
}); //////////////// 상단영역 컴포넌트 //////////////////



// 2.메인영역 컴포넌트 세팅 ////////////////////////////////
// 뷰 인스턴스 내부 속성에서 전역변수를 부를 떄 $를 붙인다!
// ex) 뷰엑스 스토어 전역변수는 $store라고 해서 쓰면 됨 (store로 내보내고 store로 받았으니까!)
// 스토어변수 내부 접근은 (변수)영역까지 모두 써준다
// ex) store.stae.imgsrc
Vue.component("main-area", {
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
    },
}); //////////////// 뷰 인스턴스 ////////////////////




