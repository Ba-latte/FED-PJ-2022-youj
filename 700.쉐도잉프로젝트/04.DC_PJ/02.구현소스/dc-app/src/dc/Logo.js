// DC 로고 컴포넌트

import React from "react";
import isrc from "./ImgSrc";



const Logo = (props)=>{
    // props.gb : 상단,하단구분코드

    //객체형 스타일적용: 속성명이 틀리면 아예 출력되지 않는다!
    const mystyle = {
        top: {
            width: "45px",
            height: "45px",
            marginRight: "30px",
            borderRadius: "50%",
            // outline:"3px solid lime"
        },
        bottom: {
            height: "80px",
        },
    };
    // 따로 잡은 스타일
    let istyle = {
        top: "45px",
        bottom: "80px",
    };

    // 자식 컴포넌트의 함수
    const nayana = (x)=>{
        // 자식 컴포넌트의 함수 안에서 속성 전달을 통해 부모함수 호출하고 값을 전달하기!
        props.tt(x);

    }; ////////////// nayana //////////////


    return (
        <h1 style={mystyle[props.gb]} onClick={()=>nayana("나야나!")}>
            <img src={isrc.logo} style={{ width: istyle[props.gb] }} />
        </h1>
    );
}; ///////////////// Logo /////////////////////

// 내보내기
export default Logo;