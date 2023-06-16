import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/* 제이쿼리넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipercat.css";

// import required modules
import { Navigation } from "swiper";
// 데이터 가져오기
import cat_data from "../data/cat";




export default function SwiperCat(props) {
    // 데이터 셋팅
    const sdt = cat_data;

    return (
        <>
            <Swiper
                // breakpoints 적용 안 될 때 한 화면당 개수를 Hook 변수를 사용함!
                slidesPerView={2}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                // 스와이퍼 사이즈별 슬라이드 개수 변경
                breakpoints={{
                    700: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                }}
                className="mySwiper">
                {sdt.map((v, i) => (
                    <SwiperSlide key={i}>
                        <section className="swinbx" 
                        onClick={()=>showVid(v.vsrc,v.tit)}>
                            {/* 동영상이미지영역 */}
                            <div className="vidimg">
                                <img src={v.isrc} alt={v.tit}></img>
                                <FontAwesomeIcon icon={faPlayCircle} 
                                style={{
                                    position:"absolute",
                                    bottom:"55%",
                                    left:"10%",
                                    color:"#fff",
                                    fontSize:"50px"
                                    }} />
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
            {/* breakpoints 적용 안 될 때) 스와이퍼 모듈에 이벤트 입히기! */}
            {/* {evtFn()} */}
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





