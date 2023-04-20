// 보그 PJ 링크 시스템 JS - linksys.js //////
// : 메뉴 클릭하면 거기로 가게 만들기


// 제이쿼리 로드 구역
$(()=>{
    /************************************************
        로그인, 회원가입, 갤러리 아이콘 넣기
    ************************************************/
    // 대상 : .sns a:last (마지막 카카오스토리 a요소)
    // 대상 추가 : .mosns a:last (모바일 카카오스토리 a요소)
    // 변경 내용 : 대상요소 앞에 형제요소로 a요소 삽입
    // 제이쿼리 메서드 :
    // before(요소) -> 선택요소 앞에 형제요소 추가
    // after(요소) -> 선택요소 뒤에 형제요소 추가
    // ->>>모바일 sns도 추가
    $(".sns a:last, .mosns a:last").before(`
        <a href="#" class="fi fi-laptop">
            <span class="ir"> 로그인 </span>
        </a>
        <a href="#" class="fi fi-user-secret">
            <span class="ir"> 회원가입 </span>
        </a>
        <a href="#" class="fi fi-camera">
            <span class="ir"> 갤러리 </span>
        </a>
    `); //////////// before //////////////////

    // 모바일버전에서 sns 4번째 요소 a뒤에 <br> 넣기
    $(".mosns a").eq(3).after("<br>");

    // sns 파트 a 요소들에 툴팁 넣기 /////////////
    // each((idx, ele)=>{코드})
    $(".sns a").each((idx, ele)=>{
        // attr(속성명, 값)으로 속성명 읽어와서 값 넣기
        // ->값으로 자식요소인 .ir의 텍스트를 읽어감!
        let irTxt = $(ele).find(".ir").text().trim();
        // 툴팁 넣기
        $(ele).attr("title", irTxt);
    }); //////////// each //////////////////

    /***************************************************
        sns 메뉴 파트 링크 세팅하기 (DT + Mobile)
        !!주의!! 항상 html DOM 변경 후에 이벤트 작업을 할 것!!
        먼저 이벤트를 걸고 DOM 변경을 하면 이벤트가 풀린다~!
    ***************************************************/
    $(".sns a, .mosns a").click(function(e){
        // 기본 이동 막기
        e.preventDefault();

        // 1.클릭된 a요소 text 읽기 + 앞뒤공백제거(trim())
        let atxt = $(this).text().trim();
        console.log(atxt);

        // 2. 이동할 페이지 주소 할당하기
        let url;
        switch (atxt) {
            case "인스타그램":
                url = "https://www.instagram.com/VOGUEKOREA/";
                break;
            case "페이스북":
                url = "https://www.facebook.com/VOGUEkr";
                break;
            case "트위터":
                url = "https://twitter.com/VogueKorea";
                break;
            case "유튜브":
                url =
                    "https://www.youtube.com/user/VogueKorea?sub_confirmation=1";
                break;
            case "로그인":
                url = "login";
                break;
            case "회원가입":
                url = "member";
                break;
            case "갤러리":
                url = "gallery";
                break;
            case "카카오스토리":
                url = "https://story.kakao.com/ch/voguekr";
                break;
        } ////////// switch /////////////

        console.log(url);

        // 3.페이지 이동하기
        if(atxt === "로그인" || atxt === "회원가입" || atxt === "갤러리"){
            location.href = url + ".html";
        } ////////////// if : 로그인,회원가입,갤러리인경우 ///////////////////
        else{
            // window.open(주소) : 외부 시스템 새창 열기
            window.open(url);
        } ////////////// else : 나머지 경우 새창 열기 /////////////////////////

    }); ////////////////// click ///////////////////



}); ////////////////////////////////////// jQB ///////////////////////////////////////










////////////////////////////////////// 로딩 구역 ////////////////////////////////////////
window.addEventListener("DOMContentLoaded", linkFn);

////////////////////////// 링크시스템 로드 함수 //////////////////////////////
function linkFn(){

    console.log("링크 로딩완료!");

    // 1.링크 대상 선정
    // (1) GNB : .gnb a
    const gnb = document.querySelectorAll(".gnb a, .mognb a");
    // console.log(gnb);
    // (2) 로고 : .logo a
    const logo = document.querySelector(".logo a");

    
    // 2.클릭 이벤트 설정하기
    // (1) GNB 클릭 설정
    for(let x of gnb){
        x.onclick = (e)=>{
            // (0) 클릭 이동기능 막기
            e.preventDefault();

            // (1) 클릭된 a요소의 텍스트를 읽어오기 + 소문자로 텍스트 바꾸기
            let atxt = x.innerText.toLowerCase().trim();
            // toLowerCase() : 소문자로 바꾸기
            // toUpperCase() : 대문자로 바꾸기
            // trim() : 앞/뒤 공백 제거하기

            console.log(atxt);

            // (2) 서브 페이지 이동하기 : "search"가 아니면 서브페이지로 이동하라는 뜻!
            if(atxt !== "search") location.href = "category.html?cat=" + encodeURIComponent(atxt);
            // encodeURIComponent() : 2byte문자나 특수문자가 있을 경우, 인코딩해줘야함! -> 받아가는 곳에서도 디코딩 해줘야 정확히 나옴

            




        }; /////////////////// onclick 이벤트 끝 ///////////////////
    } //////////////////// for of문 끝 ////////////////////////

    // (2) 로고 클릭 설정
    logo.onclick = (e)=>{
        e.preventDefault();

        // 홈으로 이동하기
        location.href = "index.html";
    }; //////////////////// onclick 이벤트 끝 /////////////////////


} //////////////////////// linkFn 함수 끝 ///////////////////////