/* 파일럿 PJ 서브페이지 JS - sub.js */

// 메뉴기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
// 서브 데이터 가져오기
import subData from "./tempData/data-sub.js";
// 신상정보 가져오기
import sinsang from "./gdsData/sinsang.js";
// 뷰엑스 스토어 JS 가져오기
import store from "./store.js";
// ⭐중요!!! 반드시 메인으로 쓰는 js파일 한 군데에서 불러와서 써야지만 상태관리됨!!⭐
// ->>이 js파일에 Vue 인스턴스 생성코드가 같이 있어야한다!

// 스와이퍼 변수
let swiper;

///////////////////// 바로 실행 함수 수역 //////////////////////////////////
// 바로실행구역을 쓰는 이유 : 변수나 명령어를 다른 영역과 구분하여 코딩할때 주로 사용됨
// 즉, 코드가 그냥 밖에 나가있는 것을 방지하고자 함 (실행은 바깥에서 실행해야하는데 널부러져 있는 모습이 별로일때;;)
// GET방식 데이터를 store에서 초기값으로 세팅하는 것을 인스턴스에서 생성 전에 해야 아래쪽에 빈 값으로 세팅된 값이 들어가서 에러나는 것을 막을 수 있다!!
(()=>{
    // 파라미터 변수
    let pm;

    // GET 방식으로 넘어온 데이터 처리하여 분류별 서브 페이지 구성하기
    // location.href : 상단 url 읽어옴
    // indexOf("?")!== -1 : 물음표가 없는 게 아니면 = 물음표가 있으면!
    if(location.href.indexOf("?")!== -1)
        pm = location.href.split("?")[1].split("=")[1];
        // 물음표로 잘라내서 뒤의 것, 이퀄로 잘라내서 뒤의 것 값(파라미터값)만 추출함! split()
    // pm에 할당이 되었다면 undefined가 아니므로 true가 나옴!
    if(pm)
        store.commit("chgData", decodeURI(pm));
    // 👇메뉴를 선택해서 파라미터로 들어오지 않고! 그냥 들어갔을 때의 첫 화면은 '남성'데이터가 뿌려지도록 하기
    else
        store.commit("chgData", "남성");
    // URI/URIComponent의 차이점
    // decodeURI() : 딱 변경할 문자열만 있어야 변환됨
    // decodeURIComponent() : url 전체에 섞여 있어도 모두 변환해줌
})(); ////////////////////// (호출하지 않고도) 바로 실행 함수 구역 /////////////////////////////////////


// #### 서브영역 메뉴 뷰 템플릿 세팅하기 ####
// Vue.component(내가지은요소명, {옵션});
// 1.배너파트 컴포넌트
Vue.component("ban-comp", {
    template: subData.banner,
}); ////////////////////////// ban 컴포넌트 /////////////////////////////

// 2.컨텐츠1 영역 컴포넌트
Vue.component("cont1-comp", {
    template: subData.cont1,
}); //////////////////////// cont1 컴포넌트 ///////////////////////////

// 3.컨텐츠2 영역 컴포넌트
Vue.component("cont2-comp", {
    template: subData.cont2,
}); //////////////////////// cont2 컴포넌트 ///////////////////////////

// 4.컨텐츠3 영역 컴포넌트
Vue.component("cont3-comp", {
    template: subData.cont3,
}); //////////////////////// cont3 컴포넌트 ///////////////////////////

// 5.컨텐츠4 영역 컴포넌트
Vue.component("cont4-comp", {
    template: subData.cont4,
}); //////////////////////// cont4 컴포넌트 ///////////////////////////

// 5.상세보기 영역 컴포넌트
Vue.component("detail-comp", {
    template: subData.detail,
}); //////////////////////// detail 컴포넌트 ///////////////////////////

// #### 서브영역 뷰 인스턴스 세팅하기 ####
new Vue({
    el:"#cont",
    store, // ⭐뷰엑스 스토어 등록 필수⭐

}); ////////////////////////// 서브영역 뷰 인스턴스 /////////////////////////////
// 👆윗줄에 제일 먼저 쓴 이유 : 제이쿼리코딩이 먹히려면 먼저 얘네가 있어야하기 때문에 제일 윗줄에 써준것임




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
    store, // ⭐뷰엑스 스토어 사용하려면 등록필수⭐
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

        // 신상품 기능함수 호출
        sinsangFn();

        // 패럴렉스 플러그인 적용함수
        setParallax(".c2", 0.7);
        // setParallax("적용할 요소", 속도);
        // 속도는 0.1~0.9까지

        // 스크롤리빌 플러그인 적용 호출
        $.fn.scrollReveal();

        // 전체 메뉴 클릭시 전체 메뉴창 닫기
        $(".mlist a").click((e)=>{
            // 0.기본이동 막기 (url맨 뒤에 #이 붙지 않도록)
            e.preventDefault();
            // 1.전체 메뉴창 닫기
            $(".ham").trigger("click");
            // 2.부드러운 스크롤 위치값 업데이트해주기(그래야 안 튐) + 맨 위 이동
            sc_pos = 0;
            $("html, body").animate({scrollTop:"0"},1);
            // 3.스와이퍼 첫번째 슬라이드로 이동하기!(초기화 시켜주는 것)
            swiper.slideTo(0);
            // : 첫번째 슬라이드는 0번임! 스와이퍼 API를 이용한 것임
            // 4.등장액션 스크롤리빌 다시 호출하기 (초기화시켜주는것)
            $.fn.scrollReveal();

            // 5.url 강제 변경하기
            // 변경이유 : SPA변경시 전달변수 내용 일치하게 만들기 위함 -> 새로고침시 현재 변경 로딩
            history.pushState(null,null,"sub.html?cat="+store.state.name);
            /***************************************************** 
            [ history.pushState() 메서드 ]

            1. 브라우저 세션 기록 스택항목 추가메서드
            2. 비동기식으로 작동함(주소이동없이 주소만 업데이트됨!)
            3. 전달값 :
                history.pushState(상태,사용안됨,URL)

                (1) 상태 : 새로운 페이지 이동시 popstate가 됨
                (2) 사용안됨 : 전부터 사용되던 전달값.지금사용안됨
                    보통 (1),(2)는 null로 셋팅함
                (3) URL : 이 주소는 현재 페이지가 포함된
                    주소 카테고리(폴더)를 기준으로 작성됨

            4. 사용기본폼 : 
                history.pushState(null,null,"my.html?hi=bye") 
            *****************************************************/

            // 6.상세보기 박스가 열려 있을 수 있으므로 닫기!
            $("#bgbx").hide();
        });
        // $(선택요소).trigger(이벤트명)
        // ->> 선택 요소의 이벤트를 강제 발생시킨다 (제이쿼리전용)
        // 참고사항 : JS에서의 클릭이벤트 강재 발생법은 document.querySelector(요소).click(); 이다
        


        // GNB메뉴 클릭시 해당위치로 스크롤이동 애니메이션
        // 각 .gnb a에는 href="#c2" 이런식으로 id요소가 있음
        // a요소의 #아이디명으로 기본 위치이동은 되지만 스크롤 애니메이션은 되지 않음
        // 이것을 제이쿼리로 한다!
        $(".gnb a").click(function(e){
            // 1.기본 이동 막기
            e.preventDefault();
            // 2.클릭된 a요소의 href값 읽어오기
            let aid = $(this).attr("href");
            
            // 3.아이디요소의 박스 위치 구하기
            let newpos = $(aid).offset().top;
            
            console.log("이동 아이디 : ", aid, " / 위치 : ", newpos);

            // 4.애니메이션 이동
            $("html, body").animate({
                scrollTop: newpos + "px"
            }, 600, "easeOutQuint");

            // 5.부드러운 스크롤 변수에 현재 위치값 업데이트하기
            sc_pos = newpos;
            
        }); ////////////////// click /////////////////////


        // 로고 클릭시 첫 페이지로 이동하기!
        $("#logo").click(()=>location.href="index.html");

        
        // 상품 클릭시 상세보기 정보 세팅하여 보이기
        $(".flist a").click(function(e){
            // 0.기본이동 막기
            e.preventDefault();
            // 1.클릭된 요소의 부모(li)의 클래스 읽어오기
            let cls = $(this).parent().attr("class");
            console.log("클래스명 : ", cls);

            // 2.클릭된 요소의 다음 형제 요소의 정보값 읽어오기
            // split("<br>") : <br>태그로 잘라서 배열에 담음!
            let ginfo = $(this).next(".ibox").html().split("<br>");
            console.log("상품정보: ", ginfo);

            // 3.뷰x 스토어 업데이트(리액티브 데이터 반영!)
            store.state.cls = cls;
            store.state.gname = ginfo[0];
            store.state.gcode = ginfo[1];
            store.state.gprice = ginfo[2];

            // 4.슬라이드 애니메이션하여 나타나기
            $("#bgbx").slideDown(400);
        
        }); ////////////////// click //////////////////////////

        // 상세보기 박스의 닫기버튼 클릭시 닫기
        $(".cbtn").click(function(e){
            e.preventDefault();

            $("#bgbx").slideUp(400);
        }); ///////////////////// click ///////////////////////

        // 상세보기 박스의 썸네일 링크 세팅
        $(".small a").click(function(e){
            e.preventDefault();
            // 추가 기능 코드 구현...
        }); ///////////////////// click ////////////////////



    }, ///////////////////// mounted 구역 ///////////////////////////////
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
    swiper = new Swiper(".mySwiper", {
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



////////////////////// 신상품 기능구현 함수 //////////////////////////
function sinsangFn(){

    /************************************************************************************
        함수명 : moveList
        기능 : 신상품 리스트 박스를 연속하여 왼쪽방향으로 흘러가도록 함
        -재귀호출 상태값을 만들어서 그걸로 재귀호출함
    ************************************************************************************/
    // 대상선정 : .flist
    const flist = $(".flist");
    // 위치값 변수
    let lpos = 0;
    // 재귀호출 상태값 변수 (1-호출가능 / 0-호출불가)
    let call_sts = 0;
    // 스크롤시 상태값 변수 (1-호출가능 / 0-호출불가)
    let sc_sts = 0;
    // 재귀호출 타임아웃용 변수
    let callT;

    function moveList(){
        // 1.이동위치값(left) 감소하기
        lpos--;

        // console.log("위치값: ", lpos);

        // 2.한계값 초기화하기 + 첫번째 요소 맨 뒤로 이동하기
        if(lpos < -300){
            // 위치값 초기화
            lpos = 0;

            // 첫번째 li 맨 뒤로 보내기
            flist.append(flist.find("li").first());
        }

        // 3.이동하기
        flist.css({
            left: lpos + "px"
        });

        // 타임아웃 비우기 : 타임아웃 쌓이지 않게 지우기
        clearTimeout(callT);

        // 재귀호출하기(비동기호출 setTimeout으로 호출!)
        // 조건 : 재귀호출 상태값이 1일때만 호출하기!
        if(call_sts) callT = setTimeout(moveList, 30);
    } //////////////////////// moveList 함수 //////////////////////////

    // 신상품 이동함수 최초호출
    // 특정 위치에 와야 이동 시작하도록 하기 - 왜?) 첨부터 움직이면 맨처음 상품은 이미 지나가서 확인 불가하므로~
    // moveList();

    
    // 신상품 리스트에 마우스오버시 멈춤
    // 신상품 리스트에 마우스아웃시 이동
    // hover(함수1, 함수2)
    flist.hover(
        // over시
        function(){
            call_sts = 0;
            // 재귀호출 상태값을 0으로 만들어서 중단시키기
        }, 
        // out시
        function(){
            call_sts = 1;
            // 재귀호출 상태값 1로 만들기
            // 함수 재호출해서 1로 만들어서 다시 호출 허용한 상태값을 집어넣기
            moveList();
        }
    ); ///////////////// hover //////////////////////////

    /************************************************************************************
        신상품 리스트 li에 마우스 오버시 정보 보이기
        1.대상 : .flist li
        2.정보 구분법 : li의 클래스명으로 신상품 정보와 매칭하여 상품정보 박스를 동적으로 생성하여 애니메이션을 주어 보이게 함
    ************************************************************************************/
    flist.find("li").hover(
        // over시
        function(){
            // 1.클래스 정보 알아내기
            let clsnm = $(this).attr("class");
            // 2.클래스 이름으로 셋팅된 신상정보 객체 데이터 가져오기
            // 중간 객체 속성명 상위 부모박스 #c1에 data-cat 속성값 읽어와서 sinsang[요기][]에 넣기
            let cat = $(this).parents("#c1").attr("data-cat");
            let gd_info = sinsang[cat][clsnm];

            // console.log("data-cat: ", cat);

            // console.log(clsnm, gd_info);

            // 3.상품정보 박스 만들고 보이게하기
            // : 마우스오버된 li자신 = this 에 넣어주면 됨
            $(this).append(`<div class="ibox"></div>`);
            // .ibox에 상품정보 넣기
            // ^는 특수문자이므로 정규식에 넣을 때 역슬레시 \와 함께 써야함
            // -> \^를 슬레시 사이에 넣고, g는 전부다 찾으라는 뜻임
            // $(".ibox").html(gd_info.replace(/\^/g, "<br>"))
            // ->아니면 replaceAll()써도 됨
            $(".ibox", this).html(gd_info.replaceAll("^", "<br>"))
            .animate({
                top: "110%",
                opacity: 1
            },300, "easeOutCirc");

        }, 
        // out시
        function(){
            // ibox 나갈 때 지우기 (태그 자체를 지우기)
            $(".ibox", this).remove();

        }
    ); //////////////////////////////// hover ////////////////////////////////////

    
    /**************************************************************************
        스크롤 위치가 신상품 박스가 보일 때만 움직이기
    **************************************************************************/
    // JS의 getBoundClientRect()의 값과 같은 것은?
    // = 적용 박스의 offset().top위치값 - scroll바 위치값
    // 1.대상요소 위치값
    let tgPos = flist.offset().top;
    console.log("대상요소 위치값: ", tgPos);

    // 2.스크롤 위치 변수
    let scTop = 0;

    // 3.화면 높이값
    let winH = $(window).height();
    console.log("화면 높이값: ", winH);

    // 4.스크롤 이벤트 함수
    $(window).scroll(function(){
        // 스크롤 위치값
        scTop = $(this).scrollTop();

        // gBCR(getBoundClientRect)값 구하기
        let gBCR = tgPos - scTop;
        // console.log("getBoundClientRect(): ", gBCR);

        // 신상품 리스트 이동/멈춤 분기하기
        // (1)이동 기준 : gBCR값이 화면 높이값보다 작고 0보다 클 때 이동하기
        if(gBCR < winH && gBCR > -300 && sc_sts === 0){
            sc_sts = 1;
            // 한번만 실행

            call_sts = 1;
            // 재귀호출 상태값 1로 만들기 (한번만 실행되도록 하기)

            moveList();
            // 함수 재호출해서 1로 만들어서 다시 호출 허용한 상태값을 집어넣기

            console.log("범위1");

        } ////////////// if //////////////
        // (2)기타 경우 멈춤(조건: 윈도우 높이보다 크거나 0보다 작고 sc_sts === 1 일때)
        if((gBCR > winH || gBCR < -300) && sc_sts === 1){
            sc_sts = 0;
            // 한번만 실행

            call_sts = 0;
            // 재귀호출 상태값을 0으로 만들어서 중단시키기

            console.log("범위2");

        } ////////////// else ///////////////
        

        /**************************************************************
            서브 배너 스와이퍼 api를 이용한 작동 멈춤 세팅하기
        기준 : 화면 높이값보다 스크롤 위치가 크면 멈춤, 작으면 자동 넘김
        **************************************************************/
        // 스크롤 위치가 크면 멈춤
        // 스와이퍼 API : swiper.autoplay.stop()
        // 스크롤 위치가 작으면 자동넘김
        // 스와이퍼 API : swiper.autoplay.start()
        if(scTop > winH){
            swiper.autoplay.stop();
        } //////////// if //////////////
        else{
            swiper.autoplay.start();
        } ///////////// else ///////////////
    }); //////////////////////// scroll ///////////////////////////////

} ///////////////////////// sinsangFn 함수 //////////////////////////




// 패럴렉스 플러그인 적용함수
function setParallax(ele, speed){
    // 대상: .c2
    $(ele).parallax("50%", speed);
    // parallax("배경위치", 움직이는 속도);
} /////////////////// setParallax 함수 ////////////////////////

