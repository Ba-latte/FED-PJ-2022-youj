import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/* 제이쿼리넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";
// 데이터 가져오기
import swipervid_data from "../data/swipervid";

export default function SwiperVid(props) {
    // 데이터 셋팅
    const sdt = swipervid_data;

    // 비디오보이기 함수
    const showVid = (src,tit) => { 
        // src-비디오경로, tit-비디오제목
        console.log(src,tit);

        let ifr = $(".playvid iframe");
        // 1. 아이프레임 src넣기
        ifr.attr("src",src+"?autoplay=1");
        // 2. 비디오 타이틀 넣기
        $(".ifrtit").text(tit); 

        let vbx = $(".vidbx");
        // 3. 비디오 전체박스 보이기
        vbx.fadeIn(300);
        // 4. 닫기버튼 셋팅
        $(".cbtn").click(()=>{
            vbx.fadeOut(300);
            ifr.attr("src","");
        });
    }; //////////// showVid ///////////////////

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper">
                {sdt.map((v, i) => (
                    <SwiperSlide key={i}>
                        <section className="swinbx" 
                        onClick={()=>showVid(v.vsrc,v.tit)}>
                            {/* 동영상이미지영역 */}
                            <div className="vidimg">
                                <img src={v.isrc} alt={v.tit}></img>
                            </div>
                            {/* 동영상타이틀영역 */}
                            <div className="vidtit">
                                <h4>{v.cat}</h4>
                                <h3>{v.tit}</h3>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}




//////////////////////////////// [ 내가 한거 ] ////////////////////////////////
// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import $ from 'jquery';

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// // CSS 가져오기
// import "./swipervid.css";

// // import required modules
// import { Navigation} from "swiper";

// // 데이터 가져오기
// import swipervid_data from "../data/swipervid";


// // [ 컴포넌트 만들기 ]
// export default function SwiperVid(props) {
//     // 데이터 세팅
//     const sdt = swipervid_data;

//     // 비디오 보이기 함수
//     const showVid = (src, tit)=>{
//         // src-비디오 경로, tit-비디오 제목
//         console.log(src, tit);

//         // 1.아이프레임 src 넣기
//         document.querySelector(".playvid iframe").setAttribute("src", src+"?autoplay=1");

//         // 2.비디오 타이틀 넣기
//         $(".ifrtit").text(tit);

//         $(".vidbx").css({display:"block"});
//     }; ///////////////// showVid 함수 /////////////////

//     // 리턴하기
//     return (
//         <>
//             <Swiper
//                 navigation={true}
//                 slidesPerView={4}
//                 spaceBetween={20}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 modules={[Navigation]}
//                 className="mySwiper"
//             >
//                 {/* 데이터 갯수만큼 스와이퍼 반복시키기 */}
//                 {
//                     sdt.map((v,i)=>
//                         <SwiperSlide key={i}>
//                             <div className="container" onClick={()=>showVid(v.vsrc, v.tit)}>
//                                 <div className="imgbx">
//                                     <img src={v.isrc} alt={v.tit + ' ' + '동영상 이미지'} />
//                                 </div>
//                                 <div className="catbx">
//                                     <h4 className="cat">{v.cat}</h4>
//                                 </div>
//                                 <div className="titbx">
//                                     <h3 className="tit">{v.tit}</h3>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     )
//                 }
//             </Swiper>
//         </>
//     );
// }





