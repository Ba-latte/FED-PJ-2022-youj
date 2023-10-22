import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
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

        this.vx = -6;

        // 다음 벽 생성 가능여부
        this.generatedNext = false;
        // 다음 벽 생성할 시점 지정 : 0.8이상으로 올리면 플레이하기 너무 어려워짐
        this.gapNextX = App.width * randomNumBetween(0.6, 0.75);

        // 충돌감지 바운딩박스 만들기
        this.boundingBox1 = new BoundingBox(this.x + 30, this.y1 + 30, this.width - 60, this.height - 60);
        this.boundingBox2 = new BoundingBox(this.x + 30, this.y2 + 30, this.width - 60, this.height - 60);
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
    // 충돌 감지 메서드
    isColliding(target){
        return(
            this.boundingBox1.isColliding(target) ||
            this.boundingBox2.isColliding(target)
        )
    }
    update(){
        this.x += this.vx;

        // 충돌감지용 바운딩박스 x좌표 업데이트하기
        this.boundingBox1.x = this.x + 30;
        this.boundingBox2.x = this.x + 30;
        // this.boundingBox1.x = this.boundingBox2.x = this.x; // 위의 2줄 코드와 동일함
    }
    draw(){
        // // 테스트하기 위해 바운딩박스 위치 고정시키기
        // this.x = 700;
        // this.boundingBox1.x = this.boundingBox2.x = this.x + 30;

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

        // 충돌감지용 바운딩박스 그리기
        // this.boundingBox1.draw();
        // this.boundingBox2.draw();
    }
}