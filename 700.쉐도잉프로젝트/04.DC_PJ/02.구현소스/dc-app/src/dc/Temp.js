// 어떤 모듈 JS - 어떤.js

import $ from 'jquery';
import './css/어떤.css';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function MenuBtn(){
    return(
        <>
            {/* 모듈 코드 */}
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// MenuBtn //////////////////


// 내보내기
export default MenuBtn;