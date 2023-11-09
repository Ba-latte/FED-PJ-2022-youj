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

// 문질러서 투명해지는 퍼센트 구하기 함수
export function getScrupedPercent(ctx, width, height){
  // 이미지 데이터 (각 픽셀의 rgba값) 가져와서 저장
  const pixels = ctx.getImageData(0, 0, width, height);
  // a값만 체크하기 위해 배수 지정
  const gap = 32;
  // 총 픽셀 수
  const total = pixels.data.length / gap;
  // 투명해진 픽셀 수
  let count = 0;

  // gap의 배수로 돌면서 만약 데이터 배열의 i+3번째 알파값이 0(투명함)이라면, 카운트하기
  for(let i = 0; i < pixels.data.length - 3; i += gap){
    if(pixels.data[i+3] === 0) count++;
  }

  // 백분율로 나타내서 리턴하기
  return Math.round(count / total * 100);
}

// 이미지 센터로 정렬하는 함수
export function drawImageCenter(canvas, ctx, image){
  const cw = canvas.width;
  const ch = canvas.height;

  const iw = image.width;
  const ih = image.height;

  // 비율 정의
  const ir = ih / iw;
  const cr = ch / cw;

  let sx, sy, sw, sh;

  // sw, sh 구하기
  if(ir >= cr){
    sw = iw;
    sh = sw * (ch / cw);
  }
  else{
    sh = ih;
    sw = sh * (cw / ch);
  }

  // sx, sy 구하기
  sx = iw / 2 - sw / 2;
  sy = ih / 2 - sh / 2;

  // 이미지 그리기
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cw, ch);
}