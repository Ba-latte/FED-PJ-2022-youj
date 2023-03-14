// 옷소매 갤러리 JS - main.js

///////////////// 로딩구역 ///////////////////////
window.addEventListener("DOMContentLoaded",()=>{

    console.log("로딩완료!");

    // 대상: .gbx
    const gbx = document.querySelector(".gbx");
    

    document.querySelector(".rb").onclick=()=>{
        console.log("오른쪽!");

        // 이동되는 대상 : .gbx>div
        let tg = gbx.querySelectorAll("div");

        // 첫번째 자식요소 div 맨 뒤로 이동
        // appendChild(첫번째요소)
        gbx.appendChild(tg[0]);


    }; /////////////// click ////////////////////

    document.querySelector(".lb").onclick=()=>{
        console.log("왼쪽!");

        // 이동되는 대상 : .gbx>div
        let tg = gbx.querySelectorAll("div");

        // 마지막 자식요소 div 맨 앞으로 잘라내서 이동
        // insertBefore(마지막요소, 첫번째요소)
        gbx.insertBefore(tg[tg.length-1],tg[0]);


    }; /////////////// click ////////////////////

}); ///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////