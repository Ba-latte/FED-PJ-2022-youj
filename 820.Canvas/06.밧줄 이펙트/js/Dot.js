import Vector from "./Vector.js";


export default class Dot{
    constructor(x, y){
        // 벡터 인스턴스 불러와서 this.pos 정의
        this.pos = new Vector(x, y);

        // 속도 구하기 위해 oldPos 정의
        this.oldPos = new Vector(x, y);

        // 중력
        this.gravity = new Vector(0, 1);
        // 마찰력
        this.friction = 0.97;

        // 고정핀
        this.pinned = false;

        // 무게
        this.mass = 1;
    }
    update(){
        // 만약 dot이 고정되어 있다면 움직이지 않게 하기
        if(this.pinned) return;

        // 속도 정의
        let vel = Vector.sub(this.pos, this.oldPos);

        this.oldPos.setXY(this.pos.x, this.pos.y);

        // 속도에 마찰력 곱하여 마찰력 부여하기
        vel.mult(this.friction);
        
        // 속도에 중력 더하여 가속도 붙이기
        vel.add(this.gravity);
        // console.log(vel);
        this.pos.add(vel);
    }
    draw(ctx){
        // 점 그리기
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}