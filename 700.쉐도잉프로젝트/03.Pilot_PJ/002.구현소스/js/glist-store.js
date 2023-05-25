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
            
            
            // 이미 선택한 상품일 경우 분기하기
            // 저장상태 변수 : 기본값이 true로 하기
            let save = true;
            org.forEach(v=>{
                // 만약에 org의 각각 값의 idx가 setData의 dt의 pm번째 gdaa의 idx와 같니?
                // 같은 데이터인가? (idx값으로 비교)
                // ->>v.idx는 현재 카트에 있는 아이템 순번을 말하고 dt.gdata[pm].idx는 입력하려는 새로운 아이템 idx를 말함
                if(v.idx == dt.gdata[pm].idx){
                    alert("이미 선택하신 상품입니다!");
                    // 저장상태 변수를 false로 바꾸기
                    save = false;
                } ////////// if /////////////////
                
            }) /////////// forEach ////////////////


            // 만약에 save가 true일 때만 배열에 제품을 넣고 처리하기
            if(save){
                // 3.배열뒤에 밀어넣기 메서드 : push(값)
                org.push(dt.gdata[pm]);
                console.log("push한 후 객체:", org);
    
                // 4.객체를 문자형으로 변환후 로컬스토리지에 반영시켜야 진짜로 반영이 됨!
                localStorage.setItem("cart", JSON.stringify(org));
                console.log("반영후 로칼쓰:", localStorage.getItem("cart"));
    
                // 5.카트 애니메이션 버튼을 등장시켜 카트리스트까지 연동하기
                this.commit('cartAni', org.length);
                // org.length는 배열 데이터 개수를 넘김 (우리가 stringify한 걸 org에 할당하지 않았으니까 org는 그대로 배열형임!)
            } //////////// if : save가 true일 경우 //////////////
            
        }, ////////////// setDada 메서드 /////////////////////////
        
        
        // 테스트 편의상 로컬스토리지 데이터 지우기
        clearData(){
            // 특정 변수(cart)만 지우기
            // : 로컬스토리지의 개별항목만 삭제하기
            localStorage.removeItem("cart");

            console.log("cart 지워~!");
        }, ///////////////// clearData 메서드 ////////////////////


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

                // 1. 만약 카트리스트 요소가 없으면 만들기!
                if($("#cartlist").length==0){
                    // tip)그냥 length라고만 하면 0이면 false / 1이상이면 true가 나옴
                    // body에 카트리스트 요소 넣기
                    $("body").append(`
                        <section id="cartlist"></section>
                    `);
                    console.log("카트박스 만들기!");
                } ///////////// if : 카트리스트 요소가 없는 경우 ////////////

                // 데이터 바인딩하기 : 카트가 보이지 않는 상태임! (right : "-60vw")
                store.commit("bindData", "-60vw");
                
            }) ///////// 카트 버튼 click /////////////
        }, ///////////// cartAni 메서드 ////////////////


        // 카트 아이템 삭제 메서드 ///////
        delRec(dt, pm){
            console.log("아이템 삭제~!", pm);
            // 1. 로컬스토리지 데이터 읽기
            let org = localStorage.getItem("cart");

            // 2. 로컬스토리지 데이터 파싱하기
            org = JSON.parse(org);
            console.log("삭제할 때) 구성 객체: ", org);

            // 3. 삭제할 아이템 찾아서 지우기 : splice(배열순번, 지울갯수)
            org.forEach((v, i)=>{
                if(v.idx == pm){
                    // 지울 아이템과 같으면 지울 것인지 물어보기 (확인 클릭시 true, 취소시 false 리턴함)
                    if(confirm("정말정말로 지우겠습니까? 할인도 하는데?😂")){
                        // "확인" 눌러서 true되면 해당되는 놈 지우기
                        org.splice(i, 1);
                    }
                }
            })

            // 4. 로컬스토리지에 문자화하여 넣기 : stringify()
            // : 객체를 문자형으로 변환후 로컬스토리지에 반영시켜야 진짜로 반영이 됨!
            localStorage.setItem("cart", JSON.stringify(org));
            console.log("삭제 후 로칼쓰:", localStorage.getItem("cart"));

            // 5. 리스트 갱신하기 : 카트가 보이는 상태임 (right : "0")
            store.commit('bindData', "0");

            // 6. 카트 버튼의 툴팁 문구 업데이트하기
            // 데이터가 없으면 지우기
            if(org.length == 0){
                $("#mycart").remove();
                $("#cartlist").remove();
            } /////////// if : 로컬스토리지에 아무것도 없을 때 /////////////
            // 데이터 갯수 업데이트하기
            else{
                $("#mycart").attr("title", `${org.length}개의 상품이 카트에 있습니다👀`);
            } //////////// else : 로컬스토리지에 하나라도 제품이 있을 때 //////////////


        }, /////////////// delRec 메서드 ///////////////////


        // 리스트 바인딩 메서드 //////////////////////
        bindData(dt, pm){
            // pm-카트박스의 right 값 전달함!!

            // 로컬스토리지 데이터로 테이블 레코드 태그 구성하기
            // : 데이터가 있어야 카트아이콘이 생성되므로 이미 데이터가 있음을 전재함!

            // 1.로컬스토리지 객체데이터 가져오기 : 입력된 데이터는 문자형 객체이므로 다시 파싱하여 원래 객체로 복원한다!
            // (1) 로컬스 데이터 읽어와서 객체화하기
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            console.log("리스트 구성 객체: ", org);
            
            // (2) 경우2) 데이터를 이용하여 리스트 태그 만들기 : map으로 써보기
            let rec = org.map((v, i)=>
                `
                    <tr>
                        <!-- 상품이미지 -->
                        <td>
                            <img src="${'images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'}" style="width:50px" alt="item" />
                        </td>
                        <!-- 번호 : 리스트 순서 번호 -->
                        <td>${i+1}</td>
                        <!-- 상품명 -->
                        <td>${v.ginfo[1]}</td>
                        <!-- 상품코드 -->
                        <td>${v.ginfo[2]}</td>
                        <!-- 단가 -->
                        <td>${v.ginfo[3]}</td>
                        <!-- 수량 -->
                        <td>1</td>
                        <!-- 합계 -->
                        <td>${v.ginfo[3]}</td>
                        <!-- 삭제 -->
                        <td>
                            <button class="cfn" data-idx="${v.idx}">×</button>
                        </td>
                    </tr>
                `
            ); ///////////////// map /////////////////

            // 3. 생성된 아이디가 카트리스트 요소에 테이블 넣기
            $("#cartlist")
            // (1) html 태이블 태그 넣기
            .html(`
                <a href="#" class="cbtn cbtn2"></a>
                <table>
                    <caption>
                        <h1>카트 리스트</h1>
                    </caption>
                    <tr>
                        <th>상품</th>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>상품코드</th>
                        <th>단가</th>
                        <th>수량</th>
                        <th>합계</th>
                        <th>삭제</th>
                    </tr>
                    ${rec}
                </table>
            `) /////////// html ///////////////
            // (2) 카트 박스 css 넣기
            .css({
                position:"fixed",
                top:"0px",
                right:pm, // "-60vw",
                width:"60vw",
                height:"100vh",
                backgroundColor:"rgba(255, 255, 255, 0.8)",
                zIndex:"9999999999",
            })
            .animate({
                right:"0",
            }, 600, "easeOutQuint")
            // (4) table css 넣기
            .find("table").css({
                width:"90%",
                margin:"50px auto",
                fontSize:"14px",
                borderTop:"2px solid #222",
                borderBottom:"2px solid #222",
                borderCollapse:"collapse",
                // borderCollapse를 해줘야 테이블 자체 사이 간격을 없애줌!!
                
            })
            // (5) td css 넣기
            .find("td")
            .css({
                padding:"10px 0",
                borderTop:"1px solid #555",
                textAlign:"center",
            })
            // (6) th css 넣기
            .parents("table")
            .find("th")
            .css({
                padding:"15px 0",
                backgroundColor:"#e5e5e5",
                fontSize:"16px",
            })
            // (7) caption css 넣기
            .parents("table")
            .find("caption")
            .css({
                padding:"20px 0",
                textDecoration:"underline",
                textDecorationStyle:"wavy",
                fontSize:"30px",
            })
            // (8) 닫기 버튼 세팅
            $(".cbtn2").click(()=>{
                $("#cartlist")
                .animate({
                    right:"-60vw",
                }, 600, "easeOutQuint");
            }); ////// click ///////
            // (9) 삭제 버튼 처리 연결하기
            $(".cfn").click(function(){
                // 아이템 삭제 메서드 호출
                store.commit('delRec', $(this).attr("data-idx"));
                // 아까 아이템 등록하면서 심어둔 사용자정의 태그 data-idx 파라미터값으로 가지고 들어가기! (삭제할 idx 정보를 넘김)
            }); ////////// click ////////

        }, ///////////// bindData 메서드 ///////////////


    }, /////////////////// methods ///////////////////////
}); //////////////// 뷰엑스 스토어 /////////////////////////////////

// 내보내기
export default store;