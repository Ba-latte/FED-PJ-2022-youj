// 두 점 사이의 거리 구하기 함수
export function getDistance(p1, p2){
  const dx = p2.x - p1.x;
  const dy = p2.y - p2.y;

  // 피타고라스 정의로 거리 구해서 리턴
  return Math.sqrt(dx*dx + dy*dy);
}

// 두 점 사이의 각도 구하기 함수
export function getAngle(p1, p2){
  const dx = p2.x - p1.x;
  const dy = p2.y - p2.y;

  // 탄젠트 이용해서 두 점사이의 절대적인 각도 구해서 리턴
  return Math.atan2(dy, dx);
}