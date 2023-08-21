// LG 카운트다운 js

import Particle from "./js/Particle.js";


const canvas = document.querySelector("canvas");
// 캔버스에 접근할 ctx만들기
const ctx = canvas.getContext("2d");

// 사이즈 관련 로직에서 사용할 dpr 가져오기
const dpr = window.devicePixelRatio;

// 캔버스 사이즈 가져오기
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
// fps에서 쓸 인터벌 설정 : 1000 / n 이라고 하면 n마다 발생됨
const interval = 1000 / 60;


//////////////// 배열 //////////////////
const particles = [];


// 구조화 시키기
function init(){
    // 사이징 관련 코드 전부 옮기기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    // 선명하게 만들기
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
} ///////////////// init() ////////////////////


///////////// 링 만들기 ////////////////
function createRing(){
    const PARTICLE_NUM = 800;
    for(let i = 0; i < PARTICLE_NUM; i++){
        particles.push(new Particle());
    }
}


function render(){
    let now, delta;
    let then = Date.now();
    
    
    // 프레임 함수
    const frame = ()=>{
        // 프레임을 인자로 넣어 스스로 반복시키는 재귀함수로 만들어 현재 디스플레이 사양에 따라 매 프레임마다 실행되도록 만들기
        requestAnimationFrame(frame);
    
        // fps 적용하기 : 내가 설정한 fps에 따라서 프레임 함수가 실행됨
        now = Date.now();
        delta = now - then;
        if(delta < interval) return;

        // 이전 프레임에 남아있는 파티클 지워서 움직이는 모양새로 만들기
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        // console.log("프레임 실행!", frame);

        // 파티클 배열 돌면서 파티클 업데이트, 드로우하기
        // particles.forEach((particle, index)=>{
        //     particle.update();
        //     particle.draw(ctx);

        //     // 투명도가 0 이하가 된 파티클들은 배열에서 제거하기
        //     if(particle.opacity < 0) particles.splice(index, 1);
        // })
        // 👉 forEach 돌며 배열에서 splice로 제거하면, 다음 인덱스의 파티클이 지워진 파티클의 위치로 이동되면서 해당 인덱스의 파티클을 건너뛰는 현상이 발생하기 떄문에 반짝이는 부작용이 발생함 -> 이를 막기 위해 for문으로 거꾸로 순회하는 방법 사용함
        for(let i = particles.length -1; i >= 0; i--){
            particles[i].update();
            particles[i].draw(ctx);

            if(particles[i].opacity < 0) particles.splice(i, 1);
        }
    
        then = now - (delta % interval);
    };
    
    requestAnimationFrame(frame);
} /////////////////////// render() ////////////////////////



// 윈도우가 로드되면 init, render함수 호출
window.addEventListener("load", ()=>{
    init();
    render();
})

// 윈도우 리사이즈될 때마다 init함수 호출
window.addEventListener("resize", init)


// 클릭할때마다 createRing 함수 호출하기
window.addEventListener("click", ()=>{
    // 카운트다운 후 애니메이션 실행되도록 만들기 : gsap활용
    const texts = document.querySelectorAll("span");
    const countDownOption = {
        opacity: 1,
        scale : 1,
        duration : 0.4,
        ease: "Power4.easeOut"
    };

    gsap.fromTo(texts[0], {opacity: 0, scale: 5},{
        ...countDownOption
    });
    gsap.fromTo(texts[1], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 1,
        onStart: () => texts[0].style.opacity = 0
    });
    gsap.fromTo(texts[2], {opacity: 0, scale: 5}, {
        ...countDownOption,
        delay: 2,
        onStart: () => texts[1].style.opacity = 0
    });
    
    const ringImg = document.querySelector("#ring");
    gsap.fromTo(ringImg, {opacity: 1}, {
        opacity: 0,
        duration: 1,
        delay: 3,
        onStart: ()=>{
            createRing();
            texts[2].style.opacity = 0;
        }
    })
});