// 충돌 감지 위한 바운딩 박스 클래스
import App from "./App.js";

export default class BoundingBox{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.color = "rgba(255, 0, 0, 0.3)";
    }
    // 충돌 감지 메서드
    isColliding(target){
        return(
            target.x + target.width >= this.x &&
            target.x <= this.x + this.width &&
            target.y + target.height >= this.y &&
            target.y <= this.y + this.height
        )
    }
    draw(){
        App.ctx.fillStyle = this.color;
        App.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}