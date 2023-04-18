/* 파일럿 PJ 메인페이지 JS - main.js */

// 자동스크롤 기능 함수 가졍괴
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

// 메인페이지

// 햄버거버튼 클릭시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거버튼 클래스 변경하기(토글)
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);
    // 동영상 돌아가기
    
})