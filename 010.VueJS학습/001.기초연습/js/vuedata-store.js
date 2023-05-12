// 뷰JS 데이터처리 뷰엑스 스토어 JS - vuedata-store.js

// 제이슨 데이터 처리 위해 제이슨 불러오기
/**************************************************************************************

import jsnData from "./goods.json";
-일반 JS호출과 같은 방식으로 제이슨 파일을 호출하면 아래와 같은 MIME 전송형식 type 에러가 발생함!!
"Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec."

-해결방법 : 아래처럼 assert{} 객체를 추가로 적어주기
*assert : 주장하다, 강하게 자기 주장을 하다, 자신의 권리,권위 등을 확고히 하다
-import 변수 from "제이슨파일경로" assert{type:"json"};
-assert{type:"json"} : import시 형식을 지정해주는 객체임
-이것으로 제이슨 형식을 맞춰서 전송타입 오류를 없애야함

**************************************************************************************/
import jsnData from "./goods.json" assert{type:"json"};



////////////////////////////// 😊뷰엑스 스토어를 활용한 변수 세팅하기😊 /////////////////////////////////////
// 1.뷰엑스 스토어 인스턴스를 생성한다
const store = new Vuex.Store({
    // (1)데이터 세팅 구역
    state:{
        // 👇 제이슨 데이터를 담을 (전역 격인)변수
        items: {},

    }, /////////// state 구역 ///////////

    // (2)데이터 변경 메서드 구역 : 호출시 commit() 사용!
    mutations:{
        // 제이슨 데이터 속성 변수 업데이트하기 함수명(스테이트, 파라미터)
        setData(st, pm){
            // st-state변수(데이터 세팅구역?), pm-전달변수
            // 액션스에서 커밋으로 뮤테이션스 안의 이 함수를 불러들일 예정임

            st.items = pm;
            // 👆state구역의 items변수에 제이슨 데이터 담기

            console.log("뮤테이션스: ", pm);
            // pm값에 어떤게 넘어와서 할당이 되는지 확인해봄
        },
    },

    // (3)백엔드 관련 코딩 비동기 처리 메서드 구역 : 호출시 dispatch() 사용!
    // -얘는 얘대로 데이터 처리해서 가져온대
    // -여기서 불러와서 처리한 데이터를.... created구역에 넣어주면.... 돔만들어지기 전에 처리해서 데이터를 넣는거니까..데이터가 없다고 표시되지 않는대!
    actions:{
        // 제이슨 데이터 로드하기 메서드
        // 👇액션스 메서드 전달값으로 {commit}을 쓰면 뮤테이션 구역으로 바로 commit 사용 가능함 (중괄호 구역에서 바로 커밋사용 가능하단 의미임)
        initData({commit}){
            // 제이슨 데이터를 변수에 할당하기
            const result = jsnData;
            console.log("액션구역!: ", result);
            // ->이렇게 하면 객체 자체가 다 들어옴

            // state의 items 변수 변경하는 메서드를 호출하기
            // 뮤테이션스의 메서드 호출은? commit('메서드명', 전달할 값)으로 하기
            commit("setData", result);
        }, /////////////// initData /////////////////
    },
    
}); /////////////////////////// 뷰엑스 스토어 인스턴스 /////////////////////////////////////


// 내보내기
export default store;