// 화면 일정 퍼센트 이상 지우면 다음 이미지 보여주는 기능
import { useEffect, useRef } from "react";
import "../style/containers/Nudake.css";
import gsap from "gsap";
import { drawImageCenter, getAngle, getDistance, getScrupedPercent } from "../utils/utils";
import throttle from "lodash/throttle";

import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";

const Nudake = ()=>{
  const canvasRef = useRef(null);
  
  useEffect(()=>{
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    // 이미지 주소 담은 배열
    const imageSrcs = [image1, image2, image3];
    // 미리 로드해두는 이미지 배열
    const loadedImages = [];
    // 이미지 인덱스번호 참조
    let currIndex = 0;
    
    // 이전 점의 위치
    let prevPos = {x: 0, y: 0};

    // 애니메이션 동작 중인지 감지하는 변수
    let isChanging = false;

    let canvasWidth, canvasHeight;

    // 리사이즈 함수
    function resize(){
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;

      // 캔버스 고유 사이즈
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      // 캔버스 CSS 사이즈
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";

      // 이미지 그리기 : 먼저 이미지를 한번 불러온 다음 이미지 그리기
      preloadImages().then(() => drawImage());
    }

    // 미리 이미지 그려놓는 함수
    function preloadImages(){
      return new Promise((resolve, reject)=>{
        // 이미지 셀 때 필요한 변수
        let loaded = 0;
        // 이미지 배열 돌며 이미지 만들기
        imageSrcs.forEach(src => {
          const img = new Image();
          img.src = src;
          img.onload = ()=>{
            // 이미지 카운트하는 변수 1 증가
            loaded += 1;
            // 미리 로드하는 이미지 배열에 이미지 추가하기
            loadedImages.push(img);

            if(loaded === imageSrcs.length) return resolve();
          };
        });
      });
    }

    // 이미지 그리기 함수
    function drawImage(){
      // 애니메이션 동작 중임
      isChanging = true;

      // 이미지 생성
      const image = loadedImages[currIndex];

      // 이미지 맨처음 그려지는 상황인지 체크
      const firstDrawing = ctx.globalCompositeOperation === 'source-over';

      // 애니메이션 부여하기
      gsap.to(canvas, {
        opacity: 0,
        duration: firstDrawing ? 0 : 1, // 이미지가 처음 그려지는 상황일 경우 0 아니면 1 부여
        // 애니메이션 끝난 후 실행되는 함수 :onComplete
        onComplete: ()=>{
          // 다시 캔버스 투명도 1로 바꿔서 이미지 보이게 만들기
          canvas.style.opacity = 1;

          // 캔버스에 그리기 : 이미지 로드가 되면 캔버스에 그려주기
          // 캔버스에 적용된 투명효과 초기화하기
          ctx.globalCompositeOperation = 'source-over';
    
          // 이미지 그리기
          drawImageCenter(canvas, ctx, image);
          // console.log(canvasParent);
    
          // 부모 요소에 배경이미지 속성으로 다음 그림을 그려서 보여주기
          const nextImage = imageSrcs[(currIndex + 1) % imageSrcs.length];
          canvasParent.style.backgroundImage = `url(../assets/nudake-1.jpg)`;
          // canvasParent.style.border = `10px dashed red`;

          // 마우스 위치 초기화
          prevPos = null;

          // 애니메이션 동작 끝남
          isChanging = false;
        }
      });

    }

    function onMouseDown(e){
      // console.log('onMouseDown');
      // 애니메이션 중이면 나가기
      if(isChanging) return

      // 마우스다운 이벤트가 발생할 때에만 마우스업, 마우스무브 이벤트 등록
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);
      canvas.addEventListener('mousemove', onMouseMove);

      // 마우스다운 발생한 위치값 넣어주기
      prevPos = {x: e.offsetX, y: e.offsetY};
    }
    function onMouseUp(){
      // console.log('onMouseUp');

      // 마우스업 이벤트가 발생할 때에만 마우스업, 마우스무브 이벤트 제거
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    }
    function onMouseMove(e){
      // console.log('onMouseMove');
      // 애니메이션 중이면 나가기
      if(isChanging) return

      // 원 그리기
      drawCircles(e);
      // 투명도 체크하기
      checkPercent();
    }

    // 지우개역할의 원 그리기 함수
    function drawCircles(e){
      // 마우스 위치값 넣기
      const nextPos = {x: e.offsetX, y: e.offsetY};
      
      // 만약 prevPos값이 null로 초기화됐다면, 현재 마우스 위치값(nextPos)을 넣어주기
      if(!prevPos) prevPos = nextPos;

      // 거리 구하기
      const dist = getDistance(prevPos, nextPos);
      // 각도 구하기
      const angle = getAngle(prevPos, nextPos);

      // 구한 거리만큼 반복해서 이전위치와 다음위치 사이에 원 그려넣기
      for(let i = 0; i < dist; i++){
        // x좌표 구하기
        const x = prevPos.x + Math.cos(angle) * i;
        // y좌표 구하기
        const y = prevPos.y + Math.sin(angle) * i;

        // 지워주는 효과 넣기
        ctx.globalCompositeOperation = 'destination-out';
        // 원 만들기
        ctx.beginPath();
        ctx.arc(x, y, canvasWidth / 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      // 지금 위치값을 이전위치값으로 바꾸기
      prevPos = nextPos;
    }

    // 투명도 체크하는 함수
    const checkPercent = throttle(()=>{
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);
      // console.log(percent);

      // 투명도가 50퍼센트가 넘으면 다음 이미지 그리기
      if(percent > 50){
        currIndex = (currIndex + 1) % imageSrcs.length;
        drawImage();
      }
    }, 500);

    // 캔버스에 이벤트 등록
    canvas.addEventListener('mousedown', onMouseDown);

    // 리사이즈 이벤트 등록하기
    window.addEventListener("resize", resize);
    // 리사이즈 함수 최초 호출
    resize();

    // Nudake 컴포넌트가 언마운트 될 때 해당 기능들 클린업 시키기
    return ()=>{
      // 캔버스에 등록된 이벤트 제거
      canvas.removeEventListener('mousedown', onMouseDown);
      // 리사이즈 함수
      window.removeEventListener("resize", resize);
    }
  }, []);


  return(
    <div className="nudake">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
};

export default Nudake;