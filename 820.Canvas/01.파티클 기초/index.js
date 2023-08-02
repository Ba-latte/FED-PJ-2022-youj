

const canvas = document.querySelector("canvas");


// 무언가를 그리려면 도구가 필요! 2d관련이라 2d라고 하고 변수에 담기
const ctx = canvas.getContext("2d");

// console.log(ctx);

// 캔버스의 width, height 값 담아두기
const canvasWidth = 300;
const canvasHeight = 300;

// dpr값 담아두기
const dpr = window.devicePixelRatio;

// [ 캔버스 사이즈 조절 이해하기 ]

// 1.CSS 값을 직접 수정해서 캔버스 사이즈 조절하는 방식
canvas.style.width = canvasHeight + "px";
canvas.style.height = canvasHeight + "px";
// 👉 이러면 css로 사이즈를 강제로 늘리는 모양이 됨 (직사각형이 되어버린다는 뜻)

// 2.캔버스 자체 속성인 width, height값을 조절하는 방식
// canvas.width = canvasHeight;
// canvas.height = canvasHeight;
// 👉 정사각형 모양으로 커짐

// 2-1. 캔버스 자체 속성인 width, height값을 줄여보기
// canvas.width = 100;
// canvas.height = 100;
// 👉 내부의 까만 정사각형이 커지고 흐려보이게 됨
// 캔버스 고유의 크기가 100 100인데 css크기에 맞춰서 3배 확대가 되어서 픽셀이 꺠져서 흐려보이게 됨

// 그래서 보통 캔버스 작업을 할 때엔 스타일의 캔버스 엘리먼트 사이즈와 캔버스 고유의 사이즈를 똑같이 맞춰서 작업하게 됨
// 상단에 똑같이 맞출 width, height 값을 변수에 담아두고 쓰면 됨!




// ctx.fillRect(10, 10, 50, 50);
// 시작하는x값, 시작하는y값, 가로길이, 세로길이
// 캔버스는 기본적으로 가로300 세로150 크기가 그려짐! (기본값)



// [ DPR 확인하기 ]
// dpr이 높을수록 더 선명한 그래픽을 보여줄 수 있음
// 이 디피알 값을 통해서 캔버스의 사이즈를 다시 조절할 수도 있음

// 1. 현재 내 컴퓨터의 디피알 값을 콘솔로 찍어보기
console.log(window.devicePixelRatio);

// 2.콘솔에 찍힌 값을 변수에 따로 저장해주기
// (상단에서 변수에 할당해둠)

// 3.캔버스의 width값과 height값에 dpr값을 곱해주기
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

// 4.이 dpr값을 ctx.scale을 통해 가로와 세로값을 각각 곱해주기
ctx.scale(dpr, dpr);
// 이렇게 하는 이유 : 현재 dpr이 2 이상인 기기에서 코드를 작성할 떄에 보다 선명하게 보이게 함

/*
원리
-캔버스 자체에 dpr곱해주면 큰 정사각형이 됨
-ctx.scale로 2를 곱해주면 내가 그린 정사각형도 2배가 커짐
-캔버스 스타일 가로 세로값을 캔버스 자체 사이즈를 주게 되면
-캔버스 고유크기를 css에 맞춰 강제 크기조절이 되므로
강제적으로 4*4 타일 안에 8*8의 캔버스의 물리적 크기가 강제로 욱여들어가서 dpr이 1인 디스플레이에서 보는 것과 같이 같은 그림이 되지만 더욱 잘게 쪼개져서 더 선명하게 보이는 것임
*/




ctx.fillRect(10, 10, 50, 50);