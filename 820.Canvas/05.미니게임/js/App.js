import Background from "./Background.js";
import Coin from "./Coin.js";
import GameHandler from "./GameHandler.js";
import Player from "./Player.js";
import Score from "./Score.js";
import Wall from "./Wall.js";

export default class App{
    static canvas = document.querySelector('canvas');
    static ctx = App.canvas.getContext('2d');
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;
    static width = 1024;
    static height = 768;

    constructor(){
        // 배경 불러오기 : Background 클래스를 불러와서 인스턴스 생성하기
        // this.background = new Background();
        this.backgrounds =[
            new Background({ img : document.querySelector("#bg3-img"), speed: -1 }),
            new Background({ img : document.querySelector("#bg2-img"), speed: -2 }),
            new Background({ img : document.querySelector("#bg1-img"), speed: -4 }),
        ];

        // 장애물, 플레이어, 코인, 점수판 만드는 코드를 모두 reset()메서드로 옮김

        // 게임 상태관리
        // this.gameHandler = new GameHandler();
        // 게임 상황에 따라 변하는 거리, 코인갯수 값을 가져가기 위해 this를 써서 app전체를 인자로 받아감
        this.gameHandler = new GameHandler(this);

        // 리셋 함수 호출하여 초기화
        this.reset();
    }

    // 게임 리셋 함수
    reset(){
        // 장애물 만들기
        this.walls = [new Wall({ type: 'SMALL' })];

        // 플레이어 만들기
        this.player = new Player();

        // 윈도우가 리사이즈될 때 리사이즈 함수 호출하기 👉 style.css에서 반응형으로 수정함
        // window.addEventListener('resize', this.resize.bind(this));

        // 코인 만들기 : 내부 코드는 테스트용
        this.coins = [new Coin( 
            // 700 + this.walls[0].width / 2,  // x : 벽의 x좌표 - width의 절반
            // this.walls[0].y2 - this.walls[0].gapY / 2  // y : 벽의 y2좌표 - gapY의 절반값
        )];

        // 점수판 만들기
        this.score = new Score();
    }

    // 초기화 함수 👉 리사이즈 함수 필요없어져서 개명
    init(){
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        // 화면 비율 정하기
        // const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
        // App.canvas.style.width = width + 'px';
        // App.canvas.style.height = width * (3 / 4) + 'px';

        // 배경이미지 생성
        this.backgrounds.forEach(background => {
            // 배경이미지 움직이도록 업데이트하기
            background.update();
            // 배경이미지 그리기
            background.draw();
        })

    }

    // 렌더 함수
    render(){
        let now, delta;
        let then = Date.now();

        // 프레임 함수
        const frame = ()=>{
            requestAnimationFrame(frame);

            now = Date.now();
            delta = now - then;

            if(delta < App.interval) return;
            ///////////////////////////////////////////

            // 게임 상태관리 변수값에 따라 화면 보이기 : 플레잉 상태가 아니면 돌려보내기
            if(this.gameHandler.status !== "PLAYING") return;

            App.ctx.clearRect(0, 0, App.width, App.height);

            // 배경 관련
            this.backgrounds.forEach(background => {
                background.update();
                background.draw();
            });

            // 장애물 벽 생성 관련
            for(let i = this.walls.length - 1; i >= 0; i--){
                this.walls[i].update();
                this.walls[i].draw();
    
                // console.log(this.walls[i].isOutside);

                // 캔버스 화면 밖으로 장애물 벽이 나가면 배열에서 지우기
                if(this.walls[i].isOutside) {
                    this.walls.splice(i, 1);
                    continue;
                }

                // 다음 장애물 벽 생성하기
                if(this.walls[i].canGenerateNext){
                    // 더이상 생성 막기
                    this.walls[i].generatedNext = true;

                    // 새로운 장애물 만들기
                    const newWall = new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' });
                    this.walls.push(newWall);

                    // 코인 생성하기
                    if(Math.random() < 0.5) {
                        const x = newWall.x + newWall.width / 2;
                        const y = newWall.y2 - newWall.gapY / 2;
                        this.coins.push(new Coin(x, y, newWall.vx));
                    }
                }

                // 벽과 플레이어 충돌 감지하기
                // 이전 코드
                // if(this.walls[i].isColliding(this.player.boundingBox)){
                //     // console.log("colliding!!!!");
                    
                //     // 충돌(true)시 바운딩박스 색상 변경
                //     this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
                // }
                // else{
                //     this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
                // }
                // setter로 게임 상태 변경하는 코드
                if(this.walls[i].isColliding(this.player.boundingBox)){
                    // console.log("colliding!!!!");
                    // 충돌(true)시 게임 상태 변수 바꿔서 종료 화면 보여주기
                    this.gameHandler.status = "FINISHED";
                    break;
                }
            }
            // 배열 잘 추가되고 지워지는지 확인하기
            // console.log(this.walls.length);

            // 플레이어 관련
            this.player.update();
            this.player.draw();

            // 플레이어가 화면 밖으로 나갔을 경우 = 벽과의 충돌과 동일하게 처리
            if(this.player.y >=  App.height || this.player.y + this.player.height <= 0){
                this.gameHandler.status = "FINISHED";
            }

            // 코인 관련
            for(let i = this.coins.length - 1; i >= 0; i--){
                this.coins[i].update();
                this.coins[i].draw();

                // 코인이 화면 밖으로 나갔을 때 배열에서 지워주기
                if(this.coins[i].x + this.coins[i].width < 0){
                    this.coins.splice(i, 1);
                    // 코인 지운 이후에 아래 코드 실행되지 않도록 막기
                    continue
                }

                // 코인과 플레이어 간의 충돌 감지
                if(this.coins[i].boundingBox.isColliding(this.player.boundingBox)){
                    // console.log("플레이어와 코인 충돌!");
                    // 충돌된 코인을 배열에서 지우기
                    this.coins.splice(i, 1);
                    // 코인 갯수 상태값 증가시키기
                    this.score.coinCount += 1;
                }
            }


            // 점수판 관련
            this.score.update();
            this.score.draw();
            
            ///////////////////////////////////////////
            then = now - (delta % App.interval);
        };

        // 프레임 함수 호출
        requestAnimationFrame(frame);
    }
}