// DC 캐릭터 페이지 컴포넌트

import React from "react";
import Ban from "./modules/Ban";

const Characters = ()=>{
    return(
        <>
            {/* 배너 */}
            <Ban cat="CHARACTERS" />
        </>
    );
}; ////////////// Characters ////////////////////

// 내보내기
export default Characters;