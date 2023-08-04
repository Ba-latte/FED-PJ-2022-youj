
import CanvasOption from "./CanvasOption.js";



export default class Particle extends CanvasOption{
    constructor(x, y, vx, vy, opacity){
        super();

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        // 파티클들 투명도
        this.opacity = opacity;

        // 중력
        this.gravity = 0.12;

        // 마찰
        this.friction = 0.93;
    }
    // 앞으로 파티클 다룰 때 기본적으로 사용해야할 업데이트, 드로우 함수 만들기
    update(){
        // 중력 받아서 아래로 떨어지게 만들기
        // this.y += 1;

        // 중력값 적용하기
        this.vy += this.gravity;

        // 마찰? 부여하기
        this.vx *= this.friction;
        this.vy *= this.friction;

        // 이제 가져온 속도값 넣어주기
        this.x += this.vx;
        this.y += this.vy;

        // 파티클 투명도값 낮추기
        this.opacity -= 0.02;

    }
    draw(){
        // 원 색상 바꾸기
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;

        // 원 그리는 기본 로직
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

    }
}