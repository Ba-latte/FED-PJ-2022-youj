// 검색 결과 페이지 모듈 JS - Result.js

import $ from 'jquery';
import './css/result.css';
import Search from './modules/Search';
import { useLocation } from "react-router-dom";




// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function Result(props){ // props.skw - 전달키워드
    
    // Layout 페이지에서 검색창에 검색한 키워드를 받아서 라우터로 페이지 이동해오기!
    // useLocation 사용 위해 변수에 담기
    const loc = useLocation();
    // 전달 키워드
    const kw = loc.state.keyword;
    console.log("전달 받은 키워드 : ", kw);


    return(
        <>
            {/* 모듈 코드 */}
            <h2 className='tit' style={{textAlign:"center", padding:"30px 0"}}>Search Result</h2>
            {/* Layout 페이지에서 검색결과값을 보낼 경우, 받아서 skw로 전달해주기 */}
            <Search skw={kw} />
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// Result //////////////////


// 내보내기
export default Result;