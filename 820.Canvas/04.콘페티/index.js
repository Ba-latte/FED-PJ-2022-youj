import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// dpr이 3이나 4인 기기에서 퍼포먼스 이슈 발생 가능성이 있고, 이번 플젝에서는 dpr이 2이면 충분하기 때문에 dpr을 1이나 최대값을 2로 강제 고정함 (많이들 이렇게 함 참고 바람)
const dpr = window.devicePixelRatio < 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

// particles 배열
const particles = [];



// init 함수 : 처음 로드될 때, 리사이즈될 때 실행됨
function init(){
    // canvasWidth, canvasHeight 사이즈 업데이트 하기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;

    // 캔버스 사이즈 css 스타일 적용
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    // 캔버스 고유 사이즈 적용
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    // 기기마다 선명도 차별 적용
    ctx.scale(dpr, dpr);



}


// 콘페티 생성 함수
function confetti({ x, y, count, deg, colors, shapes, spread }){
    for(let i = 0; i < count; i++){
        particles.push(new Particle(x, y, deg, colors, shapes, spread));
    }
}




// render 함수
function render(){
    let now, delta;
    let then = Date.now();

    // 회전시키도록 하기 위한 deg변수
    let deg = 0;

    // 프레임 함수 : 리퀘스트애니메이션프레임으로 재귀적으로 계속 스스로 실행시킴 (이렇게 하면 144헤르쯔 게이밍 모니터에서 1초에 144번 실행되고 60헤르쯔 사무용 모니터에서는 1초에 60번 실행되므로 두 모니터 모두 동일하게 실행하기 위해서, fps를 적용해줘야함)
    const frame = ()=>{
        requestAnimationFrame(frame);

        // 각기 다른 모니터에서 동일번 실행 위해 fps 적용
        now = Date.now();
        delta = now - then;
        if(delta < interval) return;
        // delta가 interval보다 크면 아래 실행

        // 매 프레임마다 지우고 시작하기
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // deg변수에 누적해서 1씩 더해서 매 프레임마다 콘페티의 각도를 바꿔서 콘페티가 회전하는 것처럼 만들기
        // deg += 1;
        // confetti({
        //     x: 0.5,   // 0 ~ 1
        //     y: 0.5, // 0 ~ 1
        //     count: 5,
        //     deg: 90 + deg,
        //     spread: 1
        // });
        // confetti({
        //     x: 0.5,   // 0 ~ 1
        //     y: 0.5, // 0 ~ 1
        //     count: 5,
        //     deg: 225 + deg,
        //     spread: 1
        // });
        // confetti({
        //     x: 0.5,   // 0 ~ 1
        //     y: 0.5, // 0 ~ 1
        //     count: 5,
        //     deg: 315 + deg,
        //     spread: 1
        // });

        // 콘페티 생성 하기
        for(let i = particles.length - 1; i >= 0; i--){
            // 업데이트하기
            particles[i].update();

            // 그리기
            particles[i].draw(ctx);

            // 투명도가 0이 된 파티클 제거하기
            if(particles[i].opacity < 0) particles.splice(i, 1);
            // 파티클의 y값이 캔버스높이값보다 커지면(=화면밖으로 나가면) 파티클 제거하기
            // if(particles[i].y > canvasHeight) particles.splice(i, 1);
        }



        then = now - (delta % interval);
    };

    // 호출해서 실행하기 : 트리거 걸어주기
    requestAnimationFrame(frame);
}



// 윈도우 클릭시 콘페티 생성 함수 호출하기
window.addEventListener('click', ()=>{
    // 콘페티 생성 함수 호출
    confetti({
        // x: canvasWidth / 2,
        // y: canvasHeight / 2,
        x: 0,   // 0 ~ 1
        y: 0.5, // 0 ~ 1
        count: 10,
        deg: -30,
        // colors: ['#ff0000']
        // shapes: ['sqaure'],
        // spread: 1,
    });
});



window.addEventListener("resize", init);

window.addEventListener("load", ()=>{
    init();
    render();
});

