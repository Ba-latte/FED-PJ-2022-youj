// 밧줄 이팩트

import Dot from "./Dot.js";
import Mouse from "./Mouse.js";
import Rope from "./Rope.js";
import Stick from "./Stick.js";
import { randomNumBetween } from "./utils.js";

export default class App{
    static width = innerWidth;
    static height =  innerHeight;

    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;

    constructor(){
        // 캔버스 불러오기
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // 실행
        this.resize();
        // 윈도우 리사이즈시
        window.addEventListener("resize", this.resize.bind(this));

        // 마우스 생성
        this.mouse = new Mouse(this.canvas);
    }
    resize(){
        // 리사이즈 될 때마다 화면의 가로, 세로값 다시 지정
        App.width = innerWidth;
        App.height = innerHeight;

        // 캔버스 사이즈 지정
        this.canvas.width = App.width * App.dpr;
        this.canvas.height = App.height * App.dpr;

        // 캔버스 CSS 스타일 지정
        this.canvas.style.width = App.width + 'px';
        this.canvas.style.height = App.height + 'px';

        // 선명도 높이기 : dpr다른 기기들 모두 같은 모습 볼 수 있게 함
        this.ctx.scale(App.dpr, App.dpr);

        // 리사이즈 될 때마다 로프 배열 초기화, 새로 생성하기 : 화면 사이즈에 맞는 갯수 생성 위함
        this.initRopes();
    }
    initRopes(){
        this.ropes = [];

        // 생성할 로프의 갯수 : 화면 가로사이즈에 맞게 갯수 생성
        const TOTAL = App.width * 0.06;

        for(let i = 0; i < TOTAL; i++){
            // 로프 인스턴스 생성
            const rope = new Rope({
                x: randomNumBetween(App.width*0.3, App.width*0.7),
                y: 0,
                gap: randomNumBetween(App.height*0.05, App.height*0.08)
            });

            // 로프 화면에 고정하기 위해 핀으로 꼽기
            rope.pin(0);

            // 로프 배열에 담기
            this.ropes.push(rope);
        }
    }
    render(){
        let now, delta;
        let then = Date.now();

        const frame = ()=>{
            requestAnimationFrame(frame);

            now = Date.now();
            delta = now - then;
            if(delta < App.interval) return;
            
            then = now - (delta % App.interval);
            
            this.ctx.clearRect(0, 0, App.width, App.height);
            ///////////////////////////////////////////////////

            // 테스트용 사각형 그리기
            // this.ctx.fillRect(100, 100, 100, 100);

            // 점, 선 관련 : 유기적으로 동작하기 위해 따로 update, draw 시킴 👉 모두 Rope.js로 옮김
            // 점, 선을 한번에 그리는 로프 관련
            this.ropes.forEach(rope => {
                rope.update(this.mouse);
                rope.draw(this.ctx);
            });

        };
        // 프레임 함수 실행
        requestAnimationFrame(frame);
    }
}