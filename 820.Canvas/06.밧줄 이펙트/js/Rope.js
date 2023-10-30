// 로프 클래스

import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class Rope{
  constructor(config){
    // 점의 위치
    this.x = config.x;
    this.y = config.y;

    // 생성할 점의 갯수 : 밖에서 입력값을 안 줄 때에는 10 넣기
    this.segments = config.segments || 10;
    // 점과 점 사이의 거리
    this.gap = config.gap || 50;
    // stick의 업데이트 반복 횟수
    this.iterations = config.iterations || 10;

    // 점 배열
    this.dots = [];
    // 선 배열
    this.sticks = [];

    // 생성 함수 호출
    this.create();
  }

  // 로프 생성하기
  create(){
    // 점 생성하기
    for(let i = 0; i < this.segments; i++){
      this.dots.push(new Dot(this.x, this.y + this.gap*i));
    }
    // 선 생성하기
    for(let i = 0; i < this.segments - 1; i++){
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }

  // 점을 화면에 고정하기
  pin(index){
    this.dots[index].pinned = true;
  }

  update(mouse){
    this.dots.forEach(dot => {
      dot.update(mouse);
    });
    // 한 점이 다른 점에 영향을 주게 만드는 선을 업데이트 하는 횟수를 늘려서 처리할 양이 많아질 경우에 발생할 수 있는 사이드 이펙트를 방지하기 위해 update메서드 여러번 실행하기
    for(let i=0; i < this.iterations; i++){
      this.sticks.forEach(stick => {
          stick.update();
      });
    }
  }

  draw(ctx){
    this.dots.forEach(dot => {
      dot.draw(ctx);
    });
    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
  }
}