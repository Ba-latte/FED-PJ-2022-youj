

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



// 사각형 그리기
// ctx.fillRect(10, 10, 50, 50);

// [ 원 그리기 ]
// 1.원 그리기 시작한다고 알리기
ctx.beginPath();

// 2.원 그릴 함수 부르기
ctx.arc(100, 100, 50, 0, Math.PI / 180 * 180);

// 3-3.색을 채우기전에 스타일 지정하기
ctx.fillStyle = 'red';

// 3-1.원 내부에 색 채우기
ctx.fill();

// 3-2.원 모양의 선을 그리기
ctx.stroke();


// 4.원을 마무리하기
ctx.closePath();


// [ 클래스를 써서 여러 파티클 관리하기 ]
// 1.클래스 정의하기
class Particle{
    // 2.constructor로 원형 파티클을 만들 때 필요한 필수 값인 x,y값과 반지름 값을 받아오기
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    // 3.원을 그리는 메서드 정의하기
    draw(){
        // 4.원 그리기
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
}


// 5.위에서 정한 필수 인자 3개를 미리 변수로 정의해서 만들어두기
const x = 100;
const y = 100;
const radius = 50;

// 6.파티클 인스턴스 생성하기
const particle = new Particle(x, y, radius);

// 7.생성한 인스턴스 실행하기
particle.draw();



// [ 애니메이션 효과 부여하기 ]
// 1.애니메이션 함수 정의하기
function animate(){
    // 2.애니메이션 프레임 만들기 : 매 프레임마다 정의한 함수 호출해서 무한으로 실행되게 함
    window.requestAnimationFrame(animate);
    // console.log("계속 함수 호출해서 무한 실행!");

    // 4.새 프레임에서 새로 그리게 하기 위해서 초기화시켜주기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 3.생성한 인스턴스 그리기
    particle.draw();
    // 이렇게 하면 현재 이 위치에 계속 그림이 그려져서 덮어 씌워지고 있음
    // 👉 이전 프레임을 지우고 새 프레임에서 새로 그리게 하기 위해서는 전체 화면을 지우는 함수를 상단에 하나 추가해서 초기화 시켜주면 됨
}

// 2.애니메이션 함수 호출하기
// animate();