// 02.불꽃놀이 - index.js

import CanvasOption from "./js/CanvasOption.js";
import Tail from "./js/Tail.js";
import Particle from "./js/Particle.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";

// let now, delta;
// let then = Date.now();

// // 캔버스 사이즈 미리 선언
// let canvasWidth, canvasHeight;


// // [ ❤캔버스 옵션 클래스로 만들기❤ ]
// class Canvas{
//     // 1.constructor에 정의한 고정 값들 옮기기
//     constructor(){
//         // 기본 고정값 세팅
//         this.canvas = document.querySelector("canvas");
//         this.ctx = this.canvas.getContext("2d");

//         this.dpr = window.devicePixelRatio;

//         this.fps = 60;
//         this.interval = 1000 / this.fps;

//         // 캔버스 사이즈 담기
//         this.canvasWidth = innerWidth;
//         this.canvasHeight = innerHeight;
//     }
// }


// CanvasOptoin 클래스를 부모 클래스로 상속받아와
class Canvas extends CanvasOption {
    constructor(){
        // 부모클래스에서 정의한 변수, 메서드들을 this로 쉽게 가져다 쓰기 위해 super()사용
        super();

        // 여러 파티클들 담을 배열 만들기
        this.particles = [];

        // 꼬리 담을 배열 만들기
        this.tails = [];

    }

    init(){
        // 캔버스 사이즈 지정하기
        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;

        // 1.고유사이즈 지정하기
        this.canvas.width = this.canvasWidth * this.dpr;
        this.canvas.height = this.canvasHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);

        // 2.css로 강제로 늘리거나 줄이기
        this.canvas.style.width = this.canvasWidth + "px";
        this.canvas.style.height = this.canvasHeight + "px";

        // 파티클 생성하기
        this.createParticles();
    }

    render(){
        let now, delta;
        let then = Date.now();

        // 캔버스 사이즈 미리 선언
        let canvasWidth, canvasHeight;


        // 프레임 함수 만들고 랜더링하는 로직 넣기
        const frame = ()=>{
            requestAnimationFrame(frame);
            
            now = Date.now();
            delta = now - then;
    
            if(delta < this.interval) return;
            // 클리어 함수로 지우는 방식 대신, 색상 넣어서 덮어 씌우는 방식으로 지우는 것처럼 만들기
            this.ctx.fillStyle = this.bgColor + '40'; // #00000040
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
            // 꼬리 메인 로직
            // 코리 만드는 함수 호출
            if(Math.random() < 0.03) this.createTail();
            // 업데이트,드로우 해주기
            this.tails.forEach((tail, index) => {
                tail.update();
                tail.draw();
                
                // 꼬리의 속도가 거의 0이 되는 시점에 폭죽 터트리기
                if(tail.vy > -0.7){
                    // 꼬리 지우기
                    this.tails.splice(index, 1);
                    // 폭죽 터트리기 : 꼬리가 사라진 그 지점의 위치값을 가져가야함
                    this.createParticles(tail.x, tail.y, tail.color);
                }
            });
            

            // 폭죽 메인 로직
            this.particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // 파티클의 투명도가 0보다 작아지면 배열에서 없애주기
                if(particle.opacity < 0){
                    this.particles.splice(index, 1);
                }
            });
    
            then = now - (delta % this.interval);
        };

        // 프레임 함수 호출
        requestAnimationFrame(frame);

    }
    // 꼬리 만드는 함수 만들기
    createTail(){
        // 양 사이드에서 20퍼센트씩 떨어진 그 사이값 중에서 랜덤하게 가져오게 하기
        const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasHeight * 0.8);
        // const vy = -20;
        // const vy = randomNumBetween(15, 20) * -1;
        // 화면 높이값에 따라 바뀌는 유동적인 vy 값 만들기
        const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
        const color = '255, 255, 255';

        this.tails.push(new Tail(x, vy, color));
    }

    // 파티클 만들 함수 만들기
    createParticles(x, y, color){
        // 파티클의 개수
        const PATICLE_NUM = 400;
        // 동일 지점에서 파티클들이 생성되도록 for문 바깥으로 꺼냄
        // const x = randomNumBetween(0, this.canvasWidth);
        // const y = randomNumBetween(0, this.canvasHeight);

        // 꼬리의 위치값 받아와서 파티클 만들때 쓰기
        

        // 반복문 돌아서 파티클 만들기
        for(let i = 0; i < PATICLE_NUM; i++){
            // const x = randomNumBetween(0, this.canvasWidth);
            // const y = randomNumBetween(0, this.canvasHeight);

            // 파티클의 반지름 부여 : 0.2곱해주면 보다 자연스러워짐
            // const r = randomNumBetween(2, 100) * 0.2;
            // 👉 0.2대신에 innerWidth와 innerHeight 사이 빗변의 길이를 곱한 값에서 0.0001 정도를 곱해주면 상대적으로 가로세로 길이를 다양하게 바껴도 사이즈에 맞춰진 폭죽 만들어짐
            const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;

            // 파티클의 각도 부여 : 여기 각도는 deg가 아니기 때문에 변환해주어야 함
            const angle = Math.PI / 180 * randomNumBetween(0, 360);

            // 파티클들 각각 랜덤 속도 가져가게 하기 위해 for문 안에서 속도 부여하기
            // const vx = randomNumBetween(-5, 5);
            // const vy = randomNumBetween(-5, 5);

            // 랜덤 속도 가지고 원 모양으로 퍼지게 만들기
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);

            // 투명도도 랜덤하게 만들기 위해서 투명도 부여
            const opacity = randomNumBetween(0.6, 0.9);

            // 배열에 만든 파티클 담기
            this.particles.push(new Particle(x, y, vx, vy, opacity, color));
        }
    }
}




// // 초기화함수 만들기
// function init(){


//     // 캔버스 사이즈 담당하는 2가지 방법으로 사이즈 조절하기
//     // 1.고유사이즈 지정하기
//     canvas.width = canvasWidth * dpr;
//     canvas.height = canvasHeight * dpr;
//     ctx.scale(dpr, dpr);

//     // 2.css로 강제로 늘리거나 줄이기
//     canvas.style.width = canvasWidth + "px";
//     canvas.style.height = canvasHeight + "px";
// }






// // animate 함수 만들기 : 이제 이걸 랜더라고 할 예정
// function render(){
//     // fps 개념 도입해서 모든 모니터에서 동일한 움직임 보이게 하기
//     requestAnimationFrame(render);
    
//     now = Date.now();
//     delta = now - then;

//     if(delta < interval) return;

//     // 메인 로직 : 기본적인 fps 작업
//     ctx.fillRect(100, 100, 200, 200);


//     then = now - (delta % interval);
// }



// 인스턴스 만들기
const canvas = new Canvas();

window.addEventListener("load", ()=>{
    canvas.init();
    canvas.render();
});

window.addEventListener("resize", ()=>{
    canvas.init();
});
