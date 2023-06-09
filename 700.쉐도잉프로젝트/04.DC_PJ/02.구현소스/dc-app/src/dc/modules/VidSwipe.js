///  VidSwipe 모듈 - VidSwipe.js
import $ from "jquery";
import "../css/vidswipe.css";
import SwiperVid from "../plugin/SwiperVid";

// 제이쿼리 로드구역 함수 /////////
function jqFn() {
    $(() => {}); //////// jQB ///////////
} ////////////// jQFn ///////////

function VidSwipe(props) {
    // props.pg - 페이지별 데이터구분
    // propt.tit - 모듈타이틀
    return (
        <>
            {/* 모듈코드 */}
            <section className="vidswbox">
                {/* 1. 모듈타이틀 */}
                <h2 className="tit">{props.tit}</h2>
                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperVid name="나는" />

                {/* 3. 비디오 재생창 */}
                <section className="vidbx">
                    {/* 비디오중앙박스 */}
                    <div className="playvid">
                        {/* 비디오타이틀 */}
                        <h2 className="ifrtit"></h2>
                        {/* 아이프레임 */}
                        <iframe src="" allow="autoplay"></iframe>
                        {/* 닫기버튼 */}
                        <button className="cbtn">×</button>
                    </div>
                </section>
            </section>

            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default VidSwipe;





//////////////////////////////// [ 내가 한거 ] ////////////////////////////////
// // 비디오 스와이프 모듈 JS - VidSwipe.js

// import $ from 'jquery';
// import '../css/vidswipe.css';
// import SwiperVid from '../plugin/SwiperVid';

// // 제이쿼리 로드구역 함수
// function jqFn(){
//     $(()=>{
        
//     }); ////////////// jQB //////////////
// } ///////////////////// jqFn 함수 /////////////////////



// // 컴포넌트
// function VidSwipe(props){
//     // props.pg - 페이지별 데이터 구분
//     // props.tit - 모듈 타이틀

//     return(
//         <>
//             {/* 모듈 코드 */}
//             <section className='vidswbox'>
//                 {/* 1.모듈 타이틀 */}
//                 <h2 className='tit'>{props.tit}</h2>

//                 {/* 2.스와이퍼 컴포넌트 */}
//                 <SwiperVid name="나는" />

//                 {/* 3.비디오 재생창 */}
//                 <section className='vidbx'>
//                     {/* 비디오 중앙 박스 */}
//                     <div className='playvid'>
//                         {/* 비디오 타이틀 */}
//                         <h2 className='ifrtit'></h2>
//                         {/* 아이프레임 */}
//                         <iframe src="" allow='autoplay'></iframe>
//                         {/* 닫기 버튼 */}
//                         <button className='cbtn'>×</button>
//                     </div>
//                 </section>
//             </section>

//             {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
//             {jqFn()}
//         </>
//     );
// } ////////////////// VidSwipe //////////////////


// // 내보내기
// export default VidSwipe;