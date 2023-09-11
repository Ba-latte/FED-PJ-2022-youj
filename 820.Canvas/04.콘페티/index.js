const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// dpr이 3이나 4인 기기에서 퍼포먼스 이슈 발생 가능성이 있고, 이번 플젝에서는 dpr이 2이면 충분하기 때문에 dpr을 1이나 최대값을 2로 강제 고정함 (많이들 이렇게 함 참고 바람)
const dpr = window.devicePixelRatio < 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

// init 함수 : 처음 로드될 때, 리사이즈될 때 실행됨
function init(){
    // canvasWidth, canvasHeight 사이즈 업데이트 하기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;

    // 캔버스 사이즈 css 스타일 적용
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    // 캔버스 고유 사이즈 적용
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    // 기기마다 선명도 차별 적용
    ctx.scale(dpr, dpr);
}

// render 함수
function render(){
    let now, delta;
    let then = Date.now();

    const x = innerWidth / 2;
    let y = innerHeight / 2;
    const width = 50;
    const height = 50;

    let widthAlpa = 0;
    let deg = 0.1;

    // 프레임 함수 : 리퀘스트애니메이션프레임으로 재귀적으로 계속 스스로 실행시킴 (이렇게 하면 144헤르쯔 게이밍 모니터에서 1초에 144번 실행되고 60헤르쯔 사무용 모니터에서는 1초에 60번 실행되므로 두 모니터 모두 동일하게 실행하기 위해서, fps를 적용해줘야함)
    const frame = ()=>{
        requestAnimationFrame(frame);

        // 각기 다른 모니터에서 동일번 실행 위해 fps 적용
        now = Date.now();
        delta = now - then;
        if(delta < interval) return;
        // delta가 interval보다 크면 아래 실행

        // 매 프레임마다 지우고 시작하기
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        widthAlpa += 0.1;
        deg += 0.1;
        y += 1;

        // 전체 캔버스를 회전시키기
        ctx.translate(x + width, y + height);
        ctx.rotate(deg);
        // 매 프레임마다 중첩되기 때문에 다시 원상복구 시키기
        ctx.translate(-x - width, -y - height);


        ctx.fillStyle = 'red';
        // ctx.fillRect(x, y, width, height);
        ctx.fillRect(x, y, width * Math.cos(widthAlpa), height * Math.sin(widthAlpa));


        // 적용된 transform 해제하기
        ctx.resetTransform();



        then = now - (delta % interval);
    };

    // 호출해서 실행하기 : 트리거 걸어주기
    requestAnimationFrame(frame);
}




// window.addEventListener("resize", init);

// window.addEventListener("load", ()=>{
//     init();
//     render();
// });

