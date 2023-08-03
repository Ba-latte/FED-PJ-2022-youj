

const canvas = document.querySelector("canvas");


// 무언가를 그리려면 도구가 필요! 2d관련이라 2d라고 하고 변수에 담기
const ctx = canvas.getContext("2d");

// console.log(ctx);

// 캔버스의 width, height 값 담아두기
// const canvasWidth = 300;
// const canvasHeight = 300;
// const canvasWidth = innerWidth;
// const canvasWidth = innerWidth;
// const canvasHeight = innerHeight;

// dpr값 담아두기
const dpr = window.devicePixelRatio;

// [ 캔버스 사이즈 조절 이해하기 ]

// 1.CSS 값을 직접 수정해서 캔버스 사이즈 조절하는 방식
// canvas.style.width = canvasHeight + "px";
// canvas.style.height = canvasHeight + "px";
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
console.log("dpr : ", window.devicePixelRatio);

// 2.콘솔에 찍힌 값을 변수에 따로 저장해주기
// (상단에서 변수에 할당해둠)

// 3.캔버스의 width값과 height값에 dpr값을 곱해주기
// canvas.width = canvasWidth * dpr;
// canvas.height = canvasHeight * dpr;

// 4.이 dpr값을 ctx.scale을 통해 가로와 세로값을 각각 곱해주기
// ctx.scale(dpr, dpr);
// 이렇게 하는 이유 : 현재 dpr이 2 이상인 기기에서 코드를 작성할 떄에 보다 선명하게 보이게 함

/*
원리
-캔버스 자체에 dpr곱해주면 큰 정사각형이 됨
-ctx.scale로 2를 곱해주면 내가 그린 정사각형도 2배가 커짐
-캔버스 스타일 가로 세로값을 캔버스 자체 사이즈를 주게 되면
-캔버스 고유크기를 css에 맞춰 강제 크기조절이 되므로
강제적으로 4*4 타일 안에 8*8의 캔버스의 물리적 크기가 강제로 욱여들어가서 dpr이 1인 디스플레이에서 보는 것과 같이 같은 그림이 되지만 더욱 잘게 쪼개져서 더 선명하게 보이는 것임
*/



// [ 캔버스 리사이즈 ]
// 전역변수 정의
let canvasWidth;
let canvasHeight;
let particles;

// 리사이즈되면 너비,높이값 새로 적용하도록 함
function init(){
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    ctx.scale(dpr, dpr);

    // 윈도우가 리사이즈될떄마다 파티클 내에 있는 랜덤값들이 모두 캔버스 width,height값을 참조하고 있기 때문에 파티클스를 빈 배열로 초기화해서 포문을 돌아 랜덤 파티클 생성하는 부분도 초기화함수 부분으로 옮겨주도록 하기
    particles = [];
    const TOTAL = canvasWidth / 25;
    // 화면 사이즈가 달라지더라도 비슷한 밀도 유지하게 함

    for(let i = 0; i < TOTAL; i++){
        const x = randomNumBetween(0, canvasWidth);
        const y = randomNumBetween(0, canvasHeight);
        const radius = randomNumBetween(50, 100);
        const vy = randomNumBetween(1, 5);
        
        const particle = new Particle(x, y, radius, vy);

        particles.push(particle);
    }
}
// 이제 윈도우가 리사이즈될떄마다 이 초기화함수를 실행하면 됨
// 스크립트가 로로드되면서 자동으로 실행되던 코드들이 이 초기화함수 안으로 모두 들어왔으니까, 맨 아래에 window.애드이벤트리스너로, 윈도우 전체가 모두 로드가 완료되었을 때 이 초기화 함수를 실행시키고 애니메이트가 실행되도록 하기

// 그리고 그 아래에 윈도우가 리사이즈될떄마다 초기화 함수를 실행하면 됨














// [ 라이브러리 사용해서 원하는 값 만들어서 설정하기 ]
// 변수 선언
const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

// 1.먼저 컨트롤 배널 안에서 변화를 주기 위한 값들 정의하기 new 함수의 인스턴스값에 담아서 만들어주기
const controls = new function(){
    // gui메서드에서 사용될 값들이 여기서 this로 가져오기 때문에 변수명앞에 this. 뭐라고 붙여서 처음에는 블러값을 변경해줘야하니 ...이름 적당히 작명해주고 초기값을 설정해주기

    // 블러효과
    this.blurValue = 40;

    // 대비효과를 위한 매트릭스 값
    this.alphaChannel = 100;
    this.alphaOffset = -23;

    // 가속도
    this.acc = 1.03;
}

// gui 선언해서 만들기
let gui = new dat.GUI();
// 현재는 담아둔 패널이 없어서 변화가 없는 것이고 하나씩 추가하면 됨

// 패널을 종류별로 분류하여 담아두기 위해서 폴더 만들기
const f1 = gui.addFolder('Gooey Effect');
// 폴더가 열린 상태가 기본값으로 되게 하기
f1.open();

// gui 패널 추가하기
// gui.add(controls, 'blurValue', 0, 100).onChange(value => {
//     feGaussianBlur.setAttribute('stdDeviation', value);
// });
// 만든 폴더 안에 패널 담기
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
    feGaussianBlur.setAttribute('stdDeviation', value);
});
// gui.add(controls, 'alphaChannel', 1, 200).onChange(value => {
//     feColorMatrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} 0`);
// });
f1.add(controls, 'alphaChannel', 1, 200).onChange(value => {
    feColorMatrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`);
});
f1.add(controls, 'alphaOffset', -40, 40).onChange(value => {
    feColorMatrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`);
});

// 폴더 만들기
const f2 = gui.addFolder("Particle Property");
// 가속도 패널 추가
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value =>{
    particles.forEach(particle => particle.acc = value);
});



// 사각형 그리기
// ctx.fillRect(10, 10, 50, 50);

// [ 원 그리기 ]
// 1.원 그리기 시작한다고 알리기
// ctx.beginPath();

// 2.원 그릴 함수 부르기
// ctx.arc(100, 100, 50, 0, Math.PI / 180 * 180);

// 3-3.색을 채우기전에 스타일 지정하기
// ctx.fillStyle = 'red';

// 3-1.원 내부에 색 채우기
// ctx.fill();

// 3-2.원 모양의 선을 그리기
// ctx.stroke();


// 4.원을 마무리하기
// ctx.closePath();


// [ 클래스를 써서 여러 파티클 관리하기 ]
// 1.클래스 정의하기
class Particle{
    // 2.constructor로 원형 파티클을 만들 때 필요한 필수 값인 x,y값과 반지름 값을 받아오기
    constructor(x, y, radius, vy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        // 떨어지는 속도 랜덤하게 만들기 위해 새로이 정의
        this.vy = vy;
        // 가속도 주기 위해 새로 정의함 : 보통 gravity혹은 acc라고 명명함
        this.acc = 1.03;
        // 👉 1 이상의 값을 곱하면 더 극적으로 변화하는데 1.03정도가 적당함
    }
    // 3.원을 그리는 메서드 정의하기
    draw(){
        // 4.원 그리기
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }
    // 추가) 파티클 움직이기 위한 업데이트 함수 정의하기
    update(){
        // this.y += 1;

        // 가속도 부여하기
        this.vy *= this.acc;
        // 👉더욱 가파르게 속도 변화를 주고 싶다면 곱해서 누적하면 됨

        // 떨어지는 속도 랜덤하게 만들기 : 인자로 받아온 vy값을 y값에 계속해서 누적시켜주면 아래방향으로 랜덤 속도로 떨어짐
        this.y += this.vy;

    }
}


// 5.위에서 정한 필수 인자 3개를 미리 변수로 정의해서 만들어두기
// const x = 100;
// const y = 100;
// const radius = 50;

// 6.파티클 인스턴스 생성하기
// const particle = new Particle(x, y, radius);

// 7.생성한 인스턴스 실행하기
// particle.draw();





// [ 애니메이션 효과 부여하기 ]
// 1.애니메이션 함수 정의하기
// function animate(){
//     // 2.애니메이션 프레임 만들기 : 매 프레임마다 정의한 함수 호출해서 무한으로 실행되게 함
//     window.requestAnimationFrame(animate);
//     // console.log("계속 함수 호출해서 무한 실행!");

//     // 4.새 프레임에서 새로 그리게 하기 위해서 초기화시켜주기
//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//     // 3.생성한 인스턴스 그리기
//     particle.draw();
//     // 이렇게 하면 현재 이 위치에 계속 그림이 그려져서 덮어 씌워지고 있음
//     // 👉 이전 프레임을 지우고 새 프레임에서 새로 그리게 하기 위해서는 전체 화면을 지우는 함수를 상단에 하나 추가해서 초기화 시켜주면 됨
// }

// 2.애니메이션 함수 호출하기
// animate();



// [ 파티클 인스턴스 움직이게 만들기 ]
// // 1.먼저 목표 인터벌 정의하기
// let interval = 1000 / 60;
// // 👉 60fps 목표로 하기 위해서 1000 나누기함 (ms단위(?))

// // 2.now와 delta값 선언해주기
// let now, delta;

// // 3.Date 초기화
// let then = Date.now();

// function animate(){
//     window.requestAnimationFrame(animate);
    
//     // 4.매 애니메이트 함수 실행시마다 now값을 실시간으로 가져오게 함
//     now = Date.now();

//     // 5.delta값을 now - then 값을 넣어주기
//     delta = now - then;

//     // 6.만약 delta가 인터벌보다 작으면 리턴시켜서 델타가 인터벌보다 커지는 시점에 우리가 지정한 애니메이션 로직을 실행시키게 함
//     if(delta < interval) return;

//     // 아래는 우리가 지정한 애니메이션 로직!
//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//     // 😊 y를 1px 이동시키기!
//     particle.y += 1;
//     particle.draw();


//     // 7.맨 마지막에 then을 now에서 delta를 인터벌로 나눈 나머지인 값으로 빼줘서 아까 예제에서 1000에서 시작해서 1100으로 만들어 준 것처럼 변경해주기
//     then = now - (delta % interval);
// }


// 8.애니메이션 함수 호출하기
// animate();


// [ 반복문으로 파티클 여러개 생성하기 ]
// 1.총 갯수 정의하기
// const TOTAL = 20;

// 2.랜덤 사이값을 리턴해주는 함수 정의하기
const randomNumBetween = (min, max)=>{
    // 최소, 최댓값을 인자로 받아서 그 사이의 랜덤값을 리턴하기
    return Math.random() * (max - min + 1) + min;
};

// 반복문 돌아서 생성된 파티클들 꺼내오기 위해 배열 선언하기
// let particles = [];

// 3.i를 토탈까지 돌아서 토탈 개수만큼 파티클 만들 포문 돌리기
// for(let i = 0; i < TOTAL; i++){
//     // x에는 랜덤넘버비트윈함수에 0, 캔버스너비값을 넣어주면 너비가 0 ~ 전체가로길이 사이에 랜덤 위치에서 초기화되고 y도 마찬가지로 하면 됨.이렇게 하면 전체화면 내에서 랜덤한 x,y 좌표값에서 원이 생성됨!!
//     const x = randomNumBetween(0, canvasWidth);
//     const y = randomNumBetween(0, canvasHeight);

//     // 반지름 정의하기 : 50 ~ 100 사이의 반지름을 가진 원 랜덤으로 생성하기
//     const radius = randomNumBetween(50, 100);

//     // 추가) 속도 랜덤으로 움직이게 하기 위해 vy인자 랜덤수 만들기
//     const vy = randomNumBetween(1, 5);

//     // 이렇게 정의한 값들을 파티클 인스턴스의 컨스트럭터로 보내서 초기화 시키켜주기 위해 보내주기
//     const particle = new Particle(x, y, radius, vy);
//     // 다만 이렇게 포문 안에서 정의하면 아무런 일이 일어나지 않음! 포문에서 생성한 파티클들을 따로 배열을 만들어서 그 안에 넣어줘야 함

//     // 생성된 파티클을 미리 만들어둔 배열에 집어 넣기
//     particles.push(particle);
// }

// 배열에 담긴 것 확인하기
// console.log(particles);
// 이 값들을 애니메이트 함수 안에서 각각 드로우 시켜주면 됨



// 애니메이트 함수 정의하기
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate(){
    window.requestAnimationFrame(animate);
    
    now = Date.now();
    delta = now - then;

    if(delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 파티클 인스턴스들이 담긴 배열을 forEach를 돌아서 각각의 파티클을 드로우 시켜주기
    particles.forEach(particle => {
        // 드로우 전에 업데이트 함수 호출해서 움직이게 만들기
        particle.update();

        particle.draw();

        // 공이 바닥으로 떨어지면 다시 맨 위에서 생성되도록 만들기
        if(particle.y - particle.radius > canvasHeight){
            // 하늘로 공 옮기기
            particle.y = -particle.radius;
            // x값도 랜덤값으로 다시 설정하기
            particle.x = randomNumBetween(0, canvasWidth);
            // 반지름도 다시 랜덤하게 만들기
            particle.radius = randomNumBetween(50, 100);
            // 속도도 다시 랜덤하게 설정해주기
            particle.vy = randomNumBetween(1, 5);
        }
    })

    then = now - (delta % interval);
}


// 애니메이션 함수 호출하기
// animate();


// 윈도우가 전부 로드된 후에 초기화함수 실행하고 애니메이션 실행하도록 하기
window.addEventListener("load", ()=>{
    init();
    animate();
});

// 윈도우가 리사이즈될때마다 초기화 함수 실행하기
window.addEventListener("resize", ()=>{
    init();
});