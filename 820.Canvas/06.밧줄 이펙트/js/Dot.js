import Vector from "./Vector.js";
// import Mouse from "./Mouse.js";

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
    update(mouse){
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

        // 방향 벡터 구하기 위한 변수 설정
        // 마우스 벡터와 점 벡터 사이의 차이를 갖는 벡터 인스턴스에서 x, y값만 추출
        let {x: dx, y:dy} = Vector.sub(mouse.pos, this.pos);
        // 마우스와 점 사이의 거리
        const dist = Math.sqrt(dx*dx + dy*dy);
        // 점이 마우스 범위 바깥에 존재할 경우, 리턴돼서 마이너스 값 발생하지 않도록 하기
        if(dist > mouse.radius) return;

        // 방향 벡터
        const direction = new Vector(dx / dist, dy / dist);

        // 힘 구하기
        const force = (mouse.radius - dist) / mouse.radius;
        // 힘이 0~1 사이값으로 생기는지 확인
        // console.log(force);

        // 힘의 강도에 따른 움직임 여부 설정
        // 일정 강도 이상의 힘을 받으면 점의 위치를 마우스의 위치로 붙여주기
        if(force > 0.8){
            this.pos.setXY(mouse.pos.x, mouse.pos.y);
        }
        else{
            // 점의 위치에 방향 벡터와 힘을 곱한 값 더해주기 : 5를 추가로 곱해서 힘을 더 강하게 함
            this.pos.add(direction.mult(force).mult(5));
        }


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