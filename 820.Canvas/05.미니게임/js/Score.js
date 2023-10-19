import App from "./App.js";
import Coin from "./Coin.js";

// 점수 클래스
export default class Score{
    constructor(){
        // 코인 인스턴스 생성
        this.coin = new Coin(App.width - 50, 50, 0);
        // 코인 이미지 정면 모습으로 수정
        this.coin.frameX = 9;

        // 거리 상태
        this.distCount = 0;
        // 코인 갯수 상태
        this.coinCount = 0;
    }
    update(){
        // 거리 이동 체크
        this.distCount += 0.015;
    }
    draw(){
        // 코인 그리기
        this.coin.draw();

        // 텍스트의 폰트값 지정
        App.ctx.font = "80px Nanum Pen Script";
        // 텍스트 스타일 지정
        App.ctx.fillStyle = "#f1f1f1";

        // 코인 텍스트 관련
        // 스타일 지정
        App.ctx.textAlign = "right";
        // 텍스트 그리기
        App.ctx.fillText(this.coinCount, App.width - 90, 80);


        // 거리 텍스트 관련
        // 스타일 지정
        App.ctx.textAlign = "left";
        // 텍스트 그리기
        App.ctx.fillText(Math.floor(this.distCount) + "m", 25, 80);
    }
}