// 플레이어 클래스 js
import App from "./App.js";
import BoundingBox from "./BoundingBox.js";

export default class Player {
    constructor(){
        // 이미지 불러오기
        this.img = document.querySelector("#bird-img");

        this.x = App.width * 0.1;
        this.y = App.height * 0.5;
        this.width = 130;
        this.height = this.width * ( 96 / 140);

        // 충돌 감지용 바운딩 박스
        this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 20, this.height - 20);

        // 플레이어 이미지 한 프레임 넘버 (0~14번 프레임)
        this.frameX = 0;
        // 프레임 애니메이션 속도 조절
        this.counter = 0;

        // 클릭시 플레이어 이미지 이동 속도
        this.vy = -10;
        // 중력
        this.gravity = 0.3;

        // 클릭 이벤트 연결
        App.canvas.addEventListener("click", ()=>{
            // 클릭 발생하면 vy값에 -5씩 해서 위쪽으로 움직이게 만들기
            this.vy += -5;
        });
    }
    update(){
        // 애니메이션 속도 조절 변수 1씩 증가시키기
        this.counter += 1;
        // 애니메이션 속도 조절하기
        if(this.counter % 2 === 0){
            // 플레이어 이미지 프레임 넘버 넘기기
            this.frameX += 1;
    
            // 플레이어 이미지 프레임 갯수 반복시키기
            // if(this.frameX === 15) this.frameX = 0;  // 방법1
            // if(this.frameX % 15 === 0) this.frameX = 0;  // 방법2
            this.frameX = ++this.frameX % 15;   // 방법3
        }

        // 클릭시 이동 속도 조절
        this.vy += this.gravity;
        this.y += this.vy;

        // 바운딩박스 y좌표값 업데이트하기
        this.boundingBox.y = this.y + 16;

    }
    draw(){
        // 그릴 앱 불러오기
        App.ctx.drawImage(
            this.img,   // 그릴 이미지 대상
            this.img.width / 15 * this.frameX, 0,  // 자르기 시작할 x와 y위치
            this.img.width / 15, this.img.height,    // 자를 영역의 width, height
            this.x, this.y,   // 시작하는 x와 y위치 
            this.width, this.height    // width, height
        );
        // 바운딩 박스 그리기
        this.boundingBox.draw();
    }
}