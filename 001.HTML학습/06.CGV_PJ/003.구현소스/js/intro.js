// 인트로 페이지 JS - intro.js

// 로딩 호출 /////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

// 로딩 실행 함수 /////////////////////
function loadFn(){
    // 호출 확인
    console.log("로딩 완료!");

    // 동영상 시간을 체크하여 일정 시간 후 메인 페이지로 넘길 수 있음
    // setTimeout(() => {
    //     location.href = "main.html";
    // }, 40000);
    // 🌷그러나... 동영상 시간 이벤트를 사용하여 넘기자!!

    // 동영상 대상 : #myvid
    const myvid = document.querySelector("#myvid");
    // 호출 확인
    // console.log(myvid);

    // 🌈동영상 재생 중 발생하는 이벤트는?
    // timeupdate : 동영상 재생 시간이 계속 업데이트시 발생
    myvid.addEventListener("timeupdate", chkvid);

    // 체크업 하는 함수 만들기
    function chkvid(){
        console.log("멈췄니?", myvid.paused);

        // 비디오가 멈추면 재생이 끝난 것이므로! 비디오 멈춤 상태를 체크하면 됨
        // paused 속성 : 멈추면 true, 아니면 false를 리턴함
        // 주의사항!! 비디오가 loop면 안된다!

        // 멈춤상태가 true면 메인 페이지로 이동!
        if(myvid.paused){
            location.href = "main.html";
        } /////////////// if문 끝 ///////////////

    } /////////////// chkvid 함수 끝 ////////////////
} //////////////// loadFn 함수 끝 /////////////////////