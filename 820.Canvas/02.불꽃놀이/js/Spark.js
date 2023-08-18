import CanvasOption from "./CanvasOption.js";


export default class Spark extends CanvasOption{
    constructor(x, y, vx, vy, opacity, colorDeg){
        super();

        // 파티클에 스파크 붙이기 위해 x,y값 받아오기
        this.x = x;
        this.y = y;

        // 스파크 투명도
        this.opacity = opacity;

        // 꼬리 올라갈 때 역동적으로 보이기 위해 속도값 부여하기
        this.vx = vx;
        this.vy = vy;

        // 색상값
        this.colorDeg = colorDeg;
    }
    update(){
        // 매 프레임마다 0.01씩 투명도 감소시키기
        this.opacity -= 0.01;

        // 속도 부여하기
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsl(${this.colorDeg}, 100%, 65% ${this.opacity})`;
        this.ctx.fill();
        this.ctx.closePath();

    }
}