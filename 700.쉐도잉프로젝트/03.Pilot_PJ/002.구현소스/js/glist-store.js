// 전체 리스트 페이지 뷰엑스 스토어 세팅 JS - glist-store.js

// 전체 상품 정보 불러오기
import gdata from "./gdsData/glist-items.js";

const store = new Vuex.Store({
    state:{
        // 서브데이터 셋업
        // 전체상품정보 전역화하기
        // 앞은 st의 gdata, 뒤는 glist-items의 gdata!!
        gdata:gdata,

        // 필터 데이터용 배열 변수 만들기 : 체크/언체크 확인->t/f가 이 배열안에 들어감
        chkarr:[true, true, true],
        // 👉맨처음에 모든 제품 다 보이게 하기 위해선 전부다 보이게 true로 해두기

        // 필터 데이터용 배열 입력값 변수 : 이 값이 v-if문 안에 들어감
        selnm:["", "", ""],

        // 페이징용 변수 : 이 변수를 더해서 사이 범위를 만들어 준다!
        pnum:0,

        // more용 변수 : 이 변수를 더해서 1번부터 몇개까지 보여줄 것인지를 결정한다!
        mnum:0,

        // more버튼 표시유무 상태관리 변수
        mbtn:true,
    },
    // state 데이터 변경 메서드 구역
    mutations:{
        // 체크박스 체크시 처리메서드
        resCheck(dt){
            console.log("체크: ", dt.chkarr);
            // 3개의 체크박스 상태배열 변수값에 따라 실제 조건에 들어갈 cat명을 넣어준다!
            dt.chkarr.forEach((v,i)=>{
                // v-배열값인 true/false값이 들어옴
                if(v){
                    // 체크박스 체크된 경우

                    dt.selnm[i] = i==0?"men":i==1?"women":"style";
                    // 조건1?값1:((조건2?값2):최종값);
                    // 중첩 삼항연산자 사용
                } ////////////// if : 체크박스 체크된 경우 //////////////////
                else{
                    // 체크박스 체크 안 된 경우
                    // 무조건 빈 값을 할당해야함
                    dt.selnm[i] = "";
                } ///////////// else : 체크박스 체크 안 된 경우 //////////////////
            });
        }, //////////////////// resCheck 메서드 //////////////////////////

        // 페이징 변수 업데이트 메서드
        updatePaging(dt, pm){
            dt.pnum = pm;
            // pnum-리스트범위 수
            // pm-업데이트할 전달된 숫자
        }, ///////////////// updatePaging 메서드 //////////////

        // more 변수 업데이트 메서드
        updateMore(dt, pm){
            dt.mnum = pm;
            // mnum-more의 범위 수
            // pm-업데이트할 전달된 숫자

            // 업데이트 후 모어버튼 없애기
            dt.mbtn = false;
        }, ///////////////// updateMore 메서드 //////////////
    },
}); //////////////// 뷰엑스 스토어 /////////////////////////////////

// 내보내기
export default store;