/* 보그 PJ 공통 모듈 JS - common.js */

// 💘모바일 구분 코드
let mobsts = 0;
// 0 : DT, 1 : 모바일

// 💘화면 크기에 따른 모바일 코드 변경함수
const chkw = ()=>{
    if($(window).width() <= 500) mobsts = 1;
    else mobsts = 0;

    console.log("모바일여부 : ", mobsts);
}; ///////// chkw 함수 ////////////////

// 💘화면체크 함수 최초 호출
chkw();

// 💘화면 리사이즈시 화면체크 함수 호출
$(window).resize(chkw);
// "resize" 화면크기 변경시 발생 이벤트임




/////////////////////////////// 로드 구역 ////////////////////////////////////
window.addEventListener("DOMContentLoaded", ()=>{
    console.log("공통 js 로딩완료!");
    
    // 부드러운 스크롤 JS 호출
    startSS();

    // 만약 스크롤바를 직접 드래그할 경우
    // mouseup(즉, 스크롤바를 놓는 경우)
    // 이벤트 발생시 "Y축 스크롤바 위치"를 pos 전역변수에 업데이트한다
    // 📌주의사항! : 이벤트의 종류를 마우스업이아니라 스크롤로 하면! 현재 스크롤상태가 계속 업뎃되므로, 맨 위로 올라갔을때라면 값이0이 되어서...
    // 그래서 스크롤이 안 움직이는 문제 발생함!!
    
    window.addEventListener("mouseup", ()=>{
        pos = window.scrollY;
    }); ////////////////// scroll //////////////////////



    // 모바일 메뉴 초기 세팅하기 /////////////
    // 대상 : .top, #top
    $(".top").append(mobcode.mobtn);
    $("#top").append(mobcode.mobx);

    // 모바일 버튼 기능 구현하기 ////////////
    // 1.햄버거 버튼 클릭시 전체메뉴 보이기
    // 이벤트 대상 : .hbtn
    // 변경 대상 : #mobx
    $(".hbtn").click(()=>{
        $("#mobx").stop().slideToggle(400);
    }); ///////// click //////////

    // 2.검색 버튼 클릭시 검색박스 보이기
    // 이벤트 대상 : .sbtn
    // 변경 대상 : .mos
    $(".sbtn").click(()=>{
        $(".mos").stop().slideToggle(200);
    }); ///////// click //////////

    // slideToggle(시간) : slideup()/slidedown()을 자동 전환하는 메서드

    




}); //////////////////////////// 로딩 구역 ////////////////////////////////////



//////////////////// 모바일 관련 html 코드 객체 ////////////////////////////
const mobcode = {
    // 모바일 버튼 코드 : header.top 안에 넣기
    mobtn: `
    <!-- 모바일용 햄버거버튼 -->
    <a href="#" class="mobtn hbtn fi fi-nav-icon">
        <span class="ir">GNB button</span>
    </a>
    <!-- 모바일용 검색버튼 -->
    <a href="#" class="mobtn sbtn fi fi-search">
        <span class="ir">search</span>
    </a>
    `,
    // 모바일 메뉴 박스 코드 : header.top 바깥에 넣기(#top안에)
    mobx: `
    <!-- 1.4.모바일 검색박스 -->
    <div class="mos">
        <div class="mwrap">
            <!-- 입력창박스 -->
            <div id="search">
                <input type="text" class="search">
            </div>
            <!-- 검색버튼 -->
            <button class="scbtn fi fi-search">
                <span class="ir">돋보기검색아이콘</span>
            </button>
        </div>
    </div>

    <!-- 1.5.모바일 전체메뉴 -->
    <div id="mobx">
        <!-- 1.5-1.모바일 GNB 메뉴 -->
        <nav class="mognb">
            <ul>
                <li>
                    <a href="#">FASHION</a>
                </li>
                <li>
                    <a href="#">BEAUTY</a>
                </li>
                <li>
                    <a href="#">LIVING</a>
                </li>
                <li>
                    <a href="#">PEOPLE</a>
                </li>
                <li>
                    <a href="#">VIDEO</a>
                </li>
                <li>
                    <a href="#">RUNWAY</a>
                </li>
                <li>
                    <a href="#">SHOPPING</a>
                </li>
            </ul>
        </nav>
        <!-- 1.5-2.모바일 sns 메뉴 -->
        <div class="mosns">
            <a href="#" class="fi fi-instagram">
                <span class="ir">인스타그램</span>
            </a>
            <a href="#" class="fi fi-facebook">
                <span class="ir">페이스북</span>
            </a>
            <a href="#" class="fi fi-twitter">
                <span class="ir">트위터</span>
            </a>
            <a href="#" class="fi fi-youtube-play">
                <span class="ir">유튜브</span>
            </a>
            <a href="#">
                <span class="ir">카카오스토리</span>
            </a>
        </div>
        <!-- 1.5-3.매거진박스 -->
        <figure class="magbox">
            <!-- 잡지커버이미지 -->
            <a class="mcover" href="#">
                <img src="./images/cover.jpg" alt="보그표지">
            </a>
            <!-- 잡지설명 -->
            <figcaption>
                정기구독을 신청하면 최대 30% 할인혜택을 드립니다!
            </figcaption>
            <!-- 정기구독버튼 -->
            <button class="magbtn">정기구독 신청</button>
        </figure>

        <!-- 하단링크박스 -->
        <ul class="moblink">
            <li>
                <a href="#">회사소개 /</a>
            </li>
            <li>
                <a href="#">광고 및 제휴 /</a>
            </li>
            <li>
                <a href="#">
                    <strong>개인정보 처리방침</strong>
                </a>
            </li>
        </ul>
    </div>
    `,

}; ////////////// mobcode ////////////////////