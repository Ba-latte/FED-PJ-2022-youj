// 마우스 클래스

import Vector from "./Vector.js";

export default class Mouse{
  constructor(canvas){
    // 위치
    this.pos = new Vector(-1000, -1000);

    // 감지 범위
    this.radius = 100;

    // 마우스 이벤트 등록
    canvas.onmousemove = e => this.pos.setXY(e.clientX, e.clientY);
    // 터치 이벤트 등록
    canvas.ontouchmove = e => this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
  }
}