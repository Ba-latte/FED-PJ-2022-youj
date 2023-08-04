// 02.불꽃놀이 - index.js

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio;

const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();

// 캔버스 사이즈 미리 선언
let canvasWidth, canvasHeight;






// 초기화함수 만들기
function init(){
    // 캔버스 사이즈 담기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;

    // 캔버스 사이즈 담당하는 2가지 방법으로 사이즈 조절하기
    // 1.고유사이즈 지정하기
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    // 2.css로 강제로 늘리거나 줄이기
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
}






// animate 함수 만들기 : 이제 이걸 랜더라고 할 예정
function render(){
    // fps 개념 도입해서 모든 모니터에서 동일한 움직임 보이게 하기
    requestAnimationFrame(render);
    
    now = Date.now();
    delta = now - then;

    if(delta < interval) return;

    // 메인 로직 : 기본적인 fps 작업
    ctx.fillRect(100, 100, 200, 200);


    then = now - (delta % interval);
}



window.addEventListener("load", ()=>{
    init();
    render();
});

window.addEventListener("resize", ()=>{
    init();
});
