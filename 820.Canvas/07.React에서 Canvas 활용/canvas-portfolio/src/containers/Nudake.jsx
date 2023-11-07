// 화면 일정 퍼센트 이상 지우면 다음 이미지 보여주는 기능
import { useEffect, useRef } from "react";
import "../style/containers/Nudake.css";
import { getAngle, getDistance } from "../utils/utils";

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
    // 이미지 인덱스번호 참조
    let currIndex = 0;
    
    // 이전 점의 위치
    let prevPos = {x: 0, y: 0};

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

      // 이미지 그리기
      drawImage();
    }

    // 이미지 그리기 함수
    function drawImage(){
      // 기존 캔버스 전체 지우기
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 이미지 생성
      const image = new Image();
      // 현재 인덱스 번호에 담긴 경로를 저장하기
      image.src = imageSrcs[currIndex];

      // 캔버스에 그리기 : 이미지 로드가 되면 캔버스에 그려주기
      image.onload = ()=>{
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      };
    }

    function onMouseDown(e){
      console.log('onMouseDown');

      // 마우스다운 이벤트가 발생할 때에만 마우스업, 마우스무브 이벤트 등록
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);
      canvas.addEventListener('mousemove', onMouseMove);

      // 마우스다운 발생한 위치값 넣어주기
      prevPos = {x: e.offsetX, y: e.offsetY};
    }
    function onMouseUp(){
      console.log('onMouseUp');

      // 마우스업 이벤트가 발생할 때에만 마우스업, 마우스무브 이벤트 제거
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    }
    function onMouseMove(e){
      console.log('onMouseMove');
      // 원 그리기
      drawCircles(e);
    }

    // 지우개역할의 원 그리기 함수
    function drawCircles(e){
      // 마우스 위치값 넣기
      const nextPos = {x: e.offsetX, y: e.offsetY};
      // 거리 구하기
      const dist = getDistance(prevPos, nextPos);
      // 각도 구하기
      const angle = getAngle(prevPos, nextPos);

      // 구한 거리만큼 반복해서 이전위치와 다음위치 사이에 원 그려넣기
      for(let i = 0; i < dist; i++){
        // x좌표 구하기
        const x = prevPos.x + Math.cos(angle) * i;
        // y좌표 구하기
        const y = prevPos.y + Math.sign(angle) * i;

        // 지워주는 효과 넣기
        ctx.globalCompositeOperation = 'destination-out';
        // 원 만들기
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }


      // 지금 위치값을 이전위치값으로 바꾸기
      prevPos = nextPos;
    }

    // 캔버스에 이벤트 등록
    canvas.addEventListener('mousedown', onMouseDown);
    // canvas.addEventListener('mouseup', onMouseUp);
    // canvas.addEventListener('mousemove', onMouseMove);

    // 리사이즈 이벤트 등록하기
    window.addEventListener("resize", resize);
    // 리사이즈 함수 최초 호출
    resize();

    // Nudake 컴포넌트가 언마운트 될 때 해당 기능들 클린업 시키기
    return ()=>{
      // 캔버스에 등록된 이벤트 제거
      canvas.removeEventListener('mousedown', onMouseDown);
      // canvas.removeEventListener('mouseup', onMouseUp);
      // canvas.removeEventListener('mousemove', onMouseMove);
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