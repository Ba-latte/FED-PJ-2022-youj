import { hexToRgb, randomNumBetween } from "./utils.js";

export default class Particle{
    constructor(x, y, deg = 0, colors){
        // this.x = x;
        // this.y = y;
        this.x = x * innerWidth;
        this.y = y * innerHeight;
        
        this.width = 12;
        this.height = 12;
        
        // 각도 : 리디안을 디그리로 변환해주고, 랜덤값 가져오기
        // this.angle = Math.PI / 180 * randomNumBetween(0, 360);
        this.angle = Math.PI / 180 * randomNumBetween(deg - 30, deg + 30);
        // 반지름 : 콘페티가 나가는 힘
        // this.r = 3;
        this.r = randomNumBetween(30, 100);

        this.vx = this.r * Math.cos(this.angle);
        this.vy = this.r * Math.sin(this.angle);

        // 중력과 가속도
        this.friction = 0.89;
        this.gravity = 0.5;

        // 투명도
        this.opacity = 1;

        // 개별 파티클이 바람에 의해 팔랑거리는 효과 부여하기 위함
        // this.widthDelta = 0;
        // this.heightDelta = 0;
        this.widthDelta = randomNumBetween(0, 360);
        this.heightDelta = randomNumBetween(0, 360);

        this.rotation = randomNumBetween(0, 360);

        // 파티클의 회전 방향 결정을 위해 랜덤값 부여
        this.rotationDelta = randomNumBetween(-1, 1);

        // 색상
        this.colors = colors || ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'];
        // 만약 색상 지정을 안 한다면 배열에 있는 값 중 하나를 랜덤 정수 형태로 가져와 쓰기
        this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]);
    }
    update(){
        this.vy += this.gravity;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        // 투명도 조절
        this.opacity -= 0.005;

        // 파티클 혼자서 팔랑거리며 도는 효과
        this.widthDelta += 2;
        this.heightDelta += 2;
        
        // 매 프레임마다 회전값 더해주기
        this.rotation += this.rotationDelta;
    }
    draw(ctx){
        // 파티클이 여기저기 움직이며 도는 효과 부여 위함
        ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
        ctx.rotate(Math.PI / 180 * this.rotation);
        // 로테이트 후 원위치 복귀
        ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2);

        // ctx.fillStyle = 'red';
        // ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        
        ctx.fillRect(
            this.x, 
            this.y, 
            this.width * Math.cos(Math.PI / 180 * this.widthDelta), 
            this.height * Math.sin(Math.PI / 180 * this.heightDelta)
        );

        // 지금까지 적용한 트랜스폼 해제하기
        ctx.resetTransform();
    }
}