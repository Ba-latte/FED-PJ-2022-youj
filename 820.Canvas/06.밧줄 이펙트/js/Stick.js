// 스틱 클래스

export default class Stick{
  constructor(p1, p2){
    // 시작점
    this.startPoint = p1;
    // 끝점
    this.endPoint = p2;

    // 원래 길이
    this.length = this.startPoint.pos.dist(this.endPoint.pos);

    // 텐션
    // this.tension = 1;
    // this.tension = 0.5; // 탄성이 줄어서 무거울수록 늘어짐
    this.tension = 0.3; // 한 프레임에서 stick의 update()메서드를 여러번 호출해서, 이전보다 텐션값을 낮게 주어야 함
  }
  update(){
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;

    // 피타고라스 정의로 원래 길이 구하기
    const dist = Math.sqrt(dx*dx + dy*dy);

    // 늘어난 길이의 x, y 차이 구하기
    const diff = (dist - this.length) / dist;
    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    // 무게에 따른 차이 구하기
    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    // 시작점이 고정되지 않은 경우에만 적용하기
    if(!this.startPoint.pinned){
      // 시작점의 x,y 좌표에 늘어난 길이의 절반만큼 더해주기
      this.startPoint.pos.x += offsetX * m1;
      this.startPoint.pos.y += offsetY * m1;
    }

    // 끝점이 고정되지 않은 경우에만 적용하기
    if(!this.endPoint.pinned){
      // 끝점의 x, y 좌표에 늘어난 길이의 절반만큼 빼주기
      this.endPoint.pos.x -= offsetX * m2;
      this.endPoint.pos.y -= offsetY * m2;
    }
  }
  draw(ctx){
    // 스틱 관련
    ctx.beginPath();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 10;
    // 스틱 그릴 위치로 이동
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    // 스틱 연결할 위치로 이동
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    // 선 연결하기
    ctx.stroke();
    ctx.closePath();
  }
}