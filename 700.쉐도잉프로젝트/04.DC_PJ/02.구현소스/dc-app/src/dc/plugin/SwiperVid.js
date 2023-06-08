import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// CSS 가져오기
import "./swipervid.css";

// import required modules
import { Navigation} from "swiper";

// 데이터 가져오기
import swipervid_data from "../data/swipervid";


// [ 컴포넌트 만들기 ]
export default function SwiperVid(props) {
    // 데이터 세팅
    const sdt = swipervid_data;

    // 비디오 보이기 함수
    const showVid = (src, tit)=>{
        // src-비디오 경로, tit-비디오 제목
        console.log(src, tit);

        // 1.아이프레임 src 넣기
        document.querySelector(".playvid iframe").setAttribute("src", src+"?autoplay=1");

        // 2.비디오 타이틀 넣기
        $(".ifrtit").text(tit);

        $(".vidbx").css({display:"block"});
    }; ///////////////// showVid 함수 /////////////////

    // 리턴하기
    return (
        <>
            <Swiper
                navigation={true}
                slidesPerView={4}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {/* 데이터 갯수만큼 스와이퍼 반복시키기 */}
                {
                    sdt.map((v,i)=>
                        <SwiperSlide key={i}>
                            <div className="container" onClick={()=>showVid(v.vsrc, v.tit)}>
                                <div className="imgbx">
                                    <img src={v.isrc} alt={v.tit + ' ' + '동영상 이미지'} />
                                </div>
                                <div className="catbx">
                                    <h4 className="cat">{v.cat}</h4>
                                </div>
                                <div className="titbx">
                                    <h3 className="tit">{v.tit}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}


