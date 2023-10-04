import Background from "./Background.js";
import Player from "./Player.js";
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

        // 장애물 만들기
        this.walls = [new Wall({ type: 'SMALL' })];

        // 플레이어 만들기
        this.player = new Player();

        // 윈도우가 리사이즈될 때 리사이즈 함수 호출하기
        window.addEventListener('resize', this.resize.bind(this));
    }


    // 리사이즈 함수
    resize(){
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        // 화면 비율 정하기
        const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
        App.canvas.style.width = width + 'px';
        App.canvas.style.height = width * (3 / 4) + 'px';

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

            App.ctx.clearRect(0, 0, App.width, App.height);

            // 배경이미지 생성
            this.backgrounds.forEach(background => {
                // 배경이미지 움직이도록 업데이트하기
                background.update();
                // 배경이미지 그리기
                background.draw();
            })

            // 장애물 벽 생성
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
                    this.walls.push(new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' }));
                }

                // 벽과 플레이어 충돌 감지하기
                if(this.walls[i].isColliding(this.player.boundingBox)){
                    // console.log("colliding!!!!");
                    
                    // 충돌(true)시 바운딩박스 색상 변경
                    this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
                }
                else{
                    this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
                }
            }
            // 배열 잘 추가되고 지워지는지 확인하기
            // console.log(this.walls.length);

            // 플레이어 관련
            this.player.update();
            this.player.draw();

            
            ///////////////////////////////////////////
            then = now - (delta % App.interval);
        };

        // 프레임 함수 호출
        requestAnimationFrame(frame);
    }
}