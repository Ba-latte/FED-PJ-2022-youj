// 최소값, 최대값 사이에서 랜덤한 값 하나를 리턴하는 함수
export const randomNumBetween = (min, max)=>{
  return Math.random() * (max - min) + min;
};