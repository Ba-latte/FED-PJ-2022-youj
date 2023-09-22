import App from "./App.js";
import { randomNumBetween } from "./util.js";

export default class Wall{
    constructor(config){
        this.img = document.querySelector("#wall-img");
        // 장애물 타입
        this.type = config.type;    // 'BIG', 'SMALL'
        // 장애물 타입에 따라 정의하기
        switch(this.type){
            case 'BIG' : 
                this.sizeX = 18 / 30;
                this.sx = this.img.width * (9 / 30);
                break;
            case 'SMALL' :
                this.sizeX = 9 / 30;
                this.sx = this.img.width * (0 / 30);
                break;
        }
        // 가로,세로값
        this.width = App.height * this.sizeX;
        this.height = App.height; 

        // 통과 구간 너비값
        this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35);

        // x값 정의하기
        this.x = App.width;

        // y값 정의하기
        // 윗벽이 시작하는 y
        // 최소 : -this.height
        // 최대 : App.height - this.gapY - this.height
        this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30);
        // 아랫벽이 시작하는 y
        this.y2 = this.y1 + this.height + this.gapY;

        // 다음 벽 생성 가능여부
        this.generatedNext = false;
        // 다음 벽 생성할 시점 지정 : 0.8이상으로 올리면 플레이하기 너무 어려워짐
        this.gapNextX = App.width * randomNumBetween(0.6, 0.75);
    }

    // 캔버스 밖으로 나갔는지 확인
    get isOutside(){
        return this.x + this.width < 0
    }
    // 다음 장애물 만들 수 있는지 확인
    get canGenerateNext(){
        return(
            !this.generatedNext &&
            this.x + this.width < this.gapNextX
        )
    }

    update(){
        this.x += -6;
    }
    draw(){
        App.ctx.drawImage(
            this.img,
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            this.x, this.y1, this.width, this.height
        );
        App.ctx.drawImage(
            this.img,
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            this.x, this.y2, this.width, this.height
        );
    }
}