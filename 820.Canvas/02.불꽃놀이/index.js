// 02.불꽃놀이 - index.js

import CanvasOption from "./js/CanvasOption.js";
import Tail from "./js/Tail.js";
import Particle from "./js/Particle.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";
import Spark from "./js/Spark.js";


// CanvasOptoin 클래스를 부모 클래스로 상속받아와
class Canvas extends CanvasOption {
    constructor(){
        // 부모클래스에서 정의한 변수, 메서드들을 this로 쉽게 가져다 쓰기 위해 super()사용
        super();

        // 여러 파티클들 담을 배열 만들기
        this.particles = [];

        // 꼬리 담을 배열 만들기
        this.tails = [];

        // 스파크 담을 배열 만들기
        this.sparks = [];
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
    } ///////////////////// init() /////////////////////

    
    // 꼬리 만드는 함수 만들기
    createTail(){
        // 양 사이드에서 20퍼센트씩 떨어진 그 사이값 중에서 랜덤하게 가져오게 하기
        const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasHeight * 0.8);
        // const vy = -20;
        // const vy = randomNumBetween(15, 20) * -1;
        // 화면 높이값에 따라 바뀌는 유동적인 vy 값 만들기
        const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
        
        // 색상
        // const color = '255, 255, 255';
        // 랜덤 색상으로 만들기
        const colorDeg = randomNumBetween(0, 360);

        this.tails.push(new Tail(x, vy, colorDeg));
    } /////////////////// createTail() ////////////////////

    // 파티클 만들 함수 만들기
    createParticles(x, y, colorDeg){
        // 파티클의 개수
        const PATICLE_NUM = 400;
        // 동일 지점에서 파티클들이 생성되도록 for문 바깥으로 꺼냄
        // const x = randomNumBetween(0, this.canvasWidth);
        // const y = randomNumBetween(0, this.canvasHeight);
        

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

            // 꼬리의 색상과 약간 다르게 만들기 위해 기존의 colorDeg에다 차이값 더해서 부여하기
            const _colorDeg = randomNumBetween(-20, 20) + colorDeg;

            // 배열에 만든 파티클 담기
            this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
        }
    } //////////////////// createParticles() ////////////////////////


    // 그리기
    render(){
        let now, delta;
        let then = Date.now();

        // 캔버스 사이즈 미리 선언
        // let canvasWidth, canvasHeight;


        // 프레임 함수 만들고 랜더링하는 로직 넣기
        const frame = ()=>{
            requestAnimationFrame(frame);
            
            now = Date.now();
            delta = now - then;
    
            if(delta < this.interval) return;
            // 클리어 함수로 지우는 방식 대신, 색상 넣어서 덮어 씌우는 방식으로 지우는 것처럼 만들기
            this.ctx.fillStyle = this.bgColor + '40'; // #00000040
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            // 배경색 색입히기 : 5만이라는 큰 값으로 나누면 밝기 조절이 됨
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length / 50000})`;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            // 파티클이 터질 때 
    
            // 꼬리 메인 로직 //
            // 코리 만드는 함수 호출
            if(Math.random() < 0.03) this.createTail();

            // 업데이트,드로우 해주기
            this.tails.forEach((tail, index) => {
                tail.update();
                tail.draw();

                // 꼬리 그려지고나서 스파크 터지게 만들기
                for(let i = 0; i < Math.round(-tail.vy * 0.5); i++){
                    const vx = randomNumBetween(-5, 5) * 0.05;
                    const vy = randomNumBetween(-5, 5) * 0.05;
                    // tail.vy가 -10이나 20몇으로 시작해서 0으로 수렴할텐데 우선 양수로 바꿔서 10몇으로 놔둔다음 업데이트함수 안에서 -0.몇씩 감소하면 너무 늦게 사라지니까 0.5이상으로 넘어가는 값은 0.5로 해두고, 속도가 0.5이하로 줄ㅇ어들게 되면 그 값만큼 투명도에 넣어주겠다는 뜻이 됨
                    const opacity = Math.min(-tail.vy, 0.5);

                    this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg));
                }
                
                // 꼬리의 속도가 거의 0이 되는 시점에 폭죽 터트리기
                if(tail.vy > -0.7){
                    // 꼬리 지우기
                    this.tails.splice(index, 1);

                    // 폭죽 터트리기 : 꼬리가 사라진 그 지점의 위치값을 가져가야함
                    this.createParticles(tail.x, tail.y, tail.colorDeg);
                }
            });
            

            // 폭죽 메인 로직 //
            this.particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // 파티클이 생성되면, 스파크 잔상이 남도록 파티클의 x,y값으로 만든 스파크 인스턴스를 스파크 배열에 담기
                // -> 모든 파티클에 스파크가 생기면 퍼포먼스에 이슈 발생함(느려짐) 그래서 if문으로 제어하기
                if(Math.random() < 0.1){
                    this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
                }

                // 파티클의 투명도가 0보다 작아지면 배열에서 없애주기
                if(particle.opacity < 0){
                    this.particles.splice(index, 1);
                }
            });


            // 스파크 메인 로직 //
            this.sparks.forEach((spark, index)=>{
                spark.update();
                spark.draw();

                // 스파크 투명도가 0보다 작아지면 배열에서 없애주기
                if(spark.opacity < 0){
                    this.sparks.splice(index, 1);
                }
            });
            

            then = now - (delta % this.interval);
        };
        
        // 프레임 함수 호출
        requestAnimationFrame(frame);
    } ////////////////////// render() //////////////////////
}









// 인스턴스 만들기
const canvas = new Canvas();

window.addEventListener("load", ()=>{
    canvas.init();
    canvas.render();
});

window.addEventListener("resize", ()=>{
    canvas.init();
});
