

import { randomNumBetween } from "./util.js";

export default class Particle{
    constructor(){
        this.r = innerHeight / 4;
        this.angle = randomNumBetween(0, 360);

        // 원모양으로 퍼져있도록 좌표값 설정하기
        // this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle);
        // this.y = innerHeight / 2 + this.r * Math.sin(Math.PI / 180 * this.angle);
       
        // 퍼지는 힘에 대한 값 랜덤하게 적용하기
        this.rAlpha = randomNumBetween(0, 5);
        this.angleAlpha = randomNumBetween(1, 2);

        // 마찰력 만들기 (1보다 커지면 가속, 작으면 마찰력이 됨)
        // this.rFriction = 1.01;
        this.rFriction = randomNumBetween(0.95, 1.01);
        // this.angleFriction = 0.97;
        this.angleFriction = randomNumBetween(0.97, 0.99);

        // 투명도 조절
        // this.opacity = 1;
        this.opacity = randomNumBetween(0.2, 1);
    }
    update(){
        // 원 모양으로 흩어져있는 파티클들을 바깥으로 뻗어나가게 만들기
        // this.r += 1;
        this.rAlpha *= this.rFriction;
        this.r += this.rAlpha;

        // this.angle += 1;
        this.angleAlpha *= this.angleFriction;
        this.angle += this.angleAlpha;

        this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle);
        this.y = innerHeight / 2 + this.r * Math.sin(Math.PI / 180 * this.angle);

        // 점점 투명하게 만들기
        this.opacity -= 0.003;

    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }
}