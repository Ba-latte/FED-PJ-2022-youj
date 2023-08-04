


// 최소값, 최대값 받아서 그 사이에서 랜덤수 뽑아내는 함수
export const randomNumBetween = (min, max)=>{
    return Math.random() * (max - min) + min;
};

// 화면의 빗변값 구하는 함수
export const hypotenuse = (x, y) =>{
    // 밑변과 높이를 받아서 밑변의 제곱 더하기 높이 제곱을 루트로 씌우면 됨
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};