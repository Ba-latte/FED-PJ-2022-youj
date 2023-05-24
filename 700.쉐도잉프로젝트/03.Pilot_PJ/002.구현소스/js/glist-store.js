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
            // mnum은 모어 범위스 : += 로 여러번 모어 진행하기
            dt.mnum += pm;
            // mnum-more의 범위 수
            // pm-업데이트할 전달된 숫자

            // 업데이트 후 모어버튼 없애기 (한계수(제품 총 갯수)를 넘으면 없어지게 하기)
            if(dt.mnum>=25){
                dt.mbtn = false;
            }
        }, ///////////////// updateMore 메서드 //////////////

        // [ 🌈장바구니 데이터 업데이트 메서드🌈 ] /////////////
        setData(dt, pm){
            // pm-배열데이터 순번
            console.log("구니셋 : ", pm);
            console.log("선택 gdata : ", dt.gdata[pm]);
            console.log("cart 전 : ", localStorage.getItem("cart"));

            // 1.로컬스 데이터 cart가 없으면(널값이면) [](배열형식)으로 문자(string)넣기!
            if(localStorage.getItem("cart")==null){
                localStorage.setItem("cart", "[]");
            }
            console.log("cart 후 : ", localStorage.getItem("cart"));

            // 2.로컬스토리지 객체데이터 가져오기 : 입력된 데이터는 문자형 객체이므로 다시 파싱하여 원래 객체로 복원한다!
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            console.log("변환 객체(배열로 만들려고 변환시키는거야):", org);
            
            // 3.배열뒤에 밀어넣기 메서드 : push(값)
            org.push(dt.gdata[pm]);
            console.log("push한 후 객체:", org);

            // 4.객체를 문자형으로 변환후 로컬스토리지에 반영시켜야 진짜로 반영이 됨!
            localStorage.setItem("cart", JSON.stringify(org));
            console.log("반영후 로칼쓰:", localStorage.getItem("cart"));

            // 5.카트 애니메이션 버튼을 등장시켜 카트리스트까지 연동하기
            this.commit('cartAni', org.length);
            // org.length는 배열 데이터 개수를 넘김


            // 로컬스토리지의 모든 데이터 지우기
            // localStorage.clear();
            // 로컬스토리지의 개별항목만 삭제하기
            // localStorage.removeItem("cart");

        }, ////////////// setDada 메서드 /////////////////////////


        ///////////////// 장바구니 애니메이션 버튼 생성하기 ///////////////////
        cartAni(dt, pm){
            console.log("카트애니! 상품 갯수! : ", pm);

            // 0.생성될 카트 이미지 지우고 시작! ->이미지 하나만 생성되도록!
            $("#mycart").remove();
            // : remove()는 있으면 지우는 거지 없다고 문제 안 생김~

            // 1. gif 애니메이션 이미지를 사용하여 화면 중앙에 등장하여 장바구니 담김을 알림!
            $("body").append(`
                <img id="mycart" src="./images/mycart.gif" title="${pm}개의 상품이 카트에 있습니다👀" />
            `);

            // 2.추가한 이미지 화면 중앙에 위치하기
            $("#mycart").css({
                position:"fixed",
                top:"50%",
                left:"50%",
                transform:"translate(-50%, -50%)",
                cursor:"pointer",
                zIndex:"999999999999",
            })
            .delay(3000) // 3초 지연
            .animate({ // 왼쪽 위로 이동, 작아지는 애니
                top:"5%",
                left:"80%",
                width:"50px",
            }, 1000, "easeInExpo")
            // 클릭하면 카트리스트 보이기
            .click(function(){
                // body에 카트리스트 요소 넣기
                $("body").append(`
                    <section id="cartlist"></section>
                `);

                // 생성된 카트리스트에 테이블 넣기
                $("#cartlist").html(`
                    <a href="#" class="cbtn cbtn2">×</a>
                    <table>
                        <caption>
                            <h1>카트 리스트</h1>
                        </caption>
                        <tr>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>상품코드</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                        
                    </table>
                `)
            })
        }, ///////////// cartAni 메서드 ////////////////



    },
}); //////////////// 뷰엑스 스토어 /////////////////////////////////

// 내보내기
export default store;