// 화면 일정 퍼센트 이상 지우면 다음 이미지 보여주는 기능
import { useEffect, useRef } from "react";
import "../style/containers/Nudake.css";

const Nudake = ()=>{
  const canvasRef = useRef(null);
  
  useEffect(()=>{
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    let canvasWidth, canvasHeight;

    function resize(){
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;

      // 캔버스 고유 사이즈
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      // 캔버스 CSS 사이즈
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
    }

    // 리사이즈 이벤트 등록하기
    window.addEventListener("resize", resize);
    // 리사이즈 함수 최초 호출
    resize();

    // Nudake 컴포넌트가 언마운트 될 때 해당 기능들 클린업 시키기
    return ()=>{
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