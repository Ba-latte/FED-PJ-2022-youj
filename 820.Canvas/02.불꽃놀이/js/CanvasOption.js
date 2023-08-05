
export default class CanvasOption{
    constructor(){
        // 기본 고정값 세팅
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.dpr = window.devicePixelRatio;

        this.fps = 60;
        this.interval = 1000 / this.fps;

        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;

        // 캔버스 색상
        this.bgColor = '#000000';
    }
}