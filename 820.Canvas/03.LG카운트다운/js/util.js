

// 최소, 최대값 사이에서 랜덤 값 뽑아내기
export const randomNumBetween = (min, max)=>{
    return Math.random() * (max - min) + min;
};