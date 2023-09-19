import Background from "./Background.js";

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

            
            ///////////////////////////////////////////
            then = now - (delta % App.interval);
        };

        // 프레임 함수 호출
        requestAnimationFrame(frame);
    }
}