// 무한이동 드래그&클릭형&멀티 배너 JS - multi.js


// 공통 슬라이드 함수 import하기
import mySlider from "./mySlider.js";

// 함수 호출하기
// 현재 슬라이드 3군데 모두 적용하기
// 제이쿼리버전
$(".slider").each((idx, ele)=>{
    // console.log(ele);
    mySlider(ele);
});

// js버전
// document.querySelectorAll(".slider").forEach((ele)=>{
//     mySlider(ele);
// });