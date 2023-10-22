// 밧줄 이팩트

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
    }
    render(){
        let now, delta;
        let then = Date.now();

        const frame = ()=>{
            requestAnimationFrame(frame);

            now = Date.now();
            delta = now - then;
            if(delta < App.interval) return;
            ///////////////////////////////////////////////////
            
            ///////////////////////////////////////////////////
            then = now - (delta % App.interval);

            this.ctx.clearRect(0, 0, App.width, App.height);

            // 테스트용 사각형 그리기
            this.ctx.fillRect(100, 100, 100, 100);
        };
        // 프레임 함수 실행
        requestAnimationFrame(frame);
    }
}