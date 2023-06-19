// 상세페이지 모듈 컴포넌트 JS- Detail.js

import { useLocation } from "react-router-dom";


// 라우터 파라미터값 받아서 데이터 처리할 예정




function Detail(props){
    // props

    // [ 라우터 전달값을 받기 위한 useLocation 생성하기 ]
    // 즉, 전달된 데이터값 받기 위해 useLocation을 변수에 할당하여 사용할 수 있도록 함
    const loc = useLocation();
    // : 사실 아래에서 그냥 useLocation이라고 해서 써도 되긴 함

    // [ 보낸 속성명을 변수에 할당하기 ]
    // 👉 state.속성명 : 내가 라우터를 통해 보낸 속성값 받기 (속성명은 라벨이라고 생각하면 됨)
    // - 알아보기 쉽게 그냥 이름을 똑같은 걸로 정함
    // 1. 캐릭터 이름
    const cname = loc.state.cname;
    // 2. 캐릭터 설명 : "^"문자로 잘라서 배열로 데이터 변경함
    
    let cdesc = loc.state.cdesc;
    cdesc = cdesc.split("^");

    // 3. 캐릭터 명세
    const facts = loc.state.facts;



    return(
        <>
            <h2>{cname}</h2>
            <div className="cdesc">
                {
                    cdesc.map(v=>
                        <p>{v}</p>
                    )
                }
            </div>
            <div className="facts">
                <h3>CHARACTER FACTS</h3>
                {facts}
            </div>
        </>
    );
} ////////////// Detail 컴포넌트 //////////////

// 내보내기
export default Detail;