// 게임 상태에 따라 다른 화면 보여줄 클래스

export default class GameHandler{
    constructor(app){
        // App 전체 받아오기
        this.app = app;

        this._status = "READY"; // READY, PLAYING, FINISHED

        // 초기화 함수 실행
        this.init();
    }
    get status(){
        return this._status;
    }
    set status(value){
        // 게임 상태 변수에 value값을 넣어 바꿔주기
        this._status = value;

        // value값에 따라 게임 상태 바꾸기
        switch(value){
            case "READY" : this.showReadyScreen();
                break;
            case "FINISHED" : this.showFinishScreen();
        }
    }
    init(){
        // 첫 화면 구성 요소 가져오기
        this.readyScreen = document.querySelector(".ready-screen");
        this.titleImage = this.readyScreen.querySelector(".title-img");
        this.playBtn = this.readyScreen.querySelector(".play-img");

        // 플레이버튼 클릭시
        this.playBtn.addEventListener("click", ()=>{
            // 레디화면 숨기는 함수 호출
            this.hideReayScreen();
        });

        // 종료 화면 구성 요소 가져오기
        this.finishScreen = document.querySelector(".finish-screen");
        this.distanceText = this.finishScreen.querySelector(".distance");
        this.coinText = this.finishScreen.querySelector(".coin");
        this.replayBtn = this.finishScreen.querySelector(".replay-img");

        // 리플레이 버튼 클릭시
        this.replayBtn.addEventListener("click", ()=>{
            // 종료화면 숨기는 함수 호출
            this.hideFinishScreen();
        });

        // setter로 상태 변수의 값 바꾸기
        this.status = "READY";
    }
    // 준비 화면 보이기 함수
    showReadyScreen(){
        // 애니메이션
        gsap.to(this.titleImage, {
            scale : 1,
            rotation : 720,
            opacity : 1,
            duration : 0.5
        });
        gsap.to(this.playBtn, {
            scale : 1,
            duration : 1,
            ease : Elastic.easeOut.config(2, 0.5),
            delay : 0.5
        });
    }

    // 준비 화면 숨기기 함수
    hideReayScreen(){
        // 애니메이션
        gsap.to(this.readyScreen, {
            opacity : 0,
            pointerEvents : "none",
            duration : 0.3,
            // 완성 후 콜백 함수
            onComplete : ()=>{
                // 상태 변수 값 바꾸기
                this.status = "PLAYING";
            }
        });
    }

    // 종료 화면 보이기 함수
    showFinishScreen(){
        // 이동 거리값 보여주기
        this.distanceText.innerText = Math.floor(this.app.score.distCount) + 'm';
        // 코인 갯수 보여주기
        this.coinText.innerText = Math.floor(this.app.score.coinCount) + ' coin';

        gsap.fromTo(
            this.finishScreen, 
            { opacity : 0 }, // from 옵션
            {
                opacity : 1,
                duration : 0.5,
                pointerEvents : "all"
            } // to 옵션
        );
        gsap.fromTo(this.distanceText, 
            { opacity : 0, scale : 0 }, 
            { opacity : 1, scale : 1, duration : 0.5, delay : 1}
        );
        gsap.fromTo(this.coinText, 
            { opacity : 0, scale : 0 }, 
            { opacity : 1, scale : 1, duration : 0.5, delay : 1.1}
        );
        gsap.fromTo(this.replayBtn, 
            { opacity : 0, scale : 0 }, 
            { opacity : 1, scale : 1, rotation : 720, duration : 0.5, delay : 1.3}
        );
    }
    // 종료 화면 숨기기 함수
    hideFinishScreen(){
        // 애니메이션
        gsap.fromTo(this.finishScreen, 
            { opacity : 1}, 
            { opacity : 0, pointerEvents : "none", duration : 0.1 }
        );

        // 게임 상태 변경
        this.status = "PLAYING";

        // 앱 리셋 함수 호출
        this.app.reset();
    }
}