// 뷰JS 데이터 처리 JS - vueData.js

//  뷰엑스 스토어 불러오기
import store from "./vuedata-store.js";


// [ 컴포넌트 생성하기 ]
// -이미지 src속성 바인드시 (v.idx>50?1:v.idx) 문장 해석
// : 데이터 idx값이 50 초과이면 1을 넣고 아니면 idx데이터 넣기
// -엑시오스로 가져온 데이터는 {data:{실제 데이터}} 형식으로 한번 더 감싸서 들어옴
// -따라서 실제 데이터를 사용하려면 "$store.state.items.data" 이런식으로 "data"속성까지 써줘야 바로 사용 가능함

// 반면 뷰엑스 스토어의 actions에서 받은 제이슨 데이터는 원본 그대로 할당하여 들어오므로 "$store.state.items"라고 원본 변수를 바로 사용해야 함!

Vue.component("my-comp",{
    // 뷰.컴포넌트(들어갈모체선택(사용자지정태그명), {옵션})
    template:`
    <div class="grid">
        <div v-for="(v,i) in $store.state.items">
            <img v-bind:src="
                './img_gallery/' + (v.idx>50?1:v.idx) + '.jpg'
            " alt="dress">
            <aside>
                <h2>{{v.gname}}</h2>
                <h3>{{v.gprice}}</h3>
            </aside>
        </div>
    </div>
    `,
    data(){
        // 컴포와 뷰인스턴스와의 가장큰차이점중하나! 데이터세팅부분!!
        return {
            myt: "나야나야나!",
        }
    }
})

// 뷰인스턴스 생성하기
new Vue({
    el:"#app",
    store, //⭐뷰엑스 스토어 등록 필수⭐
    // 👇뷰 인스턴스에서 사용할 데이터 - 데이터 구역
    data:{
        // json데이터 담을 변수 - items
        items: {},
        myt: "나야나!",
    },
    // 👇뷰 인스턴스 생성 직후(가상DOM/DOM 생성 전) 구역 - 데이터는 미리 읽어서 깔아둘 수 있으니까 여기에!
    created(){

        // 뷰엑스 스토어 액션스 구역 메서드 initData()호출하기
        store.dispatch("initData");


        // 엑시오스 사용하여 제이슨 데이터 가져오기
        // axios.get(제이슨파일).then(데이터=>담을변수=데이터);
        // 제이슨파일이 받아지고나면(then그러고나면) 할당해준다는 뜻임
        // axios.get("./js/goods.json")
        // .then(x=>store.state.items = x);

        // 스토어의 items 전역변수에 세팅함!
        // console.log(store.state.items);


        
    }, ////////////// created ////////////////
}); //////////////// 뷰 인스턴스 /////////////////////
