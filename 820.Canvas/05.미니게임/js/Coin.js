import App from "./App.js";
import BoundingBox from "./BoundingBox.js";



export default class Coin{
    constructor(x, y, vx){
        this.img = document.querySelector("#coin-img");

        this.width = 50;
        this.height = 50;
        
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;

        // 스프라이트 애니메이션 프레임넘버
        this.frameX = 0;

        // 애니메이션 속도 조절
        this.counter = 0;

        this.vx = vx;

        // 바운딩 박스 인스턴스 생성
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }
    update(){
        if(++this.counter % 5 === 0){
            // 프레임넘버 증가해서 애니메이션 만들기
            this.frameX += 1;
            // 만약 프레임넘버 한계수 도달하면 처음으로 되돌리기
            if(this.frameX === 10) this.frameX = 0;
            // 위의 2줄 코드 한줄로 줄이면 : this.frameX = ++this.frameX % 10;
        }
        
        this.x += this.vx;

        // 바운딩박스 업데이트
        this.boundingBox.x = this.x;
    }
    draw(){
        // 코인 그리기
        App.ctx.drawImage(
            this.img,
            this.img.width / 10 * this.frameX, 0, // sx, sy
            this.img.width / 10, this.img.height, // sw, sh
            this.x, this.y, this.width, this.height
        );

        // 바운딩박스 그리기 : 추후 안보이게 주석 예정
        this.boundingBox.draw();
    }
}