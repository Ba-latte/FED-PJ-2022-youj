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


/* 폰트어썸 임포트 */
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";







export default function SwiperVid(props) {
    // 데이터 셋팅
    const sdt = swipervid_data;

    // [ Hook 사용해서 데이터 변경하기 ]
    // 하나당 슬라이드 수 : Hook 변수
    // const [변수, set변수] = useState(초기값)
    // 👉 useState는 import해서 써야함~ + set변수에는 앞에서 지정한 변수이름에서 첫글자만 대문자로 써주면 됨~
    // ex) const [perSld, setPerSld] = useState(4);
    // const [perSld, setPerSld] = useState(4);
    // 값의 사용은 Hook 변수를 쓰고, 값의 변경은 set변수(변경할 값) 형식으로 사용하면 됨

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

    // // [ 이벤트 함수 ] /////////////////////////////////////////
    // const evtFn = ()=>{
    //     ///////////////// jQB /////////////////
    //     $(()=>{

    //         // [ 화면 크기별 슬라이드 수 변경 함수 ]
    //         const chgSwp = ()=>{

    //             // 1.윈도우 사이즈 체크하기
    //             let nowW = $(window).width();
    //             // console.log("현재 윈도우 width값: ", nowW);

    //             // 2.화면 사이즈별 슬라이드 수 변경하기
    //             if(nowW <= 1000 && nowW > 700) setPerSld(3);
    //             else if(nowW <= 700) setPerSld(2);
    //             else setPerSld(4); // nowW가 1000초과일 경우 이렇게 else문으로 세팅하기

    //         }; /////////////// chgSwp 함수 : 화면 크기별 슬라이드 수 변경 함수 ///////////////

    //         // [ 윈도우 리사이즈 이벤트 ]
    //         // $(window).on("resize", function(){}) : resize에 줄가는 게 싫으면 이거 그냥 쓰면 됨~
    //         $(window).resize(chgSwp); ////////////// 리사이즈 이벤트 //////////////


    //         // [ 로딩 시 최초 호출 ]
    //         chgSwp();
    //     }); ///////////////// jQB /////////////////
    // } ///////////////////// evtFn 함수 /////////////////////

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
                    // 200: {
                    //     slidesPerView: 1,
                    // },
                    700: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
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





