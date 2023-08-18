import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption{
    constructor(x, vy, colorDeg){
        super();

        this.x = x;
        this.y = this.canvasHeight;
        this.vy = vy;
        this.colorDeg = colorDeg;
        
        // this.friction = 0.97;
        this.friction = 0.985;

        // 각도값
        // this.angle = 0;
        this.angle = randomNumBetween(0, 2);
    }
    
    update(){
        this.vy *= this.friction;
        this.y += this.vy;

        // 위로 올라갈 때 꼬불꼬불하게 하기
        this.angle += 1;
        this.x += Math.cos(this.angle) * this.vy * 0.2;

        this.opacity = -this.vy * 0.1;
    }

    draw(){
        // hsl에서 마지막으로 쓰인 값은 a(알파)로 투명도를 나타냄
        this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65% ${this.opacity}`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}