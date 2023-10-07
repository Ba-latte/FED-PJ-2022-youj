import App from "./App.js";



export default class Coin{
    constructor(x, y, vx){
        this.img = document.querySelector("#coin-img");

        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        // 스프라이트 애니메이션 프레임넘버
        this.frameX = 0;

        // 애니메이션 속도 조절
        this.counter = 0;

        this.vx = vx;
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
    }
    draw(){
        App.ctx.drawImage(
            this.img,
            this.img.width / 10 * this.frameX, 0, // sx, sy
            this.img.width / 10, this.img.height, // sw, sh
            this.x - this.width / 2, this.y - this.height / 2, this.width, this.height
        );
    }
}