import App from "./App.js";

export default class Background {
    constructor(config){
        // 이미지 불러오기
        // this.img = document.querySelector("#bg2-img");
        this.img = config.img;

        // 이미지 가로,세로 : 가로값은 비례식을 통해서 값을 구할 수 있음
        this.height = App.height;
        this.width = App.height * (this.img.width / this.img.height);

        // 배경 이미지의 위치
        this.leftPos = { x: 0, y: 0 };
        this.rightPos = { x: this.width - 4, y: 0 };

        // 이동 속도
        // this.speed = -10;
        this.speed = config.speed;
    }

    update(){
        // 왼쪽 배경이미지가 화면 왼쪽 밖으로 나가는지 체크
        if(this.leftPos.x + this.width < 0) {
            // 오른쪽 배경이미지의 오른쪽 끝에 붙도록 하기
            this.leftPos.x = this.rightPos.x + this.width - 4;
        }
        // 오른쪽 배경이미지가 화면 왼쪽 밖으로 나가는지 체크
        if(this.rightPos.x + this.width < 0) {
            // 왼쪽 배경이미지의 오른쪽 끝에 붙도록 하기
            this.rightPos.x = this.leftPos.x + this.width - 4;
        }

        // 속도 더하기
        // this.pos.x -= 20;
        this.leftPos.x += this.speed;
        this.rightPos.x += this.speed;
    }

    draw(){
        // 왼쪽 배경이미지 그리기
        App.ctx.drawImage(
            this.img, 
            this.leftPos.x, this.leftPos.y, 
            this.width, this.height
        );
        // 오른쪽 배경이미지 그리기
        App.ctx.drawImage(
            this.img, 
            this.rightPos.x, this.rightPos.y, 
            this.width, this.height
        );
    }
}